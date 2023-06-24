import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !platform || !description) {
      setValidationError("Please fill in all the fields.");
      return;
    }

    onSubmit({ name, platform, description });
    setName("");
    setPlatform("");
    setDescription("");
    setValidationError(null);
  };

  return (
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
      {validationError && (
        <p className="text-red-500 mb-4">{validationError}</p>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
