import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space, Tag, Select, Typography, message, Tooltip } from 'antd';
import { SwapOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { ClubRegistration, Club } from '../clb';

const { Text } = Typography;
const { Option } = Select;

interface MemberTableProps {
  clubId: string;
  clubName: string;
  clubs: Club[];
  registrations: ClubRegistration[]; // Danh sách toàn bộ registration
  onClose: () => void;
  onDataChange: (newData: ClubRegistration[]) => void; // Callback cập nhật lại state tổng
}

const MemberTable: React.FC<MemberTableProps> = ({
  clubId,
  clubName,
  clubs,
  registrations,
  onClose,
  onDataChange
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [targetClubId, setTargetClubId] = useState<string>('');

  // Chỉ hiển thị những người đã Approved và thuộc CLB này
  const officialMembers = registrations.filter(m => m.status === 'Approved' && m.clubId === clubId);

  // Logic Thay đổi CLB hàng loạt
  const handleTransfer = () => {
    if (!targetClubId) {
      return message.error('Vui lòng chọn câu lạc bộ mới!');
    }

    const targetClubName = clubs.find(c => c.id === targetClubId)?.name;

    const newData = registrations.map(member => {
      if (selectedRowKeys.includes(member.id)) {
        return {
          ...member,
          clubId: targetClubId,
          // Lưu lại vết đổi CLB vào history nếu cần
          history: [...(member.history || []), {
            action: 'Approved', // Vẫn giữ status approved nhưng đổi CLB
            admin: 'Admin',
            timestamp: new Date().toLocaleString(),
            reason: `Chuyển từ ${clubName} sang ${targetClubName}`
          }]
        };
      }
      return member;
    });

    onDataChange(newData);
    message.success(`Đã chuyển ${selectedRowKeys.length} thành viên sang ${targetClubName}`);
    setIsTransferModalOpen(false);
    setSelectedRowKeys([]);
    setTargetClubId('');
  };

  const columns: ColumnsType<ClubRegistration> = [
    { 
        title: 'Họ tên', 
        dataIndex: 'fullName', 
        key: 'fullName', 
        fixed: 'left',
        sorter: (a, b) => a.fullName.localeCompare(b.fullName) 
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { 
        title: 'CLB Hiện tại', 
        dataIndex: 'clubId', 
        render: (id) => <Tag color="blue">{clubs.find(c => c.id === id)?.name || 'N/A'}</Tag>
    },
    { title: 'Sở trường', dataIndex: 'skill', key: 'skill' },
    {
      title: 'Thao tác',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Tooltip title="Xem thông tin chi tiết">
          <Button shape="circle" icon={<EyeOutlined />} />
        </Tooltip>
      )
    }
  ];

  return (
    <Modal
      title={`Quản lý thành viên - ${clubName}`}
      visible={true}
      onCancel={onClose}
      footer={null}
      width="90%"
      style={{ top: 20 }}
    >
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Button
            type="primary"
            icon={<SwapOutlined />}
            disabled={selectedRowKeys.length === 0}
            onClick={() => setIsTransferModalOpen(true)}
          >
            Thay đổi CLB cho {selectedRowKeys.length} thành viên
          </Button>
          {selectedRowKeys.length > 0 && (
            <Text type="secondary">Đang chọn {selectedRowKeys.length} người</Text>
          )}
        </Space>
      </div>

      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys)
        }}
        columns={columns}
        dataSource={officialMembers}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
      />

      {/* Modal Thay đổi CLB */}
      <Modal
        title="Chuyển Câu lạc bộ hàng loạt"
        visible={isTransferModalOpen}
        onOk={handleTransfer}
        onCancel={() => setIsTransferModalOpen(false)}
        okText="Xác nhận chuyển"
        cancelText="Hủy bỏ"
      >
        <div style={{ marginBottom: 15 }}>
            <Text>Bạn đang thực hiện thay đổi đơn vị sinh hoạt cho <b>{selectedRowKeys.length}</b> thành viên.</Text>
        </div>

        <Text strong>Chọn Câu lạc bộ đích:</Text>
        <Select
          style={{ width: '100%', marginTop: 10 }}
          placeholder="-- Chọn câu lạc bộ --"
          onChange={(val) => setTargetClubId(val)}
          value={targetClubId || undefined}
        >
          {clubs.filter(club => club.id !== clubId).map(club => (
            <Option key={club.id} value={club.id}>{club.name}</Option>
          ))}
        </Select>

        <div style={{ marginTop: 15 }}>
            <Text type="danger" italic>* Lưu ý: Hành động này sẽ thay đổi vĩnh viễn CLB quản lý của thành viên.</Text>
        </div>
      </Modal>
    </Modal>
  );
};

export default MemberTable;