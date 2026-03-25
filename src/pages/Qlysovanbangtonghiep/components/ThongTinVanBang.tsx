import { useState, Dispatch, SetStateAction } from 'react';
import { VanBang, SoVanBang, QuyetDinh, TruongCauHinh } from '../model';
import { Card, Input, Select, Button, Table, Space, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

interface Props {
  dsVB: VanBang[];
  setDsVB: Dispatch<SetStateAction<VanBang[]>>;
  dsSo: SoVanBang[];
  setDsSo: Dispatch<SetStateAction<SoVanBang[]>>;
  dsQD: QuyetDinh[];
  dsTruong: TruongCauHinh[];
}

export function ThongTinVanBang({ dsVB, setDsVB, dsSo, setDsSo, dsQD, dsTruong }: Props) {
  const [newVB, setNewVB] = useState({
    hoTen: '',
    maSV: '',
    soHieuVanBang: '',
    ngaySinh: '',
    quyetDinhId: 0,
    duLieuPhuLuc: {} as Record<string, any>
  });

  const capBang = () => {
    if (!newVB.quyetDinhId || !newVB.hoTen || !newVB.maSV || !newVB.soHieuVanBang || !newVB.ngaySinh) {
      alert("Vui lòng điền đầy đủ thông tin: Họ tên, Mã SV, Số hiệu văn bằng, Ngày sinh!");
      return;
    }

    const qd = dsQD.find(q => q.id === newVB.quyetDinhId);
    if (!qd) {
      alert("Quyết định không tồn tại!");
      return;
    }

    const so = dsSo.find(s => s.id === qd.soVanBangId);
    if (!so) {
      alert("Sổ văn bằng không tồn tại!");
      return;
    }

    const soMoi = so.soVaoSoHienTai + 1;
    
    const vanBang: VanBang = {
      id: Date.now(),
      soVaoSo: soMoi,
      ...newVB
    };
    
    setDsVB([...dsVB, vanBang]);
    setDsSo(dsSo.map(s => 
      s.id === so.id ? { ...s, soVaoSoHienTai: soMoi } : s
    ));
    
    alert(`Đã cấp bằng thành công! Số vào sổ: ${soMoi}`);
    
    setNewVB({
      hoTen: '',
      maSV: '',
      soHieuVanBang: '',
      ngaySinh: '',
      quyetDinhId: 0,
      duLieuPhuLuc: {}
    });
  };

  const cacTruongPhuLuc = dsTruong.filter(t => 
    !["soVaoSo", "soHieuVanBang", "maSV", "hoTen", "ngaySinh"].includes(t.tenTruong)
  );

  const columns = [
    { title: 'Số vào sổ', dataIndex: 'soVaoSo', key: 'soVaoSo', align: 'center' as const },
    { title: 'Số hiệu VB', dataIndex: 'soHieuVanBang', key: 'soHieuVanBang' },
    { title: 'Mã SV', dataIndex: 'maSV', key: 'maSV' },
    { title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen' },
    { title: 'Ngày sinh', dataIndex: 'ngaySinh', key: 'ngaySinh' }
  ];

  return (
    <Card title="Quản lý thông tin văn bằng">
      <Card 
        type="inner" 
        title="Cấp văn bằng mới"
        style={{ marginBottom: 20 }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Select
            placeholder="Chọn quyết định tốt nghiệp"
            value={newVB.quyetDinhId || undefined}
            onChange={(value) => setNewVB({ ...newVB, quyetDinhId: value })}
          >
            {dsQD.map(q => {
              const so = dsSo.find(s => s.id === q.soVanBangId);
              return (
                <Select.Option key={q.id} value={q.id}>
                  {q.soQD} - {q.trichYeu} (Sổ năm {so?.nam})
                </Select.Option>
              );
            })}
          </Select>
          
          <Input
            placeholder="Họ tên *"
            value={newVB.hoTen}
            onChange={(e) => setNewVB({ ...newVB, hoTen: e.target.value })}
          />
          
          <Input
            placeholder="Mã sinh viên *"
            value={newVB.maSV}
            onChange={(e) => setNewVB({ ...newVB, maSV: e.target.value })}
          />
          
          <DatePicker
            placeholder="Ngày sinh *"
            style={{ width: "100%" }}
            onChange={(date, dateString) => setNewVB({ ...newVB, ngaySinh: dateString })}
            value={newVB.ngaySinh ? moment(newVB.ngaySinh) : null}
          />
          
          <Input
            placeholder="Số hiệu văn bằng *"
            value={newVB.soHieuVanBang}
            onChange={(e) => setNewVB({ ...newVB, soHieuVanBang: e.target.value })}
          />
          
          {cacTruongPhuLuc.length > 0 && (
            <Card type="inner" title="Thông tin phụ lục" size="small">
              {cacTruongPhuLuc.map(t => (
                <div key={t.id} style={{ marginBottom: 10 }}>
                  <label style={{ display: 'block', marginBottom: 5 }}>{t.tenTruong}:</label>
                  {t.kieuDuLieu === 'Date' ? (
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={(date, dateString) => setNewVB({
                        ...newVB,
                        duLieuPhuLuc: { ...newVB.duLieuPhuLuc, [t.tenTruong]: dateString }
                      })}
                    />
                  ) : (
                    <Input
                      type={t.kieuDuLieu === 'Number' ? 'number' : 'text'}
                      onChange={(e) => setNewVB({
                        ...newVB,
                        duLieuPhuLuc: { ...newVB.duLieuPhuLuc, [t.tenTruong]: e.target.value }
                      })}
                    />
                  )}
                </div>
              ))}
            </Card>
          )}
          
          <Button type="primary" icon={<PlusOutlined />} onClick={capBang}>
            Cấp văn bằng
          </Button>
        </Space>
      </Card>

      <Card title="Danh sách văn bằng">
        <Table
          rowKey="id"
          dataSource={dsVB}
          columns={columns}
        />
      </Card>
    </Card>
  );
}