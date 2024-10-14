import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom"; 

const Gist = () => {
  const { gistId } = useParams();
  const [id, setId] = useState(gistId || ""); 
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (gistId) {
      fetchGist(gistId);
    }
  }, [gistId]);

  const fetchGist = async (gistId) => {
    try {
      const response = await fetch(`http://localhost:3000/gists/${gistId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch gist");
      }
      const data = await response.json();
      setData(data);
      setErrorMessage('');
    } catch (err) {
      console.error(err.message);
      setErrorMessage("Error fetching gist");
      setData(null);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      navigate(`/${id}`);
      fetchGist(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <form onSubmit={onSubmit} className="flex items-center space-x-4 mb-6">
        <div className="flex-grow">
          <Input
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter Gist ID"
            required
            className="block w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <Button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          Search
        </Button>
      </form>

      <div className="mt-8">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {data ? (
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold">{data.title}</h1>

            <p className="text-gray-600">{data.description}</p>

            <span className="inline-block bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-md">
              {data.language}
            </span>

            <div className="relative">
              <div className="absolute top-0 right-0 bg-gray-100 px-2 py-1 text-xs text-gray-600 rounded-bl-md">
                {data.language}
              </div>
              <pre className="bg-gray-100 text-sm p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono">
                {data.code}
              </pre>
            </div>
          </div>
        ) : (
          !errorMessage && <p className="text-gray-500">No Gist found. Enter a valid Gist ID.</p>
        )}
      </div>
    </div>
  );
};

export default Gist;
