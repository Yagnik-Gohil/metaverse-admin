import { deleteAvatar, getAvatarList } from "@/api/avatar.service";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { IAvatar } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LiaTrashAlt } from "react-icons/lia";

const Avatar = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<IAvatar[]>([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchList = async () => {
    const result = await getAvatarList(limit, offset);
    setList(result.data);
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

  const handleDelete = async (id: string) => {
    const result = await deleteAvatar(id);
    if (result.status) {
      fetchList();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="border-b mb-4 flex justify-between pb-2">
        <h1 className="font-medium text-2xl">Avatar</h1>
        <Button
          className="bg-gray-800"
          onClick={() => navigate("/avatar/create")}
        >
          Create
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {list.map((avatar) => (
          <div
            className="relative w-full max-w-xs mx-auto group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300"
            key={avatar.id}
          >
            {avatar.users === 0 && (
              <button
                onClick={() => handleDelete(avatar.id)}
                className="absolute top-2 right-2 p-2 bg-gray-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-600 hover:scale-110"
              >
                <LiaTrashAlt size={18} />
              </button>
            )}

            <div className="h-20 w-20 bg-gray-100 m-auto mt-4 rounded-md overflow-hidden">
              <img
                src={avatar.image}
                alt={`${avatar.tile_size} px`}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                {avatar.tile_size} px
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {avatar.users} {avatar.users === 1 ? "user is" : "users are"}{" "}
                using this avatar.
              </p>
            </div>

            <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
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

export default Avatar;
