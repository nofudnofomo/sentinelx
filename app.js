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
        const response = await fetch(`https://api.solscan.io/token/${tokenAddress}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('tokenDetails').innerHTML = `<p>Error: Token not found or invalid address.</p>`;
            return;
        }

        // Display token details
        const detailsDiv = document.getElementById('tokenDetails');
        detailsDiv.innerHTML = `
            <h3>Token Name: ${data.name}</h3>
            <p><strong>Symbol:</strong> ${data.symbol}</p>
            <p><strong>Market Cap:</strong> ${data.marketCap}</p>
            <p><strong>24h Volume:</strong> ${data.volume}</p>
            <p><strong>Holders:</strong> ${data.holders}</p>
        `;

        // Calculate and display safety score
        const safetyScore = calculateSafetyScore(data);
        displaySafetyScore(safetyScore);
    } catch (error) {
        document.getElementById('tokenDetails').innerHTML = `<p>Error: Failed to fetch token data. Please try again later.</p>`;
    }
}

// Function to calculate safety score based on token data
function calculateSafetyScore(data) {
    const score = {
        volumeStability: data.volume > 1000000 ? 30 : 15,
        holderCount: data.holders > 1000 ? 25 : 10,
        auditStatus: data.audit ? 20 : 5,
        marketCap: data.marketCap > 5000000 ? 15 : 5,
        tokenAge: data.tokenAge > 365 ? 10 : 5,
    };

    // Total score is sum of all individual scores
    const totalScore = score.volumeStability + score.holderCount + score.auditStatus + score.marketCap + score.tokenAge;

    return {
        totalScore: totalScore,
        details: [
            `Volume Stability: ${score.volumeStability}%`,
            `Holder Count: ${score.holderCount}%`,
            `Audit Status: ${score.auditStatus}%`,
            `Market Cap: ${score.marketCap}%`,
            `Token Age: ${score.tokenAge}%`,
        ],
    };
}

// Function to display safety score as bullet points
function displaySafetyScore(score) {
    const scoreList = document.getElementById('safetyScore');
    score.details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        scoreList.appendChild(li);
    });

    // Display total safety score
    const totalScoreDiv = document.createElement('div');
    totalScoreDiv.innerHTML = `<h3>Total Safety Score: ${score.totalScore}%</h3>`;
    scoreList.appendChild(totalScoreDiv);
}
