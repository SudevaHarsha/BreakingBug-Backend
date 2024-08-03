const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');

const {
    sellerRegister,
    sellerLogIn
} = require('../controllers/sellerController.js');  // orderController.js -> sellerController.js

const {
    productCreate,
    getProducts,
    getProductDetail,
    searchProductbyCategory,
    searchProduct,              // import added
    searchProductbySubCategory, // import added
    getSellerProducts,
    updateProduct,
    deleteProduct,
    deleteProducts,
    deleteProductReview,
    deleteAllProductReviews,
    addReview,
    getInterestedCustomers,
    getAddedToCartProducts,
} = require('../controllers/productController.js');

const {
    customerRegister,
    customerLogIn,
    getCartDetail,
    cartUpdate
} = require('../controllers/customerController.js');

const {
    newOrder,
    getOrderedProductsBySeller,
    getOrderedProductsByCustomer // import added
} = require('../controllers/orderController.js');


// Seller
router.post('/SellerRegister', sellerRegister);
router.post('/SellerLogin', sellerLogIn);

// Product
router.post('/ProductCreate', productCreate);
router.get('/getSellerProducts/:id', getSellerProducts);
router.get('/getProducts', getProducts);
router.get('/getProductDetail/:id', getProductDetail);
router.get('/getInterestedCustomers/:id', getInterestedCustomers);
router.get('/getAddedToCartProducts/:id', getAddedToCartProducts);

router.put('/ProductUpdate/:id', updateProduct);
router.put('/addReview/:id', addReview);

router.get('/searchProduct/:key', searchProduct);                            // searchProductByCategory -> searchProduct
router.get('/searchProductbyCategory/:key', searchProductbyCategory);
router.get('/searchProductbySubCategory/:key', searchProductbySubCategory);  // searchProductByCategory -> searchProductBySubCategory

router.delete('/DeleteProduct/:id', deleteProduct);
router.delete('/DeleteProducts/:id', deleteProducts);
router.put ('/deleteProductReview/:id', deleteProductReview);                // delete method -> put method
router.put ('/deleteAllProductReviews/:id', deleteAllProductReviews);

// Customer
router.post('/CustomerRegister', customerRegister);
router.post('/CustomerLogin', customerLogIn);
router.get('/getCartDetail/:id', getCartDetail);
router.put('/CustomerUpdate/:id', cartUpdate);

// Order
router.post('/newOrder', newOrder);
router.get('/getOrderedProductsByCustomer/:id', getOrderedProductsByCustomer); // getOrderedProductsBySeller -> getOrderedProductsByCustomer
router.get('/getOrderedProductsBySeller/:id', getOrderedProductsBySeller);

module.exports = router; // export statement is added