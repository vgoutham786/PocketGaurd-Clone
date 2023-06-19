const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const debtrout = express.Router();
debtrout.use(bodyParser.json());
debtrout.use(bodyParser.urlencoded({ extended: true }));
debtrout.use(cors()); // Add CORS middleware to allow cross-origin requests

debtrout.post('/calculate', (req, res) => {
  const data = req.body;

  const debts = data.debts;
 // console.log(debts)
  let totalPrincipal = 0;
  let totalInterest = 0;
  let totalPaid = 0;
  let monthsUntilDebtFree = 0;
  let minpay = 0;

  debts.forEach((debt) => {
    const { principal, interestRate, monthlyPayment } = debt;

    totalPrincipal += principal;
    minpay += principal;
    const remainingPrincipal = principal - monthlyPayment;
    const monthlyInterest = (remainingPrincipal * interestRate) / 100;
    totalInterest += monthlyInterest;
    totalPaid += monthlyPayment;

    monthsUntilDebtFree = Math.max(monthsUntilDebtFree, Math.ceil(remainingPrincipal / monthlyPayment));
  });

  const percentagePaidInInterest = ((totalInterest / totalPrincipal) * 100).toFixed(1) + "%";

  const currentDate = new Date();
  const debtFreeDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthsUntilDebtFree, currentDate.getDate());
  const formattedDebtFreeDate = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(debtFreeDate);

  res.send({
    totalPrincipal: totalPrincipal + totalInterest,
    totalInterest,
    percentagePaidInInterest,
    monthsUntilDebtFree,
    debtFreeDate: formattedDebtFreeDate,
    minpay
  });
});

module.exports = {debtrout};