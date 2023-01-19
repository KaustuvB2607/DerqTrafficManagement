import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SiderowProps {
  text: string;
  icon: ReactNode;
  path: string;
  id: number;
  selectedTab: number;
  setSelectedTab: (x: number) => void;
}

export default function Siderow({
  text,
  icon,
  path,
  id,
  selectedTab,
  setSelectedTab,
}: SiderowProps) {
  return (
    <Link to={path}>
      <div
        className={`flex mt-4 py-2 hover:bg-white mr-14 hover:shadow-sm rounded-lg ${
          selectedTab === id ? "bg-white shadow-sm" : ""
        }`}
        onClick={()=>setSelectedTab(id)}
      >
        <div className="ml-4">{icon}</div>
        <div className="ml-3 text-side text-gray-700 pt-1">{text}</div>
      </div>
    </Link>
  );
}
