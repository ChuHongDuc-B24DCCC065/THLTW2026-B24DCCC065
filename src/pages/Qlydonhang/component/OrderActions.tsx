// Qlydonhang/component/OrderActions.tsx
import React from 'react';
import { Button, Space, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Order } from '../model';

interface OrderActionsProps {
  order: Order;
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
  onCancelOrder: (id: string) => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({ 
  order, 
  onView, 
  onEdit, 
  onCancelOrder 
}) => {
  return (
    <Space>
      <Button icon={<EyeOutlined />} onClick={() => onView(order)}>
        Xem
      </Button>
      <Button icon={<EditOutlined />} onClick={() => onEdit(order)}>
        Sửa
      </Button>

      <Popconfirm
        title={
    <>
      Bạn có chắc chắn muốn hủy đơn hàng này?<br />
      <span style={{ color: 'red' }}>Hành động này không thể hoàn tác!</span>
    </>}
        okText="Đồng ý hủy"
        cancelText="Quay lại"
        onConfirm={() => onCancelOrder(order.id)}
        disabled={order.status !== 'Chờ xác nhận'}
      >
        <Button 
          danger 
          icon={<DeleteOutlined />} 
          disabled={order.status !== 'Chờ xác nhận'}
        >
          Hủy đơn
        </Button>
      </Popconfirm>
    </Space>
  );
};

export default OrderActions;