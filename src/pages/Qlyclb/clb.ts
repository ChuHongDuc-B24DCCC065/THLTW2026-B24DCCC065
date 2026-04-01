export interface HistoryLog {
  action: 'Approved' | 'Rejected';
  timestamp: string;
  admin: string;
  reason?: string;
}

export interface ClubRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: 'Nam' | 'Nữ';
  address: string;
  clubId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  skill: string;
  reason: string;
  rejectReason?: string;
  history: HistoryLog[];
}

export interface Club {
  id: string;
  name: string;
  avatar: string;
  foundingDate: string;
  description: string; // HTML string
  leader: string;
  isActive: boolean;
}