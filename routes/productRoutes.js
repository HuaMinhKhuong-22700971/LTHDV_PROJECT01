const express = require('express');
const router = express.Router();
const c = require('../controllers/productController');

// danh sách sản phẩm
router.get('/', c.index);


router.get('/create', c.createForm);


// xử lý thêm mới
router.post('/create', c.create);

// form sửa
router.get('/:id/edit', c.editForm);

// xử lý cập nhật
router.post('/:id/edit', c.update);

// xoá
router.post('/:id/delete', c.delete);

module.exports = router;
