import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StreamerDetails from "./components/StreamerDetails";
import Form from "./components/Form";
import StreamerItem from "./components/StreamerItem";

const App = () => {
  const [streamers, setStreamers] = useState([]);

  useEffect(() => {
    fetchStreamers();
  }, []);

  const fetchStreamers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/streamers");
      setStreamers(response.data);
    } catch (error) {
      console.error("Error retrieving streamers:", error);
    }
  };

  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-2xl font-bold mb-4">
                  Streamer Submission Form
                </h1>
                <Form
                  onSubmit={async (data) => {
                    try {
                      const response = await axios.post(
                        "http://localhost:3001/streamers",
                        data
                      );
                      setStreamers([...streamers, response.data]);
                    } catch (error) {
                      console.error("Error creating streamer:", error);
                    }
                  }}
                />

                <h1 className="text-2xl font-bold mt-8 mb-4">Streamer List</h1>
                <ul>
                  {streamers.map((streamer) => (
                    <StreamerItem
                      key={streamer.id}
                      streamer={streamer}
                      setStreamers={setStreamers}
                    />
                  ))}
                </ul>
              </>
            }
          />
          <Route
            path="/streamer/:streamerId"
            element={<StreamerDetails streamers={streamers} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
