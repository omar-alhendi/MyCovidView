import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  Feedback,
  Overview,
  VaccinationRate,
  SunburstPage,
  TreemapPage,
  StackedBarChartPage,
} from "./pages";
import {
  feedbackLoader,
  sunburstLoader,
  treeMapLoader,
  vacRateLoader,
  stackedBarLoader,
} from "./loaders";
import { Container } from "./layout";
import KpiDashboard from "./pages/KpiDashboard";
import Balanceboard from "./pages/Balanceboard";

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
          path="/sunburst"
          element={<SunburstPage />}
          loader={sunburstLoader}
        />
        <Route
          path="/treemap"
          element={<TreemapPage />}
          loader={treeMapLoader}
        />
        <Route
          path="/vaccination-rate"
          element={<VaccinationRate />}
          loader={vacRateLoader}
        />
        <Route
          path="/stackbarchart"
          element={<StackedBarChartPage />}
          loader={stackedBarLoader}
        />
        <Route
          path="/sunburst"
          element={<SunburstPage />}
          loader={sunburstLoader}
        />
        <Route
          path="/treemap"
          element={<TreemapPage />}
          loader={treeMapLoader}
        />
        <Route
          path="/vaccination-rate"
          element={<VaccinationRate />}
          loader={vacRateLoader}
        />
        <Route
          path="/kpiboard"
          element={<KpiDashboard />}
          loader={vacRateLoader}
        />
        <Route
          path="/balancedBoard"
          element={<Balanceboard />}
          loader={vacRateLoader}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
