import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CreateGist = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("console.log('hello world!');");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description, title, code };
      const response = await fetch("http://localhost:3000/gists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Failed to create gist");
      }
      const data = await response.json();
      console.log(data)
      console.log(body)
      navigate(`/${data._id}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setCode(val);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 border border-gray-300 rounded-md shadow-md">
      <form onSubmit={onSubmit} className="w-full space-y-6">
        <div>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full"
          />
        </div>

        <div>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. script.js"
            className="w-full"
          />
        </div>

        <div>
          <CodeMirror
            value={code}
            height="400px"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
            style={{ textAlign: "left" }}
          />
        </div>

        <Button type="submit" className="w-full">
          Create Gist
        </Button>
      </form>
    </div>
  );
};

export default CreateGist;
