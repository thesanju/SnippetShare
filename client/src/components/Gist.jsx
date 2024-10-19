import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Copy } from "lucide-react";

const Gist = () => {
  const { gistId } = useParams();
  const [id, setId] = useState(gistId || "");
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
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
      setErrorMessage("");
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.code).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 border border-gray-300 rounded-md shadow-md">
      <form onSubmit={onSubmit} className="mb-6">
        <div className="flex space-x-4">
          <Input
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter Gist ID"
            required
            className="flex-grow"
          />
          <Button type="submit" className="px-6">
            Search
          </Button>
        </div>
      </form>

      <div className="mt-8">
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {data ? (
          <div className="space-y-6">
            <div>
              <Input
                value={data.title}
                readOnly
                className="w-full bg-gray-100"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2"
                  variant="outline"
                >
                  <Copy size={16} />
                  <span>{copySuccess ? "Copied!" : "Copy"}</span>
                </Button>
              </div>
              <CodeMirror
                value={data.code}
                height="400px"
                extensions={[javascript()]}
                editable={false}
                style={{ textAlign: "left" }}
                theme="light"
              />
            </div>
            <div>
              <Input
                value={data.description}
                readOnly
                className="w-full bg-gray-100"
              />
            </div>
          </div>
        ) : (
          !errorMessage && (
            <p className="text-gray-500">
              No Gist found. Enter a valid Gist ID.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Gist;
