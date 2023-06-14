import { useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../types';
import { proportionLoader } from '../../loaders';
import DeathRate from './DeathRate';
import VaccineDoseType from './VaccineDoseType';
import VaccinatedPeopleByDistrict from './VaccinatedPeopleByDistrict';

const ProportionPage = () => {
  const { deathRateData, donutData, stackedAreaData } =
    useLoaderData() as LoaderData<typeof proportionLoader>;
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gap: '2rem',
          background: '#e0e0e0',
          padding: '2rem',
          borderRadius: '1rem',
          margin: '2rem',
        }}
      >
        <DeathRate data={deathRateData} />
        <VaccineDoseType data={stackedAreaData} />
        <VaccinatedPeopleByDistrict data={donutData} />
      </div>
    </div>
  );
};

export default ProportionPage;
