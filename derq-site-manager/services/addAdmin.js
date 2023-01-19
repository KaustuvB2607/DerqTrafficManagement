const Admin = require("../DAO/adminSchema");

function addAdmin(adminInfo, res) {
  Admin.find({ username: adminInfo.username }, (error, result) => {
    if (error) {
      res.status(400);
      res.json({
        message: "Database error",
        type: "Error",
      });
    } else if (result.length > 0) {
      adminExists = true;
      res.status(500);
      res.type("application/json");
      res.end("Admin ID already exists");
    } else if (result.length === 0) {
      let newAdmin = new Admin({
        username: adminInfo.username,
        password: adminInfo.password,
      });

      newAdmin.save((err) => {
        if (err) res.json({ message: "Database error", type: "error" });
        else {
          res.status(202);
          res.json({
            message: "Created",
            type: "Success",
            admin: {
              username: adminInfo.username,
              password: adminInfo.password,
            },
          });
        }
      });
    }
  });
}

module.exports = addAdmin;
