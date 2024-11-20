import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Pagination = ({
  offset,
  limit,
  total,
  setLimit,
  handlePreviousPage,
  handleNextPage,
}: {
  offset: number;
  limit: number;
  total: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}) => {
  const recordsPerPageOptions = [5, 10, 15, 20];

  return (
    <div className="flex justify-between items-center mt-4 p-4 gap-4 font-medium border border-gray-300 rounded-lg shadow-md bg-white absolute right-5 bottom-5">
      <div className="flex items-center space-x-2">
        <Select onValueChange={(value) => setLimit(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="font-medium">
              {recordsPerPageOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center">
        <Button
          onClick={handlePreviousPage}
          disabled={offset === 0}
          className="rounded-full h-8 w-8 bg-gray-700 text-white hover:bg-gray-800 transition duration-200"
        >
          <GrFormPreviousLink />
        </Button>
        <span className="text-gray-700 font-semibold mx-4">
          Page {Math.floor(offset / limit) + 1} of {Math.ceil(total / limit)}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={offset + limit >= total}
          className="rounded-full h-8 w-8 bg-gray-700 text-white hover:bg-gray-800 transition duration-200"
        >
          <GrFormNextLink />
        </Button>
      </div>

      <div className="text-gray-700 font-medium">Total: {total}</div>
    </div>
  );
};

export default Pagination;
