const db = require("../models");
const cleaning_service = db.cleaning_services;
const Op = db.Sequelize.Op;

// Create and Save a new cleaning_service
exports.create = (req, res) => {
  // Validate request
  if (!req.body.department_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a cleaning_service
  const cleaning_service = {
    department_name: req.body.department_name,
    location: req.body.location
  };

  // Save cleaning_service in the database
  cleaning_service.create(cleaning_service)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cleaning_service."
      });
    });
};

// Retrieve all cleaning_services from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  cleaning_service.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cleaning_services."
      });
    });
};

// Find a single cleaning_service with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  cleaning_service.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find cleaning_service with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving cleaning_service with id=" + id
      });
    });
};

// Update a cleaning_service by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
console.log(req.params.id);
  cleaning_service.update(req.body, {
    where: { department_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "cleaning_service was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update cleaning_service with id=${id}. Maybe cleaning_service was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error : " + id +" "+err
      });
    });
};

// Delete a cleaning_service with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  cleaning_service.destroy({
    where: { department_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "cleaning_service was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete cleaning_service with id=${id}. Maybe cleaning_service was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error :" + err
      });
    });
};

// Delete all cleaning_services from the database.
exports.deleteAll = (req, res) => {
  cleaning_service.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} cleaning_service were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cleaning_services."
      });
    });
};
