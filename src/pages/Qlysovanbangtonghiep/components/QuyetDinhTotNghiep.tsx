import { useState, Dispatch, SetStateAction } from 'react';
import { QuyetDinh, SoVanBang } from '../model';
import { Card, Input, Select, Button, Table, Space, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

interface Props {
  dsQD: QuyetDinh[];
  setDsQD: Dispatch<SetStateAction<QuyetDinh[]>>;
  dsSo: SoVanBang[];
}

export function QuyetDinhTotNghiep({ dsQD, setDsQD, dsSo }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newQD, setNewQD] = useState({
    soQD: '',
    ngayBanHanh: '',
    trichYeu: '',
    soVanBangId: 0
  });

  const luuQD = () => {
    if (!newQD.soQD || !newQD.ngayBanHanh || !newQD.trichYeu || !newQD.soVanBangId) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const soVanBang = dsSo.find(s => s.id === newQD.soVanBangId);
    if (!soVanBang) {
      alert("Sổ văn bằng không tồn tại!");
      return;
    }

    if (editingId) {
      setDsQD(dsQD.map(q => 
        q.id === editingId 
          ? { ...q, ...newQD }
          : q
      ));
      setEditingId(null);
    } else {
      const qd: QuyetDinh = {
        id: Date.now(),
        ...newQD,
        luotTraCuu: 0
      };
      setDsQD([...dsQD, qd]);
    }

    setNewQD({ soQD: '', ngayBanHanh: '', trichYeu: '', soVanBangId: 0 });
  };

  const suaQD = (qd: QuyetDinh) => {
    setEditingId(qd.id);
    setNewQD({
      soQD: qd.soQD,
      ngayBanHanh: qd.ngayBanHanh,
      trichYeu: qd.trichYeu,
      soVanBangId: qd.soVanBangId
    });
  };

  const xoaQD = (id: number) => {
    setDsQD(dsQD.filter(q => q.id !== id));
  };

  const columns = [
    { title: 'Số QĐ', dataIndex: 'soQD', key: 'soQD' },
    { title: 'Ngày ban hành', dataIndex: 'ngayBanHanh', key: 'ngayBanHanh' },
    { title: 'Trích yếu', dataIndex: 'trichYeu', key: 'trichYeu' },
    {
      title: 'Sổ văn bằng',
      key: 'soVanBang',
      render: (_: any, record: QuyetDinh) => {
        const so = dsSo.find(s => s.id === record.soVanBangId);
        return so ? `Sổ năm ${so.nam}` : 'N/A';
      }
    },
    { title: 'Lượt tra cứu', dataIndex: 'luotTraCuu', key: 'luotTraCuu', align: 'center' as const },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: QuyetDinh) => (
        <Space>
          <Button size="small" onClick={() => suaQD(record)}>Sửa</Button>
          <Button danger size="small" onClick={() => xoaQD(record.id)}>Xóa</Button>
        </Space>
      )
    }
  ];

  return (
    <Card title="Quản lý quyết định tốt nghiệp">
      <Card 
        type="inner" 
        title={editingId ? "Cập nhật quyết định" : "Thêm quyết định"}
        style={{ marginBottom: 20 }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Số quyết định"
            value={newQD.soQD}
            onChange={(e) => setNewQD({ ...newQD, soQD: e.target.value })}
          />
          
          <DatePicker
            placeholder="Ngày ban hành"
            style={{ width: "100%" }}
            onChange={(date, dateString) => setNewQD({ ...newQD, ngayBanHanh: dateString })}
            value={newQD.ngayBanHanh ? moment(newQD.ngayBanHanh) : null}
          />
          
          <TextArea
            rows={3}
            placeholder="Trích yếu"
            value={newQD.trichYeu}
            onChange={(e) => setNewQD({ ...newQD, trichYeu: e.target.value })}
          />
          
          <Select
            placeholder="Chọn sổ văn bằng"
            value={newQD.soVanBangId || undefined}
            onChange={(value) => setNewQD({ ...newQD, soVanBangId: value })}
          >
            {dsSo.map(s => (
              <Select.Option key={s.id} value={s.id}>
                Sổ năm {s.nam}
              </Select.Option>
            ))}
          </Select>

          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={luuQD}>
              {editingId ? "Cập nhật" : "Thêm"}
            </Button>
            {editingId && (
              <Button onClick={() => {
                setEditingId(null);
                setNewQD({ soQD: '', ngayBanHanh: '', trichYeu: '', soVanBangId: 0 });
              }}>
                Hủy
              </Button>
            )}
          </Space>
        </Space>
      </Card>

      <Card title="Danh sách quyết định">
        <Table
          rowKey="id"
          dataSource={dsQD}
          columns={columns}
        />
      </Card>
    </Card>
  );
}