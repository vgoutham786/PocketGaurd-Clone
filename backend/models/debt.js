const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
  
  principal: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  monthlyPayment: {
    type: Number,
    required: true
  },
  debtName: {
    type: String,
    required: true
  }
 
});
const Debt = mongoose.model('Debt', debtSchema);

module.exports ={Debt};