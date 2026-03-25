import { useState } from "react";
import { Tabs } from "antd";
import { SoVanBang, QuyetDinh, TruongCauHinh, VanBang } from "./model";

import { QuanLySo } from "./components/QuanLySo";
import { QuyetDinhTotNghiep } from "./components/QuyetDinhTotNghiep";
import { CauHinhBieuMau } from "./components/CauHinhBieuMau";
import { ThongTinVanBang } from "./components/ThongTinVanBang";
import { TraCuuVanBang } from "./components/TraCuuVanBang";

export default function App() {
  const [dsSo, setDsSo] = useState<SoVanBang[]>([]);
  const [dsQD, setDsQD] = useState<QuyetDinh[]>([]);
  const [dsTruong, setDsTruong] = useState<TruongCauHinh[]>([]);
  const [dsVB, setDsVB] = useState<VanBang[]>([]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "0 auto" }}>

      <Tabs defaultActiveKey="1" type="card">
        
        <Tabs.TabPane tab="1. Quản lý sổ" key="1">
          <QuanLySo dsSo={dsSo} setDsSo={setDsSo} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="2. Quyết định" key="2">
          <QuyetDinhTotNghiep dsQD={dsQD} setDsQD={setDsQD} dsSo={dsSo} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="3. Cấu hình biểu mẫu" key="3">
          <CauHinhBieuMau dsTruong={dsTruong} setDsTruong={setDsTruong} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="4. Cấp văn bằng" key="4">
          <ThongTinVanBang 
            dsVB={dsVB} 
            setDsVB={setDsVB} 
            dsSo={dsSo} 
            setDsSo={setDsSo} 
            dsQD={dsQD} 
            dsTruong={dsTruong} 
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="5. Tra cứu" key="5">
          <TraCuuVanBang 
            dsVB={dsVB} 
            dsQD={dsQD} 
            setDsQD={setDsQD}
            dsSo={dsSo}
            dsTruong={dsTruong}
          />
        </Tabs.TabPane>

      </Tabs>

      <div style={{ marginTop: "30px", padding: "15px", background: "#f8f9fa", borderRadius: "8px" }}>
        <h4>📊 Thống kê lượt tra cứu theo Quyết định:</h4>
        <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
          {dsQD.map(q => (
            <li key={q.id} style={{ listStyle: "none", borderLeft: "4px solid #3498db", paddingLeft: "10px" }}>
              QĐ: <strong>{q.soQD}</strong> - Lượt xem: <span style={{ color: "red", fontWeight: "bold" }}>{q.luotTraCuu}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}