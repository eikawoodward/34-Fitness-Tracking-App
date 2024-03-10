const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟用户数据存储
let users = [
  {
    id: 1,
    username: 'john_doe',
    workouts: [
      { id: 1, type: 'Running', duration: 30, date: '2024-03-08' },
      { id: 2, type: 'Weightlifting', duration: 45, date: '2024-03-09' },
    ],
    goals: [
      { id: 1, type: 'Run', target: 5, unit: 'km' },
      { id: 2, type: 'Weightlifting', target: 100, unit: 'kg' },
    ],
  },
  // 添加更多用户数据...
];

// 处理获取用户的健身数据请求
app.get('/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理添加新的锻炼记录请求
app.post('/workout/add', (req, res) => {
  const userId = req.body.userId;
  const { type, duration, date } = req.body;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const newWorkout = { id: user.workouts.length + 1, type, duration, date };
    user.workouts.push(newWorkout);
    res.json({ message: 'Workout added successfully', workout: newWorkout });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理设置目标请求
app.post('/goal/set', (req, res) => {
  const userId = req.body.userId;
  const { type, target, unit } = req.body;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const newGoal = { id: user.goals.length + 1, type, target, unit };
    user.goals.push(newGoal);
    res.json({ message: 'Goal set successfully', goal: newGoal });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
