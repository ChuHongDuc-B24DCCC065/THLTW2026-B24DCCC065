import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, InputNumber, Card, Tabs, Tag, message, Row, Col, Space, Popconfirm, Statistic } from 'antd';
import { PlusOutlined, BookOutlined, DeleteOutlined } from '@ant-design/icons';

const StudyManager = () => { 
  const [danhMuc, setDanhMuc] = useState(
    JSON.parse(localStorage.getItem('study_categories') || '["Toán", "Văn", "Anh", "Khoa học", "Công nghệ"]')
  );
  const [lichSuHoc, setLichSuHoc] = useState(
    JSON.parse(localStorage.getItem('study_sessions') || '[]')
  );
  const [mucTieu, setMucTieu] = useState(
    JSON.parse(localStorage.getItem('study_goals') || '{}')
  );

  const [moModalBuoiHoc, setMoModalBuoiHoc] = useState(false);
  const [moModalDanhMuc, setMoModalDanhMuc] = useState(false);
  const [tenMonMoi, setTenMonMoi] = useState('');
  
  const [form] = Form.useForm();

  useEffect(() => {
    localStorage.setItem('study_categories', JSON.stringify(danhMuc));
    localStorage.setItem('study_sessions', JSON.stringify(lichSuHoc));
    localStorage.setItem('study_goals', JSON.stringify(mucTieu));
  }, [danhMuc, lichSuHoc, mucTieu]);

  const themDanhMuc = () => {
    if (tenMonMoi === '' || danhMuc.includes(tenMonMoi)) {
      message.error('Môn học đã tồn tại hoặc bị trống!');
      return; 
    }
    const mangMoi = [...danhMuc, tenMonMoi];
    setDanhMuc(mangMoi);
    setTenMonMoi('');
    setMoModalDanhMuc(false);
  };

  const xoaDanhMuc = (tenMon: any) => {
    const danhMucConLai = danhMuc.filter((mon: any) => mon !== tenMon);
    setDanhMuc(danhMucConLai);
    message.success(`Đã xóa môn ${tenMon}`);
  };

  const luuBuoiHoc = (values: any) => {
    const buoiHocMoi = {
      subject: values.subject,
      date: values.date.format('YYYY-MM-DD HH:mm'),
      duration: values.duration,
      content: values.content,
      id: Date.now(),
    };
    
    setLichSuHoc([buoiHocMoi, ...lichSuHoc]);
    setMoModalBuoiHoc(false);
    form.resetFields();
    message.success('Đã ghi nhận tiến độ học tập!');
  };

  const tinhToanTienDo = (tenMon: any) => {
    let tongThoiGian = 0;
        lichSuHoc.forEach((buoiHoc: any) => {
      if (buoiHoc.subject === tenMon) {
        tongThoiGian = tongThoiGian + (buoiHoc.duration || 0);
      }
    });

    const mucTieuCuaMon = mucTieu[tenMon] || 0;
    let datMucTieu = false;
    
    if (mucTieuCuaMon > 0 && tongThoiGian >= mucTieuCuaMon) {
      datMucTieu = true;
    }

    return { 
      tong: tongThoiGian, 
      mucTieuCuaMon: mucTieuCuaMon, 
      hoanThanh: datMucTieu 
    };
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title={<span><BookOutlined /> QUẢN LÝ TIẾN ĐỘ HỌC TẬP</span>}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Lịch sử học tập" key="1">
            <Space style={{ marginBottom: 16 }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setMoModalBuoiHoc(true)}>
                Thêm buổi học
              </Button>
              <Button onClick={() => setMoModalDanhMuc(true)}>Quản lý danh mục</Button>
            </Space>
            <Table 
              dataSource={lichSuHoc} 
              rowKey="id"
              columns={[
                { title: 'Môn học', dataIndex: 'subject' },
                { title: 'Thời gian', dataIndex: 'date' },
                { title: 'Thời lượng', dataIndex: 'duration', render: (v) => `${v} phút` },
                { title: 'Nội dung', dataIndex: 'content' },
                { title: 'Thao tác', render: (_, r) => (
                  <Button type="link" danger onClick={() => setLichSuHoc(lichSuHoc.filter((s: any) => s.id !== r.id))}>Xóa</Button>
                )}
              ]}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Mục tiêu tháng" key="2">
            <Row gutter={[16, 16]}>
              {danhMuc.map((monHoc: any) => {
                const ketQua = tinhToanTienDo(monHoc);
                return (
                  <Col span={8} key={monHoc}>
                    <Card size="small" title={monHoc} extra={
                      ketQua.hoanThanh ? <Tag color="green">Hoàn thành</Tag> : <Tag color="orange">Đang thực hiện</Tag>
                    }>
                      <Statistic title="Đã học (phút)" value={ketQua.tong} suffix={`/ ${ketQua.mucTieuCuaMon || 0}`} />
                      <InputNumber 
                        placeholder="Đặt mục tiêu (phút)" 
                        style={{ width: '100%', marginTop: 10 }}
                        onChange={(val) => setMucTieu({...mucTieu, [monHoc]: val || 0})}
                        value={mucTieu[monHoc]}
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <Modal title="Thêm lịch học mới" visible={moModalBuoiHoc} onCancel={() => setMoModalBuoiHoc(false)} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={luuBuoiHoc}>
          <Form.Item name="subject" label="Chọn môn học" rules={[{ required: true }]}><Select options={danhMuc.map((c: any) => ({ value: c, label: c }))} /></Form.Item>
          <Form.Item name="date" label="Ngày và giờ học" rules={[{ required: true }]}><DatePicker showTime style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="duration" label="Thời lượng (phút)" rules={[{ required: true }]}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="content" label="Nội dung đã học"><Input.TextArea /></Form.Item>
        </Form>
      </Modal>

      <Modal title="Danh mục môn học" visible={moModalDanhMuc} onCancel={() => setMoModalDanhMuc(false)} footer={null}>
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <Input placeholder="Tên môn học mới" value={tenMonMoi} onChange={e => setTenMonMoi(e.target.value)} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
          <Button type="primary" onClick={themDanhMuc} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>Thêm</Button>
        </div>
        <Table 
          dataSource={danhMuc.map((c: any) => ({ name: c }))} 
          size="small"
          rowKey="name"
          columns={[
            { title: 'Tên môn', dataIndex: 'name' },
            { title: 'Thao tác', render: (_, r) => (
              <Popconfirm title="Xóa môn này?" onConfirm={() => xoaDanhMuc(r.name)}>
                <Button type="link" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            )}
          ]}
        />
      </Modal>
    </div>
  );
};

export default StudyManager;