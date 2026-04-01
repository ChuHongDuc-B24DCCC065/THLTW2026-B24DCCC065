import React, { useState } from 'react';
import { Table, Button, Space, Tag, Avatar, Modal, Form, Input, Switch, DatePicker, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, TeamOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Club } from '../clb';
import dayjs from 'dayjs';

const ClubList: React.FC<{ 
  data?: Club[];
  onViewMembers: (clubId: string) => void;
  onDataChange?: (newData: Club[]) => void;
}> = ({ data: propsData, onViewMembers, onDataChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState<Club[]>(propsData || []);

  // Cập nhật data khi props thay đổi
  React.useEffect(() => {
    if (propsData) {
      setDataSource(propsData);
    }
  }, [propsData]);

  const handleEdit = (record: Club) => {
    setEditingClub(record);
    setIsModalOpen(true);
    // Convert string date sang dayjs object để DatePicker hiểu
    form.setFieldsValue({
      ...record,
      foundingDate: record.foundingDate ? dayjs(record.foundingDate) : null
    });
  };

  const handleDelete = (id: string) => {
    const newData = dataSource.filter(item => item.id !== id);
    setDataSource(newData);
    onDataChange?.(newData);
    message.success('Đã xóa câu lạc bộ');
  };

  const onFinish = (values: any) => {
    const formattedValues = {
      ...values,
      id: editingClub ? editingClub.id : Math.random().toString(),
      foundingDate: values.foundingDate ? values.foundingDate.format('YYYY-MM-DD') : '',
    };

    let newData: Club[];
    if (editingClub) {
      newData = dataSource.map(c => c.id === editingClub.id ? formattedValues : c);
      message.success('Cập nhật thành công');
    } else {
      newData = [...dataSource, formattedValues];
      message.success('Thêm mới thành công');
    }
    setDataSource(newData);
    onDataChange?.(newData);
    setIsModalOpen(false);
    setEditingClub(null);
    form.resetFields();
  };

  const columns = [
    { 
      title: 'Ảnh', 
      dataIndex: 'avatar', 
      render: (src: string) => <Avatar src={src || 'https://via.placeholder.com/40'} size="large" /> 
    },
    { 
      title: 'Tên CLB', 
      dataIndex: 'name', 
      key: 'name', 
      sorter: (a: Club, b: Club) => a.name.localeCompare(b.name) 
    },
    { 
      title: 'Ngày thành lập', 
      dataIndex: 'foundingDate', 
      key: 'foundingDate',
      sorter: (a: Club, b: Club) => dayjs(a.foundingDate).unix() - dayjs(b.foundingDate).unix()
    },
    { 
      title: 'Mô tả', 
      dataIndex: 'description', 
      key: 'description',
      width: 200,
      render: (html: string) => <div dangerouslySetInnerHTML={{ __html: html }} /> 
    },
    { title: 'Chủ nhiệm', dataIndex: 'leader', key: 'leader' },
    { 
      title: 'Hoạt động', 
      dataIndex: 'isActive', 
      render: (active: boolean) => <Tag color={active ? 'blue' : 'red'}>{active ? 'Có' : 'Không'}</Tag> 
    },
    {
      title: 'Thao tác',
      render: (_: any, record: Club) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<TeamOutlined />} onClick={() => onViewMembers(record.id)}>Thành viên</Button>
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Logic Tìm kiếm
  const filteredData = dataSource.filter(item => 
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.leader.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => {
            setIsModalOpen(true);
            setEditingClub(null);
            form.resetFields();
          }}
        >
          Thêm CLB mới
        </Button>

        <Input 
          placeholder="Tìm kiếm tên CLB hoặc chủ nhiệm..." 
          prefix={<SearchOutlined />} 
          style={{ width: 300 }} 
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      
      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id" 
        pagination={{ pageSize: 5 }}
      />

      <Modal 
        title={editingClub ? "Chỉnh sửa CLB" : "Thêm mới CLB"} 
        visible={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Tên Câu lạc bộ" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}><Input /></Form.Item>
          <Form.Item name="avatar" label="Ảnh đại diện (URL)"><Input placeholder="Nhập URL ảnh" /></Form.Item>
          <Form.Item name="foundingDate" label="Ngày thành lập"><DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" /></Form.Item>
          <Form.Item name="leader" label="Chủ nhiệm CLB"><Input /></Form.Item>
          <Form.Item name="description" label="Mô tả (HTML)"><Input.TextArea rows={4} placeholder="Nhập mã HTML ví dụ: <b>Mô tả...</b>" /></Form.Item>
          <Form.Item name="isActive" label="Hoạt động" valuePropName="checked" initialValue={true}><Switch /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClubList;