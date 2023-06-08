import VaccinatedPeople from "./VaccinatedPeople";
import VaccinatedPeopleByDistrict from "./VaccinatedPeopleByDistrict";
import VaccineDoseType from "./VaccineDoseType";
import { useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../types';
import { group5Loader } from '../../loaders';

const Group5Page = () => {
  const { lollipopData, stackedAreaData, donutData } =
    useLoaderData() as LoaderData<typeof group5Loader>;
  return (
    <div>
      <div
        style={{
          display: "grid",
          gap: "2rem",
          background: "#e0e0e0",
          padding: "2rem",
          borderRadius: "1rem",
          margin: "2rem",
        }}
      >
        <VaccinatedPeople data={lollipopData} />
      </div>
      <div
        style={{
          display: "grid",
          gap: "2rem",
          background: "#e0e0e0",
          padding: "2rem",
          borderRadius: "1rem",
          margin: "2rem",
        }}
      >
        <VaccineDoseType data={stackedAreaData} />
      </div>
      <div
        style={{
          display: "grid",
          gap: "2rem",
          background: "#e0e0e0",
          padding: "2rem",
          borderRadius: "1rem",
          margin: "2rem",
        }}
      >
        <VaccinatedPeopleByDistrict data={donutData} />
      </div>
    </div>
  );
};

export default Group5Page;
