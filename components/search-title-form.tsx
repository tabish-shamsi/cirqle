"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchTitleForm({
  placeholder,
}: {
  placeholder: string;
}) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${pathname}?query=${search}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={onChange}
        className="w-full py-2 pl-4 border-none outline-none placeholder:text-sidebar-ring dark:placeholder:text-muted-foreground"
      />

      <button hidden type="submit" />
    </form>
  );
}
