const Supplier = require('../models/Supplier');

// Danh sách nhà cung cấp
exports.index = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('suppliers/index', { suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi lấy danh sách nhà cung cấp");
  }
};

// Form thêm mới
exports.createForm = (req, res) => {
  res.render('suppliers/create');
};

// Xử lý thêm mới
exports.create = async (req, res) => {
  try {
    await Supplier.create(req.body);
    res.redirect('/suppliers');
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi thêm nhà cung cấp");
  }
};

// Form chỉnh sửa
exports.editForm = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).send("Nhà cung cấp không tồn tại");
    res.render('suppliers/edit', { supplier });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi lấy thông tin nhà cung cấp");
  }
};

// Xử lý cập nhật
exports.update = async (req, res) => {
  try {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/suppliers');
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi cập nhật nhà cung cấp");
  }
};

// Xử lý xoá
exports.delete = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi xoá nhà cung cấp");
  }
};
