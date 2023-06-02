import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Feedback, ScatterPlotPage, Overview, SunburstPage, AreaChartPage, LineChartPage } from "./pages";
import { feedbackLoader, sunburstLoader, treeMapLoader, scatterPlotLoader, lineChartLoader,areaChartLoader} from "./loaders";
import { Container } from "./layout";
import TreeMapPage from "./pages/TreeMapPage";


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
          path="/scatter-plot"
          element={<ScatterPlotPage />}
          loader={scatterPlotLoader}
        />
        <Route
          path="/line-chart"
          element={<LineChartPage />}
          loader={lineChartLoader}
        />
        <Route
          path="/area-chart"
          element={<AreaChartPage />}
          loader={areaChartLoader}
        />
        <Route
          path="/sunburst"
          element={<SunburstPage />}
          loader={sunburstLoader}
        />
        <Route
          path="/treemap"
          element={<TreeMapPage />}
          loader={treeMapLoader}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
