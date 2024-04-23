const express= require('express')
const { logincontroller, registercontroller } = require('../controllers/usercontroller')

//router object
const router= express.Router()

//router
//POST ||Login
router.post('/login',logincontroller);

//register
//POST\\Register 
router.post('/register',registercontroller );

module.exports=router