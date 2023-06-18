// Get the input values

// Handle the button click event
document.getElementById("calculate").addEventListener("click", function () {

  const debtName = document.getElementById("debtname").value;
  const currentBalance = document.getElementById("curbalance").value;
  const minPayment = document.getElementById("minpayment").value;
  const apr = document.getElementById("Apr").value;


  // Create an array of debt objects

  const debts = [
    {
      principal: parseFloat(currentBalance),
      interestRate: parseFloat(apr),
      monthlyPayment: parseFloat(minPayment),
      debtName: debtName
    }
  ];

  // Create an object with the debts array
  const data = {
    debts: debts
  };

  // Send a POST request to the API endpoint
  fetch("http://localhost:3000/debtcal/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      // Set the received data in the corresponding HTML elements
      document.getElementById("totalp").innerText = result.totalPrincipal;
      document.getElementById("interest").innerText = result.totalInterest;
      document.getElementById("Percentage").innerText = result.percentagePaidInInterest;
      document.getElementById("months").innerText = result.monthsUntilDebtFree;
      document.getElementById("date").innerText = result.debtFreeDate;
      document.getElementById("minpay").innerText = result.minpay;
    })
    .catch(error => {
      console.log("Error:", error);
    });
});