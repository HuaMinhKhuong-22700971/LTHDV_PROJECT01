require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// ===== Kết nối MongoDB =====
mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));

// ===== Middleware =====
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

// ===== Cấu hình Cookie & Session =====
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard-cat',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,       // bảo mật, ngăn JS trên trình duyệt đọc cookie
    maxAge: 1000*60*60    // session tồn tại 1 giờ
  }
}));

// ===== ROUTES TEST SESSION =====
app.get('/set-session', (req, res) => {
  req.session.username = "admin";
  res.send("Đã set session username = admin");
});

app.get('/get-session', (req, res) => {
  res.send(req.session.username || "Chưa có session");
});

app.get('/destroy-session', (req, res) => {
  req.session.destroy(err => {
    if(err) return res.send("Lỗi khi xoá session");
    res.clearCookie('connect.sid');
    res.send("Đã xoá session & cookie");
  });
});

// ===== ROUTES CHÍNH =====
//app.use('/', require('./routes/authRoutes'));           // đăng ký, login, logout
app.use('/suppliers', require('./routes/supplierRoutes')); // CRUD supplier
app.use('/products', require('./routes/productRoutes'));

  // CRUD product + tìm kiếm

// ===== START SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server chạy tại http://localhost:${PORT}`));
