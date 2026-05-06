import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Row, Col } from 'antd';
import TaskColumn from './TaskColumn';
import { Task, TaskStatus } from '../model';

interface KanbanBoardProps {
  tasks: Task[];
  onDragEnd: (result: DropResult) => void;
  onEditTask: (task: Task) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onDragEnd, onEditTask }) => {
  // Nhóm tasks theo status
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
        🎯 Kanban Board
      </h2>
      <p style={{ marginBottom: 16, color: '#666' }}>
        Kéo thả công việc giữa các cột để cập nhật trạng thái
      </p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <TaskColumn
              status="todo"
              tasks={getTasksByStatus('todo')}
              onEditTask={onEditTask}
            />
          </Col>
          <Col xs={24} md={8}>
            <TaskColumn
              status="inprogress"
              tasks={getTasksByStatus('inprogress')}
              onEditTask={onEditTask}
            />
          </Col>
          <Col xs={24} md={8}>
            <TaskColumn
              status="done"
              tasks={getTasksByStatus('done')}
              onEditTask={onEditTask}
            />
          </Col>
        </Row>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;