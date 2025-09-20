const User = require('../models/User');

// Form đăng ký
exports.registerForm = (req,res) => {
  res.render('auth/register');
}

// Xử lý đăng ký
exports.register = async (req,res) => {
  try {
    const { username, password, email, phone } = req.body;
    await User.create({ username, password, email, phone });
    res.redirect('/login');
  } catch(err) {
    res.send('Lỗi: ' + err.message);
  }
}

// Form đăng nhập
exports.loginForm = (req,res) => {
  res.render('auth/login');
}

// Xử lý đăng nhập
exports.login = async (req,res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if(!user) return res.send('Không tìm thấy user');

  const match = await user.comparePassword(password);
  if(!match) return res.send('Sai mật khẩu');

  // Lưu session
  req.session.userId = user._id;
  req.session.role = user.role;
  res.redirect('/');
}

// Logout
exports.logout = (req,res) => {
  req.session.destroy(err=>{
    if(err) return res.send('Lỗi khi logout');
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
}
