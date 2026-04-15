// src/components/orders/OrderFormModal.tsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { Order, Product } from '../model';
import dayjs from 'dayjs';

interface OrderFormModalProps {
  open: boolean;
  editingOrder: Order | null;
  products: Product[];
  onCancel: () => void;
  onSuccess: (order: Order) => void;
}

const OrderFormModal: React.FC<OrderFormModalProps> = ({
  open,
  editingOrder,
  products,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingOrder) {
      form.setFieldsValue({
        customerName: editingOrder.customerName,
        phone: editingOrder.phone,
        address: editingOrder.address,
        productIds: editingOrder.products.map(p => p.productId),
        status: editingOrder.status,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ status: 'Chờ xác nhận' });
    }
  }, [editingOrder, form]);

  const handleSubmit = (values: any) => {
    const orderItems = values.productIds.map((id: number) => {
      const product = products.find(p => p.id === id)!;
      return {
        productId: id,
        productName: product.name,
        quantity: 1,
        price: product.price,
      };
    });

    const totalAmount = orderItems.reduce((sum: number, item: any) => 
      sum + item.price * item.quantity, 0);

    const newOrder: Order = {
      id: editingOrder?.id || `DH${Date.now().toString().slice(-6)}`,
      customerName: values.customerName,
      phone: values.phone,
      address: values.address,
      products: orderItems,
      totalAmount,
      status: values.status,
      createdAt: editingOrder?.createdAt || dayjs().format('YYYY-MM-DD'),
    };

    onSuccess(newOrder);
    message.success(editingOrder ? 'Cập nhật đơn hàng thành công!' : 'Tạo đơn hàng thành công!');
  };

  return (
    <Modal
      title={editingOrder ? "Chỉnh sửa đơn hàng" : "Tạo đơn hàng mới"}
      visible={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>Hủy</Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          {editingOrder ? 'Cập nhật' : 'Tạo đơn hàng'}
        </Button>,
      ]}
      width={720}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="customerName"
          label="Tên khách hàng"
          rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
        >
          <Input placeholder="Nhập tên khách hàng" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            { pattern: /^\d{10,11}$/, message: 'Số điện thoại phải có 10 hoặc 11 số' }
          ]}
        >
          <Input placeholder="Ví dụ: 0912345678" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ giao hàng"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập địa chỉ chi tiết" />
        </Form.Item>

        <Form.Item
          name="productIds"
          label="Sản phẩm trong đơn hàng"
          rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 sản phẩm' }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn sản phẩm"
            showSearch
            optionFilterProp="label"
          >
            {products.map(p => (
              <Select.Option 
                key={p.id} 
                value={p.id}
                label={p.name}
                disabled={p.quantity <= 0}
              >
                {p.name} — {p.price.toLocaleString('vi-VN')} ₫ (Tồn kho: {p.quantity})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Trạng thái đơn hàng">
          <Select>
            <Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
            <Select.Option value="Đang giao">Đang giao</Select.Option>
            <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OrderFormModal;