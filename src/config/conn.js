import { Sequelize } from "sequelize";

const conn = new Sequelize("bdtest", "root", "Sen@iDev77!.", {
  host: "localhost",
  dialect: "mysql",
});

export default conn;
