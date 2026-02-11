module.exports = (sequelize, Sequelize) => {
  const Ambulance = sequelize.define("ambulance", {
   
    ambulance_id : {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    ambulance_number: {
      type: Sequelize.STRING
    },
    availability: {
      type:Sequelize.STRING
    },
    driver_id:{
      type:Sequelize.STRING
    },
    last_service_date: {
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true,
     timestamps: false // Disables createdAt and updatedAt
});

  return Ambulance;
};