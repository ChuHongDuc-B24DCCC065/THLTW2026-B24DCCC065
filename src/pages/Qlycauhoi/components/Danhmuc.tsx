import { useState, Dispatch, SetStateAction } from 'react';
import { KhoiKienThuc, MonHoc } from '../model';
import { Card, Input, Button, Table, Space } from 'antd';

interface DanhMucProps {
  monHocs: MonHoc[];
  setMonHocs: Dispatch<SetStateAction<MonHoc[]>>;
  khoiKienThucs: KhoiKienThuc[];
  setKhoiKienThucs: Dispatch<SetStateAction<KhoiKienThuc[]>>;
}

export function DanhMuc({ monHocs, setMonHocs, khoiKienThucs, setKhoiKienThucs }: DanhMucProps) {

  const [newKhoiKT, setNewKhoiKT] = useState({ ten: '' });
  const [newMonHoc, setNewMonHoc] = useState({ maMon: '', tenMon: '', soTinChi: 0 });

  const [editingKTId, setEditingKTId] = useState<string | null>(null);
  const [editingMHId, setEditingMHId] = useState<string | null>(null);

  const luuKhoiKT = () => {
    if (editingKTId) {
      setKhoiKienThucs(khoiKienThucs.map(kt =>
        kt.id === editingKTId ? { ...kt, ...newKhoiKT } : kt
      ));
      setEditingKTId(null);
    } else {
      const khoiKT: KhoiKienThuc = { id: Date.now().toString(), ...newKhoiKT };
      setKhoiKienThucs([...khoiKienThucs, khoiKT]);
    }

    setNewKhoiKT({ ten: '' });
  };

  const xoaKhoiKT = (id: string) => {
    setKhoiKienThucs(khoiKienThucs.filter(kt => kt.id !== id));
  };

  const suaKhoiKT = (kt: KhoiKienThuc) => {
    setEditingKTId(kt.id);
    setNewKhoiKT({ ten: kt.ten });
  };

  const luuMonHoc = () => {
    if (editingMHId) {
      setMonHocs(monHocs.map(mh =>
        mh.id === editingMHId ? { ...mh, ...newMonHoc } : mh
      ));
      setEditingMHId(null);
    } else {
      const monHoc: MonHoc = { id: Date.now().toString(), ...newMonHoc };
      setMonHocs([...monHocs, monHoc]);
    }

    setNewMonHoc({ maMon: '', tenMon: '', soTinChi: 0 });
  };

  const xoaMonHoc = (id: string) => {
    setMonHocs(monHocs.filter(mh => mh.id !== id));
  };

  const suaMonHoc = (mh: MonHoc) => {
    setEditingMHId(mh.id);
    setNewMonHoc({ maMon: mh.maMon, tenMon: mh.tenMon, soTinChi: mh.soTinChi });
  };

  const khoiKTColumns = [
    { title: 'Tên khối kiến thức', dataIndex: 'ten' },
    {
      title: 'Hành động',
      render: (_: any, record: KhoiKienThuc) => (
        <Space>
          <Button size="small" onClick={() => suaKhoiKT(record)}>Sửa</Button>
          <Button danger size="small" onClick={() => xoaKhoiKT(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  const monHocColumns = [
    { title: 'Mã môn', dataIndex: 'maMon' },
    { title: 'Tên môn', dataIndex: 'tenMon' },
    { title: 'Số tín chỉ', dataIndex: 'soTinChi' },
    {
      title: 'Hành động',
      render: (_: any, record: MonHoc) => (
        <Space>
          <Button size="small" onClick={() => suaMonHoc(record)}>Sửa</Button>
          <Button danger size="small" onClick={() => xoaMonHoc(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>

      <Card title="Quản lý khối kiến thức" style={{ marginBottom: 20 }}>

        <Space style={{ marginBottom: 10 }}>
          <Input
            placeholder="Tên khối KT"
            value={newKhoiKT.ten}
            onChange={(e) => setNewKhoiKT({ ...newKhoiKT, ten: e.target.value })}
          />

          <Button type="primary" onClick={luuKhoiKT}>
            {editingKTId ? 'Cập nhật' : 'Thêm'}
          </Button>

          {editingKTId && (
            <Button onClick={() => {
              setEditingKTId(null);
              setNewKhoiKT({ ten: '' });
            }}>
              Hủy
            </Button>
          )}
        </Space>

        <Table
          rowKey="id"
          dataSource={khoiKienThucs}
          columns={khoiKTColumns}
          pagination={false}
        />

      </Card>

      <Card title="Quản lý môn học">

        <Space style={{ marginBottom: 10 }}>
          <Input
            placeholder="Mã môn"
            value={newMonHoc.maMon}
            onChange={(e) => setNewMonHoc({ ...newMonHoc, maMon: e.target.value })}
          />

          <Input
            placeholder="Tên môn"
            value={newMonHoc.tenMon}
            onChange={(e) => setNewMonHoc({ ...newMonHoc, tenMon: e.target.value })}
          />

          <Input
            type="number"
            placeholder="Tín chỉ"
            style={{ width: 80 }}
            value={newMonHoc.soTinChi}
            onChange={(e) => setNewMonHoc({
              ...newMonHoc,
              soTinChi: parseInt(e.target.value) || 0
            })}
          />

          <Button type="primary" onClick={luuMonHoc}>
            {editingMHId ? 'Cập nhật' : 'Thêm'}
          </Button>

        </Space>

        <Table
          rowKey="id"
          dataSource={monHocs}
          columns={monHocColumns}
          pagination={false}
        />

      </Card>

    </div>
  );
}
