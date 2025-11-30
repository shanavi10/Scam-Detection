// Function to simulate logout
function logout() {
    alert("You have been logged out successfully.");
    window.location.href = "login.html"; // Redirect to login page after logout
  }
  
  // Function to generate random data for demonstration purposes
  function generateFraudData(city, timeframe) {
    const fraudCases = {
      'Bangalore': {
        'weekly': [20, 30, 15, 40, 50, 60, 70],
        'monthly': [100, 200, 150, 250, 300, 350, 400],
        'yearly': [1000, 1200, 1500, 1800, 2000, 2200, 2400]
      },
      'Mumbai': {
        'weekly': [15, 25, 18, 35, 55, 65, 75],
        'monthly': [120, 190, 160, 240, 310, 360, 420],
        'yearly': [1100, 1300, 1600, 1900, 2100, 2300, 2500]
      },
      'Mangaluru': {
        'weekly': [10, 8, 12, 15, 65, 60, 50],
        'monthly': [110, 160, 120, 140, 210, 460, 440],
        'yearly': [900, 1800, 1100, 2900, 2100, 2100, 1500]
      }
    };
  
    return fraudCases[city] ? fraudCases[city][timeframe] : [];
  }
  
  // Variable to store the chart instance
  let fraudChart;
  
  document.getElementById('getDataBtn').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim() || 'Bangalore';
    const timeframe = document.getElementById('timeframe').value;
  
    // Update the report title with selected city and timeframe
    let timeframeLabel = '';
    switch (timeframe) {
      case 'weekly':
        timeframeLabel = 'Weekly';
        break;
      case 'monthly':
        timeframeLabel = 'Monthly';
        break;
      case 'yearly':
        timeframeLabel = 'Yearly';
        break;
    }
  
    // Set the report title
    document.getElementById('reportCity').textContent = `Fraud Report for ${city} (${timeframeLabel})`;
  
    // Generate fraud data based on selected city and timeframe
    const fraudData = generateFraudData(city, timeframe);
    if (fraudData.length === 0) {
      alert('No data available for this city.');
      return;
    }
  
    // If a chart already exists, destroy it before creating a new one
    if (fraudChart) {
      fraudChart.destroy();
    }
  
    // Define labels dynamically based on timeframe
    let labels = [];
    let totalCases = 0;
    let labelText = '';
  
    // Prepare the labels and total cases based on the timeframe
    switch (timeframe) {
      case 'weekly':
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'];
        totalCases = fraudData.reduce((acc, curr) => acc + curr, 0); // Calculate total weekly fraud cases
        labelText = `Weekly Fraud Cases (${totalCases} Total)`; // Set the label for weekly cases
        break;
      case 'monthly':
        labels = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7'];
        totalCases = fraudData.reduce((acc, curr) => acc + curr, 0); // Calculate total monthly fraud cases
        labelText = `Monthly Fraud Cases (${totalCases} Total)`; // Set the label for monthly cases
        break;
      case 'yearly':
        labels = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7'];
        totalCases = fraudData.reduce((acc, curr) => acc + curr, 0); // Calculate total yearly fraud cases
        labelText = `Yearly Fraud Cases (${totalCases} Total)`; // Set the label for yearly cases
        break;
    }
  
    // Get the canvas context
    const ctx = document.getElementById('fraudChart').getContext('2d');
  
    // Create a new chart
    fraudChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,  // Showing the labels like "Week 1", "Month 1", etc.
        datasets: [{
          label: labelText, // Set the label dynamically based on timeframe
          data: fraudData,  // Use the fraud data for the bars
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
  