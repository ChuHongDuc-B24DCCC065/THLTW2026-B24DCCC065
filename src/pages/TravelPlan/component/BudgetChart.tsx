import React from 'react';
import { Card, Typography, Row, Col, Statistic, Progress, Table, Alert } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import { BudgetItem } from '../travel';

const { Title } = Typography;

interface BudgetChartProps {
    budget: BudgetItem[];
    totalBudget: number;
}

const BudgetChart: React.FC<BudgetChartProps> = ({ budget, totalBudget }) => {
    // Tính toán chi phí theo hạng mục
    const categoryTotals = {
        'transport': budget.filter(b => b.category === 'transport').reduce((sum, b) => sum + b.amount, 0),
        'accommodation': budget.filter(b => b.category === 'accommodation').reduce((sum, b) => sum + b.amount, 0),
        'food': budget.filter(b => b.category === 'food').reduce((sum, b) => sum + b.amount, 0),
        'ticket': budget.filter(b => b.category === 'ticket').reduce((sum, b) => sum + b.amount, 0),
        'other': budget.filter(b => b.category === 'other').reduce((sum, b) => sum + b.amount, 0),
    };

    const spent = budget.reduce((sum, item) => sum + item.amount, 0);
    const remaining = totalBudget - spent;
    const percentUsed = totalBudget > 0 ? Math.round((spent / totalBudget) * 100) : 0;
    const isOverBudget = spent > totalBudget;

    // Data cho bảng
    const tableData = [
        {
            key: 'transport',
            category: 'Di chuyển',
            amount: categoryTotals.transport,
            percent: totalBudget > 0 ? Math.round((categoryTotals.transport / totalBudget) * 100) : 0,
        },
        {
            key: 'accommodation',
            category: 'Lưu trú',
            amount: categoryTotals.accommodation,
            percent: totalBudget > 0 ? Math.round((categoryTotals.accommodation / totalBudget) * 100) : 0,
        },
        {
            key: 'food',
            category: 'Ăn uống',
            amount: categoryTotals.food,
            percent: totalBudget > 0 ? Math.round((categoryTotals.food / totalBudget) * 100) : 0,
        },
        {
            key: 'ticket',
            category: 'Vé tham quan',
            amount: categoryTotals.ticket,
            percent: totalBudget > 0 ? Math.round((categoryTotals.ticket / totalBudget) * 100) : 0,
        },
        {
            key: 'other',
            category: 'Khác',
            amount: categoryTotals.other,
            percent: totalBudget > 0 ? Math.round((categoryTotals.other / totalBudget) * 100) : 0,
        },
    ];

    const columns = [
        {
            title: 'Hạng mục',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Chi tiêu (VNĐ)',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => amount.toLocaleString(),
        },
        {
            title: 'Tỷ lệ',
            dataIndex: 'percent',
            key: 'percent',
            render: (percent: number) => `${percent}%`,
        },
    ];

    return (
        <div>
            {isOverBudget && (
                <Alert
                    message="Cảnh báo: Bạn đã vượt quá ngân sách!"
                    description={`Đã chi: ${spent.toLocaleString()} VNĐ | Ngân sách: ${totalBudget.toLocaleString()} VNĐ | Vượt: ${(spent - totalBudget).toLocaleString()} VNĐ`}
                    type="error"
                    icon={<AlertOutlined />}
                    showIcon
                    style={{ marginBottom: 24 }}
                />
            )}

            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic 
                            title="Tổng ngân sách" 
                            value={totalBudget.toLocaleString()} 
                            suffix="VNĐ" 
                            precision={0}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic 
                            title="Đã chi" 
                            value={spent.toLocaleString()} 
                            suffix="VNĐ"
                            valueStyle={{ color: isOverBudget ? '#cf1322' : '#faad14' }}
                            precision={0}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic 
                            title="Còn lại" 
                            value={remaining.toLocaleString()} 
                            suffix="VNĐ"
                            valueStyle={{ color: remaining >= 0 ? '#52c41a' : '#cf1322' }}
                            precision={0}
                        />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: 24 }}>
                <Title level={4}>Tiến độ sử dụng ngân sách</Title>
                <Progress
                    percent={Math.min(percentUsed, 100)}
                    strokeColor={isOverBudget ? '#cf1322' : percentUsed > 80 ? '#faad14' : '#52c41a'}
                    format={percent => `${percent}%`}
                />
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card>
                        <Title level={4}>Phân bổ ngân sách theo hạng mục</Title>
                        <Table
                            dataSource={tableData}
                            columns={columns}
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card>
                        <Title level={4}>Chi tiết chi tiêu</Title>
                        {budget.length > 0 ? (
                            <Table
                                dataSource={budget.map((item, index) => ({
                                    ...item,
                                    key: index,
                                    categoryName: item.category === 'transport' ? 'Di chuyển' :
                                                   item.category === 'accommodation' ? 'Lưu trú' :
                                                   item.category === 'food' ? 'Ăn uống' :
                                                   item.category === 'ticket' ? 'Vé tham quan' : 'Khác',
                                }))}
                                columns={[
                                    {
                                        title: 'Hạng mục',
                                        dataIndex: 'categoryName',
                                        key: 'categoryName',
                                    },
                                    {
                                        title: 'Chi tiêu',
                                        dataIndex: 'amount',
                                        key: 'amount',
                                        render: (amount: number) => amount.toLocaleString() + ' VNĐ',
                                    },
                                    {
                                        title: 'Ghi chú',
                                        dataIndex: 'note',
                                        key: 'note',
                                    },
                                ]}
                                pagination={{ pageSize: 5 }}
                                size="small"
                            />
                        ) : (
                            <div style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>
                                Chưa có chi tiêu nào
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default BudgetChart;