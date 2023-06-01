import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Feedback, KpiDashboard, Overview, Balanceboard } from "./pages";
import { feedbackLoader } from "./loaders";
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
          path="/kpidashboard"
          element={<KpiDashboard />}
        />
        <Route
          path="/balanceboard"
          element={<Balanceboard />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
