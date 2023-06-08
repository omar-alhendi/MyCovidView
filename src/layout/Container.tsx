import { Outlet, Link, useLocation } from "react-router-dom";
import { SideNav, SideNavItems } from "carbon-components-react";
import "./Container.css";

const Container = () => {
  const location = useLocation();

  return (
    <div className="container">
      <div className="sidebar">
        <SideNav aria-label="Side navigation" expanded>
          <SideNavItems>
            <h2 className="sidebar-header">MyCovidView</h2>
            <Link to="/" className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}>Overview</Link>
            <Link to="/feedback" className={`sidebar-link ${ location.pathname === "/feedback" ? "active" : ""}`}> Feedback</Link>
            <Link to="/impact" className={`sidebar-link ${ location.pathname === "/impact" ? "active" : ""}`}>Impact</Link>
            <Link to="/group-2" className={`sidebar-link ${location.pathname === "/group-2" ? "active" : ""}`}>Group 2</Link>
            <Link to="/group-5" className={`sidebar-link ${ location.pathname === "/group-5" ? "active" : ""}`}>Group 5</Link>
            <Link to="/group-11" className={`sidebar-link ${ location.pathname === "/group-11" ? "active" : ""}`}> Group 11</Link>
            
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
