const express = require('express');
const router = express.Router();
const c = require('../controllers/supplierController');

// danh sách nhà cung cấp
router.get('/', c.index);

// form thêm mới → đổi sang /new
router.get('/create', c.createForm);

// xử lý thêm mới
router.post('/create', c.create);

// form chỉnh sửa
router.get('/:id/edit', c.editForm);

// xử lý cập nhật
router.post('/:id/edit', c.update);

// xoá
router.post('/:id/delete', c.delete);

module.exports = router;
