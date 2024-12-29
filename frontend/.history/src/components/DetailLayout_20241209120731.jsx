import BaseLayout from './BaseLayout';
import DetailApexChart from './DetailApexChart';
const DetailLayout = ({ children }) => {
    return (
      <div >
        <BaseLayout>         
            <DetailApexChart />
        </BaseLayout>
     
      </div>
    );
  }
  
export default DetailLayout;
