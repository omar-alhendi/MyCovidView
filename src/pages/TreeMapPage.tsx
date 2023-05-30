import { treeMapLoader } from "../loaders";
import { Treemap } from "recharts";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../types";

const TreeMapPage = () => {
    const data = useLoaderData() as LoaderData<typeof treeMapLoader>;
  
    return (
        <div>
        <h1>my covid view</h1>
        <p>
          <span style={{ fontWeight: "bold" }}>Treemap</span>
          (daily partial of vaccination by districts)
        </p>
        <Treemap
          width={400}
          height={200}
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
          style={{
            margin: "0 auto", 
            textAlign: "center",
            width: "100%",
          }}
        />
      </div>
    );
  };
  
  export default TreeMapPage;