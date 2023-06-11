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
  HistogramPage,
  ImpactPage,
  Group11Page,
  Group5Page,
  DistributionPage,
  Group2Page,
} from "./pages";
import{
  DailyCase,
}from "./pages/group15"
import{
  lineChartLoaders,
}from "./loaders/group15"
import {
  feedbackLoader,
  sunburstLoader,
  treeMapLoader,
  vacRateLoader,
  stackedBarLoader,
  histogramLoader,
  impactLoader,
  group11Loader,
  group5Loader,
  group2Loader,
  distributionLoader,
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
          path="/DailyCase"
          element={<DailyCase />}
          loader={lineChartLoaders}
        />
        <Route
          path="/histogram"
          element={<HistogramPage />}
          loader={histogramLoader}
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
          path="/group-11"
          element={<Group11Page />}
          loader={group11Loader}
        />
        <Route path="/group-5" element={<Group5Page />} loader={group5Loader} />
        <Route path="/impact" element={<ImpactPage />} loader={impactLoader} />
        <Route path="/group-2" element={<Group2Page />} loader={group2Loader} />
        <Route path="/distribution" element={<DistributionPage />} loader={distributionLoader}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
