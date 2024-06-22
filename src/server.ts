import app from "./app";
import config from "./app/config";
import DatabaseConnection from "./dataBase/db";
DatabaseConnection();

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`This is server site running ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
