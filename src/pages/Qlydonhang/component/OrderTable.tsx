// src/components/orders/OrderTable.tsx
import React from 'react';
import { Table } from 'antd';
import { Order } from '../model';
import dayjs from 'dayjs';
import OrderActions from './OrderActions';

interface OrderTableProps {
  orders: Order[];
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
  onCancelOrder: (id: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onView, onEdit, onCancelOrder }) => {
  const columns = [
    { title: 'Mã đơn hàng', dataIndex: 'id', sorter: (a: Order, b: Order) => a.id.localeCompare(b.id) },
    { title: 'Khách hàng', dataIndex: 'customerName' },
    { 
      title: 'Ngày đặt', 
      dataIndex: 'createdAt', 
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
      sorter: (a: Order, b: Order) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix()
    },
    { 
      title: 'Tổng tiền', 
      dataIndex: 'totalAmount', 
      render: (amount: number) => <b>{amount.toLocaleString('vi-VN')} ₫</b>,
      sorter: (a: Order, b: Order) => a.totalAmount - b.totalAmount 
    },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          'Chờ xác nhận': 'orange',
          'Đang giao': 'blue',
          'Hoàn thành': 'green',
          'Hủy': 'red'
        };
        return <span style={{ color: colorMap[status], fontWeight: 'bold' }}>{status}</span>;
      }
    },
    {
      title: 'Thao tác',
      render: (_: any, record: Order) => (
        <OrderActions 
          order={record} 
          onView={onView} 
          onEdit={onEdit} 
          onCancelOrder={onCancelOrder} 
        />
      )
    }
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={orders} 
      rowKey="id" 
      pagination={{ pageSize: 10 }}
    />
  );
};

export default OrderTable;