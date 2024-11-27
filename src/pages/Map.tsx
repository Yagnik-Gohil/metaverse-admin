import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="border-b mb-4 flex justify-between pb-2">
        <h1 className="font-medium text-2xl">Map</h1>
        <Button className="bg-gray-800" onClick={() => navigate("/map/create")}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default Map;
