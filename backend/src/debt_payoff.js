
const express = require('express');
const debtrout = express.Router();
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
debtrout.use(bodyParser.json());

// API endpoint for debt calculation
debtrout.post('/calculateDebts', (req, res) => {
  const debts = req.body.debts;

  if (!Array.isArray(debts)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  let totalInterest = 0;
  let totalPrincipal = 0;

  debts.forEach((debt) => {
    const principal = parseFloat(debt.principal);
    const interestRate = parseFloat(debt.interestRate) / 100; // Convert interest rate to decimal
    const monthlyPayment = parseFloat(debt.monthlyPayment);
    const debtName = debt.debtName;

    if (isNaN(principal) || isNaN(interestRate) || isNaN(monthlyPayment) || !debtName) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    let remainingDebt = principal;
    let interest = 0;
    let months = 0;

    while (remainingDebt > 0) {
      interest = remainingDebt * (interestRate / 12);
      const totalPayment = monthlyPayment + interest;
      remainingDebt -= totalPayment;
      months++;
    }

    const currentDebtInterest = interest.toFixed(2);
    totalInterest += parseFloat(currentDebtInterest);
    totalPrincipal += principal;
  });

  const percentagePaidInInterest = ((totalInterest / totalPrincipal) * 100).toFixed(2);
  const monthsToDebtFree = Math.ceil(totalPrincipal / req.body.monthlyPayment);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  let debtFreeYear = currentYear + Math.floor((currentMonth + monthsToDebtFree) / 12);
  let debtFreeMonth = (currentMonth + monthsToDebtFree) % 12;
  if (debtFreeMonth === 0) {
    debtFreeMonth = 12; // December
    debtFreeYear -= 1;
  }

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const debtFreeDateFormatted = `${monthNames[debtFreeMonth - 1]} ${debtFreeYear}`;

  const response = {
    totalPrincipal: totalPrincipal.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    percentagePaidInInterest,
    monthsToDebtFree,
    debtFreeDate: debtFreeDateFormatted
  };

  res.send(response);
});

module.exports={debtrout} 

