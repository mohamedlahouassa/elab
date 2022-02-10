var express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const { con } = require("../../db");
const { user } = require("../Labinfo");
const multer = require("multer");
const vTok = (req, res, next) => {
  var token = req.headers["x-access-token"];
  if (req.params.token) {
    token = req.params.token;
  }
  if (!token) {
    res.send("no token");
  } else {
    jwt.verify(token, "Elablab20", (err, decoded) => {
      if (err) {
        res.send("err token false");
      } else {
        req.userId = decoded.username;
        next();
      }
    });
  }
};

router.get("/isAuth", vTok, (req, res) => {
  if (req.userId == user.username) {
    res.json({ auth: true, user: user });
  } else {
    res.json({
      auth: false,
      message: "wrong combination Username/password",
    });
  }
});
router.post("/getFilesLab", vTok, (req, res) => {
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

router.get("/getDataLab/:id/:token", vTok, (req, res) => {
  const re = req.params.id;
  var path = require("path");
  res.download(path.join("uploads", re), re, (err) => {
    if (err) console.log(err);
  });
});
router.delete("/deleteData/:id/:name", vTok, (req, res) => {
  var name = req.params.name;

  var id = req.params.id;
  con.query("delete from resultat where id =?", [id], (err, resui) => {
    if (err) throw err;
    path = "./uploads/" + name;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);

        return;
      }

      res.send({ op: true, message: "success" });
    });
  });
});
router.post("/log", (req, res) => {
  const resReq = req.body;
  if (user.username == resReq.username && user.password == resReq.password) {
    const token = jwt.sign(
      { username: user.username, password: user.password },
      "Elablab20",
      { expiresIn: 300 }
    );
    res.send({ auth: true, token: token, user: user });
  } else {
    res.json({
      auth: false,
      message: "wrong combination Username/password",
    });
  }
});

router.post("/getClient", vTok, (req, res) => {
  con.query("select * from clients where true", (err, result) => {
    if (err) throw err;
    res.send({ ope: true, data: result });
  });
});

router.post("/createUser", vTok, (req, res) => {
  const data = req.body;
  con.query(
    "insert into clients(nom,prenom,tel,username,password,date_de_creation)values(?,?,?,?,?,?)",
    [data.nom, data.prenom, data.tel, data.username, data.password, new Date()],
    (err, result) => {
      if (err) {
        res.send({
          op: false,
          message: "erreur dans la base de donnes",
        });
      } else {
        res.send({ op: true, user: data });
      }
    }
  );
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const clientId = req.body.clientId;
    let extArray = file.originalname.split(".");
    let ex = extArray[extArray.length - 1].toLowerCase();
    if (ex == "pdf") {
      const name = Date.now() + "-" + clientId + "-" + file.originalname;
      cb(null, name);
      con.query(
        "insert into resultat (client_id,pdf,add_date,date_seen)values(?,?,?,?)",
        [clientId, name, new Date(), false],
        (err, res) => {
          if (err) throw err;
        }
      );
    } else {
      console.log("can't babe ");
    }
  },
});

router.post("/getSignleClient", vTok, (req, res) => {
  con.query(
    "select * from clients where id= ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});
const uploadStorage = multer({ storage: storage });
router.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  return res.send("Single file");
});

module.exports = router;
