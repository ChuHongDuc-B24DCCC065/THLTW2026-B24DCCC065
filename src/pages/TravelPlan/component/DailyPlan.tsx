import React, { useState } from 'react';
import { Card, Typography, Button, List, Space, DatePicker, Modal, Select } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons';
import { PlanItem, Destination, mockDestinations } from '../travel';
import moment from 'moment';

const { Title, Text } = Typography;

interface DailyPlanProps {
    plan: PlanItem[];
    selectedDate: string;
    onAddDestination: (dest: Destination) => void;
    onRemoveItem: (id: string) => void;
    onDateChange: (date: string) => void;
}

const DailyPlan: React.FC<DailyPlanProps> = ({
    plan,
    selectedDate,
    onAddDestination,
    onRemoveItem,
    onDateChange
}) => {
    const currentDayPlan = plan.filter(item => item.date === selectedDate);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedDestId, setSelectedDestId] = useState<string>('');

    // Lọc những destination chưa được thêm vào hôm nay
    const availableDestinations = mockDestinations.filter(
        dest => !currentDayPlan.some(item => item.id === dest.id)
    );

    const handleAddDestination = () => {
        if (selectedDestId) {
            const dest = mockDestinations.find(d => d.id === selectedDestId);
            if (dest) {
                onAddDestination(dest);
                setSelectedDestId('');
                setShowAddModal(false);
            }
        }
    };

    return (
        <Card 
            title={
                <Space align="center">
                    Lịch trình ngày:{' '}
                    <DatePicker 
                        value={moment(selectedDate)}
                        onChange={(date) => {
                            const newDate = date ? date.format('YYYY-MM-DD') : selectedDate;
                            onDateChange(newDate);
                        }}
                        format="DD/MM/YYYY"
                        
                    />
                </Space>
            }
            extra={
                <Button 
                    type="primary" 
                    icon={<PlusCircleOutlined />} 
                    onClick={() => setShowAddModal(true)}
                >
                    Thêm điểm đến
                </Button>
            }
        >
            <List
                dataSource={currentDayPlan}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button 
                                danger 
                                icon={<DeleteOutlined />} 
                                onClick={() => onRemoveItem(item.id)}
                            />
                        ]}
                    >
                        <Space style={{ width: '100%' }}>
                            <DragOutlined style={{ cursor: 'grab', fontSize: 18 }} />
                            <div style={{ flex: 1 }}>
                                <Title level={5} style={{ margin: '0 0 4px 0' }}>
                                    {item.name}
                                </Title>
                                <Text type="secondary">
                                    {item.duration} giờ • {item.priceAvg.toLocaleString()} VNĐ
                                </Text>
                            </div>
                        </Space>
                    </List.Item>
                )}
            />

            {currentDayPlan.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <Text type="secondary">Chưa có điểm đến nào trong ngày này</Text>
                    <br />
                    <Button 
                        type="dashed" 
                        icon={<PlusCircleOutlined />} 
                        onClick={() => setShowAddModal(true)} 
                        style={{ marginTop: 16 }}
                    >
                        Thêm điểm đến vào ngày này
                    </Button>
                </div>
            )}

            <Modal
                title="Chọn điểm đến để thêm vào lịch trình"
                visible={showAddModal}
                onOk={handleAddDestination}
                onCancel={() => setShowAddModal(false)}
                okText="Thêm"
                cancelText="Hủy"
            >
                <Select
                    placeholder="Chọn một điểm đến..."
                    value={selectedDestId}
                    onChange={setSelectedDestId}
                    style={{ width: '100%' }}
                    optionLabelProp="label"
                >
                    {availableDestinations.map(dest => (
                        <Select.Option key={dest.id} value={dest.id} label={dest.name}>
                            <div>
                                <strong>{dest.name}</strong>
                                <div style={{ fontSize: '12px', color: '#999' }}>
                                    {dest.duration}h • {dest.priceAvg.toLocaleString()} VNĐ
                                </div>
                            </div>
                        </Select.Option>
                    ))}
                </Select>
                {availableDestinations.length === 0 && (
                    <div style={{ marginTop: 16, textAlign: 'center', color: '#999' }}>
                        Tất cả điểm đến đã được thêm vào hôm nay
                    </div>
                )}
            </Modal>
        </Card>
    );
};

export default DailyPlan;