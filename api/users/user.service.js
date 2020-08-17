const pool = require('../../config/database');
module.exports = {
  create: (data, callBack) => {
    pool.query('SELECT * FROM users where email=?',
      [data.email],
      (error, results1) => {
        if (error) {
          return callBack(error);
        }
        if(!results1[0]){
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
          )
        }else{
          console.log('User already exists');
          const err = new Error("This email is already associated with an account");
          return callBack(null, err.message, 0);
        }
        return false;
      }); 
    
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
  getUserByEmail: (email, callBack) => {
    pool.query(
      `select * from users where email=?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
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