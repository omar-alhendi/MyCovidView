import { Outlet, Link, useLocation } from "react-router-dom";
import { SideNav, SideNavItems } from "carbon-components-react";
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";
import "./Container.css";

interface Link {
  to: string;
  label: string;
}

//Sidebar items
const links: Link[] = [
  { to: "/", label: "Overview" },
  { to: "/feedback", label: "Feedback" },
  { to: "/communication", label: "Communication" },
  { to: "/comparison", label: "Comparison" },
  { to: "/trend-identification", label: "Trend Identification" },
  { to: "/correlation", label: "Correlation" },
  { to: "/distribution", label: "Distribution" },
  { to: "/import", label: "Import" },
  { to: "/patterns", label: "Pattern" },
  { to: "/ranking", label: "Ranking" },
  { to: "/proportion", label: "Proportion" },
  { to: "/composition", label: "Composition" },
  { to: "/exploration", label: "Exploration" },
  { to: "/anomaly-detection", label: "Anomaly Detection" },
  { to: "/clustering", label: "Clustering" },
  { to: "/evaluation", label: " Evaluation" },
];

const Container = () => {
  const { pathname } = useLocation();

  return (
    <div className="container">
      <div className="sidebar">
        <SideNav aria-label="Side navigation" expanded>
          <SideNavItems>
            <h2 className="sidebar-header">MyCovidView</h2>
            {links.map((link: Link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`sidebar-link ${
                  pathname === link.to ? "active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </SideNavItems>
        </SideNav>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
