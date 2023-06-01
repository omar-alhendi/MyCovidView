import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Feedback, Overview, SunburstPage, VaccinationRate } from "./pages";
import { vacRateLoader, feedbackLoader, sunburstLoader, treeMapLoader } from "./loaders";
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
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;