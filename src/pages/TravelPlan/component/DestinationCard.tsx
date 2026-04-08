import React from 'react';
import { Card, Button, Rate, Tag, Typography, Space } from 'antd';
import { PlusCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Destination } from '../travel';

const { Text, Title } = Typography;

interface DestinationCardProps {
    data: Destination;
    onAdd: (item: Destination) => void; 
}

const DestinationCard: React.FC<DestinationCardProps> = ({ data, onAdd }) => {
    return (
        <Card
            hoverable
            cover={<img alt={data.name} src={data.image} style={{ height: 200, objectFit: 'cover' }} />}
            actions={[
                <Button 
                    type="primary" 
                    icon={<PlusCircleOutlined />} 
                    onClick={() => onAdd(data)}
                    block
                >
                    Thêm vào lịch trình
                </Button>
            ]}
        >
            <div style={{ marginBottom: 8 }}>
                <Tag color="geekblue">{data.type === 'beach' ? 'Biển' : data.type === 'mountain' ? 'Núi' : 'Thành phố'}</Tag>
                <Rate disabled defaultValue={data.rating} style={{ fontSize: 12, float: 'right' }} />
            </div>
            
            <Title level={4} style={{ marginTop: 0 }}>{data.name}</Title>
            
            <Space direction="vertical" size={0}>
                <Text type="secondary">
                    <EnvironmentOutlined /> Thời gian: {data.duration} giờ
                </Text>
                <Text strong style={{ color: '#faad14' }}>
                    Giá TB: {data.priceAvg.toLocaleString()} VNĐ
                </Text>
            </Space>
        </Card>
    );
};

export default DestinationCard;