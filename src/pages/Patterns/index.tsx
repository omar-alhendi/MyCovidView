import HeatMap from "./HeatMap";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { patternsLoader } from "../../loaders";
import "../../styles/chart-bg.css";


const PatternsPage = () => {
  const { heatMapData } = 
    useLoaderData() as LoaderData<typeof patternsLoader>;
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
        <HeatMap data={heatMapData} />
      </div>
      </div>
  );
};

export default PatternsPage;