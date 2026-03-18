import { useState } from "react";
import { lichhen, nhanvien, dichvu } from "../model";

export default function QuanLyLichHen({
  dsNhanVien,
  dsDichVu,
  dsLichHen,
  setDsLichHen
}: {
  dsNhanVien: nhanvien[];
  dsDichVu: dichvu[];
  dsLichHen: lichhen[];
  setDsLichHen: React.Dispatch<React.SetStateAction<lichhen[]>>;
}) {
  const [form, setForm] = useState<lichhen>({
    id: 0,
    khachHang: "",
    nhanVienId: 0,
    dichVuId: 0,
    ngay: "",
    gio: "",
    trangThai: "CHO_DUYET"
  });

  const submit = () => {
    if (!form.khachHang || !form.nhanVienId || !form.ngay || !form.gio) {
      return alert("Vui lòng nhập đầy đủ thông tin!");
    }

    const trung = dsLichHen.some(l =>
      l.nhanVienId === form.nhanVienId &&
      l.ngay === form.ngay &&
      l.gio === form.gio &&
      l.trangThai !== "HUY"
    );

    if (trung) return alert("Trùng lịch!");

    setDsLichHen([...dsLichHen, { ...form, id: Date.now() }]);
    alert("Đặt lịch thành công!");
  };

  const updateStatus = (id: number, status: lichhen["trangThai"]) => {
    setDsLichHen(prev => prev.map(l => 
      l.id === id ? { ...l, trangThai: status } : l
    ));
  };

  const inputStyle = { padding: "6px", border: "1px solid #ccc", borderRadius: "4px" };
  const btnAdd = { background: "#d90000", color: "#fff", border: "none", padding: "6px 12px", cursor: "pointer" };
  const table = { width: "100%", borderCollapse: "collapse" as const, tableLayout: "fixed" as const, marginTop: "20px" };
  const th = { background: "#f0f0f0", padding: "8px", border: "1px solid #ddd", textAlign: "left" as const };
  const td = { padding: "8px", border: "1px solid #ddd", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>Quản lý lịch hẹn</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input 
          style={{ ...inputStyle, flex: 1.5 }}
          placeholder="Tên khách"
          onChange={e => setForm({ ...form, khachHang: e.target.value })}
        />

        <select style={{ ...inputStyle, flex: 1 }} onChange={e => setForm({ ...form, nhanVienId: +e.target.value })}>
          <option value={0}>Chọn NV</option>
          {dsNhanVien.map(nv => (
            <option key={nv.id} value={nv.id}>{nv.ten}</option>
          ))}
        </select>

        <select style={{ ...inputStyle, flex: 1 }} onChange={e => setForm({ ...form, dichVuId: +e.target.value })}>
          <option value={0}>Chọn DV</option>
          {dsDichVu.map(dv => (
            <option key={dv.id} value={dv.id}>{dv.ten}</option>
          ))}
        </select>

        <input style={{ ...inputStyle, flex: 1 }} type="date" onChange={e => setForm({ ...form, ngay: e.target.value })}/>
        <input style={{ ...inputStyle, flex: 1 }} type="time" onChange={e => setForm({ ...form, gio: e.target.value })}/>

        <button style={btnAdd} onClick={submit}>Đặt</button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th style={{ ...th, width: "20%" }}>Khách hàng</th>
            <th style={{ ...th, width: "15%" }}>Nhân viên</th>
            <th style={{ ...th, width: "20%" }}>Dịch vụ</th>
            <th style={{ ...th, width: "20%" }}>Thời gian</th>
            <th style={{ ...th, width: "15%", textAlign: "center" }}>Trạng thái</th>
            <th style={{ ...th, width: "10%", textAlign: "center" }}>Sửa</th>
          </tr>
        </thead>
        <tbody>
          {dsLichHen.length === 0 ? (
            <tr><td colSpan={6} style={{ ...td, textAlign: "center", color: "#888" }}>Trống</td></tr>
          ) : (
            dsLichHen.map(l => {
              const nv = dsNhanVien.find(n => n.id === l.nhanVienId);
              const dv = dsDichVu.find(d => d.id === l.dichVuId);
              return (
                <tr key={l.id}>
                  <td style={td}>{l.khachHang}</td>
                  <td style={td}>{nv?.ten}</td>
                  <td style={td}>{dv?.ten}</td>
                  <td style={td}>{l.gio} | {l.ngay}</td>
                  <td style={{ ...td, textAlign: "center", fontWeight: "bold", color: getStatusColor(l.trangThai) }}>
                    {l.trangThai}
                  </td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <select 
                      style={{ fontSize: "12px" }}
                      value={l.trangThai} 
                      onChange={(e) => updateStatus(l.id, e.target.value as any)}
                    >
                      <option value="CHO_DUYET">Đợi</option>
                      <option value="XAC_NHAN">OK</option>
                      <option value="HOAN_THANH">Xong</option>
                      <option value="HUY">Hủy</option>
                    </select>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "CHO_DUYET": return "#f39c12";
    case "XAC_NHAN": return "#3498db";
    case "HOAN_THANH": return "#27ae60";
    case "HUY": return "#e74c3c";
    default: return "#000";
  }
};