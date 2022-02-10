var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
const jwt = require("jsonwebtoken");
var mysql = require("mysql");
const multer = require("multer");
var fs = require("fs");
const yaml = require("yaml");
const { exec } = require("child_process");

var con = mysql.createConnection({
  host: "localhost",
  user: "hamoudi",
  password: "mypass2021b",
  database: "elabs",
});
con.connect();
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("hamouid");
});
const user = {
  name: "dekkiche",
  username: "lab_dekkiche",
  password: "dekkiche20",
};
//------------------Client--------------------\\
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
//verifer l'uthentification au debut
app.get("/isAuth", verifyToken, (req, res) => {
  const id = req.userId;
  con.query("SELECT * from users where id=?", [id], (erra, result) => {
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

app.post("/getLab", verifyToken, (req, res) => {
  con.query(
    "select username from labu where id=?",
    [req.body.id],
    (err, result) => {
      res.send(result[0]);
    }
  );
});
app.post("/seen", verifyToken, (req, res) => {
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

app.post("/getFiles", verifyToken, (req, res) => {
  const labId = req.body.labId;
  const clientId = req.body.clientId;
  con.query(
    "select * from resultat where lab_id=? and client_id=?",
    [labId, clientId],
    (err, result) => {
      if (err) throw err;
      res.send({ auth: true, files: result });
    }
  );
});
//download des fichiers

app.get("/getData/:id/:token", (req, res) => {
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
    "SELECT * from users where username=? and password=?",
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

app.post("/login", login, (req, res) => {});
//-----------------------laboratoire------------------//

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
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/LabisAuth", vTok, (req, res) => {
  const id = req.userId;
  con.query("SELECT * from labu where id=?", [id], (erra, result) => {
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
app.post("/getFilesLab", vTok, (req, res) => {
  const labId = req.body.labId;
  const clientId = req.body.clientId;
  con.query(
    "select * from resultat where lab_id=? and client_id=?",
    [labId, clientId],
    (err, result) => {
      if (err) throw err;
      res.send({ auth: true, files: result });
    }
  );
});
//download des fichiers

app.get("/getDataLab/:id/:token", vTok, (req, res) => {
  const re = req.params.id;
  console.log(req.params.token);
  var path = require("path");
  console.log(re);

  res.download(path.join("uploads", re), re, (err) => {
    if (err) console.log(err);
  });
});
app.delete("/deleteData/:id/:name", vTok, (req, res) => {
  var name = req.params.name;

  var id = req.params.id;
  con.query("delete from resultat where id =?", [id], (err, resui) => {
    if (err) throw err;
    console.log(resui);
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
app.post("/log", (req, res) => {
  const resReq = req.body;
  console.log("ida mchat fort bzaffff");
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

app.post("/getClient", vTok, (req, res) => {
  const id = req.userId;
  con.query("select * from users where lab_id=?", [id], (err, result) => {
    if (err) throw err;
    res.send({ ope: true, data: result });
  });
});
app.post("/addLab", (req, res) => {
  var { name, username, email, password, phone, wilaya } = req.body;

  username = filter(username.trim());
  console.log(username);
  if (
    name.trim() == "" ||
    username.trim() == "" ||
    email.trim() == "" ||
    password.trim() == "" ||
    phone.trim() == ""
  ) {
    res.send({ succ: false, message: "champ vide" });
  }
  con.query(
    "insert into labu (name,email,phone,username,password,location)values(?,?,?,?,?,?)",
    [name, email, phone, username, password, wilaya],
    (err, resol) => {
      if (err) throw err;
      else {
        const doc = new yaml.Document();
        doc.contents = generateObject(req.body);
        fs.mkdir(username, (err) => {
          if (err) throw err;
          console.log(username + " directory is created !! ");
        });
        fs.writeFileSync(
          username + "/docker-compose.yaml",
          doc.toString(),
          (err) => {
            if (err) throw err;
          }
        );
        exec(
          "cd " + username + "&& docker-compose up -d",
          (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
          }
        );
        res.json({ succ: true, message: "operation succeed" });
      }
    }
  );
});
const filter = (a) => {
  var b = a;
  b = b.replace(/ /g, "");
  b = b.replace(/[^\w\s]/gi, "");
  return b;
};

app.post("/createUser", vTok, (req, res) => {
  const data = req.body;
  const id = req.userId;
  con.query(
    "insert into users(lab_id,nom,prenom,tel,username,password,date_de_creation)values(?,?,?,?,?,?,?)",
    [
      id,
      data.nom,
      data.prenom,
      data.tel,
      data.username,
      data.password,
      new Date(),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
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
    const labId = req.body.labId;
    const clientId = req.body.clientId;
    let extArray = file.originalname.split(".");
    let ex = extArray[extArray.length - 1].toLowerCase();
    if (ex == "pdf") {
      const name =
        Date.now() + "-" + labId + "-" + clientId + "-" + file.originalname;
      cb(null, name);
      con.query(
        "insert into resultat (lab_id,client_id,pdf,add_date,date_seen)values(?,?,?,?,?)",
        [labId, clientId, name, new Date(), false],
        (err, res) => {
          if (err) throw err;
        }
      );
    } else {
      console.log("can't babe ");
    }
  },
});

app.post("/getSignleClient", vTok, (req, res) => {
  con.query("select * from users where id= ?", [req.body.id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});
const uploadStorage = multer({ storage: storage });

app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  return res.send("Single file");
});

app.listen(3001, function () {
  console.log("Server listeninng in 3001");
});
