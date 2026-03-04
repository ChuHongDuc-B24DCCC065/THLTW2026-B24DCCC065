import React, { useState, useEffect } from 'react';
import { Card, InputNumber, Button, Typography, message } from 'antd';

const GuessNumberGame: React.FC = () => {
  const [ketQua, setKetQua] = useState(0);
  const [soNhapVao, setSoNhapVao] = useState<number | null>(null);
  const [soLuot, setSoLuot] = useState(10);
  const [lichSu, setLichSu] = useState<string[]>([]);
  const [hetGame, setHetGame] = useState(false);
  const batDauLai = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setKetQua(randomNum);
    setSoLuot(10);
    setLichSu([]);
    setHetGame(false);
    setSoNhapVao(null);
    // console.log("Số bí mật là: ", randomNum); 
  };

  useEffect(() => { 
    batDauLai(); 
  }, []);

  const xuLyDoanSo = () => {
    if (soNhapVao === null) {
      return;
    }
    
    const luotConLai = soLuot - 1;
    setSoLuot(luotConLai);

    let textThongBao = "";

    if (soNhapVao === ketQua) {
      textThongBao = 'Chúc mừng! Bạn đã đoán đúng!';
      message.success(textThongBao);
      setHetGame(true);
    } else if (luotConLai === 0) {
      textThongBao = `Bạn đã hết lượt! Số đúng là ${ketQua}`;
      message.error(textThongBao);
      setHetGame(true);
    } else {
      if (soNhapVao < ketQua) {
        textThongBao = 'Bạn đoán quá thấp!';
      } else {
        textThongBao = 'Bạn đoán quá cao!';
      }
      message.warning(textThongBao);
    }
    
    // Thêm vào lịch sử
    const dongLichSu = `Lần ${10 - luotConLai}: ${soNhapVao} - ${textThongBao}`;
    setLichSu([dongLichSu, ...lichSu]);
    
    // Xóa số vừa nhập
    setSoNhapVao(null);
  };

  return (
    <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
      <Card title="TRÒ CHƠI ĐOÁN SỐ (1 - 100)" style={{ width: 500, textAlign: 'center' }}>
        
        <Typography.Title level={4} style={{ color: 'red' }}>
          Số lượt còn lại: {soLuot}
        </Typography.Title>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <InputNumber
            min={1} 
            max={100}
            style={{ width: '100%', marginBottom: 10 }}
            value={soNhapVao}
            onChange={(v) => setSoNhapVao(v)}
            disabled={hetGame}
            placeholder="Nhập số dự đoán"
            onPressEnter={xuLyDoanSo}
          />
          <Button 
            type="primary" 
            block 
            onClick={xuLyDoanSo} 
            disabled={hetGame || soNhapVao === null}
            style={{ marginBottom: 10 }}
          >
            Đoán
          </Button>
          <Button block onClick={batDauLai}>
            Chơi lại
          </Button>
        </div>

        <div style={{ textAlign: 'left', marginTop: 20 }}>
          <b>Lịch sử dự đoán:</b>
          <div style={{ maxHeight: 200, overflowY: 'auto', marginTop: 10 }}>
            {lichSu.map((item, index) => (
              <div key={index}>
                <Typography.Text code>{item}</Typography.Text>
              </div>
            ))}
          </div>
        </div>

      </Card>
    </div>
  );
};

export default GuessNumberGame;