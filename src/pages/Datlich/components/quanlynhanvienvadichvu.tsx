import { useState } from "react";
import { nhanvien, dichvu } from "../model";

type EditState = {
  type: "NV" | "DV" | null;
  id: number | null;
};

interface Props {
  dsNhanVien: nhanvien[];
  setDsNhanVien: React.Dispatch<React.SetStateAction<nhanvien[]>>;
  dsDichVu: dichvu[];
  setDsDichVu: React.Dispatch<React.SetStateAction<dichvu[]>>;
}

export default function QuanLyNhanVien({
  dsNhanVien,
  setDsNhanVien,
  dsDichVu,
  setDsDichVu
}: Props) {

  const [formNV, setFormNV] = useState<nhanvien>({
    id: 0,
    ten: "",
    soKhachToiDa: 0,
    lichLamViec: "",
  });

  const [formDV, setFormDV] = useState<dichvu>({
    id: 0,
    ten: "",
    gia: 0,
    thoiGian: 0,
  });

  const [editing, setEditing] = useState<EditState>({ type: null, id: null });
  const handleSave = (isNV: boolean) => {
    if (isNV) {
      if (!formNV.ten.trim()) return alert("Nhập tên!");
      const newItem = { ...formNV, id: formNV.id || Date.now() };
      if (editing.type === "NV") {
        setDsNhanVien(dsNhanVien.map(nv => nv.id === editing.id ? newItem : nv));
      } else {
        setDsNhanVien([...dsNhanVien, newItem]);
      }
      setFormNV({ id: 0, ten: "", soKhachToiDa: 0, lichLamViec: "" });
    } else {
      if (!formDV.ten.trim()) return alert("Nhập tên!");
      const newItem = { ...formDV, id: formDV.id || Date.now() };
      if (editing.type === "DV") {
        setDsDichVu(dsDichVu.map(dv => dv.id === editing.id ? newItem : dv));
      } else {
        setDsDichVu([...dsDichVu, newItem]);
      }
      setFormDV({ id: 0, ten: "", gia: 0, thoiGian: 0 });
    }
    setEditing({ type: null, id: null });
  };

  const startEdit = (item: any, type: "NV" | "DV") => {
    if (type === "NV") setFormNV(item);
    else setFormDV(item);
    setEditing({ type, id: item.id });
  };

  const removeItem = (id: number, type: "NV" | "DV") => {
    if (type === "NV") setDsNhanVien(dsNhanVien.filter(nv => nv.id !== id));
    else setDsDichVu(dsDichVu.filter(dv => dv.id !== id));
  };

  const input = { padding: "6px", border: "1px solid #ccc", borderRadius: "4px" };
  const btnAdd = { background: "#d90000", color: "#fff", border: "none", padding: "6px 12px", cursor: "pointer" };
  const table = { width: "100%", borderCollapse: "collapse" as const, tableLayout: "fixed" as const };
  const th = { background: "#f0f0f0", padding: "8px", border: "1px solid #ddd", textAlign: "left" as const };
  const td = { padding: "8px", border: "1px solid #ddd", overflow: "hidden", textOverflow: "ellipsis" };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hệ thống quản lý dịch vụ</h2>

      <h3>Quản lý nhân viên</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input style={{...input, flex: 2}} placeholder="Tên" value={formNV.ten} onChange={e => setFormNV({ ...formNV, ten: e.target.value })} />
        <input style={{...input, flex: 1}} type="number" placeholder="Max khách" value={formNV.soKhachToiDa || ""} onChange={e => setFormNV({ ...formNV, soKhachToiDa: Number(e.target.value) })} />
        <input style={{...input, flex: 2}} placeholder="Lịch làm việc" value={formNV.lichLamViec} onChange={e => setFormNV({ ...formNV, lichLamViec: e.target.value })} />
        <button style={btnAdd} onClick={() => handleSave(true)}>{editing.type === "NV" ? "Sửa" : "Thêm"}</button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th style={{ ...th, width: "30%" }}>Tên</th>
            <th style={{ ...th, width: "15%", textAlign: "center" }}>Số khách tối đa</th>
            <th style={{ ...th, width: "35%" }}>Lịch</th>
            <th style={{ ...th, width: "20%", textAlign: "center" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {dsNhanVien.map(nv => (
            <tr key={nv.id}>
              <td style={td}>{nv.ten}</td>
              <td style={{ ...td, textAlign: "center" }}>{nv.soKhachToiDa}</td>
              <td style={td}>{nv.lichLamViec}</td>
              <td style={{ ...td, textAlign: "center" }}>
                <button onClick={() => startEdit(nv, "NV")}>Sửa</button>
                <button onClick={() => removeItem(nv.id, "NV")}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "30px" }}>Quản lý dịch vụ</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input style={{...input, flex: 2}} placeholder="Tên" value={formDV.ten} onChange={e => setFormDV({ ...formDV, ten: e.target.value })} />
        <input style={{...input, flex: 1}} type="number" placeholder="Giá" value={formDV.gia || ""} onChange={e => setFormDV({ ...formDV, gia: Number(e.target.value) })} />
        <input style={{...input, flex: 1}} type="number" placeholder="Thời gian" value={formDV.thoiGian || ""} onChange={e => setFormDV({ ...formDV, thoiGian: Number(e.target.value) })} />
        <button style={btnAdd} onClick={() => handleSave(false)}>{editing.type === "DV" ? "Sửa" : "Thêm"}</button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th style={{ ...th, width: "40%" }}>Tên dịch vụ</th>
            <th style={{ ...th, width: "20%", textAlign: "right" }}>Giá</th>
            <th style={{ ...th, width: "20%", textAlign: "center" }}>Thời gian</th>
            <th style={{ ...th, width: "20%", textAlign: "center" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {dsDichVu.map(dv => (
            <tr key={dv.id}>
              <td style={td}>{dv.ten}</td>
              <td style={{ ...td, textAlign: "right" }}>{dv.gia.toLocaleString()}đ</td>
              <td style={{ ...td, textAlign: "center" }}>{dv.thoiGian}p</td>
              <td style={{ ...td, textAlign: "center" }}>
                <button onClick={() => startEdit(dv, "DV")}>Sửa</button>
                <button onClick={() => removeItem(dv.id, "DV")}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}