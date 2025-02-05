document.getElementById("token-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const tokenAddress = document.getElementById("token-address").value;
  
  // Placeholder logic: Normally, you'd fetch real data from an API here
  if (tokenAddress) {
    document.getElementById("token-analysis").innerHTML = `
      <h3>Token Address: ${tokenAddress}</h3>
      <p>Safety Score: 85%</p>
      <p>Security Check: Passed</p>
    `;
  } else {
    alert("Please enter a token address.");
  }
});

// Placeholder data for top safe tokens
const topTokens = [
  { name: "Token A", score: "90%" },
  { name: "Token B", score: "85%" },
  { name: "Token C", score: "80%" },
  // Add more tokens...
];

const topTokensList = document.getElementById("top-tokens");
topTokens.forEach(token => {
  const li = document.createElement("li");
  li.textContent = `${token.name} - Safety Score: ${token.score}`;
  topTokensList.appendChild(li);
});
async function fetchTokenData() {
  const tokenAddress = document.getElementById('tokenAddress').value;
  if (!tokenAddress) {
    alert('Please enter a token address');
    return;
  }

  // Fetch token data from Solscan API
  const response = await fetch(`https://api.solscan.io/token/${tokenAddress}`);
  const data = await response.json();

  // Display token details on the page
  const detailsDiv = document.getElementById('tokenDetails');
  detailsDiv.innerHTML = `
    <h3>Token Name: ${data.name}</h3>
    <p>Symbol: ${data.symbol}</p>
    <p>Market Cap: ${data.marketCap}</p>
    <p>Volume (24h): ${data.volume}</p>
    <p>Holders: ${data.holders}</p>
  `;
}
Now


