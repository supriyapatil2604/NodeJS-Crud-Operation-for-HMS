const db = require("../models");
console.log(db);
const Ambulance_log = db.ambulance_log;
const Op = db.Sequelize.Op;

// Create and Save a new AmbulanceLog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.pickup_location) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a AmbulanceLog
  const ambulance_log = {
    ambulance_id: req.body.ambulance_id,
    patient_id: req.body.patient_id,
    pickup_location: req.body.pickup_location,
    dropoff_location: req.body.dropoff_location,
    pickup_time: req.body.pickup_time,
    dropoff_time: req.body.dropoff_time,
    status: req.body.status
  };

  // Save AmbulanceLog in the database
  Ambulance_log.create(ambulance_log)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the AmbulanceLog."
      });
    });
};

// Retrieve all ambulance_log from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Ambulance_log.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ambulance_log."
      });
    });
};

// Find a single AmbulanceLog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ambulance_log.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find AmbulanceLog with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving AmbulanceLog with id=" + id
      });
    });
};

// Update a AmbulanceLog by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
console.log(req.params.id);
  Ambulance_log.update(req.body, {
    where: { log_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AmbulanceLog was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update AmbulanceLog with id=${id}. Maybe AmbulanceLog was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error : " + id +" "+err
      });
    });
};

// Delete a AmbulanceLog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ambulance_log.destroy({
    where: { log_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AmbulanceLog was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete AmbulanceLog with id=${id}. Maybe AmbulanceLog was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error :" + err
      });
    });
};

// Delete all ambulance_log from the database.
exports.deleteAll = (req, res) => {
  Ambulance_log.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} AmbulanceLog were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ambulance_log."
      });
    });
};
