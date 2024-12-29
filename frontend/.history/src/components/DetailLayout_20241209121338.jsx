import BaseLayout from './BaseLayout';
import DetailApexChart from './DetailApexChart';
import DetailTable from './DetailTable';
const DetailLayout = ({ children }) => {
    return (
      <div >
        <BaseLayout>         
            <DetailApexChart />
            <DetailTable/>
        </BaseLayout>
     
      </div>
    );
  }
  
export default DetailLayout;
