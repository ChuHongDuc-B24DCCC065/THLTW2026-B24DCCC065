// src/components/orders/OrderFilters.tsx
import React from 'react';
import { Input, Select, DatePicker, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface OrderFiltersProps {
  searchText: string;
  setSearchText: (value: string) => void;
  statusFilter: string | null;
  setStatusFilter: (value: string | null) => void;
  dateRange: any;
  setDateRange: (value: any) => void;
  onCreateClick: () => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  searchText, setSearchText,
  statusFilter, setStatusFilter,
  dateRange, setDateRange,
  onCreateClick
}) => {
  return (
    <Space style={{ marginBottom: 16, flexWrap: 'wrap' }} size="middle">
      <Input
        placeholder="Tìm theo mã đơn hoặc tên khách hàng..."
        style={{ width: 300 }}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        allowClear
      />

      <Select
        placeholder="Lọc trạng thái"
        style={{ width: 180 }}
        value={statusFilter}
        onChange={setStatusFilter}
        allowClear
      >
        {['Chờ xác nhận', 'Đang giao', 'Hoàn thành', 'Hủy'].map(status => (
          <Select.Option key={status} value={status}>{status}</Select.Option>
        ))}
      </Select>

      <RangePicker
        placeholder={['Từ ngày', 'Đến ngày']}
        value={dateRange}
        onChange={setDateRange}
      />

      <Button type="primary" icon={<PlusOutlined />} onClick={onCreateClick}>
        Tạo đơn hàng mới
      </Button>
    </Space>
  );
};

export default OrderFilters;