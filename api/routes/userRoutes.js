const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser); 
router.post('/login', loginUser); 
router.get('/me', protect, getMe); 

module.exports  = router;




















//*********************************************************************************** */
// router.post("/signup", (req, res, next) => {
//     // Verify that first name is not empty
//     if (!req.body.firstName) {
//       res.statusCode = 500
//       res.send({
//         name: "FirstNameError",
//         message: "The first name is required",
//       })
//     } else {
//       User.register(
//         new User({ username: req.body.username }),
//         req.body.password,
//         (err, user) => {
//           if (err) {
//             res.statusCode = 500
//             res.send(err)
//           } else {
//             user.firstName = req.body.firstName
//             user.lastName = req.body.lastName || ""
//             const token = getToken({ _id: user._id })
//             const refreshToken = getRefreshToken({ _id: user._id })
//             user.refreshToken.push({ refreshToken })
//             user.save((err, user) => {
//               if (err) {
//                 res.statusCode = 500
//                 res.send(err)
//               } else {
//                 res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
//                 res.send({ success: true, token })
//               }
//             })
//           }
//         }
//       )
//     }
//   });