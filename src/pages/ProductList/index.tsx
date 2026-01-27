import React, { useState, useMemo, useEffect } from 'react';
import { 
  Table, Button, Form, Input, InputNumber, message, Popconfirm, 
  Card, Modal, Tabs, Tag, Select, Space, Statistic, Row, Col 
} from 'antd';
import { 
  PlusOutlined, DeleteOutlined, EditOutlined, ShoppingCartOutlined, 
  AppstoreOutlined, DollarOutlined, SolutionOutlined
} from '@ant-design/icons';

import { Product, Order } from '@/models/Product';
import { initialProducts, initialOrders } from '@/models/productdata';
import OrderList from './order';

const ProductOrderPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [searchText, setSearchText] = useState('');
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm] = Form.useForm();

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [products, orders]);

  const stats = useMemo(() => {
    const revenue = orders
      .filter(o => o.status === 'Hoàn thành')
      .reduce((sum, o) => sum + o.totalAmount, 0);
    const stockValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    return { revenue, stockValue, totalOrders: orders.length, totalProducts: products.length };
  }, [products, orders]);

  const handleProductSubmit = (values: any) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...values } : p));
      message.success('Cập nhật thành công');
    } else {
      const newProduct = { 
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1, 
        ...values 
      };
      setProducts([...products, newProduct]);
      message.success('Thêm mới thành công');
    }
    setIsProductModalVisible(false);
    setEditingProduct(null);
    productForm.resetFields();
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    message.success('Đã xóa sản phẩm');
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const currentOrder = orders.find(o => o.id === orderId);
    if (!currentOrder) return;
    const oldStatus = currentOrder.status;

    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    let updatedProducts = [...products];
    if (newStatus === 'Hoàn thành' && oldStatus !== 'Hoàn thành') {
      currentOrder.products.forEach(item => {
        updatedProducts = updatedProducts.map(p => 
          p.id === item.productId ? { ...p, quantity: Math.max(0, p.quantity - item.quantity) } : p
        );
      });
      message.success(`Đơn ${orderId} Hoàn thành. Đã trừ kho!`);
    } else if (oldStatus === 'Hoàn thành' && newStatus !== 'Hoàn thành') {
      currentOrder.products.forEach(item => {
        updatedProducts = updatedProducts.map(p => 
          p.id === item.productId ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      });
      message.warning(`Đơn ${orderId} thay đổi. Đã hoàn kho!`);
    }
    setProducts(updatedProducts);
  };

  const renderStatusTag = (quantity: number) => {
    if (quantity === 0) return <Tag color="error">Hết hàng</Tag>;
    if (quantity <= 10) return <Tag color="warning">Sắp hết</Tag>;
    return <Tag color="success">Còn hàng</Tag>;
  };

  const productColumns = [
    { title: 'STT', render: (_: any, __: any, index: number) => index + 1, width: 60 },
    { title: 'Tên sản phẩm', dataIndex: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
    { title: 'Danh mục', dataIndex: 'category', filters: [{ text: 'Laptop', value: 'Laptop' }, { text: 'Điện thoại', value: 'Điện thoại' }], onFilter: (value: any, record: any) => record.category === value },
    { title: 'Giá', dataIndex: 'price', render: (v: number) => `${v.toLocaleString()} đ`, sorter: (a: any, b: any) => a.price - b.price },
    { title: 'Kho', dataIndex: 'quantity', sorter: (a: any, b: any) => a.quantity - b.quantity },
    { title: 'Trạng thái', render: (_: any, record: Product) => renderStatusTag(record.quantity) },
    {
      title: 'Thao tác',
      render: (_: any, record: Product) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => {
            setEditingProduct(record);
            productForm.setFieldsValue(record);
            setIsProductModalVisible(true);
          }}>Sửa</Button>
          <Popconfirm title="Xóa sản phẩm này?" onConfirm={() => deleteProduct(record.id)}>
            <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}><Card><Statistic title="Doanh thu" value={stats.revenue} prefix={<DollarOutlined />} suffix="đ" valueStyle={{ color: '#3f8600' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="Giá trị kho" value={stats.stockValue} prefix={<AppstoreOutlined />} suffix="đ" /></Card></Col>
        <Col span={6}><Card><Statistic title="Sản phẩm" value={stats.totalProducts} /></Card></Col>
        <Col span={6}><Card><Statistic title="Đơn hàng" value={stats.totalOrders} prefix={<SolutionOutlined />} /></Card></Col>
      </Row>

      <Card>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab={<span><AppstoreOutlined />Quản lý Sản phẩm</span>} key="1">
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Input.Search placeholder="Tìm theo tên..." style={{ width: 300 }} onChange={e => setSearchText(e.target.value)} />
              <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                setEditingProduct(null);
                productForm.resetFields();
                setIsProductModalVisible(true);
              }}>Thêm sản phẩm</Button>
            </div>
            <Table columns={productColumns} dataSource={products.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))} rowKey="id" pagination={{ pageSize: 5 }} />
          </Tabs.TabPane>

          <Tabs.TabPane tab={<span><ShoppingCartOutlined />Quản lý Đơn hàng</span>} key="2">
            <OrderList 
              orders={orders} 
              setOrders={setOrders} 
              products={products} 
              onStatusChange={updateOrderStatus} 
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <Modal
        title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        visible={isProductModalVisible}
        onCancel={() => setIsProductModalVisible(false)}
        onOk={() => productForm.submit()}
        destroyOnClose
      >
        <Form form={productForm} layout="vertical" onFinish={handleProductSubmit}>
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
            <Select options={[{ value: 'Laptop' }, { value: 'Điện thoại' }, { value: 'Phụ kiện' }]} />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true, type: 'number', min: 1 }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="quantity" label="Số lượng tồn" rules={[{ required: true, type: 'number', min: 0 }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductOrderPage;