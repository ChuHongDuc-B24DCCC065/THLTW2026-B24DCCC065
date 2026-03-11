import { useState } from 'react';
import { Tabs } from 'antd';

import { DanhMuc } from './components/Danhmuc';
import { CauHoi } from './components/Cauhoi';
import { QuanLyDeThi } from './components/Dethi';

export default function App() {

  const [monHocs, setMonHocs] = useState<any[]>([]);
  const [khoiKienThucs, setKhoiKienThucs] = useState<any[]>([]);
  const [cauHois, setCauHois] = useState<any[]>([]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Hệ thống quản lý ngân hàng câu hỏi</h1>

      <Tabs defaultActiveKey="1">

        <Tabs.TabPane tab="Danh mục" key="1">
          <DanhMuc
            monHocs={monHocs}
            setMonHocs={setMonHocs}
            khoiKienThucs={khoiKienThucs}
            setKhoiKienThucs={setKhoiKienThucs}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Câu hỏi" key="2">
          <CauHoi
            monHocs={monHocs}
            khoiKienThucs={khoiKienThucs}
            cauHois={cauHois}
            setCauHois={setCauHois}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Quản lý đề thi" key="3">
          <QuanLyDeThi
            monHocs={monHocs}
            khoiKienThucs={khoiKienThucs}
            cauHois={cauHois}
          />
        </Tabs.TabPane>

      </Tabs>
    </div>
  );
}
