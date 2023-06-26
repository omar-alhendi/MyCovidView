import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  Feedback,
  Overview,
  CommunicationPage,
  DistributionPage,
  ComparisonPage,
  CorrelationPage,
  ImportPage,
  PatternsPage,
  RankingPage,
  ProportionPage,
  CompositionPage,
  ExplorationPage,
  AnomalyDetectionPage,
  ClusteringPage,
  EvaluationPage,
  TrendIdentificationPage,
} from "./pages";
import {
  feedbackLoader,
  communicationLoader,
  distributionLoader,
  comparisonLoader,
  correlationLoader,
  patternsLoader,
  rankingLoader,
  proportionLoader,
  compositionLoader,
  explorationLoader,
  anomalyDetectionLoader,
  clusteringLoader,
  evaluationLoader,
  trendIdentificationLoader,
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
          path="/communication"
          element={<CommunicationPage />}
          loader={communicationLoader}
        />
        <Route
          path="/comparison"
          element={<ComparisonPage />}
          loader={comparisonLoader}
        />
        <Route
          path="/trend-identification"
          element={<TrendIdentificationPage />}
          loader={trendIdentificationLoader}
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
        <Route path="/import" element={<ImportPage />} />
        <Route
          path="/patterns"
          element={<PatternsPage />}
          loader={patternsLoader}
        />
        <Route
          path="/ranking"
          element={<RankingPage />}
          loader={rankingLoader}
        />
        <Route
          path="/proportion"
          element={<ProportionPage />}
          loader={proportionLoader}
        />
        <Route
          path="/composition"
          element={<CompositionPage />}
          loader={compositionLoader}
        />
        <Route
          path="/exploration"
          element={<ExplorationPage />}
          loader={explorationLoader}
        />
        <Route
          path="anomaly-detection"
          element={<AnomalyDetectionPage />}
          loader={anomalyDetectionLoader}
        />
        <Route
          path="clustering"
          element={<ClusteringPage />}
          loader={clusteringLoader}
        />
        <Route
          path="evaluation"
          element={<EvaluationPage />}
          loader={evaluationLoader}
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
          element={<CompositionPage />}
          loader={compositionLoader}
        />
        <Route
          path="/charts/treemap"
          element={<CompositionPage />}
          loader={compositionLoader}
        />
        <Route
          path="/charts/stacked-line-chart"
          element={<ComparisonPage />}
          loader={comparisonLoader}
        />
        <Route
          path="/charts/data-dashboard"
          element={<CommunicationPage />}
          loader={communicationLoader}
        />
        <Route
          path="/charts/lollipop-chart"
          element={<ComparisonPage />}
          loader={comparisonLoader}
        />
        <Route
          path="/charts/stacked-area-chart"
          element={<ProportionPage />}
          loader={proportionLoader}
        />
        <Route
          path="/charts/donut-chart"
          element={<DistributionPage />}
          loader={distributionLoader}
        />
        <Route
          path="/charts/bullet-chart"
          element={<RankingPage />}
          loader={rankingLoader}
        />
        <Route
          path="/charts/stacked-bar-chart"
          element={<ComparisonPage />}
          loader={comparisonLoader}
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
          element={<EvaluationPage />}
          loader={evaluationLoader}
        />
        <Route
          path="/charts/balanced-scorecard"
          element={<EvaluationPage />}
          loader={evaluationLoader}
        />
        <Route
          path="/charts/dendrogram"
          element={<ClusteringPage />}
          loader={clusteringLoader}
        />
        <Route
          path="/charts/heat-map"
          element={<CorrelationPage />}
          loader={correlationLoader}
        />
        <Route
          path="/charts/column-chart"
          element={<ComparisonPage />}
          loader={comparisonLoader}
        />
        <Route
          path="/charts/bar-chart"
          element={<ComparisonPage />}
          loader={comparisonLoader}
        />
        <Route
          path="/charts/area-chart"
          element={<TrendIdentificationPage />}
          loader={trendIdentificationLoader}
        />
        <Route
          path="/charts/line-chart"
          element={<TrendIdentificationPage />}
          loader={trendIdentificationLoader}
        />
        <Route
          path="/charts/scatter-plot"
          element={<CorrelationPage />}
          loader={correlationLoader}
        />
        <Route
          path="/patterns"
          element={<PatternsPage />}
          loader={patternsLoader}
        />
        <Route
          path="/ranking"
          element={<RankingPage />}
          loader={rankingLoader}
        />
        <Route
          path="/proportion"
          element={<ProportionPage />}
          loader={proportionLoader}
        />
        <Route
          path="/composition"
          element={<CompositionPage />}
          loader={compositionLoader}
        />
        <Route
          path="/exploration"
          element={<ExplorationPage />}
          loader={explorationLoader}
        />
        <Route
          path="anomaly-detection"
          element={<AnomalyDetectionPage />}
          loader={anomalyDetectionLoader}
        />
        <Route
          path="clustering"
          element={<ClusteringPage />}
          loader={clusteringLoader}
        />
        <Route
          path="evaluation"
          element={<EvaluationPage />}
          loader={evaluationLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
