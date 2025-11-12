"use client";
import { SiGoogledocs } from "react-icons/si";

import { TableCell, TableRow } from "@/components/ui/table";
import { Building2, CircleUserIcon } from "lucide-react";
import { Doc } from "../../../convex/_generated/dataModel";

import { format } from "date-fns";
import { DocumentMenu } from "./document-menu";
import { useRouter } from "next/navigation";

interface DocumentRowProps {
  document: Doc<"documents">;
}

export const DocumentRow = ({ document }: DocumentRowProps) => {
  const router = useRouter();

  return (
    <TableRow
      onClick={() => router.push(`/documents/${document._id}`)}
      className="cursor-pointer hover:bg-transparent"
    >
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="hidden items-center gap-2 text-muted-foreground md:flex">
        {document.organizationId ? (
          <Building2 className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="hidden text-muted-foreground md:table-cell">
        {format(document._creationTime, "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTabClick={() =>
            window.open(`/documents/${document._id}`, "_blank")
          }
        />
      </TableCell>
    </TableRow>
  );
};
