import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { logout } from "@/api/auth.service";
import { FaCircleUser, FaCrown, FaMap } from "react-icons/fa6";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white w-64 h-full flex flex-col select-none">
      <div className="p-4 border-b border-gray-700">
        <NavLink to={"/"} 
            style={{ textDecoration: "none", color: "white" }}>
          <h1 className="text-xl font-bold">Metaverse</h1>
        </NavLink>
      </div>

      <nav className="flex-grow p-4">
        <ul className="space-y-4">
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            to={"/user"}
            className={({ isActive }) =>
              `p-2 rounded flex items-center gap-4 ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            <FaCircleUser size={18} />
            <span>Users</span>
          </NavLink>
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            to={"/map"}
            className={({ isActive }) =>
              `p-2 rounded flex items-center gap-4 ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            <FaMap size={18} />
            <span>Map</span>
          </NavLink>
          <NavLink
            
            style={{ textDecoration: "none", color: "white" }}
            to={"/admin"}
            className={({ isActive }) =>
              `p-2 rounded flex items-center gap-4 ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            <FaCrown size={18} />
            <span>Admin</span>
          </NavLink>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <Button
          className="w-full text-black py-2 px-4 rounded bg-white hover:bg-slate-100"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
