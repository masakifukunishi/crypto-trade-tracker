import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface LinkItemProps {
  to: string;
  icon: IconDefinition;
  isActive: boolean;
}

const LinkItem: React.FC<LinkItemProps> = ({ to, icon, isActive }) => {
  return (
    <Link to={to} className={`${isActive && "text-blue-400"} ml-2`}>
      <FontAwesomeIcon icon={icon} />
    </Link>
  );
};

export default LinkItem;
