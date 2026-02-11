const db = require("../models");
const Appointments = db.appointments;
const Op = db.Sequelize.Op;

// Create and Save a new Appointments
exports.create = (req, res) => {
  // Validate request
  if (!req.body.appointment_date) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Appointments
  const appointments = {
    purpose: req.body.purpose,
    status: req.body.status,
    appointment_date: req.body.appointment_date,
    appointment_time: req.body.appointment_time,
    doctor_id: req.body.doctor_id,
    patient_id: req.body.patient_id
  };

  // Save Appointments in the database
  Appointments.create(appointments)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Appointments."
      });
    });
};

// Retrieve all appointments from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Appointments.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointments."
      });
    });
};

// Find a single Appointments with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Appointments.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Appointments with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Appointments with id=" + id
      });
    });
};

// Update a Appointments by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
console.log(req.params.id);
  Appointments.update(req.body, {
    where: { appointment_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Appointments was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Appointments with id=${id}. Maybe Appointments was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error : " + id +" "+err
      });
    });
};

// Delete a Appointments with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Appointments.destroy({
    where: { appointment_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Appointments was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Appointments with id=${id}. Maybe Appointments was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error :" + err
      });
    });
};

// Delete all appointments from the database.
exports.deleteAll = (req, res) => {
  Appointments.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Appointments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all appointments."
      });
    });
};
