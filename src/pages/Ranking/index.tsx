import { useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../types';
import { rankingLoader } from '../../loaders';
import BarChart from './BarChart';
import VaccinationRate from './VaccinationRate';
import DeathRate from './DeathRate';

const RankingPage = () => {
  const { barChartData, vacRateData, deathRateData } =
    useLoaderData() as LoaderData<typeof rankingLoader>;
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
        <DeathRate data={deathRateData} />
      </div>
    </div>
  );
};

export default RankingPage;
