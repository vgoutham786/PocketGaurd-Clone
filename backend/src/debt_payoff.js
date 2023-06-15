const express = require('express');
const bodyParser = require('body-parser');

const debtrout = express.Router();
debtrout.use(bodyParser.json());
debtrout.use(bodyParser.urlencoded({ extended: true }));

debtrout.post('/calculate', (req, res) => {
  const data = req.body;

  const debts = data.debts;
  let totalPrincipal = 0;
  let totalInterest = 0;
  let totalPaid = 0;
  let monthsUntilDebtFree = 0;

  debts.forEach((debt) => {
    const { principal, interestRate, monthlyPayment } = debt;

    totalPrincipal += principal;
    const monthlyInterest = (principal * interestRate) / 100;
    totalInterest += monthlyInterest;

    const monthsToPayOff = Math.ceil(principal / monthlyPayment);
    monthsUntilDebtFree = Math.max(monthsUntilDebtFree, monthsToPayOff);
  });

  const percentagePaidInInterest = ((totalInterest / totalPrincipal) * 100).toFixed(1) + "%";

  const currentDate = new Date();
  const debtFreeDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthsUntilDebtFree, currentDate.getDate());
  const formattedDebtFreeDate = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(debtFreeDate);

  const response = {
    totalPrincipal,
    totalInterest,
    percentagePaidInInterest,
    monthsUntilDebtFree,
    debtFreeDate: formattedDebtFreeDate
  };

  res.json(response);
});

module.exports={debtrout} 