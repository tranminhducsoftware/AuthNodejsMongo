const router = require("express").Router();
const User = require("../model/User");
const verify = require("./verifyToken");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

// router.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

router.use(cors())
router.options('*', cors())

router.get("/", verify, (req, res) => {
  return res.status(200).send({ idRoom: uuidv4() });
});
router.get("/:room", verify, (req, res) => {
  // res.status(400).("room", { roomId: req.params.room });
  //   if (error) return res.status(200).send({ idRoom: req.params.room });
});
module.exports = router;
