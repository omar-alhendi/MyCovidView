import { group13Loader } from '../../loaders';
import { useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../types';
import Balanceboard from './Balanceboard';
import KpiDashboard from './KpiDashboard';

function Group13Page() {
    const { kpiData, balancedData } = useLoaderData() as LoaderData<typeof group13Loader>;
    return (
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
            <KpiDashboard data={kpiData} />
            <Balanceboard data={balancedData} />
        </div>
    );
}

export default Group13Page