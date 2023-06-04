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
} from "./pages";
import {
  feedbackLoader,
  impactLoader,
  group11Loader,
  group5Loader,
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
          path="/group-11"
          element={<Group11Page />}
          loader={group11Loader}
        />
        <Route path="/group-5" element={<Group5Page />} loader={group5Loader} />
        <Route path="/impact" element={<ImpactPage />} loader={impactLoader} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
