import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err); // Add this line to reject the promise in case of an error
        }
      );
    });
  });

  return promise; // Add this line to ensure the promise is returned
};
export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO PLACES (title,imageUri,address,lat,lng) VALUES  (?,?,?,?,?);`,
        [title, imageUri, address, lat, lng],
        (_,result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err); // Add this line to reject the promise in case of an error
        }
      );
    });
  });
};
