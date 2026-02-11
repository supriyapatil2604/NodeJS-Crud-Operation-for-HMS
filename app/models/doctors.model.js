module.exports = (sequelize, Sequelize) => {
  const doctors = sequelize.define("doctors", {
    doctor_id : {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING
    },
     last_name: {
      type: Sequelize.STRING
    },
     specialty: {
      type: Sequelize.STRING
    },
     contact_number: {
      type: Sequelize.NUMBER
    },
     email: {
      type: Sequelize.STRING
    },
    available_schedule: {
      type: Sequelize.STRING
    }
  },
    {
     timestamps: false // Disables createdAt and updatedAt
   });

  return doctors;
};
