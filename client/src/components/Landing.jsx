import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-2xl font-bold">Create, Share, Collaborate</div>
      <div className="flex space-x-4">
        <Button asChild>
          <Link to="/home">Home</Link>
        </Button>
        <Button asChild>
          <Link to="/new">Create</Link>
        </Button>
      </div>
    </div>
  );
}

export default Landing;
