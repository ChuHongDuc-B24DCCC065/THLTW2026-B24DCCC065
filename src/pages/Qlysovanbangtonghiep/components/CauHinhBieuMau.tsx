import { useState, Dispatch, SetStateAction } from 'react';
import { TruongCauHinh } from '../model';
import { Card, Input, Select, Button, Table, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Props {
  dsTruong: TruongCauHinh[];
  setDsTruong: Dispatch<SetStateAction<TruongCauHinh[]>>;
}

export function CauHinhBieuMau({ dsTruong, setDsTruong }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTruong, setNewTruong] = useState({
    tenTruong: '',
    kieuDuLieu: 'String' as 'String' | 'Number' | 'Date'
  });

  const luuTruong = () => {
    if (!newTruong.tenTruong.trim()) {
      alert("Vui lòng nhập tên trường!");
      return;
    }

    if (editingId) {
      setDsTruong(dsTruong.map(t => 
        t.id === editingId 
          ? { ...t, tenTruong: newTruong.tenTruong, kieuDuLieu: newTruong.kieuDuLieu }
          : t
      ));
      setEditingId(null);
    } else {
      const truong: TruongCauHinh = {
        id: Date.now(),
        tenTruong: newTruong.tenTruong,
        kieuDuLieu: newTruong.kieuDuLieu
      };
      setDsTruong([...dsTruong, truong]);
    }

    setNewTruong({ tenTruong: '', kieuDuLieu: 'String' });
  };

  const xoaTruong = (id: number) => {
    setDsTruong(dsTruong.filter(t => t.id !== id));
  };

  const suaTruong = (t: TruongCauHinh) => {
    setEditingId(t.id);
    setNewTruong({ tenTruong: t.tenTruong, kieuDuLieu: t.kieuDuLieu });
  };

  const columns = [
    { title: 'Tên trường', dataIndex: 'tenTruong', key: 'tenTruong' },
    { title: 'Kiểu dữ liệu', dataIndex: 'kieuDuLieu', key: 'kieuDuLieu' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: TruongCauHinh) => (
        <Space>
          <Button 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => suaTruong(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => xoaTruong(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Card 
        title={editingId ? "Cập nhật trường thông tin" : "Thêm trường thông tin"}
        style={{ marginBottom: 20 }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Tên trường (VD: Dân tộc, GPA...)"
            value={newTruong.tenTruong}
            onChange={(e) => setNewTruong({ ...newTruong, tenTruong: e.target.value })}
          />
          
          <Select
            value={newTruong.kieuDuLieu}
            onChange={(value) => setNewTruong({ ...newTruong, kieuDuLieu: value })}
            style={{ width: "100%" }}
          >
            <Select.Option value="String">String</Select.Option>
            <Select.Option value="Number">Number</Select.Option>
            <Select.Option value="Date">Date</Select.Option>
          </Select>

          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={luuTruong}>
              {editingId ? "Cập nhật" : "Thêm"}
            </Button>
            {editingId && (
              <Button onClick={() => {
                setEditingId(null);
                setNewTruong({ tenTruong: '', kieuDuLieu: 'String' });
              }}>
                Hủy
              </Button>
            )}
          </Space>
        </Space>
      </Card>

      <Card title="Danh sách trường thông tin">
        <Table
          rowKey="id"
          dataSource={dsTruong}
          columns={columns}
          pagination={false}
        />
      </Card>
    </div>
  );
}