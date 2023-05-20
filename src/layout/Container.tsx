import { Outlet } from "react-router-dom";

const Container = () => {
  return (
    <div>
      <h2>this is the application's Container</h2>
      <Outlet />
    </div>
  );
};

export default Container;
