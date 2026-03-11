import { useState, Dispatch, SetStateAction } from 'react';
import { CauHoi as CauHoiType, MonHoc, KhoiKienThuc } from '../model';
import { Card, Input, Select, Button, Table, Space } from 'antd';

const { TextArea } = Input;

interface Props {
  monHocs: MonHoc[];
  khoiKienThucs: KhoiKienThuc[];
  cauHois: CauHoiType[];
  setCauHois: Dispatch<SetStateAction<CauHoiType[]>>;
}

export function CauHoi({ monHocs, khoiKienThucs, cauHois, setCauHois }: Props) {

  const [filter, setFilter] = useState({
    monHocId: '',
    mucDo: '',
    khoiKienThucId: ''
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const [newCauHoi, setNewCauHoi] = useState({
    maCauHoi: '',
    monHocId: '',
    noiDung: '',
    mucDo: 'De',
    khoiKienThucId: ''
  });

  const luuCauHoi = () => {

    if (!newCauHoi.monHocId || !newCauHoi.khoiKienThucId || !newCauHoi.noiDung) {
      alert("Vui lòng nhập đủ thông tin");
      return;
    }

    if (editingId) {

      setCauHois(cauHois.map(ch =>
        ch.id === editingId
          ? { ...ch, ...newCauHoi, mucDo: newCauHoi.mucDo as any }
          : ch
      ));

      setEditingId(null);

    } else {

      const cauHoi: CauHoiType = {
        id: Date.now().toString(),
        ...newCauHoi,
        mucDo: newCauHoi.mucDo as any,
        ngayTao: new Date()
      };

      setCauHois([...cauHois, cauHoi]);
    }

    setNewCauHoi({
      maCauHoi: '',
      monHocId: '',
      noiDung: '',
      mucDo: 'De',
      khoiKienThucId: ''
    });
  };

  const xoaCauHoi = (id: string) => {
    setCauHois(cauHois.filter(ch => ch.id !== id));
  };

  const suaCauHoi = (ch: CauHoiType) => {
    setEditingId(ch.id);
    setNewCauHoi({
      maCauHoi: ch.maCauHoi,
      monHocId: ch.monHocId,
      noiDung: ch.noiDung,
      mucDo: ch.mucDo,
      khoiKienThucId: ch.khoiKienThucId
    });
  };

  const filteredCauHois = cauHois.filter(ch => {
    if (filter.monHocId && ch.monHocId !== filter.monHocId) return false;
    if (filter.mucDo && ch.mucDo !== filter.mucDo) return false;
    if (filter.khoiKienThucId && ch.khoiKienThucId !== filter.khoiKienThucId) return false;
    return true;
  });

  const columns = [
    { title: 'Mã câu hỏi', dataIndex: 'maCauHoi' },
    { title: 'Nội dung', dataIndex: 'noiDung' },
    { title: 'Mức độ', dataIndex: 'mucDo' },
    {
      title: 'Hành động',
      render: (_: any, record: CauHoiType) => (
        <Space>
          <Button size="small" onClick={() => suaCauHoi(record)}>Sửa</Button>
          <Button danger size="small" onClick={() => xoaCauHoi(record.id)}>Xóa</Button>
        </Space>
      )
    }
  ];

  return (
    <div>

      <Card
        title={editingId ? "Cập nhật câu hỏi" : "Thêm câu hỏi"}
        style={{ marginBottom: 20 }}
      >

        <Space direction="vertical" style={{ width: "100%" }}>

          <Input
            placeholder="Mã câu hỏi"
            value={newCauHoi.maCauHoi}
            onChange={(e) => setNewCauHoi({ ...newCauHoi, maCauHoi: e.target.value })}
          />

          <Select
            placeholder="Chọn môn học"
            value={newCauHoi.monHocId || undefined}
            onChange={(value) => setNewCauHoi({ ...newCauHoi, monHocId: value })}
          >
            {monHocs.map(mh => (
              <Select.Option key={mh.id} value={mh.id}>
                {mh.tenMon}
              </Select.Option>
            ))}
          </Select>

          <TextArea
            rows={3}
            placeholder="Nội dung câu hỏi"
            value={newCauHoi.noiDung}
            onChange={(e) => setNewCauHoi({ ...newCauHoi, noiDung: e.target.value })}
          />

          <Select
            value={newCauHoi.mucDo}
            onChange={(value) => setNewCauHoi({ ...newCauHoi, mucDo: value })}
          >
            <Select.Option value="De">Dễ</Select.Option>
            <Select.Option value="TrungBinh">Trung bình</Select.Option>
            <Select.Option value="Kho">Khó</Select.Option>
            <Select.Option value="RatKho">Rất khó</Select.Option>
          </Select>

          <Select
            placeholder="Khối kiến thức"
            value={newCauHoi.khoiKienThucId || undefined}
            onChange={(value) => setNewCauHoi({ ...newCauHoi, khoiKienThucId: value })}
          >
            {khoiKienThucs.map(kt => (
              <Select.Option key={kt.id} value={kt.id}>
                {kt.ten}
              </Select.Option>
            ))}
          </Select>

          <Space>
            <Button type="primary" onClick={luuCauHoi}>
              {editingId ? "Cập nhật" : "Thêm"}
            </Button>

            {editingId && (
              <Button onClick={() => {
                setEditingId(null);
                setNewCauHoi({
                  maCauHoi: '',
                  monHocId: '',
                  noiDung: '',
                  mucDo: 'De',
                  khoiKienThucId: ''
                });
              }}>
                Hủy
              </Button>
            )}
          </Space>

        </Space>

      </Card>

      <Card title="Tìm kiếm câu hỏi" style={{ marginBottom: 20 }}>

        <Space>

          <Select
            placeholder="Môn học"
            style={{ width: 180 }}
            onChange={(value) => setFilter({ ...filter, monHocId: value })}
            allowClear
          >
            {monHocs.map(mh => (
              <Select.Option key={mh.id} value={mh.id}>
                {mh.tenMon}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Mức độ"
            style={{ width: 150 }}
            onChange={(value) => setFilter({ ...filter, mucDo: value })}
            allowClear
          >
            <Select.Option value="De">Dễ</Select.Option>
            <Select.Option value="TrungBinh">Trung bình</Select.Option>
            <Select.Option value="Kho">Khó</Select.Option>
            <Select.Option value="RatKho">Rất khó</Select.Option>
          </Select>

          <Select
            placeholder="Khối kiến thức"
            style={{ width: 200 }}
            onChange={(value) => setFilter({ ...filter, khoiKienThucId: value })}
            allowClear
          >
            {khoiKienThucs.map(kt => (
              <Select.Option key={kt.id} value={kt.id}>
                {kt.ten}
              </Select.Option>
            ))}
          </Select>

        </Space>

      </Card>

      <Card title="Danh sách câu hỏi">

        <Table
          rowKey="id"
          dataSource={filteredCauHois}
          columns={columns}
        />

      </Card>

    </div>
  );
}
