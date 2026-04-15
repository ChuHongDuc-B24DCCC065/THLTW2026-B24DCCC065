// src/components/orders/OrderDetailModal.tsx
import React from 'react';
import { Modal, Descriptions, Divider } from 'antd';
import { Order } from '../model';
import dayjs from 'dayjs';

interface OrderDetailModalProps {
  open: boolean;
  order: Order | null;
  onCancel: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ open, order, onCancel }) => {
  if (!order) return null;

  return (
    <Modal
      title={`Chi tiết đơn hàng - ${order.id}`}
      visible={open}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Descriptions bordered column={1} labelStyle={{ width: '160px' }}>
        <Descriptions.Item label="Mã đơn hàng">{order.id}</Descriptions.Item>
        <Descriptions.Item label="Khách hàng">{order.customerName}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">{order.phone}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ giao hàng">{order.address}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">
          {dayjs(order.createdAt).format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <span style={{
            color: order.status === 'Hủy' ? 'red' : 
                   order.status === 'Hoàn thành' ? 'green' :
                   order.status === 'Đang giao' ? 'blue' : 'orange',
            fontWeight: 'bold'
          }}>
            {order.status}
          </span>
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Danh sách sản phẩm</Divider>

      {order.products.map((item, index) => (
        <div key={index} style={{ marginBottom: 12, padding: '12px', background: '#fafafa', borderRadius: '6px' }}>
          <strong>{item.productName}</strong><br />
          Số lượng: {item.quantity} × {item.price.toLocaleString('vi-VN')} ₫ = 
          <strong> {(item.price * item.quantity).toLocaleString('vi-VN')} ₫</strong>
        </div>
      ))}

      <div style={{ textAlign: 'right', marginTop: 20, fontSize: '18px' }}>
        <strong>Tổng tiền: {order.totalAmount.toLocaleString('vi-VN')} ₫</strong>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;