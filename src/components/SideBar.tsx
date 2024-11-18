import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { logout } from "@/api/auth.service";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white w-64 h-full flex flex-col select-none">
      <div className="p-4 border-b border-gray-700">
        <Link to={"/"}>
          <h1 className="text-xl font-bold">Metaverse</h1>
        </Link>
      </div>

      <nav className="flex-grow p-4">
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to={"/user"} className="block">
              Users
            </Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to={"/map"} className="block">
              Map
            </Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to={"/admin"} className="block">
              Admin
            </Link>
          </li>
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
