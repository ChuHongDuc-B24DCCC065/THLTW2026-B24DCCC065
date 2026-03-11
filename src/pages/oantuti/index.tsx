import { useState } from 'react';

function Oantuti() {
    const [result, setResult] = useState<string>('');
    const [history, setHistory] = useState<string[]>([]);
    const oot = ['Kéo', 'Búa', 'Bao'];

    const play = (ooti: string) => {
        const rd = oot[Math.floor(Math.random() * 3)];
        let currentResult = '';

        if (ooti === rd) {
            currentResult = "Hòa!";
        } else if (
            (ooti === 'Kéo' && rd === 'Bao') ||
            (ooti === 'Búa' && rd === 'Kéo') ||
            (ooti === 'Bao' && rd === 'Búa')
        ) {
            currentResult = "Thắng!";
        } else {
            currentResult = "Thua!";
        }

        setResult(currentResult);
        
        const historyLine = `Bạn chọn ${ooti} - Máy chọn ${rd} => ${currentResult}`;
        setHistory(prevHistory => [...prevHistory, historyLine]);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Oẳn Tù Tì</h2>
            {oot.map((item) => (
                <button key={item} onClick={() => play(item)} style={{ margin: '0 10px', padding: '5px 15px',color:"red" }}>
                    {item}
                </button>
            ))}
            
            <h3>Kết quả hiện tại: {result}</h3>

            <div style={{ marginTop: '20px' }}>
                <h4>Lịch sử đấu:</h4>
                <ul style={{ listStyleType: 'decimal' }}>
                    {history.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Oantuti;