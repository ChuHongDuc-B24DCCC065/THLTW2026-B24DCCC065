// Qlydonhang/index.tsx
import React, { useState } from 'react';
import OrderList from './component/OrderList';
import { Order, Product } from './model';

// ==================== DỮ LIỆU MẪU ====================
const initialProducts: Product[] = [
  { id: 1, name: "iPhone 15 Pro", price: 28990000, quantity: 50 },
  { id: 2, name: "MacBook Air M3", price: 32990000, quantity: 30 },
  { id: 3, name: "AirPods Pro 2", price: 5990000, quantity: 100 },
  { id: 4, name: "Samsung Galaxy S24", price: 21990000, quantity: 25 },
  { id: 5, name: "Sony WH-1000XM5", price: 7990000, quantity: 40 },
];

const initialOrders: Order[] = [
  {
    id: "DH10001",
    customerName: "Nguyễn Văn A",
    phone: "0912345678",
    address: "Hà Nội, Việt Nam",
    products: [
      { productId: 1, productName: "iPhone 15 Pro", quantity: 1, price: 28990000 }
    ],
    totalAmount: 28990000,
    status: "Chờ xác nhận",
    createdAt: "2026-04-10"
  },
  {
    id: "DH10002",
    customerName: "Trần Thị B",
    phone: "0987654321",
    address: "TP. Hồ Chí Minh",
    products: [
      { productId: 2, productName: "MacBook Air M3", quantity: 1, price: 32990000 },
      { productId: 3, productName: "AirPods Pro 2", quantity: 2, price: 5990000 }
    ],
    totalAmount: 44970000,
    status: "Đang giao",
    createdAt: "2026-04-12"
  },
  {
    id: "DH10003",
    customerName: "Lê Văn C",
    phone: "0901234567",
    address: "Đà Nẵng",
    products: [
      { productId: 4, productName: "Samsung Galaxy S24", quantity: 1, price: 21990000 }
    ],
    totalAmount: 21990000,
    status: "Hoàn thành",
    createdAt: "2026-04-08"
  },
];

// ==================== TRANG CHÍNH ====================
const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [products] = useState<Product[]>(initialProducts);

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ 
          marginBottom: 24, 
          color: '#1890ff',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          📦 Quản lý Đơn hàng
        </h1>
        
        <OrderList 
          orders={orders} 
          setOrders={setOrders} 
          products={products} 
        />
      </div>
    </div>
  );
};

export default OrdersPage;