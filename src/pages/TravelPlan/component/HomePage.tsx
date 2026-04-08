import React, { useState, useMemo } from 'react';
import { Row, Col, Input, Select, Slider, Typography, Space, Button, Empty } from 'antd';
import { SearchOutlined, ReloadOutlined, FilterOutlined } from '@ant-design/icons';
import DestinationCard from './DestinationCard';
import { Destination } from '../travel';

const { Title, Text } = Typography;
const { Option } = Select;

interface HomePageProps {
    destinations: Destination[];
    onAddToPlan: (dest: Destination) => void;
}

const HomePage: React.FC<HomePageProps> = ({ destinations, onAddToPlan }) => {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
    const [sortBy, setSortBy] = useState<'rating' | 'price' | 'name'>('rating');

    // Reset tất cả filter
    const resetFilters = () => {
        setSearch('');
        setTypeFilter('all');
        setPriceRange([0, 10000000]);
        setSortBy('rating');
    };

    const filteredAndSorted = useMemo(() => {
        let result = [...destinations];

        // Tìm kiếm
        if (search.trim()) {
            const keyword = search.toLowerCase().trim();
            result = result.filter(d =>
                d.name.toLowerCase().includes(keyword) ||
                d.description?.toLowerCase().includes(keyword)
            );
        }

        // Lọc theo loại
        if (typeFilter !== 'all') {
            result = result.filter(d => d.type === typeFilter);
        }

        // Lọc theo giá
        result = result.filter(d => 
            d.priceAvg >= priceRange[0] && d.priceAvg <= priceRange[1]
        );

        // Sắp xếp
        result.sort((a, b) => {
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'price') return a.priceAvg - b.priceAvg;
            return a.name.localeCompare(b.name);
        });

        return result;
    }, [destinations, search, typeFilter, priceRange, sortBy]);

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0 }}>
                    Khám phá điểm đến
                </Title>
                <Text type="secondary">{filteredAndSorted.length} điểm đến</Text>
            </div>

            <Space direction="vertical" style={{ width: '100%', marginBottom: 32 }} size="middle">
                <Input
                    placeholder="Tìm kiếm điểm đến, mô tả..."
                    prefix={<SearchOutlined />}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ maxWidth: 500 }}
                    allowClear
                />

                <Space wrap size="middle">
                    <Select 
                        value={typeFilter} 
                        onChange={setTypeFilter} 
                        style={{ width: 160 }}
                        suffixIcon={<FilterOutlined />}
                    >
                        <Option value="all">Tất cả loại</Option>
                        <Option value="beach">🏖️ Biển</Option>
                        <Option value="mountain">⛰️ Núi</Option>
                        <Option value="city">🏙️ Thành phố</Option>
                    </Select>

                    <Select 
                        value={sortBy} 
                        onChange={setSortBy} 
                        style={{ width: 180 }}
                    >
                        <Option value="rating">⭐ Đánh giá cao nhất</Option>
                        <Option value="price">💰 Giá thấp nhất</Option>
                        <Option value="name">A-Z Tên</Option>
                    </Select>

                    <div style={{ width: 320 }}>
                        <Text strong>Giá trung bình: </Text>
                        <Slider
                            range
                            min={0}
                            max={15000000}
                            step={50000}
                            value={priceRange}
                            onChange={setPriceRange as any}
                            marks={{
                                0: '0',
                                5000000: '5M',
                                10000000: '10M',
                                15000000: '15M'
                            }}
                        />
                    </div>

                    <Button 
                        icon={<ReloadOutlined />} 
                        onClick={resetFilters}
                    >
                        Reset
                    </Button>
                </Space>
            </Space>

            <Row gutter={[16, 24]}>
                {filteredAndSorted.map(dest => (
                    <Col xs={24} sm={12} lg={8} xl={6} key={dest.id}>
                        <DestinationCard data={dest} onAdd={onAddToPlan} />
                    </Col>
                ))}
            </Row>

            {filteredAndSorted.length === 0 && (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Không tìm thấy điểm đến nào phù hợp"
                    style={{ marginTop: 80 }}
                >
                    <Button type="primary" onClick={resetFilters}>
                        Xóa bộ lọc
                    </Button>
                </Empty>
            )}
        </div>
    );
};

export default HomePage;