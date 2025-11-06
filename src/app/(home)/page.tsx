"use client";

import { useQuery } from "convex/react";
import { NavBar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";

const Home = () => {
  const documents = useQuery(api.documents.get);
  if (documents === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed left-0 right-0 top-0 z-10 flex h-16 bg-white p-4">
        <NavBar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        {documents?.map((document) => (
          <span key={document.title}>{document.title}</span>
        ))}
      </div>
    </div>
  );
};

export default Home;
