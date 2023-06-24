import React from "react";

const StreamerRecord = ({ streamer }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">{streamer.name}</h2>
        <p className="text-gray-600 mb-2">Platform: {streamer.platform}</p>
        <p className="text-gray-600">Description: {streamer.description}</p>
      </div>
      <div>
        <img
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
          alt="Streamer Avatar"
          className="rounded-full h-20 w-20 mx-auto"
        />
      </div>
    </div>
  );
};

export default StreamerRecord;
