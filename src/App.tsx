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
} from "./pages";
import {
  feedbackLoader,
  sunburstLoader,
  treeMapLoader,
  vacRateLoader,
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
<<<<<<< HEAD
          path="/vaccination-rate"
          element={<VaccinationRate />}
          loader={vacRateLoader}
=======
          path="/test-positive-gauge"
          element={<TestPositiveGauge/>}
          loader={testPositiveLoader}
>>>>>>> edd02f4 (Created Test Positive Rate Gauge)
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
