import { getMapList } from "@/api/map.service";
import MapGridItem from "@/components/MapGridItem";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { IMap } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();

  const [mapList, setMapList] = useState<IMap[]>([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchList = async () => {
    const result = await getMapList(limit, offset);
    setMapList(result.data);
    setTotal(result.total);
  };

  useEffect(() => {
    fetchList();
  }, [limit, offset]);

  const handleNextPage = () => {
    if (offset + limit < total) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset((prevOffset) => prevOffset - limit);
    }
  };

  const handleMapClick = (id: string) => {
    navigate(`/map/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="border-b mb-4 flex justify-between pb-2">
        <h1 className="font-medium text-2xl">Map</h1>
        <Button className="bg-gray-800" onClick={() => navigate("/map/create")}>
          Create
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mapList.map((map) => (
          <MapGridItem
            key={map.id}
            thumbnail={
              map.thumbnail.base_url +
              map.thumbnail.root +
              map.thumbnail.folder +
              map.thumbnail.name
            }
            title={map.name}
            details={`${map.row}x${map.column} | Tile Size: ${map.tile_size} px`}
            onClick={() => handleMapClick(map.id)}
          />
        ))}

        <Pagination
          offset={offset}
          limit={limit}
          total={total}
          setLimit={setLimit}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};

export default Map;
