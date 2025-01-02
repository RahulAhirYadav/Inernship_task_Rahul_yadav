const exchangeRates = {
    USD: { EUR: 0.92, GBP: 0.82, INR: 82.50, AUD: 1.49 },
    EUR: { USD: 1.09, GBP: 0.89, INR: 89.67, AUD: 1.62 },
    GBP: { USD: 1.22, EUR: 1.12, INR: 100.5, AUD: 1.82 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0099, AUD: 0.018 },
    AUD: { USD: 0.67, EUR: 0.62, GBP: 0.55, INR: 55.02 }
};

function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const currencyFrom = document.getElementById("currencyFrom").value;
    const currencyTo = document.getElementById("currencyTo").value;
    
    if (!amount || isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    // Handle same currency conversion
    if (currencyFrom === currencyTo) {
        document.getElementById("convertedAmount").textContent = `Converted Amount: ${parseFloat(amount).toFixed(2)} ${currencyTo}`;
        return;
    }
    
    const conversionRate = exchangeRates[currencyFrom][currencyTo];
    const result = (amount * conversionRate).toFixed(2);
    
    document.getElementById("convertedAmount").textContent = `Converted Amount: ${result} ${currencyTo}`;
}
