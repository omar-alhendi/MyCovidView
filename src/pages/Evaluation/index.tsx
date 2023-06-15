import KPIDashboard from "./KPIDashboard";
import { useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../types';
import { evaluationLoader } from '../../loaders';
import '../../styles/chart-bg.css';

const EvaluationPage = () => {
  const { kpiData } =
    useLoaderData() as LoaderData<typeof evaluationLoader>;

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
        <KPIDashboard data={kpiData} />
      </div>
    </div>
  );
};
export default EvaluationPage;