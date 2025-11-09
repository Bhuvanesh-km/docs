"use client";

import { usePaginatedQuery } from "convex/react";
import { NavBar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";
import DocumentsTable from "./documents-table";

const Home = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { paginationOpts: {} },
    { initialNumItems: 5 },
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed left-0 right-0 top-0 z-10 flex h-16 bg-white p-4">
        <NavBar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
};

export default Home;
