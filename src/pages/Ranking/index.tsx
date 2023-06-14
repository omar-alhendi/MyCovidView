import { useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../types';
import { rankingLoader } from '../../loaders';
import BarChart from './BarChart';
import VaccinationRate from './VaccinationRate';

const RankingPage = () => {
  const { barChartData, vacRateData } = useLoaderData() as LoaderData<
    typeof rankingLoader
  >;
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gap: '2rem',
          background: '#b4d0e7',
          padding: '2rem',
          borderRadius: '2rem',
          margin: '2rem',
          boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <BarChart data={barChartData} />
        <VaccinationRate data={vacRateData} />
      </div>
    </div>
  );
};

export default RankingPage;
