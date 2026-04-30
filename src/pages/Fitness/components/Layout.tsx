import React from 'react';
import { Layout as AntLayout } from 'antd';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '24px 16px', padding: 24, background: '#f0f2f5' }}>
        {children}
      </Content>
    </AntLayout>
  );
};

export default Layout;