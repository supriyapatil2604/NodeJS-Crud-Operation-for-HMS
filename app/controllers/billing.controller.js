const db = require("../models");
const Billing = db.billing;
const Op = db.Sequelize.Op;

// Create and Save a new billing
exports.create = (req, res) => {
  // Validate request
  
  if (!req.body.total_amount) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a billing
  const billing = {
    patient_id: req.body.patient_id,
    appointment_id: req.body.appointment_id,
    total_amount: req.body.total_amount,
    payment_status: req.body.payment_status,
    payment_date: req.body.payment_date,
    insurance_provider:req.body.insurance_provider
  };

  // Save billing in the database
  Billing.create(billing)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the billing."
      });
    });
};

// Retrieve all billings from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Billing.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving billings."
      });
    });
};

// Find a single billing with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Billing.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find billing with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving billing with id=" + id
      });
    });
};

// Update a billing by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
console.log(req.params.id);
  Billing.update(req.body, {
    where: { bill_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "billing was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update billing with id=${id}. Maybe billing was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error : " + id +" "+err
      });
    });
};

// Delete a billing with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Billing.destroy({
    where: { bill_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "billing was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete billing with id=${id}. Maybe billing was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error :" + err
      });
    });
};

// Delete all billings from the database.
exports.deleteAll = (req, res) => {
  Billing.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} billing were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all billings."
      });
    });
};
