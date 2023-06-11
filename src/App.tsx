import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  Feedback,
  Overview,
  ImpactPage,
  Group11Page,
  Group5Page,
  DistributionPage,
  Group2Page,
  ScatterPlotPage,
  AreaChartPage,
  LineChartPage,
} from "./pages";
import {
  feedbackLoader,
  impactLoader,
  group11Loader,
  group5Loader,
  group2Loader,
  distributionLoader,
} from "./loaders";
import {
  scatterPlotLoader,
  lineChartLoader,
  areaChartLoader
} from "./loaders/fantasy";
import { Container } from "./layout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Container />}>
        <Route index element={<Overview />} />
        <Route
          path="/feedback"
          element={<Feedback />}
          loader={feedbackLoader}
        />
        <Route
          path="/group-11"
          element={<Group11Page />}
          loader={group11Loader}
        />
        <Route path="/group-5" element={<Group5Page />} loader={group5Loader} />
        <Route path="/impact" element={<ImpactPage />} loader={impactLoader} />
        <Route path="/group-2" element={<Group2Page />} loader={group2Loader} />
        <Route
          path="/fantasy/scatter-plot"
          element={<ScatterPlotPage />}
          loader={scatterPlotLoader}
        />
        <Route
          path="/fantasy/line-chart"
          element={<LineChartPage />}
          loader={lineChartLoader}
        />
        <Route
          path="/fantasy/area-chart"
          element={<AreaChartPage />}
          loader={areaChartLoader}
        />
        <Route
          path="/distribution"
          element={<DistributionPage />}
          loader={distributionLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
