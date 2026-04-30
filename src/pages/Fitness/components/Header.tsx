import React from 'react';
import { Layout, Avatar, Badge, Space } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  return (
    <AntHeader style={{ background: '#fff', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
        <Space size={24}>
          <Badge count={3}>
            <BellOutlined style={{ fontSize: 20 }} />
          </Badge>
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#ff4d4f' }} />
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;