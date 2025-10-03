const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// 기기 상태 저장
let deviceState = {
  fan: 'OFF',
  uvc: 'OFF',
  led: {
    color: '#ffffff',
    isOn: false,
  },
  waterLevel: 0, // 초기값 0으로 변경 (80이면 항상 경고 표시)
};

// [GET] 기기 상태 조회
app.get('/api/device/status', (req, res) => {
  console.log('📥 GET /api/device/status');
  res.json(deviceState);
});

// [POST] 기기 제어
app.post('/api/device/control', (req, res) => {
  console.log('📥 POST /api/device/control:', req.body);
  const { target, value } = req.body;

  if (target === 'fan') {
    deviceState.fan = value;
  } else if (target === 'uvc') {
    deviceState.uvc = value;
  } else if (target === 'led') {
    deviceState.led = value;
  } else if (target === 'water_level') { // ⚠️ 언더스코어 사용!
    deviceState.waterLevel = value;
  }

  console.log('✅ 상태 변경:', deviceState);
  res.json({ success: true, newState: deviceState });
});

app.listen(port, '0.0.0.0' , () => {
  console.log(`🚀 백엔드 서버 실행: http://localhost:${port}`);
});