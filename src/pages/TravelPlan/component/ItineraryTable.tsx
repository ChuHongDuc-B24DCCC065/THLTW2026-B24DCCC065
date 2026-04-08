import React from 'react';
import { Table, Tag, Button, Typography } from 'antd';
import { PlanItem } from '../travel';
import { DeleteOutlined } from '@ant-design/icons';

const {  } = Typography;

interface ItineraryTableProps {
    plan: PlanItem[];
    onRemove: (id: string) => void;
}

const ItineraryTable: React.FC<ItineraryTableProps> = ({ plan, onRemove }) => {
    const columns = [
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
            render: (date: string) => <strong>{date}</strong>
        },
        {
            title: 'Điểm đến',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => (
                <Tag color={type === 'beach' ? 'blue' : type === 'mountain' ? 'green' : 'orange'}>
                    {type === 'beach' ? 'Biển' : type === 'mountain' ? 'Núi' : 'Thành phố'}
                </Tag>
            )
        },
        {
            title: 'Thời gian',
            dataIndex: 'duration',
            key: 'duration',
            render: (duration: number) => `${duration} giờ`
        },
        {
            title: 'Giá TB',
            dataIndex: 'priceAvg',
            key: 'priceAvg',
            render: (price: number) => `${price.toLocaleString()} VNĐ`
        },
        {
            title: '',
            key: 'action',
            render: (_: any, record: PlanItem) => (
                <Button 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => onRemove(record.id)}
                />
            )
        }
    ];

    return (
        <Table 
            columns={columns} 
            dataSource={plan} 
            rowKey="id"
            pagination={false}
        />
    );
};

export default ItineraryTable;