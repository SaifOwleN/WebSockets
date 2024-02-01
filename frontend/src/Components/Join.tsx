import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../Socket";

const Join = () => {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (socket.connected) {
      navigate("/Chat");
    }
  }, []);

  const connect = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(socket);
    socket.connect();
    socket.emit("enter", name);
    console.log("socket", socket);
    navigate("/Chat");
  };

  return (
    <form onSubmit={connect} className="flex mt-4 mb-2 w-96 mx-4" id="name">
      <input
        className=" bg-transparent border-2 p-4 border-gray-700 w-full mr-4 rounded-3xl h-10"
        onChange={({ target }) => setName(target.value)}
      />
      <button className="bg-black w-20 rounded-xl text-white " type="submit">
        send
      </button>
    </form>
  );
};

export default Join;
