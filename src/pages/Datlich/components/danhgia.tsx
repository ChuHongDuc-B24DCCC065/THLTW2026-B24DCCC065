import { useState, useMemo } from "react";
import { lichhen, nhanvien, danhgia } from "../model";

interface Props {
  dsLichHen: lichhen[];
  dsNhanVien: nhanvien[];
  setDsNhanVien: React.Dispatch<React.SetStateAction<nhanvien[]>>;
}

export default function DanhGiaDichVu({ dsLichHen, dsNhanVien, setDsNhanVien }: Props) {
  const [dsDanhGia, setDsDanhGia] = useState<danhgia[]>([]);
  const [form, setForm] = useState({ lichHenId: 0, soSao: 5, binhLuan: "" });
  const [inputPhanHoi, setInputPhanHoi] = useState<Record<number, string>>({});
  const lichCoTheDanhGia = useMemo(() => {
    return dsLichHen.filter(l => 
      l.trangThai === "HOAN_THANH" && 
      !dsDanhGia.some(dg => dg.lichHenId === l.id)
    );
  }, [dsLichHen, dsDanhGia]);
  const guiDanhGia = () => {
    if (!form.lichHenId || !form.binhLuan.trim()) return alert("Vui lòng chọn lịch và nhập bình luận!");

    const lichDuocChon = dsLichHen.find(l => l.id === form.lichHenId);
    if (!lichDuocChon) return;

    const newDG: danhgia = {
      id: Date.now(),
      lichHenId: form.lichHenId,
      nhanVienId: lichDuocChon.nhanVienId,
      soSao: form.soSao,
      binhLuan: form.binhLuan,
      ngayTao: new Date()
    };

    const newDsDanhGia = [...dsDanhGia, newDG];
    setDsDanhGia(newDsDanhGia);
    const dsCuaNV = newDsDanhGia.filter(d => d.nhanVienId === lichDuocChon.nhanVienId);
    const trungBinh = dsCuaNV.reduce((s, c) => s + c.soSao, 0) / dsCuaNV.length;

    setDsNhanVien(prev => prev.map(nv => 
      nv.id === lichDuocChon.nhanVienId 
      ? { ...nv, danhGiaTrungBinh: Number(trungBinh.toFixed(1)), tongDanhGia: dsCuaNV.length } 
      : nv
    ));

    setForm({ lichHenId: 0, soSao: 5, binhLuan: "" });
    alert("Cảm ơn bạn đã đánh giá!");
  };
  const guiPhanHoi = (dgId: number) => {
    const noiDung = inputPhanHoi[dgId];
    if (!noiDung?.trim()) return alert("Nhập nội dung phản hồi!");

    setDsDanhGia(prev => prev.map(dg => 
      dg.id === dgId ? { ...dg, phanHoi: noiDung } : dg
    ));
    setInputPhanHoi({ ...inputPhanHoi, [dgId]: "" });
  };

  const inputStyle = { padding: "6px", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "10px" };
  const btnStyle = { background: "#d90000", color: "#fff", border: "none", padding: "8px 15px", cursor: "pointer", borderRadius: "4px" };
  const cardStyle = { border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "10px", background: "#f9f9f9" };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>Đánh giá dịch vụ</h2>

      <div style={{ background: "#fff", padding: "20px", border: "1px solid #eee", marginBottom: "30px" }}>
        <h4>Viết đánh giá mới</h4>
        <select 
          style={{ ...inputStyle, width: "100%" }} 
          value={form.lichHenId} 
          onChange={e => setForm({...form, lichHenId: +e.target.value})}
        >
          <option value={0}>-- Chọn lịch hẹn đã hoàn thành --</option>
          {lichCoTheDanhGia.map(l => (
            <option key={l.id} value={l.id}>{l.khachHang} ({l.ngay})</option>
          ))}
        </select>

        <div style={{ marginBottom: "10px" }}>
          <span>Số sao: </span>
          {[1, 2, 3, 4, 5].map(s => (
            <button 
              key={s} 
              onClick={() => setForm({...form, soSao: s})}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: s <= form.soSao ? "#f1c40f" : "#ccc" }}
            >
              ★
            </button>
          ))}
        </div>

        <textarea 
          style={{ ...inputStyle, width: "100%", height: "60px", display: "block" }} 
          placeholder="Cảm nhận của bạn về dịch vụ..."
          value={form.binhLuan}
          onChange={e => setForm({...form, binhLuan: e.target.value})}
        />

        <button style={btnStyle} onClick={guiDanhGia}>Gửi đánh giá</button>
      </div>
      <h3>Tất cả đánh giá</h3>
      {dsDanhGia.length === 0 && <p style={{ color: "#888" }}>Chưa có đánh giá nào.</p>}
      
      {dsDanhGia.map(dg => {
        const nv = dsNhanVien.find(n => n.id === dg.nhanVienId);
        const lh = dsLichHen.find(l => l.id === dg.lichHenId);
        
        return (
          <div key={dg.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Khách: {lh?.khachHang}</strong>
              <span style={{ color: "#f39c12" }}>{"★".repeat(dg.soSao)}</span>
            </div>
            <p style={{ margin: "5px 0", fontSize: "14px" }}>
              Nhân viên phục vụ: <b>{nv?.ten}</b> (Trung bình: {nv?.danhGiaTrungBinh || 0} ★)
            </p>
            <p style={{ fontStyle: "italic", color: "#555" }}>"{dg.binhLuan}"</p>

            <div style={{ marginTop: "10px", paddingLeft: "20px", borderLeft: "3px solid #d90000" }}>
              {dg.phanHoi ? (
                <p style={{ color: "#27ae60", fontSize: "14px" }}>
                  <b>Phản hồi của shop:</b> {dg.phanHoi}
                </p>
              ) : (
                <div style={{ display: "flex", gap: "5px" }}>
                  <input 
                    style={{ ...inputStyle, flex: 1, marginBottom: 0 }} 
                    placeholder="Nhân viên phản hồi khách..."
                    value={inputPhanHoi[dg.id] || ""}
                    onChange={e => setInputPhanHoi({...inputPhanHoi, [dg.id]: e.target.value})}
                  />
                  <button 
                    style={{ ...btnStyle, background: "#34495e", padding: "2px 10px" }}
                    onClick={() => guiPhanHoi(dg.id)}
                  >
                    Trả lời
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}