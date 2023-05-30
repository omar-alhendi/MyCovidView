import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Feedback, Overview, SunburstPage } from "./pages";
import { feedbackLoader, sunburstLoader, treeMapLoader } from "./loaders";
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
        <Route
          path="/sunburst"
          element={<SunburstPage />}
          loader={sunburstLoader}
        />
        <Route
          path="/treemap"
          element={<TreeMapPage />}
          loader={treeMapLoader}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
