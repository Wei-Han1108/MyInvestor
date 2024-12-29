const generateStockData = () => {
    const stocks = [];
    const names = ["Microsoft", "Apple", "Google", "Amazon", "Tesla", "Meta", "Nvidia", "Netflix", "AMD", "Intel", "IBM", "Oracle", "SAP", "Salesforce", "Cisco", "Qualcomm", "Adobe", "PayPal", "Zoom", "Snowflake"];
  
    for (let i = 1; i <= 20; i++) {
      const high = (Math.random() * 1000).toFixed(2);
      const low = (high - Math.random() * 50).toFixed(2);
      stocks.push({
        _id: i.toString(),
        name: names[i - 1] || `Stock${i}`,
        currency: "USD",
        symbol: `SYM${i}`,
        exchangename: "NMS",
        exchangetimezonename: "America/New_York",
        fiftytwoweekhigh: parseFloat(high),
        fiftytwoweeklow: parseFloat(low),
        regularmarketdayhigh: parseFloat(high),
        regularmarketdaylow: parseFloat(low),
        chartpreviousclose: parseFloat((low - Math.random() * 5).toFixed(2)),
      });
    }
    return stocks;
  };
  
  const stockInfo = generateStockData();
  console.log(stockInfo);
  export default stockInfo
  