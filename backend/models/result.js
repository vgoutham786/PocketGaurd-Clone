const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  totalPrincipal: {
    type: Number,
    required: true
  },
  totalInterest: {
    type: Number,
    required: true
  },
  percentagePaidInInterest: {
    type: String,
    required: true
  },
  monthsUntilDebtFree: {
    type: Number,
    required: true
  },
  debtFreeDate: {
    type: Date,
    required: true
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;