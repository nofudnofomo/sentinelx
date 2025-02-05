async function fetchTokenData() {
  const tokenAddress = document.getElementById('tokenAddress').value.trim();
  if (!tokenAddress) {
    alert('Please enter a token address.');
    return;
  }
  
  // 1. Fetch OHLCV Data from Birdeye API (Market Data)
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";  // CORS Proxy URL
const apiUrl = `https://multichain-api.birdeye.so/solana/amm/ohlcv_v2?addr=${tokenAddress}&cur=usd&res=15m&outliers=false&cb=300&mc=false&to=1738732500`;

fetch(proxyUrl + apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Log the data to the console for now
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

  // 2. Fetch Token Price and Market Cap from Birdeye API
  const tokenInfoUrl = `https://multichain-api.birdeye.so/solana/amm/market_data?addr=${tokenAddress}&cur=usd`;

  try {
    const infoResponse = await fetch(tokenInfoUrl);
    const infoData = await infoResponse.json();

    if (infoData && infoData.data) {
      const price = infoData.data.price;
      const marketCap = infoData.data.market_cap;

      // Display Price and Market Cap (assuming the placeholders are already in your HTML)
      document.getElementById('market-cap').textContent = "$" + marketCap.toLocaleString();
      document.getElementById('price').textContent = "$" + price.toFixed(2);
    } else {
      alert('Could not fetch token data.');
    }
  } catch (error) {
    console.error('Error fetching token data from Birdeye API:', error);
  }

  // 3. Safety Score (simulated for now)
  const safetyScore = Math.floor(Math.random() * 100);
  document.getElementById('safety-score').textContent = safetyScore + "/100";
  const scoreBar = document.getElementById('score-bar-fill');
  if (safetyScore >= 80) {
    scoreBar.className = 'good';
    scoreBar.style.width = `${safetyScore}%`;
  } else if (safetyScore >= 50) {
    scoreBar.className = 'average';
    scoreBar.style.width = `${safetyScore}%`;
  } else {
    scoreBar.className = 'bad';
    scoreBar.style.width = `${safetyScore}%`;
  }
}
2m


