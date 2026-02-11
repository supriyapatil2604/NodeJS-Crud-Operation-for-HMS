module.exports = (sequelize, Sequelize) => {
  const Ambulance_log = sequelize.define("ambulance_log", {
    log_id : {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    ambulance_id :{
      type: Sequelize.NUMBER
    },
    patient_id:{
      type: Sequelize.NUMBER
    },
    pickup_location: {
      type: Sequelize.STRING
    },
    dropoff_location: {
      type: Sequelize.STRING
    },
    pickup_time: {
      type: Sequelize.STRING
    },
    dropoff_time: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  },
    {
      freezeTableName: true,
      timestamps: false // Disables createdAt and updatedAt
   });

  return Ambulance_log;
};