module.exports = (sequelize, Sequelize) => {
  const appointments = sequelize.define("appointments", {
    appointment_id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    patient_id: {
        type: Sequelize.NUMBER
    },
    doctor_id: {
        type: Sequelize.NUMBER
    },
    purpose: {
      type: Sequelize.STRING
    },
     status: {
      type: Sequelize.STRING
    },
    appointment_date: {
      type: Sequelize.DATE
    },
    appointment_time: {
      type: Sequelize.TIME
    }
  },
    {
     timestamps: false // Disables createdAt and updatedAt
   });

  return appointments;
};
