// Qlydonhang/component/OrderList.tsx
import React, { useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { Order, Product } from '../model';
import OrderFilter from './OrderFilter';
import OrderTable from './OrderTable';
import OrderFormModal from './OrderFormModal';
import OrderDetailModal from './OrderDetailModal';

dayjs.extend(isBetween);

interface OrderListProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  products: Product[];
}

const OrderList: React.FC<OrderListProps> = ({ orders, setOrders, products }) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<any>(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Lọc đơn hàng
  const filteredOrders = orders.filter(order => {
    const matchSearch = 
      order.id.toLowerCase().includes(searchText.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchText.toLowerCase());

    const matchStatus = statusFilter ? order.status === statusFilter : true;

    let matchDate = true;
    if (dateRange?.[0] && dateRange?.[1]) {
      const start = dateRange[0].startOf('day');
      const end = dateRange[1].endOf('day');
      matchDate = dayjs(order.createdAt).isBetween(start, end, 'day', '[]');
    }

    return matchSearch && matchStatus && matchDate;
  });

  return (
    <>
      <OrderFilter
        searchText={searchText}
        setSearchText={setSearchText}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onCreateClick={() => {
          setEditingOrder(null);
          setIsFormModalOpen(true);
        }}
      />

      <OrderTable
        orders={filteredOrders}
        onView={(order) => {
          setSelectedOrder(order);
          setIsDetailModalOpen(true);
        }}
        onEdit={(order) => {
          setEditingOrder(order);
          setIsFormModalOpen(true);
        }}
        onCancelOrder={(id) => {
          setOrders(prev => prev.map(o => 
            o.id === id ? { ...o, status: 'Hủy' } : o
          ));
        }}
      />

      {/* Modal Tạo / Sửa */}
      <OrderFormModal
        open={isFormModalOpen}
        editingOrder={editingOrder}
        products={products}
        onCancel={() => {
          setIsFormModalOpen(false);
          setEditingOrder(null);
        }}
        onSuccess={(newOrder: Order) => {               // ← Đã fix
          if (editingOrder) {
            setOrders(prev => prev.map(o => o.id === newOrder.id ? newOrder : o));
          } else {
            setOrders(prev => [newOrder, ...prev]);
          }
          setIsFormModalOpen(false);
          setEditingOrder(null);
        }}
      />

      {/* Modal Xem chi tiết */}
      <OrderDetailModal
        open={isDetailModalOpen}
        order={selectedOrder}
        onCancel={() => setIsDetailModalOpen(false)}
      />
    </>
  );
};

export default OrderList;