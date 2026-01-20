import React, { useState } from 'react';
import {
  Table,
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Card,
  Modal,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
    { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
    { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
    { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
    { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
  ]);

  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const handleAddProduct = (values: any) => {
    const newProduct: Product = {
      id: products.length
        ? Math.max(...products.map(p => p.id)) + 1
        : 1,
      ...values,
    };

    setProducts([...products, newProduct]);
    message.success('Thêm sản phẩm thành công');
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleDelete = (id: number) => {
    setProducts(products.filter(item => item.id !== id));
    message.success('Xóa sản phẩm thành công');
  };
  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'STT',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Thao tác',
      render: (_: any, record: Product) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={() => handleDelete(record.id)}
          okText="Có"
          cancelText="Không"
        >
          <Button danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Card title="QUẢN LÝ SẢN PHẨM" style={{ margin: 20 }}>
      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Input.Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          style={{ width: 300 }}
          allowClear
          onChange={e => setSearchText(e.target.value)}
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Thêm sản phẩm mới"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleAddProduct}>
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: 'Vui lòng nhập giá' },
              { type: 'number', min: 1, message: 'Giá phải là số dương' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng' },
              { type: 'number', min: 1, message: 'Số lượng phải là số nguyên dương' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProductList;
