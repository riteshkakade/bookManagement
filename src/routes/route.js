const express=require("express")

const userController=require("../controllers/userController")
const bookController=require("../controllers/bookController")
const {authentication,authorization,createAuthorize}=require("../middleware/auth")
const router = express.Router();

router.post('/register',userController.registerUser)
router.post('/login',userController.login)
router.post('/books',authentication,createAuthorize,bookController.createBook)
router.get('/books',authentication,bookController.getBooks)
router.get('/books/:bookId',authentication,bookController.getBookById)
router.put('/books/:bookId',authentication,authorization,bookController.updateBookById)
router.delete('/books/:bookId',authentication,authorization,bookController.deleteBookById)








module.exports = router;