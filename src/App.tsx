import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Container } from "./layout";
import Feedback from "./pages/Feedback";
import { Overview } from "./pages";
import { feedbackLoader } from "./loaders";

function App() {
  const newRouter = createBrowserRouter(
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

  return <RouterProvider router={newRouter} />;
}

export default App;
