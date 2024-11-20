import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import { getUsers } from "@/api/user.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IUser } from "@/types";
import { GoCheckCircleFill, GoXCircleFill } from "react-icons/go";
import { Button } from "@/components/ui/button";

const User = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    const result = await getUsers(limit, offset);
      setUsers(result.data); 
      setTotal(result.total);
  };

  useEffect(() => {
    fetchUsers();
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

  return (
    <div className="flex flex-col">
      <div className="border-b mb-4">
        <h1 className="font-medium text-2xl">Users</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Is Verified</TableHead>
            <TableHead className="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.is_verified ? <GoCheckCircleFill className="text-green-500" size={22}/>: <GoXCircleFill className="text-red-500" size={22}/>}</TableCell>
                <TableCell className="text-end">
                  <Button className="bg-gray-800">View</Button>
                </TableCell>
            </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Users Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        offset={offset}
        limit={limit}
        total={total}
        setLimit={setLimit}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

export default User;
