//server.js

// After (수정 후)
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 기기 상태 저장 (fan_speed 추가)
let deviceState = {
  fan: 'OFF',
  fan_speed: 1, // 👈 팬 속도 상태 추가!
  uvc: 'OFF',
  led: {
    color: '#ffffff',
    isOn: false,
  },
  waterLevel: 0,
};

// [GET] 기기 상태 조회
app.get('/api/device/status', (req, res) => {
  console.log('📥 GET /api/device/status');
  res.json(deviceState);
});

// [POST] 기기 제어 (fan_speed 처리 로직 추가)
app.post('/api/device/control', (req, res) => {
  console.log('📥 POST /api/device/control:', req.body);
  const { target, value } = req.body;

  if (target === 'fan') {
    deviceState.fan = value;
  } else if (target === 'fan_speed') { // 👈 팬 속도 변경 주문 처리!
    deviceState.fan_speed = value;
  } else if (target === 'uvc') {
    deviceState.uvc = value;
  } else if (target === 'led') {
    deviceState.led = value;
  } else if (target === 'water_level') {
    deviceState.waterLevel = value;
  }

  console.log('✅ 상태 변경:', deviceState);
  res.json({ success: true, newState: deviceState });
});

app.listen(port, '0.0.0.0' , () => {
  console.log(`🚀 백엔드 서버 실행: http://localhost:${port}`);
});
