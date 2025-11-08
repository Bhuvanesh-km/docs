import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { UserButton } from "@clerk/nextjs";

export const NavBar = () => {
  return (
    <nav className="flex h-full w-full items-center justify-between">
      <div className="flex shrink-0 items-center gap-3 pr-6">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput />
      <UserButton />
    </nav>
  );
};
