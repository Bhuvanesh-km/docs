"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscrean-loader";
import { getUsers } from "./actions";
import { toast } from "sonner";

type User = { id: string; name: string; avatar: string };

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
          authEndpoint="/api/liveblocks-auth"
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
          resolveRoomsInfo={() => users.map((user) => user.name)}
          lostConnectionTimeout={10000}
        >
          <RoomProvider id={roomId}>
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
