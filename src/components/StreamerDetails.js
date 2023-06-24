import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StreamerDetails = () => {
  const { streamerId } = useParams();
  const [streamer, setStreamer] = useState(null);

  useEffect(() => {
    fetchStreamer(streamerId);
  }, [streamerId]);

  const fetchStreamer = async (streamerId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/streamer/${streamerId}`
      );
      setStreamer(response.data);
    } catch (error) {
      console.error("Error retrieving streamer:", error);
    }
  };

  if (!streamer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{streamer.name}</h1>
      <p className="mb-4">{streamer.description}</p>
      <p className="mb-4">Platform: {streamer.platform}</p>
      <img
        src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
        alt="Streamer Profile"
        className="w-48 rounded-lg shadow"
      />
    </div>
  );
};

export default StreamerDetails;
