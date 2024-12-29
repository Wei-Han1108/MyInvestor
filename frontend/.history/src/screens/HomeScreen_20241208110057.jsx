import StockTable from "../components/StockTable"
import DonutChart from "../components/DonutChart"
const HomeScreen = () => {
  return (
    <>
    <div className="grid grid-cols-4 h-screen">
      {/* 侧边栏 */}
      <Sidebar />
      
      {/* 右侧主内容 */}
      <StockTable />
      <DonutChart />
    </div>
      
    </>
  )
}

export default HomeScreen
