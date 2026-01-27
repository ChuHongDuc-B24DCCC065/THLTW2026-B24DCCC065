export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  products: OrderItem[];
  totalAmount: number;
  status: 'Chờ xử lý' | 'Đang giao' | 'Hoàn thành' | 'Đã hủy';
  createdAt: string;
}