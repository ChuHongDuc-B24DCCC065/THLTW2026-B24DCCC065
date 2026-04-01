import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Space, Tag, message, Typography, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, HistoryOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { ClubRegistration, Club, HistoryLog } from '../clb';
import dayjs from 'dayjs';

const { Text } = Typography;

interface Props {
  data?: ClubRegistration[]; // Dữ liệu từ component cha nếu có
  clubs: Club[];
  isMemberMode?: boolean; // Chế độ Quản lý thành viên
  clubId?: string; // Filter theo CLB cụ thể nếu cần
  onDataChange?: (newData: ClubRegistration[]) => void;
  onSelectionChange?: (selected: ClubRegistration[]) => void; // Dùng cho MemberManagement chuyển CLB
}

const RegistrationTable: React.FC<Props> = ({ 
  data: propsData, 
  clubs, 
  isMemberMode, 
  clubId, 
  onDataChange,
  onSelectionChange 
}) => {
  const [dataSource, setDataSource] = useState<ClubRegistration[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ClubRegistration | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Khởi tạo dữ liệu mẫu nếu không có propsData
  useEffect(() => {
    if (propsData) {
      setDataSource(propsData);
    } else {
      // Logic fetch API ở đây
    }
  }, [propsData]);

  // Lọc dữ liệu hiển thị
  const displayData = dataSource.filter(item => {
    const matchStatus = isMemberMode ? item.status === 'Approved' : true;
    const matchClub = clubId ? item.clubId === clubId : true;
    return matchStatus && matchClub;
  });

  // Xử lý Duyệt đơn (Đơn lẻ hoặc Hàng loạt)
  const handleApprove = (ids: React.Key[]) => {
    const timestamp = dayjs().format('HH:mm DD/MM/YYYY');
    const newData = dataSource.map(item => {
      if (ids.includes(item.id)) {
        const newLog: HistoryLog = {
          action: 'Approved',
          admin: 'Admin',
          timestamp,
        };
        return { ...item, status: 'Approved' as const, history: [...(item.history || []), newLog] };
      }
      return item;
    });
    setDataSource(newData);
    onDataChange?.(newData);
    setSelectedRowKeys([]);
    message.success(`Đã duyệt ${ids.length} đơn đăng ký`);
  };

  // Xử lý Từ chối (Hàng loạt)
  const handleRejectBulk = (): void => {
    if (!rejectReason) {
      message.error("Bắt buộc nhập lý do từ chối!");
      return;
    }
    
    const timestamp = dayjs().format('HH:mm DD/MM/YYYY');
    const newData = dataSource.map(item => {
      if (selectedRowKeys.includes(item.id)) {
        const newLog: HistoryLog = {
          action: 'Rejected',
          admin: 'Admin',
          timestamp,
          reason: rejectReason
        };
        return { ...item, status: 'Rejected' as const, rejectReason, history: [...(item.history || []), newLog] };
      }
      return item;
    });
    
    setDataSource(newData);
    onDataChange?.(newData);
    setIsRejectModalOpen(false);
    setRejectReason('');
    setSelectedRowKeys([]);
    message.warning(`Đã từ chối ${selectedRowKeys.length} đơn`);
  };

  const columns: ColumnsType<ClubRegistration> = [
    { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName', fixed: 'left', width: 150 },
    { title: 'Email', dataIndex: 'email', key: 'email', ellipsis: true },
    { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender', width: 80 },
    { 
      title: 'Câu lạc bộ', 
      dataIndex: 'clubId', 
      render: (id) => clubs.find(c => c.id === id)?.name || 'N/A' 
    },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      render: (status) => {
        let color = status === 'Approved' ? 'green' : status === 'Rejected' ? 'red' : 'gold';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết"><Button size="small" icon={<EyeOutlined />} onClick={() => { setCurrentRecord(record); setIsDetailModalOpen(true); }} /></Tooltip>
          
          {!isMemberMode && record.status === 'Pending' && (
            <>
              <Tooltip title="Duyệt"><Button size="small" type="primary" ghost icon={<CheckCircleOutlined />} onClick={() => handleApprove([record.id])} /></Tooltip>
              <Tooltip title="Từ chối"><Button size="small" danger ghost icon={<CloseCircleOutlined />} onClick={() => { setSelectedRowKeys([record.id]); setIsRejectModalOpen(true); }} /></Tooltip>
            </>
          )}
          
          <Tooltip title="Lịch sử thao tác"><Button size="small" icon={<HistoryOutlined />} onClick={() => { setCurrentRecord(record); setIsHistoryModalOpen(true); }} /></Tooltip>
          <Tooltip title="Xóa"><Button size="small" danger icon={<DeleteOutlined />} /></Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div>
      {!isMemberMode && (
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button 
              type="primary" 
              icon={<CheckCircleOutlined />} 
              disabled={selectedRowKeys.length === 0}
              onClick={() => handleApprove(selectedRowKeys)}
            >
              Duyệt {selectedRowKeys.length} đơn đã chọn
            </Button>
            <Button 
              danger 
              icon={<CloseCircleOutlined />} 
              disabled={selectedRowKeys.length === 0}
              onClick={() => setIsRejectModalOpen(true)}
            >
              Từ chối {selectedRowKeys.length} đơn
            </Button>
          </Space>
        </div>
      )}

      <Table 
        rowSelection={{
          selectedRowKeys,
          onChange: (keys, selectedRows) => {
            setSelectedRowKeys(keys);
            onSelectionChange?.(selectedRows);
          }
        }}
        columns={columns} 
        dataSource={displayData}
        rowKey="id"
        scroll={{ x: 1300 }}
      />

      {/* Modal Từ chối - Bắt buộc nhập lý do */}
      <Modal 
        title="Xác nhận từ chối đơn đăng ký" 
        visible={isRejectModalOpen} 
        onOk={handleRejectBulk} 
        onCancel={() => { setIsRejectModalOpen(false); setRejectReason(''); }}
        okText="Xác nhận từ chối"
        okButtonProps={{ danger: true }}
      >
        <div style={{ marginBottom: 10 }}>Bạn đang từ chối {selectedRowKeys.length} đơn đăng ký.</div>
        <Text strong>Lý do từ chối (Bắt buộc):</Text>
        <Input.TextArea 
          rows={4} 
          style={{ marginTop: 8 }}
          value={rejectReason}
          onChange={e => setRejectReason(e.target.value)}
          placeholder="Nhập lý do từ chối để gửi cho ứng viên..."
        />
      </Modal>

      {/* Modal Lịch sử thao tác */}
      <Modal 
        title="Lịch sử thao tác hệ thống" 
        visible={isHistoryModalOpen} 
        footer={null} 
        onCancel={() => setIsHistoryModalOpen(false)}
      >
        {currentRecord?.history && currentRecord.history.length > 0 ? (
          currentRecord.history.map((log, index) => (
            <div key={index} style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>{log.admin}</Text>
                <Text type="secondary">{log.timestamp}</Text>
              </div>
              <div>Trạng thái: <Tag color={log.action === 'Approved' ? 'green' : 'red'}>{log.action}</Tag></div>
              {log.reason && <div style={{ marginTop: 4 }}>Lý do: <Text italic>{log.reason}</Text></div>}
            </div>
          ))
        ) : <div style={{ textAlign: 'center', padding: 20 }}>Chưa có lịch sử thao tác</div>}
      </Modal>

      {/* Modal Chi tiết đơn đăng ký */}
      <Modal 
        title="Chi tiết đơn đăng ký" 
        visible={isDetailModalOpen} 
        onCancel={() => setIsDetailModalOpen(false)}
        footer={[<Button key="close" onClick={() => setIsDetailModalOpen(false)}>Đóng</Button>]}
      >
        {currentRecord && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <p><strong>Họ tên:</strong> {currentRecord.fullName}</p>
            <p><strong>Email:</strong> {currentRecord.email}</p>
            <p><strong>Địa chỉ:</strong> {currentRecord.address}</p>
            <p><strong>Sở trường:</strong> {currentRecord.skill}</p>
            <p><strong>Lý do đăng ký:</strong> {currentRecord.reason}</p>
            {currentRecord.rejectReason && (
              <p style={{ color: 'red' }}><strong>Ghi chú từ chối:</strong> {currentRecord.rejectReason}</p>
            )}
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default RegistrationTable;