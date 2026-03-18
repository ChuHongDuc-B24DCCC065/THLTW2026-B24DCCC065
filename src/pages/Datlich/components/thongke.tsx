import { useMemo } from "react";
import { lichhen, nhanvien, dichvu } from "../model";

interface Props {
  dsLichHen: lichhen[];
  dsNhanVien: nhanvien[];
  dsDichVu: dichvu[];
}

export default function ThongKe({ dsLichHen, dsNhanVien, dsDichVu }: Props) {
  
  // 1. Thống kê số lượng theo ngày
  const thongKeTheoNgay = useMemo(() => {
    const map: Record<string, number> = {};
    dsLichHen.forEach(l => {
      map[l.ngay] = (map[l.ngay] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0])); // Mới nhất lên đầu
  }, [dsLichHen]);

  // 2. Thống kê doanh thu theo Nhân viên
  const doanhThuNhanVien = useMemo(() => {
    const map: Record<number, { ten: string, doanhThu: number, soLich: number }> = {};
    
    // Khởi tạo map từ danh sách nhân viên
    dsNhanVien.forEach(nv => {
      map[nv.id] = { ten: nv.ten, doanhThu: 0, soLich: 0 };
    });

    dsLichHen.forEach(l => {
      if (l.trangThai === "HOAN_THANH") {
        const dv = dsDichVu.find(d => d.id === l.dichVuId);
        if (map[l.nhanVienId] && dv) {
          map[l.nhanVienId].doanhThu += dv.gia;
          map[l.nhanVienId].soLich += 1;
        }
      }
    });
    return Object.values(map).sort((a, b) => b.doanhThu - a.doanhThu);
  }, [dsLichHen, dsNhanVien, dsDichVu]);

  // 3. Thống kê doanh thu theo Dịch vụ
  const doanhThuDichVu = useMemo(() => {
    const map: Record<number, { ten: string, doanhThu: number, luotDat: number }> = {};

    dsDichVu.forEach(dv => {
      map[dv.id] = { ten: dv.ten, doanhThu: 0, luotDat: 0 };
    });

    dsLichHen.forEach(l => {
      if (l.trangThai === "HOAN_THANH") {
        const dv = dsDichVu.find(d => d.id === l.dichVuId);
        if (dv) {
          map[dv.id].doanhThu += dv.gia;
          map[dv.id].luotDat += 1;
        }
      }
    });
    return Object.values(map).sort((a, b) => b.doanhThu - a.doanhThu);
  }, [dsLichHen, dsDichVu]);

  // ===== STYLE ĐỒNG BỘ =====
  const sectionStyle = { marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" };
  const table = { width: "100%", borderCollapse: "collapse" as const, tableLayout: "fixed" as const };
  const th = { background: "#f0f0f0", padding: "10px", border: "1px solid #ddd", textAlign: "left" as const };
  const td = { padding: "10px", border: "1px solid #ddd" };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>Báo cáo thống kê</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ ...sectionStyle, flex: 1, textAlign: "center", background: "#e8f5e9" }}>
          <h4>Tổng lịch hẹn</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#2e7d32" }}>{dsLichHen.length}</p>
        </div>
        <div style={{ ...sectionStyle, flex: 1, textAlign: "center", background: "#fff3e0" }}>
          <h4>Doanh thu tổng</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#ef6c00" }}>
            {doanhThuDichVu.reduce((sum, item) => sum + item.doanhThu, 0).toLocaleString()}đ
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        <div style={{ ...sectionStyle, flex: "1 1 300px" }}>
          <h3>📅 Lịch hẹn theo ngày</h3>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Ngày</th>
                <th style={{ ...th, textAlign: "center" }}>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {thongKeTheoNgay.map(([ngay, sl]) => (
                <tr key={ngay}>
                  <td style={td}>{ngay}</td>
                  <td style={{ ...td, textAlign: "center" }}><b>{sl}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ ...sectionStyle, flex: "1 1 400px" }}>
          <h3>👤 Doanh thu Nhân viên</h3>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Tên NV</th>
                <th style={{ ...th, textAlign: "right" }}>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {doanhThuNhanVien.map(item => (
                <tr key={item.ten}>
                  <td style={td}>{item.ten} <small>({item.soLich} đơn)</small></td>
                  <td style={{ ...td, textAlign: "right", fontWeight: "bold" }}>{item.doanhThu.toLocaleString()}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ ...sectionStyle, flex: "1 1 400px" }}>
          <h3>🛠️ Hiệu suất Dịch vụ</h3>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Tên dịch vụ</th>
                <th style={{ ...th, textAlign: "center" }}>Lượt đặt</th>
                <th style={{ ...th, textAlign: "right" }}>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {doanhThuDichVu.map(item => (
                <tr key={item.ten}>
                  <td style={td}>{item.ten}</td>
                  <td style={{ ...td, textAlign: "center" }}>{item.luotDat}</td>
                  <td style={{ ...td, textAlign: "right", fontWeight: "bold", color: "#d90000" }}>
                    {item.doanhThu.toLocaleString()}đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}