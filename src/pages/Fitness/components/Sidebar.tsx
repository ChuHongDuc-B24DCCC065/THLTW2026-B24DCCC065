import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  RocketOutlined, 
  HeartOutlined, 
  TrophyOutlined, 
  FireOutlined 
} from '@ant-design/icons';

const { Sider } = Layout;

// Định nghĩa các props mà Sidebar cần nhận
interface SidebarProps {
  selectedKey: string;
  onSelect: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedKey, onSelect }) => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0" theme="dark">
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        // Sử dụng optional chaining ?. để an toàn hơn
        onClick={({ key }) => onSelect?.(key)} 
        items={[
          { key: 'Dashboard', icon: <DashboardOutlined />, label: 'Bảng điều khiển' },
          { key: 'workout', icon: <RocketOutlined />, label: 'Luyện tập' },
          { key: 'exercise', icon: <FireOutlined />, label: 'Bài tập' },
          { key: 'goal', icon: <TrophyOutlined />, label: 'Mục tiêu' },
          { key: 'health', icon: <HeartOutlined />, label: 'Sức khỏe' },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;