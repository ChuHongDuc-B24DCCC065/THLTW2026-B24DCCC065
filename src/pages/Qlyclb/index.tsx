import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, FileTextOutlined, BarChartOutlined } from '@ant-design/icons';
import ClubList from './component/ClubList';
import RegistrationTable from './component/RegistrationTable';
import MemberTable from './component/MemberTable';
import StatisticDashboard from './component/StatisticDashboard';
import { Club } from './clb';
import { ClubRegistration } from './clb';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('clubs');
  const [clubs, setClubs] = useState<Club[]>([
    { 
      id: '1', 
      name: 'Street Workout PTIT', 
      leader: 'Nguyễn Văn A', 
      isActive: true, 
      avatar: '', 
      foundingDate: '2023-01-15', 
      description: '<b>CLB Thể hình đường phố</b>' 
    },
  ]);
  const [registrations, setRegistrations] = useState<ClubRegistration[]>([]);
  const [memberMode, setMemberMode] = useState<{ active: boolean; clubId?: string }>({ active: false });

  const handleViewMembers = (clubId: string) => {
    setMemberMode({ active: true, clubId });
    setActiveTab('registrations'); // Chuyển sang tab registrations với chế độ member
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 20px', borderBottom: '1px solid #f0f0f0' }}>
        <h2 style={{ margin: '16px 0' }}>Hệ thống Quản lý Câu lạc bộ</h2>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            style={{ height: '100%', borderRight: 0 }}
            onClick={({ key }) => {
              setActiveTab(key);
              if (key !== 'registrations') {
                setMemberMode({ active: false });
              }
            }}
          >
            <Menu.Item key="clubs" icon={<HomeOutlined />}>Danh sách CLB</Menu.Item>
            <Menu.Item key="registrations" icon={<FileTextOutlined />}>Quản lý đơn đăng ký</Menu.Item>
            <Menu.Item key="statistics" icon={<BarChartOutlined />}>Báo cáo & Thống kê</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {activeTab === 'clubs' && (
              <ClubList 
                data={clubs}
                onViewMembers={handleViewMembers}
                onDataChange={setClubs}
              />
            )}
            {activeTab === 'registrations' && !memberMode.active && (
              <RegistrationTable
                data={registrations}
                clubs={clubs}
                onDataChange={setRegistrations}
              />
            )}
            {activeTab === 'registrations' && memberMode.active && memberMode.clubId && (
              <MemberTable
                clubId={memberMode.clubId}
                clubName={clubs.find(c => c.id === memberMode.clubId)?.name || ''}
                clubs={clubs}
                registrations={registrations}
                onClose={() => setMemberMode({ active: false })}
                onDataChange={setRegistrations}
              />
            )}
            {activeTab === 'statistics' && (
              <StatisticDashboard
                registrations={registrations}
                clubs={clubs}
              />
            )}
          </Content>
        </Layout>
      </Layout>

    </Layout>
  );
};

export default App;