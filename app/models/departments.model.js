module.exports = (sequelize, Sequelize) => {
  const Departments = sequelize.define("departments", {
   
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

  return Departments;
};
