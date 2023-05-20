import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Feedback } from "./pages";
import { feedbackLoader } from "./loaders";
import "@carbon/charts/styles.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Feedback />} loader={feedbackLoader} />
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
