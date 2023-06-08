import { Outlet, Link, useLocation } from "react-router-dom";
import { SideNav, SideNavItems } from "carbon-components-react";
import "./Container.css";

interface Link {
  to: string;
  label: string;
}

const links: Link[] = [
  { to: "/", label: "Overview" },
  { to: "/feedback", label: "Feedback" },
  { to: "/impact", label: "Impact" },
  { to: "/group-2", label: "Group 2" },
  { to: "/group-5", label: "Group 5" },
  { to: "/group-11", label: "Group 11" },
  { to: "/distribution", label: "Distribution" },
  { to: "/group-13", label: "Group 13" },
  { to: "/dendrogram", label: "Dendrogram" },
  { to: "/heatmap", label: "Heatmap" },
  { to: "/import", label: "Import" },
  { to: "/group-galaxy", label: "Group Galaxy" }
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
