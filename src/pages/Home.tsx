import { serverHealth } from "@/api/home.service";
import { useEffect, useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("Server is down");

  useEffect(() => {
    const checkServerHealth = async () => {
      const result = await serverHealth();
      setMessage(result.message);
    };

    checkServerHealth();
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div>{message}</div>
    </div>
  );
};

export default Home;
