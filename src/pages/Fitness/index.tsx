import React, { useState } from 'react';
import { Layout as AntLayout } from 'antd';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Import các trang con (Đảm bảo bạn đã đổi tên các component bên trong thành ...Page)
import Dashboard from './Dashboard';
import WorkoutPage from './workout'; 
import Health from './health';
import GoalPage from './goal';
import ExercisePage from './exercise';

const FitnessApp: React.FC = () => {
  // State quản lý tab đang được chọn
  const [selectedKey, setSelectedKey] = useState('Dashboard');

  // Hàm quyết định nội dung nào được hiển thị
  const renderContent = () => {
    switch (selectedKey) {
      case 'Dashboard':
        return <Dashboard />;
      case 'workout':
        return <WorkoutPage />;
      case 'health':
        return <Health />;
      case 'goal':
        return <GoalPage />;
      case 'exercise':
        return <ExercisePage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      {/* QUAN TRỌNG: Truyền state và hàm thay đổi state xuống Sidebar */}
      <Sidebar selectedKey={selectedKey} onSelect={setSelectedKey} />
      
      <AntLayout>
        <Header />
        <AntLayout.Content style={{ margin: '24px 16px', padding: 24, background: '#f0f2f5', overflow: 'initial' }}>
          <div style={{ minHeight: 360 }}>
            {renderContent()}
          </div>
        </AntLayout.Content>
      </AntLayout>
    </AntLayout>
  );
};

export default FitnessApp;