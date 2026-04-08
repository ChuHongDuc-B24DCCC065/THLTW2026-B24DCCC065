import React from 'react';
import { Row, Col, Card, Statistic, Table, Typography, Progress } from 'antd';
import { CalendarOutlined, DollarOutlined, EnvironmentOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Text } = Typography;

const StatisticDashboard: React.FC = () => {
    // Mock data - Thống kê theo tháng
    const monthlyStats = [
        { month: 'Tháng 1', itineraries: 120, revenue: 240000000 },
        { month: 'Tháng 2', itineraries: 145, revenue: 290000000 },
        { month: 'Tháng 3', itineraries: 98, revenue: 196000000 },
        { month: 'Tháng 4', itineraries: 167, revenue: 334000000 },
        { month: 'Tháng 5', itineraries: 189, revenue: 378000000 },
        { month: 'Tháng 6', itineraries: 201, revenue: 402000000 },
    ];

    // Mock data - Địa điểm phổ biến
    const popularDest = [
        { id: 1, name: 'Vịnh Hạ Long', count: 245, percent: 28 },
        { id: 2, name: 'Phú Quốc', count: 198, percent: 22 },
        { id: 3, name: 'Đà Nẵng', count: 167, percent: 19 },
        { id: 4, name: 'Hà Nội', count: 156, percent: 18 },
        { id: 5, name: 'Sapa', count: 122, percent: 13 },
    ];

    // Mock data - Chi tiêu theo hạng mục
    const spendingByCategory = [
        { category: 'Ăn uống', amount: 145000000, percent: 35 },
        { category: 'Lưu trú', amount: 156000000, percent: 38 },
        { category: 'Di chuyển', amount: 88000000, percent: 21 },
        { category: 'Vé tham quan', amount: 32000000, percent: 6 },
    ];

    // Tính toán tổng
    const totalItineraries = monthlyStats.reduce((sum, m) => sum + m.itineraries, 0);
    const totalRevenue = monthlyStats.reduce((sum, m) => sum + m.revenue, 0);
    const totalSpending = spendingByCategory.reduce((sum, s) => sum + s.amount, 0);
    const avgRevenue = Math.round(totalRevenue / monthlyStats.length);

    const stats = [
        { 
            title: 'Tổng lịch trình', 
            value: totalItineraries, 
            icon: <CalendarOutlined />,
            suffix: 'cái'
        },
        { 
            title: 'Tổng doanh thu', 
            value: totalRevenue, 
            icon: <DollarOutlined />,
            suffix: 'VNĐ'
        },
        { 
            title: 'Doanh thu trung bình/tháng', 
            value: avgRevenue, 
            icon: <ShoppingCartOutlined />,
            suffix: 'VNĐ'
        },
        { 
            title: 'Tổng chi tiêu', 
            value: totalSpending, 
            icon: <ShoppingCartOutlined />,
            suffix: 'VNĐ'
        },
    ];

    return (
        <div>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                {stats.map((stat, i) => (
                    <Col xs={24} sm={12} lg={6} key={i}>
                        <Card>
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={stat.icon}
                                suffix={stat.suffix}
                                valueStyle={{ fontSize: '20px' }}
                                precision={0}
                                formatter={(value) => {
                                    if (stat.suffix === 'VNĐ') {
                                        return (value as number).toLocaleString();
                                    }
                                    return value;
                                }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card title={<><CalendarOutlined /> Lịch trình theo tháng</>}>
                        <Table 
                            dataSource={monthlyStats.map((item, index) => ({ ...item, key: index }))}
                            columns={[
                                { 
                                    title: 'Tháng', 
                                    dataIndex: 'month',
                                    key: 'month',
                                    width: '30%'
                                },
                                { 
                                    title: 'Số lượt', 
                                    dataIndex: 'itineraries',
                                    key: 'itineraries',
                                    width: '30%',
                                    sorter: (a, b) => a.itineraries - b.itineraries,
                                },
                                { 
                                    title: 'Doanh thu (VNĐ)', 
                                    dataIndex: 'revenue',
                                    key: 'revenue',
                                    width: '40%',
                                    render: (revenue) => revenue.toLocaleString(),
                                    sorter: (a, b) => a.revenue - b.revenue,
                                }
                            ]}
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title={<><EnvironmentOutlined /> Điểm đến phổ biến nhất</>}>
                        <Table 
                            dataSource={popularDest.map((item) => ({ ...item, key: item.id }))}
                            columns={[
                                { 
                                    title: 'Điểm đến', 
                                    dataIndex: 'name',
                                    key: 'name',
                                    width: '40%'
                                },
                                { 
                                    title: 'Số lượt', 
                                    dataIndex: 'count',
                                    key: 'count',
                                    width: '25%',
                                    sorter: (a, b) => a.count - b.count,
                                },
                                { 
                                    title: 'Tỷ lệ', 
                                    dataIndex: 'percent',
                                    key: 'percent',
                                    width: '35%',
                                    render: (percent) => (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Progress 
                                                percent={percent} 
                                                size="small"
                                                style={{ flex: 1, marginRight: 8 }}
                                            />
                                            <span style={{ minWidth: '30px' }}>{percent}%</span>
                                        </div>
                                    ),
                                }
                            ]}
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </Col>
            </Row>

            <Card 
                title={<><ShoppingCartOutlined /> Chi tiêu theo hạng mục</>}
                style={{ marginTop: 16 }}
            >
                <Row gutter={[16, 16]}>
                    {spendingByCategory.map((item, index) => (
                        <Col xs={24} sm={12} md={6} key={index}>
                            <div style={{ 
                                padding: '16px', 
                                backgroundColor: '#f5f5f5', 
                                borderRadius: '8px',
                                border: '1px solid #e8e8e8'
                            }}>
                                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                    {item.category}
                                </Text>
                                <Statistic
                                    value={item.amount}
                                    suffix="VNĐ"
                                    valueStyle={{ fontSize: '16px', color: '#1890ff' }}
                                    precision={0}
                                    formatter={(value) => (value as number).toLocaleString()}
                                />
                                <Progress 
                                    percent={item.percent} 
                                    size="small"
                                    style={{ marginTop: '12px' }}
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
            </Card>
        </div>
    );
};

export default StatisticDashboard;