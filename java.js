document.getElementById('expenseForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the category and amount from the form
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Check if the category and amount are valid
    if (category && !isNaN(amount) && amount > 0) {
        // Add the expense to the summary box
        addExpenseToSummary(category, amount);

        // Clear the input fields
        document.getElementById('category').value = '';
        document.getElementById('amount').value = '';

        // Update the chart with the new expense
        loadChart();
    }
});

const expenses = [];
let chartInstance = null; // To store the Chart instance

function addExpenseToSummary(category, amount) {
    // Add the new expense to the expenses array
    expenses.push({ category, amount });

    // Update the summary box with the new list of expenses
    const summaryBox = document.getElementById('summaryBox');
    summaryBox.innerHTML = ''; // Clear existing content

    // Create a list of expenses and their amounts
    if (expenses.length === 0) {
        summaryBox.innerHTML = '<p>No expenses added yet.</p>';
    } else {
        const list = document.createElement('ul');
        expenses.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.textContent = `${expense.category}: $${expense.amount.toFixed(2)}`;
            list.appendChild(listItem);
        });
        summaryBox.appendChild(list);
    }
}

function loadChart() {
    const categories = expenses.map(expense => expense.category);
    const amounts = expenses.map(expense => expense.amount);

    // If a chart instance already exists, destroy it before creating a new one
    if (chartInstance) {
        chartInstance.destroy();
    }

    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    // Create a new chart instance
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses',
                data: amounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
}

// Initialize the chart with no data
loadChart();
