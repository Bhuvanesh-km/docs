"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscrean-loader";
import { getUsers, getDocuments } from "./actions";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

type User = { id: string; name: string; avatar: string; color: string };

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const roomId = params.documentId as string;
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchUsers = useMemo(
    () => async () => {
      try {
        setIsLoading(true);
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      {isLoading ? (
        <FullscreenLoader label="Loading users..." />
      ) : (
        <LiveblocksProvider
          authEndpoint={async () => {
            const endpoint = "/api/liveblocks-auth";
            const room = params.documentId as string;
            const response = await fetch(endpoint, {
              method: "POST",
              body: JSON.stringify({ room }),
            });
            return await response.json();
          }}
          throttle={16}
          resolveUsers={({ userIds }) => {
            return userIds.map(
              (userId) => users.find((user) => user.id === userId) ?? undefined,
            );
          }}
          resolveMentionSuggestions={({ text }) => {
            let filteredUsers = users;
            if (text) {
              filteredUsers = users.filter((user) =>
                user.name.toLowerCase().includes(text.toLowerCase()),
              );
            }
            return filteredUsers.map((user) => user.id);
          }}
          resolveRoomsInfo={async ({ roomIds }) => {
            const documents = await getDocuments(roomIds as Id<"documents">[]);
            return documents.map((document) => ({
              id: document.id,
              name: document.name,
            }));
          }}
          lostConnectionTimeout={10000}
        >
          <RoomProvider
            id={roomId}
            initialStorage={{
              leftMargin: LEFT_MARGIN_DEFAULT,
              rightMargin: RIGHT_MARGIN_DEFAULT,
            }}
          >
            <ClientSideSuspense
              fallback={<FullscreenLoader label="Loading room..." />}
            >
              {children}
            </ClientSideSuspense>
          </RoomProvider>
        </LiveblocksProvider>
      )}
    </>
  );
}
