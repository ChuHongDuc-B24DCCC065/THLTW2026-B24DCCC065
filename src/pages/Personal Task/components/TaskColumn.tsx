import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Card, Empty } from 'antd';
import TaskCard from './TaskCard';
import { Task, TaskStatus, statusLabels } from '../model';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, onEditTask }) => {
  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{statusLabels[status]}</span>
          <span style={{ 
            backgroundColor: '#f0f0f0', 
            padding: '2px 8px', 
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 'normal'
          }}>
            {tasks.length}
          </span>
        </div>
      }
      style={{
        height: '100%',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        backgroundColor: '#fafafa'
      }}
      bodyStyle={{ padding: '12px', maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}
    >
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: 200,
              backgroundColor: snapshot.isDraggingOver ? '#e6f7ff' : 'transparent',
              transition: 'background-color 0.2s ease',
              borderRadius: 8
            }}
          >
            {tasks.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Không có công việc"
                style={{ marginTop: 40 }}
              />
            ) : (
              tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} onEdit={onEditTask} index={index} />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
};

export default TaskColumn;