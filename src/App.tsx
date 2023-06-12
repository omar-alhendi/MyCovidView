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
  LineChartPages,
  ImpactPage,
  Group11Page,
  Group5Page,
  Group2Page,
} from "./pages";
import {
  feedbackLoader,
  sunburstLoader,
  treeMapLoader,
  vacRateLoader,
  stackedBarLoader,
  lineChartLoaders,
  impactLoader,
  group11Loader,
  group5Loader,
  group2Loader,
} from "./loaders";
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
          path="/linechart"
          element={<LineChartPages />}
          loader={lineChartLoaders}
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
          path="/group-11"
          element={<Group11Page />}
          loader={group11Loader}
        />
        <Route path="/group-5" element={<Group5Page />} loader={group5Loader} />
        <Route path="/impact" element={<ImpactPage />} loader={impactLoader} />
        <Route path="/group-2" element={<Group2Page />} loader={group2Loader} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
