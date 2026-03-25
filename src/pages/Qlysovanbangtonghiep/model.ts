export interface TruongCauHinh {
  id: number;
  tenTruong: string;
  kieuDuLieu: "String" | "Number" | "Date";
}

export interface SoVanBang {
  id: number;
  nam: number;
  soVaoSoHienTai: number;
}

export interface QuyetDinh {
  id: number;
  soQD: string;
  ngayBanHanh: string;
  trichYeu: string;
  soVanBangId: number;
  luotTraCuu: number;
}

export interface VanBang {
  id: number;
  soVaoSo: number;
  soHieuVanBang: string;
  maSV: string;
  hoTen: string;
  ngaySinh: string;
  quyetDinhId: number;
  duLieuPhuLuc: Record<string, any>;
}