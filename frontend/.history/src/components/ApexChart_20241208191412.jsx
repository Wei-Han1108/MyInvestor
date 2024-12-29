const API_KEY = "LGN314BMZQPOI8TL"; // 替换为您的 AlphaVantage API Key
const BASE_URL = "https://www.alphavantage.co/query";

const fetchStockData = async (symbol) => {
  try {
    const response = await fetch(`${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${API_KEY}`);
    const data = await response.json();
    
    // 检查数据的正确性
    if (!data["Time Series (60min)"]) {
      throw new Error('未能从API获取有效数据');
    }
    
    // 将时间和价格提取成 ApexChart 需要的格式
    const seriesData = Object.entries(data["Time Series (60min)"]).map(([time, value]) => {
      return {
        x: new Date(time).getTime(), // 将时间字符串转为时间戳
        y: parseFloat(value["4. close"]) // 获取收盘价
      };
    });

    // 仅保留最近7天的数据
    const last7DaysData = seriesData.slice(0, 7 * 24); // 每小时1个点，7天x24小时 = 168个点
    return last7DaysData.reverse(); // 按时间排序
  } catch (error) {
    console.error("获取数据失败: ", error);
  }
};
