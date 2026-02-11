module.exports = (sequelize, Sequelize) => {
  const doctor_department = sequelize.define("doctor_department", {
    doctor_id : {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    department_id: {
      type: Sequelize.STRING
    }
  },
    {
     timestamps: false // Disables createdAt and updatedAt
   });

  return doctor_department;
};
