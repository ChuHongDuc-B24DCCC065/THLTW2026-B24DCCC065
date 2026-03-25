import { useState, Dispatch, SetStateAction } from 'react';
import { SoVanBang } from '../model';
import { Card, Input, Button, Table, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
  dsSo: SoVanBang[];
  setDsSo: Dispatch<SetStateAction<SoVanBang[]>>;
}

export function QuanLySo({ dsSo, setDsSo }: Props) {
  const [nam, setNam] = useState(new Date().getFullYear());

  const moSo = () => {
    if (dsSo.some(s => s.nam === nam)) {
      alert("Năm này đã có sổ!");
      return;
    }
    setDsSo([...dsSo, { id: Date.now(), nam, soVaoSoHienTai: 0 }]);
    alert(`Đã mở sổ văn bằng năm ${nam}`);
  };

  const columns = [
    { title: 'Năm', dataIndex: 'nam', key: 'nam', align: 'center' as const },
    { 
      title: 'Số vào sổ hiện tại', 
      dataIndex: 'soVaoSoHienTai', 
      key: 'soVaoSoHienTai',
      align: 'center' as const 
    }
  ];

  return (
    <Card title="Quản lý sổ văn bằng">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space>
          <Input
            type="number"
            value={nam}
            onChange={e => setNam(+e.target.value)}
            style={{ width: 200 }}
            placeholder="Nhập năm"
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={moSo}>
            Mở sổ mới
          </Button>
        </Space>
        
        <Table
          rowKey="id"
          dataSource={dsSo}
          columns={columns}
          pagination={false}
          style={{ marginTop: 20 }}
        />
      </Space>
    </Card>
  );
}