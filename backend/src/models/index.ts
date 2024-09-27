import { Sequelize } from "sequelize";
import ActiveGames from "./ActiveGames";

const PGHOST = process.env.PGHOST as string;
const PGPORT = process.env.PGPORT as string;
const PGUSER = process.env.PGUSER as string;
const PGPASSWORD = process.env.PGPASSWORD as string;
const PGDATABASE = process.env.PGDATABASE as string;

const sequelize = new Sequelize(
  `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`,
);
// const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
//   dialect: "postgres",
//   dialectOptions: {
//   },
// });

const sync = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Postgres Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const db = {
  sequelize,
  sync,
  ActiveGames: ActiveGames(sequelize),
};

export default db;
