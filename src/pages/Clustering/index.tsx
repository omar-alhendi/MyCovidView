import ScatterPlot from "./ScatterPlot";
import { useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../types';
import { clusteringLoader } from '../../loaders';
import '../../styles/chart-bg.css';
import Dendogram from "./Dendogram";

const ClusteringPage = () => {
  const { scatterPlotData, dendrogramD } =
    useLoaderData() as LoaderData<typeof clusteringLoader>;
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
        <Dendogram data={dendrogramD} />
      </div>
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
        <ScatterPlot data={scatterPlotData} />
      </div>
    </div>
  );
};
export default ClusteringPage;