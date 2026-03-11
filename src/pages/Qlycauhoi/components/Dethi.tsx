import { useState } from 'react';
import { CauHoi, MonHoc, KhoiKienThuc, CauTrucDeThi, YeuCauCauHoi, DeThi as DeThiModel } from '../model';
import { Card, Input, Select, Button, Table, Space, Alert } from 'antd';

interface Props {
  monHocs: MonHoc[];
  khoiKienThucs: KhoiKienThuc[];
  cauHois: CauHoi[];
}

export function QuanLyDeThi({ monHocs, khoiKienThucs, cauHois }: Props) {

  const [cauTrucDeThis, setCauTrucDeThis] = useState<CauTrucDeThi[]>([]);
  const [deThis, setDeThis] = useState<DeThiModel[]>([]);
  const [error, setError] = useState('');

  const [newCauTruc, setNewCauTruc] = useState({
    tenCauTruc: '',
    monHocId: '',
    yeuCau: [] as YeuCauCauHoi[]
  });

  const [ycTemp, setYcTemp] = useState({
    khoiKienThucId: '',
    mucDo: 'De',
    soLuong: 1
  });

  const themYeuCau = () => {

    if (!ycTemp.khoiKienThucId || ycTemp.soLuong <= 0) {
      alert("Nhập đủ thông tin yêu cầu");
      return;
    }

    const yc: YeuCauCauHoi = {
      khoiKienThucId: ycTemp.khoiKienThucId,
      mucDo: ycTemp.mucDo as any,
      soLuong: ycTemp.soLuong
    };

    setNewCauTruc({
      ...newCauTruc,
      yeuCau: [...newCauTruc.yeuCau, yc]
    });
  };

  const xoaYeuCau = (index: number) => {
    const list = [...newCauTruc.yeuCau];
    list.splice(index, 1);
    setNewCauTruc({ ...newCauTruc, yeuCau: list });
  };

  const luuCauTruc = () => {

    if (!newCauTruc.tenCauTruc || !newCauTruc.monHocId || newCauTruc.yeuCau.length === 0) {
      alert("Nhập đủ thông tin cấu trúc đề");
      return;
    }

    const cauTruc: CauTrucDeThi = {
      id: Date.now().toString(),
      ...newCauTruc
    };

    setCauTrucDeThis([...cauTrucDeThis, cauTruc]);

    setNewCauTruc({
      tenCauTruc: '',
      monHocId: '',
      yeuCau: []
    });
  };

  const taoDeThi = (cauTruc: CauTrucDeThi) => {

    setError('');

    const cauHoiMonHoc = cauHois.filter(ch => ch.monHocId === cauTruc.monHocId);
    const selected: string[] = [];

    for (const yc of cauTruc.yeuCau) {

      const phuHop = cauHoiMonHoc.filter(ch =>
        ch.mucDo === yc.mucDo &&
        ch.khoiKienThucId === yc.khoiKienThucId &&
        !selected.includes(ch.id)
      );

      if (phuHop.length < yc.soLuong) {

        setError(`Không đủ câu hỏi mức ${yc.mucDo}`);
        return;
      }

      const random = [...phuHop].sort(() => 0.5 - Math.random());
      selected.push(...random.slice(0, yc.soLuong).map(ch => ch.id));
    }

    const deThi: DeThiModel = {
      id: Date.now().toString(),
      maDe: `DT${Date.now()}`,
      tenDe: `Đề ${new Date().toLocaleTimeString()}`,
      monHocId: cauTruc.monHocId,
      cauHoiIds: selected,
      ngayTao: new Date()
    };

    setDeThis([...deThis, deThi]);
  };

  const xoaDeThi = (id: string) => {
    setDeThis(deThis.filter(dt => dt.id !== id));
  };

  const ycColumns = [
    {
      title: 'Khối kiến thức',
      render: (yc: YeuCauCauHoi) =>
        khoiKienThucs.find(k => k.id === yc.khoiKienThucId)?.ten
    },
    { title: 'Mức độ', dataIndex: 'mucDo' },
    { title: 'Số lượng', dataIndex: 'soLuong' },
    {
      title: 'Xóa',
      render: (_: any, __: any, index: number) =>
        <Button danger size="small" onClick={() => xoaYeuCau(index)}>X</Button>
    }
  ];

  const deThiColumns = [
    { title: 'Mã đề', dataIndex: 'maDe' },
    { title: 'Tên đề', dataIndex: 'tenDe' },
    {
      title: 'Số câu',
      render: (dt: DeThiModel) => dt.cauHoiIds.length
    },
    {
      title: 'Hành động',
      render: (dt: DeThiModel) =>
        <Button danger size="small" onClick={() => xoaDeThi(dt.id)}>Xóa</Button>
    }
  ];

  return (
    <div>

      <Card title="Tạo cấu trúc đề thi" style={{ marginBottom: 20 }}>

        <Space direction="vertical" style={{ width: '100%' }}>

          <Input
            placeholder="Tên cấu trúc"
            value={newCauTruc.tenCauTruc}
            onChange={(e) => setNewCauTruc({ ...newCauTruc, tenCauTruc: e.target.value })}
          />

          <Select
            placeholder="Môn học"
            value={newCauTruc.monHocId || undefined}
            onChange={(v) => setNewCauTruc({ ...newCauTruc, monHocId: v })}
          >
            {monHocs.map(m => (
              <Select.Option key={m.id} value={m.id}>
                {m.tenMon}
              </Select.Option>
            ))}
          </Select>

          <Space>

            <Select
              placeholder="Khối KT"
              style={{ width: 200 }}
              onChange={(v) => setYcTemp({ ...ycTemp, khoiKienThucId: v })}
            >
              {khoiKienThucs.map(kt => (
                <Select.Option key={kt.id} value={kt.id}>
                  {kt.ten}
                </Select.Option>
              ))}
            </Select>

            <Select
              value={ycTemp.mucDo}
              onChange={(v) => setYcTemp({ ...ycTemp, mucDo: v })}
            >
              <Select.Option value="De">Dễ</Select.Option>
              <Select.Option value="TrungBinh">Trung bình</Select.Option>
              <Select.Option value="Kho">Khó</Select.Option>
              <Select.Option value="RatKho">Rất khó</Select.Option>
            </Select>

            <Input
              type="number"
              style={{ width: 90 }}
              value={ycTemp.soLuong}
              onChange={(e) =>
                setYcTemp({ ...ycTemp, soLuong: parseInt(e.target.value) })
              }
            />

            <Button onClick={themYeuCau}>Thêm yêu cầu</Button>

          </Space>

          <Table
            rowKey={(r, i) => i!.toString()}
            dataSource={newCauTruc.yeuCau}
            columns={ycColumns}
            pagination={false}
          />

          <Button type="primary" onClick={luuCauTruc}>
            Lưu cấu trúc đề
          </Button>

        </Space>

      </Card>

      <Card title="Tạo đề thi" style={{ marginBottom: 20 }}>

        <Space>

          <Select
            placeholder="Chọn cấu trúc đề"
            style={{ width: 250 }}
            onChange={(id) => {
              const ct = cauTrucDeThis.find(c => c.id === id);
              if (ct) taoDeThi(ct);
            }}
          >
            {cauTrucDeThis.map(ct => (
              <Select.Option key={ct.id} value={ct.id}>
                {ct.tenCauTruc}
              </Select.Option>
            ))}
          </Select>

        </Space>

        {error && (
          <Alert
            type="error"
            message={error}
            style={{ marginTop: 15 }}
          />
        )}

      </Card>


      <Card title="Danh sách đề thi">

        <Table
          rowKey="id"
          dataSource={deThis}
          columns={deThiColumns}
        />

      </Card>

    </div>
  );
}
