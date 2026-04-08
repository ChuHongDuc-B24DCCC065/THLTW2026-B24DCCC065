// index.tsx
import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
    HomeOutlined,
    CalendarOutlined,
    DollarOutlined,
    SettingOutlined
} from '@ant-design/icons';

import { Destination, PlanItem, BudgetItem, mockDestinations } from './travel';

import HomePage from './component/HomePage';
import DailyPlan from './component/DailyPlan';
import BudgetChart from './component/BudgetChart';
import ItineraryTable from './component/ItineraryTable';
import AdminDestinationForm from './component/AdminDestinationForm';
import StatisticDashboard from './component/StatisticDashboard';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const TravelPlan: React.FC = () => {
    const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
    const [plan, setPlan] = useState<PlanItem[]>([]);
    const [budget, setBudget] = useState<BudgetItem[]>([]);
    const [totalBudget] = useState(50000000); // 50 triệu mặc định
    const [selectedDate, setSelectedDate] = useState<string>('2026-04-15');

    const [currentTab, setCurrentTab] = useState('home');

    // Thêm điểm đến vào lịch trình
    const handleAddToPlan = (dest: Destination) => {
        const newItem: PlanItem = {
            ...dest,
            date: selectedDate,
            order: plan.length + 1,
        };
        setPlan([...plan, newItem]);
        
        // Tự động thêm vào budget - tách chi phí theo từng hạng mục
        const newBudgetItems: BudgetItem[] = [];
        
        if (dest.costFood) {
            newBudgetItems.push({
                category: 'food',
                amount: dest.costFood,
                note: `Ăn uống - ${dest.name}`,
                date: selectedDate
            });
        }
        
        if (dest.costAccommodation) {
            newBudgetItems.push({
                category: 'accommodation',
                amount: dest.costAccommodation,
                note: `Lưu trú - ${dest.name}`,
                date: selectedDate
            });
        }
        
        if (dest.costTransport) {
            newBudgetItems.push({
                category: 'transport',
                amount: dest.costTransport,
                note: `Di chuyển - ${dest.name}`,
                date: selectedDate
            });
        }
        
        setBudget([...budget, ...newBudgetItems]);
    };

    // Xóa khỏi lịch trình
    const handleRemoveFromPlan = (id: string) => {
        const itemToRemove = plan.find(item => item.id === id);
        setPlan(plan.filter(item => item.id !== id));
        
        // Xóa chi phí tương ứng khỏi budget
        if (itemToRemove) {
            setBudget(budget.filter(item => 
                !(item.note?.includes(itemToRemove.name))
            ));
        }
    };

    // Thêm điểm đến mới từ Admin
    const handleAddNewDestination = (newDest: Omit<Destination, 'id'>) => {
        const dest: Destination = {
            ...newDest,
            id: Date.now().toString(),
        };
        setDestinations(prev => [...prev, dest]);   // ← Dùng functional update (tốt hơn)
        
    // Tự động chuyển về tab Trang chủ để xem ngay
    setCurrentTab('home');
    };

    const items = [
        { label: 'Trang chủ', key: 'home', icon: <HomeOutlined /> },
        { label: 'Tạo lịch trình', key: 'plan', icon: <CalendarOutlined /> },
        { label: 'Ngân sách', key: 'budget', icon: <DollarOutlined /> },
        { label: 'Quản trị', key: 'admin', icon: <SettingOutlined /> },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#001529', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
                <Title level={3} style={{ color: 'white', margin: 0 }}>
                    TravelPlan
                </Title>
            </Header>

            <Layout>
                <Sider width={220} theme="light">
                    <Menu
                        mode="inline"
                        selectedKeys={[currentTab]}
                        items={items}
                        onClick={({ key }) => setCurrentTab(key)}
                        style={{ height: '100%', borderRight: 0 }}
                    />
                </Sider>

                <Content style={{ padding: '24px', background: '#f0f2f5' }}>
                    {currentTab === 'home' && (
                        <HomePage 
                            destinations={destinations} 
                            onAddToPlan={handleAddToPlan} 
                        />
                    )}

                    {currentTab === 'plan' && (
                        <>
                           
                            
                            <DailyPlan
                                plan={plan}
                                selectedDate={selectedDate}
                                onAddDestination={handleAddToPlan}        // ← Truyền hàm này
                                onRemoveItem={handleRemoveFromPlan}
                                onDateChange={setSelectedDate}
                            />

                            <div style={{ marginTop: 24 }}>
                                <ItineraryTable plan={plan} onRemove={handleRemoveFromPlan} />
                            </div>
                        </>
                    )}

                    {currentTab === 'budget' && (
                        <BudgetChart 
                            budget={budget} 
                            totalBudget={totalBudget} 
                        />
                    )}

                    {currentTab === 'admin' && (
                        <div>
                            <StatisticDashboard />
                            
                            <div style={{ marginTop: 32 }}>
                                <Title level={4}>Thêm / Sửa điểm đến</Title>
                                <AdminDestinationForm onSubmit={handleAddNewDestination} />
                            </div>
                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default TravelPlan;