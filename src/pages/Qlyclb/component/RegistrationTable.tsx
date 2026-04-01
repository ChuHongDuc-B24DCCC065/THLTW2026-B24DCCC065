import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Space, Tag, message, Typography, Select, Radio, Form, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EyeOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, HistoryOutlined } from '@ant-design/icons';
import { ClubRegistration, HistoryLog } from '../clb';
import { Club } from '../clb';

const { Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface RegistrationTableProps {
  data?: ClubRegistration[]; // Dữ liệu từ component cha
  clubs: Club[];
  isMemberMode?: boolean;
  clubId?: string; // Lọc theo CLB
  onDataChange?: (data: ClubRegistration[]) => void;
}

const RegistrationTable: React.FC<RegistrationTableProps> = ({
  data: propsData,
  clubs,
  isMemberMode = false,
  clubId,
  onDataChange
}) => {
  const [registrations, setRegistrations] = useState<ClubRegistration[]>(propsData || []);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentHistory, setCurrentHistory] = useState<HistoryLog[]>([]);
  const [currentRegistration, setCurrentRegistration] = useState<ClubRegistration | null>(null);
  const [rejectNote, setRejectNote] = useState('');
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Cập nhật data khi props thay đổi
  useEffect(() => {
    if (propsData) {
      setRegistrations(propsData);
    }
  }, [propsData]);

  const handleAdd = () => {
    setModalType('add');
    setCurrentRegistration(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: ClubRegistration) => {
    setModalType('edit');
    setCurrentRegistration(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleView = (record: ClubRegistration) => {
    setModalType('view');
    setCurrentRegistration(record);
    setIsDetailOpen(true);
  };

  const handleDelete = (record: ClubRegistration) => {
    Modal.confirm({
      title: 'Xóa đơn đăng ký',
      content: `Bạn có chắc chắn muốn xóa đơn đăng ký của ${record.fullName}?`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: () => {
        setRegistrations(registrations.filter(r => r.id !== record.id));
        message.success('Xóa đơn đăng ký thành công');
        onDataChange?.(registrations.filter(r => r.id !== record.id));
      }
    });
  };

  const handleApprove = (record: ClubRegistration) => {
    const historyLog: HistoryLog = {
      admin: 'Admin',
      action: 'Approved',
      timestamp: new Date().toISOString(),
    };

    const updatedRegistrations = registrations.map(r =>
      r.id === record.id
        ? {
            ...r,
            status: 'Approved' as const,
            history: [...r.history, historyLog],
            updatedAt: new Date().toISOString(),
          }
        : r
    );

    setRegistrations(updatedRegistrations);
    message.success(`Đã duyệt đơn của ${record.fullName}`);
    onDataChange?.(updatedRegistrations);
  };

  const handleReject = (record: ClubRegistration, reason?: string) => {
    const finalReason = reason || prompt('Nhập lý do từ chối:');
    if (!finalReason) return;

    const historyLog: HistoryLog = {
      admin: 'Admin',
      action: 'Rejected',
      timestamp: new Date().toISOString(),
      reason: finalReason,
    };

    const updatedRegistrations = registrations.map(r =>
      r.id === record.id
        ? {
            ...r,
            status: 'Rejected' as const,
            rejectReason: finalReason,
            history: [...r.history, historyLog],
            updatedAt: new Date().toISOString(),
          }
        : r
    );

    setRegistrations(updatedRegistrations);
    message.success(`Đã từ chối đơn của ${record.fullName}`);
    onDataChange?.(updatedRegistrations);
  };

  const handleBulkApprove = () => {
    Modal.confirm({
      title: 'Xác nhận duyệt hàng loạt',
      content: `Bạn có chắc chắn muốn duyệt ${selectedRowKeys.length} đơn đăng ký?`,
      onOk: () => {
        const historyLog: HistoryLog = {
          admin: 'Admin',
          action: 'Approved',
          timestamp: new Date().toISOString(),
        };

        const updatedRegistrations = registrations.map(r =>
          selectedRowKeys.includes(r.id) && r.status === 'Pending'
            ? {
                ...r,
                status: 'Approved' as const,
                history: [...r.history, historyLog],
                updatedAt: new Date().toISOString(),
              }
            : r
        );

        setRegistrations(updatedRegistrations);
        setSelectedRowKeys([]);
        message.success(`Đã duyệt ${selectedRowKeys.length} đơn`);
        onDataChange?.(updatedRegistrations);
      }
    });
  };

  const handleBulkReject = () => {
    if (!rejectNote.trim()) {
      message.error('Vui lòng nhập lý do từ chối');
      return;
    }

    const historyLog: HistoryLog = {
      admin: 'Admin',
      action: 'Rejected',
      timestamp: new Date().toISOString(),
      reason: rejectNote,
    };

    const updatedRegistrations = registrations.map(r =>
      selectedRowKeys.includes(r.id) && r.status === 'Pending'
        ? {
            ...r,
            status: 'Rejected' as const,
            rejectReason: rejectNote,
            history: [...r.history, historyLog],
            updatedAt: new Date().toISOString(),
          }
        : r
    );

    setRegistrations(updatedRegistrations);
    setSelectedRowKeys([]);
    setRejectNote('');
    setIsModalOpen(false);
    message.success(`Đã từ chối ${selectedRowKeys.length} đơn`);
    onDataChange?.(updatedRegistrations);
  };

  const handleShowHistory = (history: HistoryLog[]) => {
    setCurrentHistory(history);
    setIsHistoryOpen(true);
  };

  const handleFormSubmit = (values: any) => {
    if (modalType === 'add') {
      const newRegistration: ClubRegistration = {
        id: Math.random().toString(),
        ...values,
        status: 'Pending',
        history: [],
      };
      const newData = [...registrations, newRegistration];
      setRegistrations(newData);
      onDataChange?.(newData);
      message.success('Thêm đơn đăng ký thành công');
    } else if (modalType === 'edit' && currentRegistration) {
      const updatedData = registrations.map(r =>
        r.id === currentRegistration.id
          ? { ...r, ...values, updatedAt: new Date().toISOString() }
          : r
      );
      setRegistrations(updatedData);
      onDataChange?.(updatedData);
      message.success('Cập nhật đơn đăng ký thành công');
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns: ColumnsType<ClubRegistration> = [
    { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName', sorter: (a, b) => a.fullName.localeCompare(b.fullName) },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender', render: (gender) => gender === 'Nam' ? 'Nam' : gender === 'Nữ' ? 'Nữ' : 'Khác' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address', ellipsis: true },
    { title: 'Sở trường', dataIndex: 'skill', key: 'skill', ellipsis: true },
    { title: 'Câu lạc bộ', dataIndex: 'clubId', key: 'clubId', render: (clubId) => clubs.find(c => c.id === clubId)?.name || 'N/A' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Chờ duyệt', value: 'Pending' },
        { text: 'Đã duyệt', value: 'Approved' },
        { text: 'Từ chối', value: 'Rejected' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Badge
          status={status === 'Approved' ? 'success' : status === 'Rejected' ? 'error' : 'warning'}
          text={
            <Tag color={status === 'Approved' ? 'green' : status === 'Rejected' ? 'red' : 'gold'}>
              {status === 'Approved' ? 'Đã duyệt' : status === 'Rejected' ? 'Từ chối' : 'Chờ duyệt'}
            </Tag>
          }
        />
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 280,
      render: (_: any, record: ClubRegistration) => (
        <Space size="small">
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)} size="small">Xem</Button>
          <Button icon={<HistoryOutlined />} onClick={() => handleShowHistory(record.history)} size="small" />
          {!isMemberMode && record.status === 'Pending' && (
            <>
              <Button icon={<CheckOutlined />} onClick={() => handleApprove(record)} type="primary" size="small">Duyệt</Button>
              <Button icon={<CloseOutlined />} onClick={() => handleReject(record)} danger size="small">Từ chối</Button>
            </>
          )}
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} size="small" />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} danger size="small" />
        </Space>
      ),
    },
  ];

  // Lọc dữ liệu
  const filteredData = registrations.filter(reg => {
    const matchSearch = reg.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
                        reg.email.toLowerCase().includes(searchText.toLowerCase()) ||
                        reg.phone.includes(searchText);
    const matchStatus = filterStatus === 'all' || reg.status === filterStatus;
    const matchClub = !clubId || reg.clubId === clubId;
    const matchMemberMode = !isMemberMode || reg.status === 'Approved';
    return matchSearch && matchStatus && matchClub && matchMemberMode;
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
    getCheckboxProps: (record: ClubRegistration) => ({
      disabled: record.status !== 'Pending' || isMemberMode,
    }),
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <Space wrap>
          <Input.Search
            placeholder="Tìm kiếm theo tên, email, SĐT"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ width: 120 }}
          >
            <Option value="all">Tất cả</Option>
            <Option value="Pending">Chờ duyệt</Option>
            <Option value="Approved">Đã duyệt</Option>
            <Option value="Rejected">Từ chối</Option>
          </Select>
        </Space>
        <Space>
          {!isMemberMode && (
            <>
              <Button
                type="primary"
                disabled={selectedRowKeys.length === 0}
                onClick={handleBulkApprove}
                icon={<CheckOutlined />}
              >
                Duyệt {selectedRowKeys.length} đơn
              </Button>
              <Button
                danger
                disabled={selectedRowKeys.length === 0}
                onClick={() => setIsModalOpen(true)}
                icon={<CloseOutlined />}
              >
                Từ chối {selectedRowKeys.length} đơn
              </Button>
            </>
          )}
          <Button type="primary" onClick={handleAdd} icon={<EyeOutlined />}>
            Thêm đơn đăng ký
          </Button>
        </Space>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `Tổng ${total} đơn` }}
      />

      {/* Modal Thêm/Sửa */}
      <Modal
        title={modalType === 'add' ? 'Thêm đơn đăng ký' : 'Chỉnh sửa đơn đăng ký'}
        visible={isModalOpen && (modalType === 'add' || modalType === 'edit')}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="fullName" label="Họ tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="SĐT" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="Nam">Nam</Radio>
              <Radio value="Nữ">Nữ</Radio>
              <Radio value="Other">Khác</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Input />
          </Form.Item>
          <Form.Item name="skill" label="Sở trường">
            <Input />
          </Form.Item>
          <Form.Item name="clubId" label="Câu lạc bộ" rules={[{ required: true }]}>
            <Select>
              {clubs.map(club => (
                <Option key={club.id} value={club.id}>{club.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="reason" label="Lý do đăng ký">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Từ chối hàng loạt */}
      <Modal
        title="Xác nhận từ chối hàng loạt"
        visible={isModalOpen && modalType === undefined}
        onOk={handleBulkReject}
        onCancel={() => {
          setIsModalOpen(false);
          setRejectNote('');
        }}
        okText="Xác nhận từ chối"
        okButtonProps={{ danger: true }}
      >
        <Text strong>Lý do từ chối (Bắt buộc):</Text>
        <TextArea
          style={{ marginTop: 10 }}
          rows={4}
          value={rejectNote}
          onChange={(e) => setRejectNote(e.target.value)}
          placeholder="Nhập lý do..."
        />
      </Modal>

      {/* Modal Xem lịch sử */}
      <Modal
        title="Lịch sử thao tác"
        visible={isHistoryOpen}
        footer={null}
        onCancel={() => setIsHistoryOpen(false)}
        width={500}
      >
        {currentHistory.length === 0 ? (
          <Text type="secondary">Chưa có lịch sử thao tác</Text>
        ) : (
          currentHistory.map((item, index) => (
            <div key={index} style={{ marginBottom: 15, paddingBottom: 10, borderBottom: '1px solid #f0f0f0' }}>
              <Text type="secondary">{new Date(item.timestamp).toLocaleString('vi-VN')}</Text><br />
              <Text strong>{item.admin}</Text> đã{' '}
              <Tag color={item.action === 'Approved' ? 'green' : 'red'}>
                {item.action === 'Approved' ? 'duyệt' : 'từ chối'}
              </Tag>
              {item.reason && <Paragraph style={{ marginTop: 5 }}>Lý do: {item.reason}</Paragraph>}
            </div>
          ))
        )}
      </Modal>

      {/* Modal Xem chi tiết */}
      <Modal
        title="Chi tiết đơn đăng ký"
        visible={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailOpen(false)}>Đóng</Button>
        ]}
        width={600}
      >
        {currentRegistration && (
          <div>
            <p><strong>Họ tên:</strong> {currentRegistration.fullName}</p>
            <p><strong>Email:</strong> {currentRegistration.email}</p>
            <p><strong>SĐT:</strong> {currentRegistration.phone}</p>
            <p><strong>Giới tính:</strong> {currentRegistration.gender === 'Nam' ? 'Nam' : currentRegistration.gender === 'Nữ' ? 'Nữ' : 'Khác'}</p>
            <p><strong>Sở trường:</strong> {currentRegistration.skill}</p>
            <p><strong>Lý do đăng ký:</strong> {currentRegistration.reason}</p>
            <p><strong>Trạng thái:</strong> <Tag color={currentRegistration.status === 'Approved' ? 'green' : currentRegistration.status === 'Rejected' ? 'red' : 'gold'}>
              {currentRegistration.status === 'Approved' ? 'Đã duyệt' : currentRegistration.status === 'Rejected' ? 'Từ chối' : 'Chờ duyệt'}
            </Tag></p>
            {currentRegistration.rejectReason && (
              <p><strong>Lý do từ chối:</strong> {currentRegistration.rejectReason}</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RegistrationTable;