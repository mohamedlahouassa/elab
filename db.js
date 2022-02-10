var mysql = require("mysql");
var mysqlHost = process.env.MYSQL_HOST || "localhost";
var mysqlPort = process.env.MYSQL_PORT || "3306";
var mysqlUser = process.env.MYSQL_USER || "root";
var mysqlPass = process.env.MYSQL_PASS || "root";
var mysqlDB = process.env.MYSQL_DB || "elab";

var con = mysql.createConnection({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPass,
  database: mysqlDB,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS elab", function (err, result) {
    if (err) throw err;
    con.query("use elab");
    con.query(
      "CREATE TABLE IF NOT EXISTS `clients` (`id` int(11) NOT NULL AUTO_INCREMENT ,`nom` varchar(150) NOT NULL,`prenom` varchar(150) NOT NULL,`tel` varchar(150) NOT NULL,`username` varchar(150) NOT NULL,`password` varchar(150) NOT NULL,`date_de_creation` datetime NOT NULL,PRIMARY KEY (id))"
    );
    con.query(
      "CREATE TABLE IF NOT EXISTS `resultat` (`id` int(11) NOT NULL AUTO_INCREMENT,`client_id` int(11) NOT NULL,`pdf` varchar(150) NOT NULL,`date_seen` datetime NOT NULL,`add_date` datetime NOT NULL, PRIMARY KEY (id))"
    );
  });
});

exports.con = con;
