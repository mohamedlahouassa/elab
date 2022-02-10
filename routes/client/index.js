var express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const { con } = require("../../db");
const { user } = require("../Labinfo");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("no token");
  } else {
    jwt.verify(token, "ElabHm", (err, decoded) => {
      if (err) {
        res.send("err token false");
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
router.get("/isAuth", verifyToken, (req, res) => {
  const id = req.userId;
  con.query("SELECT * from clients where id=?", [id], (erra, result) => {
    if (erra) throw erra;
    if (result.length > 0) {
      res.json({ auth: true, user: result[0] });
    } else {
      res.json({
        auth: false,
        message: "wrong combination Username/password",
      });
    }
  });
});

router.post("/getLab", verifyToken, (req, res) => {
  res.send(user);
});
router.post("/seen", verifyToken, (req, res) => {
  con.query(
    "update resultat set date_seen =? where id=?",
    [new Date(), req.body.id],
    (err, resu) => {
      if (err) throw err;
      res.send("seen");
    }
  );
});

//recupuration des fichiers pour client

router.post("/getFiles", verifyToken, (req, res) => {
  const clientId = req.body.clientId;
  con.query(
    "select * from resultat where client_id=?",
    [clientId],
    (err, result) => {
      if (err) throw err;
      res.send({ auth: true, files: result });
    }
  );
});
//download des fichiers

router.get("/getData/:id/:token", (req, res) => {
  const re = req.params.id;

  var path = require("path");

  res.download(path.join("uploads", re), re, (err) => {
    if (err) console.log(err);
  });
});

//login client
const login = (req, res, next) => {
  const user = req.body;
  con.query(
    "SELECT * from clients where username=? and password=?",
    [user.username, user.password],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const id = result[0].id;
        const username = user.username;
        const password = user.password;
        const token = jwt.sign(
          { id: id, username: username, password: password },
          "ElabHm",
          { expiresIn: 300 }
        );
        res.json({ auth: true, token: token, user: result[0] });
      } else {
        res.json({
          auth: false,
          message: "wrong combination Username/password",
        });
      }
    }
  );
};

router.post("/login", login, (req, res) => {});
module.exports = router;
