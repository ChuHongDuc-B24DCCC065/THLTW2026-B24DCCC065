import { useState, Dispatch, SetStateAction } from 'react';
import { VanBang, QuyetDinh, SoVanBang, TruongCauHinh } from '../model';
import { Card, Input, Button, Table, Space, Modal, Descriptions, Tag } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';

interface Props {
  dsVB: VanBang[];
  dsQD: QuyetDinh[];
  setDsQD: Dispatch<SetStateAction<QuyetDinh[]>>;
  dsSo: SoVanBang[];
  dsTruong: TruongCauHinh[];
}

export function TraCuuVanBang({ dsVB, dsQD, setDsQD, dsSo, dsTruong }: Props) {
  const [thamSo, setThamSo] = useState({
    soHieuVanBang: '',
    soVaoSo: '',
    maSV: '',
    hoTen: '',
    ngaySinh: ''
  });
  const [ketQua, setKetQua] = useState<VanBang[]>([]);
  const [daTim, setDaTim] = useState(false);
  const [selectedVB, setSelectedVB] = useState<VanBang | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const timKiem = () => {
    const soThamSo = Object.values(thamSo).filter(value => value.trim() !== "").length;
    
    if (soThamSo < 2) {
      alert("Vui lòng nhập ít nhất 2 tham số tìm kiếm!");
      return;
    }

    let results = [...dsVB];
    
    if (thamSo.soHieuVanBang) {
      results = results.filter(vb => vb.soHieuVanBang.includes(thamSo.soHieuVanBang));
    }
    if (thamSo.soVaoSo) {
      results = results.filter(vb => vb.soVaoSo.toString().includes(thamSo.soVaoSo));
    }
    if (thamSo.maSV) {
      results = results.filter(vb => vb.maSV.includes(thamSo.maSV));
    }
    if (thamSo.hoTen) {
      results = results.filter(vb => vb.hoTen.toLowerCase().includes(thamSo.hoTen.toLowerCase()));
    }
    if (thamSo.ngaySinh) {
      results = results.filter(vb => vb.ngaySinh === thamSo.ngaySinh);
    }
    
    setKetQua(results);
    setDaTim(true);
  };

  const xemChiTiet = (vb: VanBang) => {
    // Tăng lượt tra cứu
    setDsQD(prev => 
      prev.map(q => 
        q.id === vb.quyetDinhId 
          ? { ...q, luotTraCuu: q.luotTraCuu + 1 } 
          : q
      )
    );
    
    setSelectedVB(vb);
    setModalVisible(true);
  };

  const getThongTinQuyetDinh = (quyetDinhId: number) => {
    const qd = dsQD.find(q => q.id === quyetDinhId);
    const so = dsSo.find(s => s.id === qd?.soVanBangId);
    return { qd, so };
  };

  const columns = [
    { title: 'Số vào sổ', dataIndex: 'soVaoSo', key: 'soVaoSo', width: 100, align: 'center' as const },
    { title: 'Số hiệu VB', dataIndex: 'soHieuVanBang', key: 'soHieuVanBang', width: 150 },
    { title: 'Mã SV', dataIndex: 'maSV', key: 'maSV', width: 120 },
    { title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen', width: 150 },
    { title: 'Ngày sinh', dataIndex: 'ngaySinh', key: 'ngaySinh', width: 120 },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      render: (_: any, record: VanBang) => (
        <Button 
          type="link" 
          icon={<EyeOutlined />}
          onClick={() => xemChiTiet(record)}
        >
          Xem
        </Button>
      )
    }
  ];

  return (
    <>
      <Card title="Tra cứu văn bằng">
        <div style={{ marginBottom: 20, color: '#666' }}>
          <Tag color="blue">Yêu cầu: Nhập ít nhất 2 tham số tìm kiếm</Tag>
        </div>
        
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space style={{ width: "100%" }} wrap>
            <Input
              placeholder="Số hiệu văn bằng"
              style={{ width: 200 }}
              value={thamSo.soHieuVanBang}
              onChange={e => setThamSo({...thamSo, soHieuVanBang: e.target.value})}
            />
            <Input
              placeholder="Số vào sổ"
              style={{ width: 200 }}
              value={thamSo.soVaoSo}
              onChange={e => setThamSo({...thamSo, soVaoSo: e.target.value})}
            />
            <Input
              placeholder="Mã sinh viên"
              style={{ width: 200 }}
              value={thamSo.maSV}
              onChange={e => setThamSo({...thamSo, maSV: e.target.value})}
            />
            <Input
              placeholder="Họ tên"
              style={{ width: 200 }}
              value={thamSo.hoTen}
              onChange={e => setThamSo({...thamSo, hoTen: e.target.value})}
            />
            <Input
              type="date"
              placeholder="Ngày sinh"
              style={{ width: 200 }}
              value={thamSo.ngaySinh}
              onChange={e => setThamSo({...thamSo, ngaySinh: e.target.value})}
            />
            <Button 
              type="primary" 
              icon={<SearchOutlined />}
              onClick={timKiem}
            >
              Tìm kiếm
            </Button>
          </Space>
          
          {daTim && (
            <div style={{ marginTop: 20 }}>
              <div style={{ marginBottom: 10, fontWeight: 'bold' }}>
                Kết quả tìm kiếm: {ketQua.length} văn bằng
              </div>
              <Table
                rowKey="id"
                dataSource={ketQua}
                columns={columns}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 800 }}
              />
            </div>
          )}
        </Space>
      </Card>

      <Modal
        title="Chi tiết văn bằng"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={700}
      >
        {selectedVB && (() => {
          const { qd, so } = getThongTinQuyetDinh(selectedVB.quyetDinhId);
          return (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Descriptions title="Thông tin văn bằng" bordered column={2}>
                <Descriptions.Item label="Số vào sổ">{selectedVB.soVaoSo}</Descriptions.Item>
                <Descriptions.Item label="Số hiệu văn bằng">{selectedVB.soHieuVanBang}</Descriptions.Item>
                <Descriptions.Item label="Mã sinh viên">{selectedVB.maSV}</Descriptions.Item>
                <Descriptions.Item label="Họ tên">{selectedVB.hoTen}</Descriptions.Item>
                <Descriptions.Item label="Ngày sinh">{selectedVB.ngaySinh}</Descriptions.Item>
              </Descriptions>
              
              <Descriptions title="Thông tin quyết định" bordered column={2}>
                <Descriptions.Item label="Số quyết định">{qd?.soQD}</Descriptions.Item>
                <Descriptions.Item label="Ngày ban hành">{qd?.ngayBanHanh}</Descriptions.Item>
                <Descriptions.Item label="Trích yếu" span={2}>{qd?.trichYeu}</Descriptions.Item>
                <Descriptions.Item label="Sổ văn bằng" span={2}>
                  {so ? `Sổ năm ${so.nam}` : 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Lượt tra cứu">{qd?.luotTraCuu}</Descriptions.Item>
              </Descriptions>
              
              {Object.keys(selectedVB.duLieuPhuLuc).length > 0 && (
                <Descriptions title="Thông tin phụ lục" bordered column={2}>
                  {Object.entries(selectedVB.duLieuPhuLuc).map(([key, value]) => (
                    <Descriptions.Item key={key} label={key}>{value}</Descriptions.Item>
                  ))}
                </Descriptions>
              )}
            </Space>
          );
        })()}
      </Modal>
    </>
  );
}