import { useState } from "react";
import { Tabs } from "antd";

import QuanLyNhanVien from "./components/quanlynhanvienvadichvu";
import QuanLyLichHen from "./components/quanlylichhen";
import DanhGiaDichVu from "./components/danhgia";
import ThongKe from "./components/thongke";

import { nhanvien, dichvu, lichhen } from "./model";

export default function App() {
  const [dsNhanVien, setDsNhanVien] = useState<nhanvien[]>([]);
  const [dsDichVu, setDsDichVu] = useState<dichvu[]>([]);
  const [dsLichHen, setDsLichHen] = useState<lichhen[]>([]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Hệ thống đặt lịch dịch vụ</h1>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Nhân viên" key="1">
          <QuanLyNhanVien
            dsNhanVien={dsNhanVien}
            setDsNhanVien={setDsNhanVien}
            dsDichVu={dsDichVu}
            setDsDichVu={setDsDichVu}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lịch hẹn" key="3">
          <QuanLyLichHen
            dsNhanVien={dsNhanVien}
            dsDichVu={dsDichVu}
            dsLichHen={dsLichHen}
            setDsLichHen={setDsLichHen}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đánh giá" key="4">
          <DanhGiaDichVu
            dsLichHen={dsLichHen}
            dsNhanVien={dsNhanVien}
            setDsNhanVien={setDsNhanVien}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Thống kê" key="5">
          <ThongKe 
          dsLichHen={dsLichHen} 
          dsNhanVien={dsNhanVien} 
          dsDichVu={dsDichVu} 
          />
</Tabs.TabPane>
      </Tabs>
    </div>
  );
}
