const Admin = require("../DAO/adminSchema");

function getAllAdminsList(res) {
    Admin.find({}, (error, result) => {
        if(error) {
          res.status(400);
          res.json({
            message: "Database error",
            type: "Error"
          })
        }else {
          res.status(200);
          res.type("application/json");
          res.json(result);
        }
      })
}

module.exports = getAllAdminsList;
