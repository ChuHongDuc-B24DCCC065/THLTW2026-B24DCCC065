import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space, DatePicker, Descriptions } from 'antd';
import { PlusOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Product, Order } from '@/models/Product';
import dayjs from 'dayjs';

interface OrderListProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  products: Product[];
  onStatusChange: (orderId: string, newStatus: Order['status']) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, setOrders, products, onStatusChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // --- State phục vụ Tìm kiếm và Lọc ---
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<any>(null);

  const [orderForm] = Form.useForm();

  // --- Logic Lọc Đơn Hàng ---
  const filteredOrders = orders.filter(order => {
    // 1. Tìm theo mã đơn hoặc tên khách hàng
    const matchSearch = order.id.toLowerCase().includes(searchText.toLowerCase()) || 
                        order.customerName.toLowerCase().includes(searchText.toLowerCase());
    
    // 2. Lọc theo trạng thái
    const matchStatus = statusFilter ? order.status === statusFilter : true;
    
    // 3. Lọc theo khoảng ngày
    let matchDate = true;
    if (dateRange && dateRange[0] && dateRange[1]) {
      const start = dateRange[0].startOf('day');
      const end = dateRange[1].endOf('day');
      const orderDate = dayjs(order.createdAt);
      matchDate = orderDate.isAfter(start) && orderDate.isBefore(end);
    }

    return matchSearch && matchStatus && matchDate;
  });

  const handleCreateOrder = (values: any) => {
    // Logic tạo đơn hàng (giữ nguyên như cũ)
    const orderItems = values.productIds.map((id: number) => {
      const p = products.find(prod => prod.id === id);
      return { productId: id, productName: p?.name || '', quantity: 1, price: p?.price || 0 };
    });

    const newOrder: Order = {
      id: `DH${Date.now().toString().slice(-5)}`,
      customerName: values.customerName,
      phone: values.phone,
      address: values.address,
      products: orderItems,
      totalAmount: orderItems.reduce((sum: number, i: any) => sum + (i.price * i.quantity), 0),
      status: 'Chờ xử lý',
      createdAt: dayjs().format('YYYY-MM-DD')
    };

    setOrders([newOrder, ...orders]);
    setIsModalOpen(false);
    orderForm.resetFields();
    message.success('Tạo đơn hàng thành công!');
  };

  const columns = [
    { title: 'Mã đơn', dataIndex: 'id', sorter: (a: Order, b: Order) => a.id.localeCompare(b.id) },
    { title: 'Khách hàng', dataIndex: 'customerName' },
    { title: 'Số SP', render: (_: any, record: Order) => record.products.length },
    { title: 'Tổng tiền', dataIndex: 'totalAmount', render: (v: number) => <b>{v.toLocaleString()} đ</b>, sorter: (a: Order, b: Order) => a.totalAmount - b.totalAmount },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status',
      render: (status: Order['status'], record: Order) => (
        <Select value={status} style={{ width: 130 }} onChange={(val) => onStatusChange(record.id, val)}>
          {['Chờ xử lý', 'Đang giao', 'Hoàn thành', 'Đã hủy'].map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)}
        </Select>
      )
    },
    { title: 'Ngày tạo', dataIndex: 'createdAt', sorter: (a: Order, b: Order) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix() },
    { title: 'Thao tác', render: (_: any, record: Order) => <Button icon={<EyeOutlined />} onClick={() => { setSelectedOrder(record); setIsDetailOpen(true); }}>Xem chi tiết</Button> }
  ];

  return (
    <>
      {/* --- Thanh Công Cụ Tìm Kiếm & Lọc --- */}
      <Space style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <Input 
          placeholder="Mã đơn / Tên khách hàng..." 
          prefix={<SearchOutlined />} 
          style={{ width: 250 }} 
          onChange={e => setSearchText(e.target.value)} 
        />
        <Select 
          placeholder="Lọc trạng thái" 
          allowClear 
          style={{ width: 160 }} 
          onChange={setStatusFilter}
        >
          {['Chờ xử lý', 'Đang giao', 'Hoàn thành', 'Đã hủy'].map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)}
        </Select>
        <DatePicker.RangePicker 
          placeholder={['Từ ngày', 'Đến ngày']}
          onChange={(values) => setDateRange(values)} 
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Tạo đơn hàng
        </Button>
      </Space>

      <Table columns={columns} dataSource={filteredOrders} rowKey="id" />

      {/* Modal Xem chi tiết */}
      <Modal title="Thông tin đơn hàng chi tiết" visible={isDetailOpen} onCancel={() => setIsDetailOpen(false)} footer={null} width={650}>
        {selectedOrder && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Mã đơn hàng">{selectedOrder.id}</Descriptions.Item>
            <Descriptions.Item label="Khách hàng">{selectedOrder.customerName}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{selectedOrder.phone}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{selectedOrder.address}</Descriptions.Item>
            <Descriptions.Item label="Danh sách sản phẩm">
              {selectedOrder.products.map((p, idx) => (
                <div key={idx}>- {p.productName} (x{p.quantity}): {p.price.toLocaleString()} đ</div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền"><b>{selectedOrder.totalAmount.toLocaleString()} đ</b></Descriptions.Item>
            <Descriptions.Item label="Ngày đặt">{selectedOrder.createdAt}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Modal Tạo đơn (giữ nguyên) */}
      <Modal title="Tạo đơn hàng mới" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => orderForm.submit()} destroyOnClose>
         <Form form={orderForm} layout="vertical" onFinish={handleCreateOrder}>
            <Form.Item name="customerName" label="Tên khách hàng" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, pattern: /^\d{10,11}$/, message: '10-11 số' }]}><Input /></Form.Item>
            <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}><Input.TextArea /></Form.Item>
            <Form.Item name="productIds" label="Sản phẩm" rules={[{ required: true }]}>
               <Select mode="multiple">
                  {products.map(p => <Select.Option key={p.id} value={p.id} disabled={p.quantity === 0}>{p.name} (Kho: {p.quantity})</Select.Option>)}
               </Select>
            </Form.Item>
         </Form>
      </Modal>
    </>
  );
};

export default OrderList;