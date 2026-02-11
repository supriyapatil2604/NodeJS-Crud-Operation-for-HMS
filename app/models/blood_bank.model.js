module.exports = (sequelize, Sequelize) => {
  const blood_bank = sequelize.define("blood_bank", {
   
    blood_id : {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    blood_type: {
      type: Sequelize.STRING
    },
     stock_quantity: {
      type: Sequelize.STRING
    }
  },
    {
    freezeTableName: true,
    timestamps: false // Disables createdAt and updatedAt
    });

  return blood_bank;
};
