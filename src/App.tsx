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
  ImportPage,
  Dendrogram,
  Heatmap,
  FantasyPage,
  GroupGalaxyPage,
  ComparisonPage,
  TrendsPage,
  CorrelationPage,
  PatternsPage,
} from "./pages";
import {
  feedbackLoader,
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
  comparisonLoader,
  trendsLoader,
  correlationLoader,
  patternsLoader,
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
          path="/group-11"
          element={<Group11Page />}
          loader={group11Loader}
        />
        <Route
          path="/group-5"
          element={<Group5Page />}
          loader={group5Loader}
        />
        <Route
          path="/impact"
          element={<ImpactPage />}
          loader={impactLoader}
        />
        <Route
          path="/group-2"
          element={<Group2Page />}
          loader={group2Loader}
        />
        <Route
          path="/comparison"
          element={<ComparisonPage />}
          loader={comparisonLoader}
        />
        <Route
          path="/trend-identification"
          element={<TrendsPage />}
          loader={trendsLoader}
        />
        <Route
          path="/correlation"
          element={<CorrelationPage />}
          loader={correlationLoader}
        />
        <Route
          path="/distribution"
          element={<DistributionPage />}
          loader={distributionLoader}
        />
        <Route
          path="/import"
          element={<ImportPage />}
        />
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
        <Route
          path="/charts/progress-bar"
          element={<Feedback />}
          loader={feedbackLoader}
        />
        <Route
          path="/charts/gauge-chart"
          element={<Feedback />}
          loader={feedbackLoader}
        />
        <Route
          path="/charts/proportional-meter-chart"
          element={<Feedback />}
          loader={feedbackLoader}
        />
        <Route
          path="/charts/sunburst-chart"
          element={<ImpactPage />}
          loader={impactLoader}
        />
        <Route
          path="/charts/treemap"
          element={<ImpactPage />}
          loader={impactLoader}
        />
        <Route
          path="/charts/stacked-line-chart"
          element={<Group2Page />}
          loader={group2Loader}
        />
        <Route
          path="/charts/data-dashboard"
          element={<Group2Page />}
          loader={group2Loader}
        />
        <Route
          path="/charts/lollipop-chart"
          element={<Group5Page />}
          loader={group5Loader}
        />
        <Route
          path="/charts/stacked-area-chart"
          element={<Group5Page />}
          loader={group5Loader}
        />
        <Route
          path="/charts/donut-chart"
          element={<Group5Page />}
          loader={group5Loader}
        />
        <Route
          path="/charts/bullet-chart"
          element={<Group11Page />}
          loader={group11Loader}
        />
        <Route
          path="/charts/stacked-bar-chart"
          element={<Group11Page />}
          loader={group11Loader}
        />
        <Route
          path="/charts/box-plot"
          element={<DistributionPage />}
          loader={distributionLoader}
        />
        <Route
          path="/charts/histogram"
          element={<DistributionPage />}
          loader={distributionLoader}
        />
        <Route
          path="/charts/kpi-dashboard"
          element={<Group13Page />}
          loader={group13Loader}
        />
        <Route
          path="/charts/balanced-scorecard"
          element={<Group13Page />}
          loader={group13Loader}
        />
        <Route
          path="/charts/dendrogram"
          element={<Dendrogram />}
          loader={dendrogramLoader}
        />
        <Route
          path="/charts/heat-map"
          element={<Heatmap />}
          loader={heatmapLoader}
        />
        <Route
          path="/charts/column-chart"
          element={<GroupGalaxyPage />}
          loader={groupGalaxyLoader}
        />
        <Route
          path="/charts/bar-chart"
          element={<GroupGalaxyPage />}
          loader={groupGalaxyLoader}
        />
        <Route
          path="/charts/area-chart"
          element={<FantasyPage />}
          loader={fantasyLoader}
        />
        <Route
          path="/charts/line-chart"
          element={<FantasyPage />}
          loader={fantasyLoader}
        />
        <Route
          path="/charts/scatter-plot"
          element={<FantasyPage />}
          loader={fantasyLoader}
        />
        <Route
          path="/patterns"
          element={<PatternsPage />}
          loader={patternsLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
