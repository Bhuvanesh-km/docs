import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

const DocumentsTable = ({
  documents = [],
  loadMore,
  status,
}: DocumentsTableProps) => {
  return (
    <div className="max-w-screen mx-auto flex flex-col gap-5 px-16 py-6">
      {documents === undefined ? (
        <div className="flex h-24 items-center justify-center">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div>Loaded.</div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};

export default DocumentsTable;
