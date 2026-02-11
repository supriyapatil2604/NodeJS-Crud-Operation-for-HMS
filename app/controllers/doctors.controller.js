const db = require("../models");
const Doctors = db.doctors;
const Op = db.Sequelize.Op;

// Create and Save a new doctors
exports.create = (req, res) => {
  // Validate request
  if (!req.body.first_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a doctors
  
  const doctors = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    specialty: req.body.specialty,
    contact_number: req.body.contact_number,
    email: req.body.email,
    available_schedule: req.body.available_schedule
  };

  // Save doctors in the database
  Doctors.create(doctors)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Doctors."
      });
    });
};

// Retrieve all doctorss from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Doctors.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving doctorss."
      });
    });
};

// Find a single doctors with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Doctors.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find doctors with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving doctors with id=" + id
      });
    });
};

// Update a doctors by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
console.log(req.params.id);
  Doctors.update(req.body, {
    where: { doctor_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "doctors was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update doctors with id=${id}. Maybe doctors was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error : " + id +" "+err
      });
    });
};

// Delete a doctors with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Doctors.destroy({
    where: { doctor_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "doctors was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete doctors with id=${id}. Maybe doctors was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error :" + err
      });
    });
};

// Delete all doctorss from the database.
exports.deleteAll = (req, res) => {
  Doctors.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} doctors were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all doctorss."
      });
    });
};
