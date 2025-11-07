const payBtn = document.getElementById('payBtn');
const resultDiv = document.getElementById('result');

payBtn.addEventListener('click', async () => {
  const name = document.getElementById('name').value.trim();
  const amount = document.getElementById('amount').value.trim();

  if(!name || !amount) {
    resultDiv.style.color = 'red';
    resultDiv.textContent = "Please fill in all fields.";
    return;
  }

  try {
    // Call your backend endpoint
    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, amount })
    });

    const data = await response.json();

    if(data.success) {
      resultDiv.style.color = 'green';
      resultDiv.textContent = `Payment Created! Redirecting...`;
      // Redirect to LPay payment page
      window.location.href = data.paymentUrl;
    } else {
      resultDiv.style.color = 'red';
      resultDiv.textContent = `Payment Failed: ${data.message}`;
    }

  } catch (err) {
    resultDiv.style.color = 'red';
    resultDiv.textContent = 'Error connecting to API';
  }
});
