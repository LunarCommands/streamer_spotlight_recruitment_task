import React from "react";
import { useParams, Link } from "react-router-dom";

const StreamerDetails = ({ streamers }) => {
  const { streamerId } = useParams();
  const parsedStreamerId = parseInt(streamerId);
  const streamer = streamers.find(
    (streamer) => streamer.id === parsedStreamerId
  );

  if (!streamer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="mb-4 text-blue-500 hover:underline">
        Back
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">{streamer.name}</h1>
        <p className="mb-4">{streamer.description}</p>
        <p className="mb-4">Platform: {streamer.platform}</p>
        <img
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
          alt="Streamer Profile"
          className="w-48 rounded-lg shadow"
        />
      </div>
    </div>
  );
};

export default StreamerDetails;
