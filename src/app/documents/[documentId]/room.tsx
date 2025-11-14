"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const roomId = params.documentId as string;
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_-L-KxkdXkka002QgLQBw8vMP_gn6hjxgVKBoPieLyWpRhAbg4DfKWwhpru0i4qlZ"
      }
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
