const pool = require('../../config/database');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(firstName, lastName, gender, email, password, number)
            values(?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `select ID,firstName,lastName,gender,email,number from users`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserID: (ID, callBack) => {
    pool.query(
      `select ID,firstName,lastName,gender,email,number from users where ID=?`,
      [ID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update users set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where ID=?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.ID
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from users where ID=?`,
      [data.ID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};