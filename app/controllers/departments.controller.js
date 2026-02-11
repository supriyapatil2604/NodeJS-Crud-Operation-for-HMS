const db = require("../models");
const Departments = db.departmentss;
const Op = db.Sequelize.Op;

// Create and Save a new Departments
exports.create = (req, res) => {
  // Validate request
  if (!req.body.department_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Departments
  const departments = {
    department_name: req.body.department_name,
    location: req.body.location
  };

  // Save Departments in the database
  Departments.create(departments)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Departments."
      });
    });
};

// Retrieve all Departmentss from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Departments.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Departmentss."
      });
    });
};

// Find a single Departments with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Departments.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Departments with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Departments with id=" + id
      });
    });
};

// Update a Departments by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
console.log(req.params.id);
  Departments.update(req.body, {
    where: { department_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Departments was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Departments with id=${id}. Maybe Departments was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error : " + id +" "+err
      });
    });
};

// Delete a Departments with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Departments.destroy({
    where: { department_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Departments was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Departments with id=${id}. Maybe Departments was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error :" + err
      });
    });
};

// Delete all Departmentss from the database.
exports.deleteAll = (req, res) => {
  Departments.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Departments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Departmentss."
      });
    });
};
