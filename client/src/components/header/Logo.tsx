import React from "react";
import { Link } from "react-router-dom";

const LogoComponent: React.FC = () => {
  return (
    <h1 className="text-2xl text-blue-400 font-bold">
      <Link to="/">Crypto Trade Tracker</Link>
    </h1>
  );
};

export default LogoComponent;
