"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useSearchParam } from "@/hooks/use-search-parm";

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam("search");
  const [value, setValue] = useState<string>(search);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <form onSubmit={handleSubmit} className="relative w-full max-w-[720px]">
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Search"
          className="h-[48px] w-full rounded-full border-none bg-[#f0f4f8] px-14 placeholder:text-neutral-700 focus:bg-white focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,0.3),0_1px_3px__1px_rgba(65,69,73,0.15)] focus-visible:ring-0 md:text-base"
        />
        <Button
          type="submit"
          variant="ghost"
          size={"icon"}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full hover:bg-neutral-200/50 [&_svg]:size-5"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size={"icon"}
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full hover:bg-neutral-200/50 [&_svg]:size-5"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};
