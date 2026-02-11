const db = require("../models");
const Blood_bank = db.blood_bank;
const Op = db.Sequelize.Op;

// Create and Save a new blood_bank
exports.create = (req, res) => {
  // Validate request
  if (!req.body.blood_type) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a blood_bank
  const blood_bank = {
    blood_type: req.body.blood_type,
    stock_quantity: req.body.stock_quantity
  };

  // Save blood_bank in the database
  Blood_bank.create(blood_bank) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the blood_bank."
      });
    });
};

// Retrieve all blood_banks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  blood_bank.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blood_banks."
      });
    });
};

// Find a single blood_bank with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Blood_bank.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find blood_bank with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving blood_bank with id=" + id
      });
    });
};

// Update a blood_bank by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
console.log(req.params.id);
  Blood_bank.update(req.body, {
    where: { blood_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "blood_bank was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update blood_bank with id=${id}. Maybe blood_bank was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error : " + id +" "+err
      });
    });
};

// Delete a blood_bank with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Blood_bank.destroy({
    where: { blood_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "blood_bank was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete blood_bank with id=${id}. Maybe blood_bank was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error :" + err
      });
    });
};

// Delete all blood_banks from the database.
exports.deleteAll = (req, res) => {
  Blood_bank.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} blood_bank were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all blood_banks."
      });
    });
};
