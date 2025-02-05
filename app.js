async function fetchTokenData(tokenAddress) {
    const url = `https://www.birdeye.so/token/info?tokenAddress=${tokenAddress}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Check the full response in the console
        
        // Update the website with token info
        document.getElementById("tokenName").innerText = data.name || "N/A";
        document.getElementById("tokenSymbol").innerText = data.symbol || "N/A";
        document.getElementById("marketCap").innerText = data.market_cap ? `$${data.market_cap.toLocaleString()}` : "N/A";
        document.getElementById("supply").innerText = data.circulating_supply ? data.circulating_supply.toLocaleString() : "N/A";
        
    } catch (error) {
        console.error("Error fetching token data:", error);
        document.getElementById("errorMessage").innerText = "Failed to fetch token data.";
    }
}
Now

