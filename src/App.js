import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [description, setDescription] = useState("");
  const [streamers, setStreamers] = useState([]);

  useEffect(() => {
    fetchStreamers();
  }, []);

  const fetchStreamers = async () => {
    try {
      const response = await axios.get("/streamers");
      setStreamers(response.data);
    } catch (error) {
      console.error("Error retrieving streamers:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/streamers", {
        name,
        platform,
        description,
      });
      setStreamers([...streamers, response.data]);
      setName("");
      setPlatform("");
      setDescription("");
    } catch (error) {
      console.error("Error creating streamer:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Streamer Submission Form</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="platform" className="block font-bold mb-2">
            Platform:
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          >
            <option value="">Select Platform</option>
            <option value="Twitch">Twitch</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Kick">Kick</option>
            <option value="Rumble">Rumble</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>

      <h1 className="text-2xl font-bold mt-8 mb-4">Streamer List</h1>
      <ul>
        {streamers.map((streamer) => (
          <li
            key={streamer.id}
            className="border border-gray-300 rounded px-4 py-2 mb-2 flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-bold">{streamer.name}</h2>
              <p className="text-gray-500">{streamer.description}</p>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Upvotes: {streamer.upvotes}</span>
              <span>Downvotes: {streamer.downvotes}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
