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
  HistogramPage,
  ImpactPage,
  Group11Page,
  Group5Page,
  DistributionPage,
  Group2Page,
  ImportPage,
  Dendrogram,
  Heatmap,
  FantasyPage,
  GroupGalaxyPage,
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
  lineChartLoaders,
  histogramLoader,
  impactLoader,
  group11Loader,
  group5Loader,
  group2Loader,
  distributionLoader,
  group13Loader,
  dendrogramLoader,
  heatmapLoader,
  fantasyLoader,
  groupGalaxyLoader,
} from "./loaders";
import { Container } from "./layout";
import Group13Page from "./pages/Group13";


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
        <Route
          path="/group-11"
          element={<Group11Page />}
          loader={group11Loader}
        />
        <Route path="/group-5" element={<Group5Page />} loader={group5Loader} />
        <Route path="/impact" element={<ImpactPage />} loader={impactLoader} />
        <Route path="/group-2" element={<Group2Page />} loader={group2Loader} />
        <Route
          path="/distribution"
          element={<DistributionPage />}
          loader={distributionLoader}
        />
        <Route path="/import" element={<ImportPage />} />
        <Route
          path="/group-13"
          element={<Group13Page />}
          loader={group13Loader}
        />
        <Route
          path="/dendrogram"
          element={<Dendrogram />}
          loader={dendrogramLoader}
        />
        <Route
          path="/fantasy"
          element={<FantasyPage />}
          loader={fantasyLoader}
        />
        <Route
          path="/heatmap"
          element={<Heatmap />}
          loader={heatmapLoader} 
        />
        <Route
          path="/group-galaxy"
          element={<GroupGalaxyPage />}
          loader={groupGalaxyLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
