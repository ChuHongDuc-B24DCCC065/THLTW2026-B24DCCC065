export type TrangThai = "CHO_DUYET" | "XAC_NHAN" | "HOAN_THANH" | "HUY";

export interface nhanvien {
  id: number;
  ten: string;
  soKhachToiDa: number;
  lichLamViec: string;
  danhGiaTrungBinh?: number;
  tongDanhGia?: number;
}

export interface dichvu {
  id: number;
  ten: string;
  gia: number;
  thoiGian: number;
}

export interface lichhen {
  id: number;
  khachHang: string;
  nhanVienId: number;
  dichVuId: number;
  ngay: string;
  gio: string;
  trangThai: TrangThai;
}

export interface danhgia {
  id: number;
  lichHenId: number;
  nhanVienId: number;
  soSao: number;
  binhLuan: string;
  phanHoi?: string;
  ngayTao?: Date;
}
