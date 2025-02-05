async function fetchTokenData() {
    const tokenAddress = document.getElementById('tokenAddress').value;

    if (!tokenAddress) {
        alert('Please enter a token address');
        return;
    }

    // Show a loading message
    document.getElementById('tokenDetails').innerHTML = `<p>Loading token data...</p>`;
    document.getElementById('safetyScore').innerHTML = '';

    try {
        // Fetch token data from Solscan API
        const response = await fetch(`https://api.solscan.io/token/meta?tokenAddress=${tokenAddress}`);
        const data = await response.json();

        // Handle errors (if the token is not found or API fails)
        if (data.error || !data.data) {
            document.getElementById('tokenDetails').innerHTML = `<p>Error: Token not found or invalid address.</p>`;
            return;
        }

        // Display token details
        const detailsDiv = document.getElementById('tokenDetails');
        detailsDiv.innerHTML = `
            <h3>Token Name: ${data.data.name}</h3>
            <p><strong>Symbol:</strong> ${data.data.symbol}</p>
            <p><strong>Market Cap:</strong> ${data.data.marketCap}</p>
            <p><strong>24h Volume:</strong> ${data.data.volume}</p>
            <p><strong>Holders:</strong> ${data.data.holders}</p>
        `;

        // Calculate and display the safety score
        const safetyScore = calculateSafetyScore(data.data);
        displaySafetyScore(safetyScore);
    } catch (error) {
        console.error("Error fetching token data:", error);
        document.getElementById('tokenDetails').innerHTML = `<p>Error: Failed to fetch token data. Please try again later.</p>`;
    }
}

// Function to calculate the safety score based on token data
function calculateSafetyScore(tokenData) {
    let score = 0;

    // Example logic for calculating the safety score
    if (tokenData.volume > 1000000) score += 20;  // Add points if the 24h volume is greater than 1M
    if (tokenData.holders > 5000) score += 30;  // Add points if there are more than 5000 holders
    if (tokenData.marketCap > 50000000) score += 50;  // Add points if the market cap is over 50M

    return score;
}

// Function to display the safety score
function displaySafetyScore(score) {
    const safetyDiv = document.getElementById('safetyScore');
    safetyDiv.innerHTML = `<p><strong>Safety Score:</strong> ${score}</p>`;
}
