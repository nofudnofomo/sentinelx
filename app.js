async function fetchOHLCVData() {
  try {
    // URL with the specified parameters
    const url = 'https://multichain-api.birdeye.so/solana/amm/ohlcv_v2?addr=8mkUarPCHebMp2WjJF5jxnL3pZNGvbd3Bjb2n1xPpump&cur=usd&res=15m&outliers=false&cb=300&mc=false&to=1738732500';

    // Fetch the data from the API
    const response = await fetch(url);
    
    // Parse the response as JSON
    const data = await response.json();

    // Check if the response contains OHLCV data
    if (data && data.data) {
      // Loop through the data and extract OHLCV values
      const ohlcvData = data.data.map(item => {
        return {
          timestamp: new Date(item.timestamp * 1000).toLocaleString(), // Convert timestamp to human-readable format
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume
        };
      });

      // Log the extracted OHLCV data for debugging
      console.log(ohlcvData);

      // Display the OHLCV data on the page
      let ohlcvHtml = '<h3>OHLCV Data (15m Intervals)</h3>';
      ohlcvHtml += '<table><tr><th>Timestamp</th><th>Open</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th></tr>';

      // Loop through the OHLCV data and display each value in a table row
      ohlcvData.forEach(item => {
        ohlcvHtml += `<tr>
                        <td>${item.timestamp}</td>
                        <td>${item.open}</td>
                        <td>${item.high}</td>
                        <td>${item.low}</td>
                        <td>${item.close}</td>
                        <td>${item.volume}</td>
                      </tr>`;
      });

      ohlcvHtml += '</table>';

      // Insert the OHLCV data into the 'ohlcv-data' div
      document.getElementById('ohlcv-data').innerHTML = ohlcvHtml;
    } else {
      console.error('OHLCV data not found');
    }
  } catch (error) {
    console.error('Error fetching OHLCV data:', error);
  }
}

// Call the function to fetch OHLCV data
fetchOHLCVData();
