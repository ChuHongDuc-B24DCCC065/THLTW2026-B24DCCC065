// travel.ts
export interface Destination {
    id: string;
    name: string;
    type: 'beach' | 'mountain' | 'city';
    image: string;
    rating: number;
    duration: number;        // giờ
    priceAvg: number;        // VNĐ - tổng giá
    description?: string;
    // Chi phí breakdown cho mỗi hạng mục
    costFood?: number;       // VNĐ - chi ăn uống
    costAccommodation?: number; // VNĐ - chi lưu trú
    costTransport?: number;  // VNĐ - chi di chuyển
}

export interface PlanItem extends Destination {
    date: string;            // YYYY-MM-DD
    order: number;
}

export interface BudgetItem {
    category: 'transport' | 'accommodation' | 'food' | 'ticket' | 'other';
    amount: number;
    note?: string;
    date?: string;           // Ngày chi tiêu
}

export interface MonthlyStats {
    month: string;
    itineraries: number;
    revenue: number;
}

// Mock Data
export const mockDestinations: Destination[] = [
    {
        id: '1',
        name: 'Vịnh Hạ Long',
        type: 'mountain',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mQer3feice_FSibvxUOY1lzWkra4fLca-A&s',
        rating: 4.8,
        duration: 8,
        priceAvg: 2500000,
        description: 'Di sản thiên nhiên thế giới',
        costFood: 800000,
        costAccommodation: 1200000,
        costTransport: 500000
    },
    {
        id: '2',
        name: 'Phú Quốc',
        type: 'beach',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPLeQKQrmqxxe9zUCUM1z7MGwKktPEY94UXQ&s',
        rating: 4.7,
        duration: 6,
        priceAvg: 1800000,
        description: 'Đảo ngọc thiên đường',
        costFood: 600000,
        costAccommodation: 900000,
        costTransport: 300000
    },
    {
        id: '3',
        name: 'Hà Nội',
        type: 'city',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-k2bnV_NWaJpzWibmx7rkLeyNoD8uFxHehw&s',
        rating: 4.5,
        duration: 4,
        priceAvg: 800000,
        description: 'Thủ đô nghìn năm văn hiến',
        costFood: 300000,
        costAccommodation: 300000,
        costTransport: 200000
    },
];