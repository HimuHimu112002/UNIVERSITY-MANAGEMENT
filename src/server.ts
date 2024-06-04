import app from "./app";
import DatabaseConnection from "./dataBase/db";
DatabaseConnection()

async function main() {
  try {
    app.listen(5000, () => {
      console.log(`This is server site running 5000`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
