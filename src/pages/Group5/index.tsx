import VaccinatedPeople from './VaccinatedPeople';
import VaccinatedPeopleByDistrict from './VaccinatedPeopleByDistrict';
import { useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../types';
import { group5Loader } from '../../loaders';

const LollipopChartPage = () => {
  const { lollipopData, donutData } = useLoaderData() as LoaderData<
    typeof group5Loader
  >;
  return (
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
      <VaccinatedPeople data={lollipopData} />
      <VaccinatedPeopleByDistrict data={donutData} />
    </div>
  );
};

export default LollipopChartPage;
