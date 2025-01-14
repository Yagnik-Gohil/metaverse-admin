import { Route, Routes, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import User from "./pages/User";
import Map from "./pages/Map";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import MapDetails from "./pages/MapDetails";
import Avatar from "./pages/Avatar";
import AvatarDetails from "./pages/AvatarDetails";

function App() {
  const location = useLocation();

  const publicRoutes = ["/login"];

  return (
    <div className="h-dvh flex">
      <Toaster position="top-right" reverseOrder={false} />

      {!publicRoutes.includes(location.pathname) && <SideBar />}

      <div className="h-full w-full p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/map" element={<Map />} />
          <Route path="/map/:id" element={<MapDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/avatar/:id" element={<AvatarDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
