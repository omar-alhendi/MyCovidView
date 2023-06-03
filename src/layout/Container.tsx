import { Link, Outlet, useLocation } from "react-router-dom";
import "./Container.css"; // Import the CSS file for styling

const Container = () => {
  const linkArrays = [
    {
      link: "/",
      name: "Overview",
    },
    {
      link: "/feedback",
      name: "Feedback",
    },
    {
      link: "/sunburst",
      name: "Sunburst",
    },
    {
      link: "/treemap",
      name: "Tree Map",
    },
    {
      link: "/vaccination-rate",
      name: "Vaccination Rate",
    },
    {
      link: "/stackbarchart",
      name: "Stacked Bar Chart",
    },
  ];

  const location = useLocation();

  return (
    <div className="container">
      <nav className="sidebar">
        <ul className="sidebar-nav">
          {linkArrays.map((linkData) => (
            <li
              key={linkData.link}
              className={
                location.pathname === linkData.link ? "active" : undefined
              }
            >
              <Link to={linkData.link}>{linkData.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="content">
        <h2>This is the application's Container</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
