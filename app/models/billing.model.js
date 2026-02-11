module.exports = (sequelize, Sequelize) => {
  const billing = sequelize.define("billing", {
    bill_id : {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    patient_id: {
      type: Sequelize.NUMBER
    },
     appointment_id: {
      type: Sequelize.NUMBER
    },
     total_amount: {
      type: Sequelize.NUMBER
    },
     payment_status: {// `payment_status`, `payment_date`, `insurance_provider`, `created_at`
      type: Sequelize.STRING
    },
     payment_date: {
      type: Sequelize.DATE
    },
     insurance_provider: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false // Disables createdAt and updatedAt
  });

  return billing;
};
