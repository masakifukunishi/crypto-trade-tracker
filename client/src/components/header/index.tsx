// HeaderComponent.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import LogoComponent from "./Logo";
import LinkItem from "./LinkItem";
import { faChartColumn, faUser } from "@fortawesome/free-solid-svg-icons";

const HeaderComponent: React.FC = () => {
  const location = useLocation();

  const isChartPage = location.pathname === "/chart";
  const isMyPage = location.pathname === "/my-page";

  return (
    <header className="mb-2 pl-1 pt-1.5 flex items-start mt-1 flex-row items-end justify-between">
      <LogoComponent />
      <div className="text-2xl">
        <LinkItem to="/my-page" icon={faUser} isActive={isMyPage} />
        <LinkItem to="/chart" icon={faChartColumn} isActive={isChartPage} />
      </div>
    </header>
  );
};

export default HeaderComponent;
