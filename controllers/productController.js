const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// danh sách sản phẩm + tìm kiếm/lọc
exports.index = async (req, res) => {
  try {
    const { name, supplierId } = req.query; // nhận query từ URL
    let filter = {};
    
    if (name) filter.name = new RegExp(name, 'i');      // tìm gần đúng
    if (supplierId) filter.supplierId = supplierId;    // lọc theo nhà cung cấp

    const products = await Product.find(filter).populate('supplierId');
    const suppliers = await Supplier.find();

    // truyền query vào view để giữ giá trị input/select khi search
    res.render('products/index', { products, suppliers, query: req.query });
  } catch (err) {
    res.send('Lỗi: ' + err.message);
  }
};

// form thêm mới
exports.createForm = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/create', { suppliers });
};

// xử lý thêm mới
exports.create = async (req, res) => {
  await Product.create(req.body);
  res.redirect('/products');
};

// form chỉnh sửa
exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render('products/edit', { product, suppliers });
};

// xử lý cập nhật
exports.update = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/products');
};

// xoá
exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};
