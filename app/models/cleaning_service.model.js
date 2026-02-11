module.exports = (sequelize, Sequelize) => {
  const cleaning_service = sequelize.define("cleaning_service", {
   
    department_id : {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    department_name: {
      type: Sequelize.STRING
    },
     location: {
      type: Sequelize.STRING
    }
  },
    {
     timestamps: false // Disables createdAt and updatedAt
   });

  return cleaning_service;
};
