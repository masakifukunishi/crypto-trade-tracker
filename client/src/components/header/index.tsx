// HeaderComponent.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import LogoComponent from "./Logo";
import LinkItem from "./LinkItem";
import { faChartColumn, faUser } from "@fortawesome/free-solid-svg-icons";

const HeaderComponent: React.FC = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMyPage = location.pathname === "/my-page";

  return (
    <header className="mb-2 pl-1 pt-1.5 flex flex-col items-start mt-1 sm:flex-row sm:items-end sm:justify-between">
      <LogoComponent />
      <div className="text-2xl">
        <LinkItem to="/" icon={faChartColumn} isActive={isHomePage} />
        <LinkItem to="/my-page" icon={faUser} isActive={isMyPage} />
      </div>
    </header>
  );
};

export default HeaderComponent;
