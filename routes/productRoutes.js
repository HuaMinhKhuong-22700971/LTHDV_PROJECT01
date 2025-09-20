const express = require('express');
const router = express.Router();
const c = require('../controllers/productController');

// danh sách sản phẩm
router.get('/', c.index);

// form thêm mới → đổi sang /new
router.get('/new', c.createForm);

// xử lý thêm mới
router.post('/new', c.create);

// form sửa
router.get('/:id/edit', c.editForm);

// xử lý cập nhật
router.post('/:id/edit', c.update);

// xoá
router.post('/:id/delete', c.delete);

module.exports = router;
