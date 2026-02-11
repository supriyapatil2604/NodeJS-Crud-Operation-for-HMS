const db = require("../models");
const Ambulance = db.ambulance;
const Op = db.Sequelize.Op;

// Create and Save a new Ambulance
exports.create = (req, res) => {
  // Validate request
  if (!req.body.ambulance_number) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a ambulance
  const ambulance = {
    ambulance_number: req.body.ambulance_number,
    driver_id: req.body.driver_id,
    last_service_date: req.body.last_service_date,
    availability: req.body.availability
  };

  // Save ambulance in the database
  Ambulance.create(ambulance)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ambulance."
      });
    });
};

// Retrieve all ambulances from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Ambulance.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ambulances."
      });
    });
};

// Find a single ambulance with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ambulance.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ambulance with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ambulance with id=" + id
      });
    });
};

// Update a ambulance by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
console.log(req.params.id);
  Ambulance.update(req.body, {
    where: { ambulance_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ambulance was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ambulance with id=${id}. Maybe ambulance was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error : " + id +" "+err
      });
    });
};

// Delete a ambulance with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ambulance.destroy({
    where: { ambulance_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ambulance was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ambulance with id=${id}. Maybe ambulance was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error :" + err
      });
    });
};

// Delete all ambulances from the database.
exports.deleteAll = (req, res) => {
  Ambulance.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} ambulance were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ambulances."
      });
    });
};
