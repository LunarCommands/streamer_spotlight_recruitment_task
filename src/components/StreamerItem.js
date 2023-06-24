import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StreamerItem = ({ streamer, setStreamers }) => {
  const handleVote = async (streamerId, voteType) => {
    try {
      await axios.put(`http://localhost:3001/streamers/${streamerId}/vote`, {
        voteType,
      });
      fetchStreamers(); // Refresh streamers after voting
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleUpvote = async () => {
    try {
      await handleVote(streamer.id, "upvote");
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      await handleVote(streamer.id, "downvote");
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const fetchStreamers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/streamers");
      setStreamers(response.data);
    } catch (error) {
      console.error("Error retrieving streamers:", error);
    }
  };

  return (
    <li className="flex items-center m-6">
      <div className="mr-4">
        <h2 className="text-lg font-bold">
          <Link to={`/streamer/${streamer.id}`}>{streamer.name}</Link>
        </h2>
        <p className="text-sm text-gray-800">{streamer.description}</p>
      </div>
      <div className="ml-auto">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleUpvote}
        >
          Upvote ({streamer.upvotes})
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownvote}
        >
          Downvote ({streamer.downvotes})
        </button>
      </div>
    </li>
  );
};

export default StreamerItem;
