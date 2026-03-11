export interface KhoiKienThuc {
  id: string;
  ten: string;
}

export interface MonHoc {
  id: string;
  maMon: string;
  tenMon: string;
  soTinChi: number;
}

export interface CauHoi {
  id: string;
  maCauHoi: string;
  monHocId: string;
  noiDung: string;
  mucDo: 'De' | 'TrungBinh' | 'Kho' | 'RatKho';
  khoiKienThucId: string;
  ngayTao: Date;
}

export interface CauTrucDeThi {
  id: string;
  tenCauTruc: string;
  monHocId: string;
  yeuCau: YeuCauCauHoi[];
}

export interface YeuCauCauHoi {
  khoiKienThucId: string;
  mucDo: 'De' | 'TrungBinh' | 'Kho' | 'RatKho';
  soLuong: number;
}

export interface DeThi {
  id: string;
  maDe: string;
  tenDe: string;
  monHocId: string;
  cauTrucId?: string;
  cauHoiIds: string[];
  ngayTao: Date;
}