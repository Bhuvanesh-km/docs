import Link from "next/link";
import { NavBar } from "./navbar";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed left-0 right-0 top-0 z-10 flex h-16 bg-white p-4">
        <NavBar />
      </div>
      <div className="mt-16">
        Click
        <Link href="/documents/123">
          <span className="text-blue-500 hover:underline">
            &nbsp;here&nbsp;
          </span>
        </Link>
        to go to a document.
      </div>
    </div>
  );
};

export default Home;
