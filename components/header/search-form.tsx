"use client";

import { useForm } from "react-hook-form";
import Form from "../form";
import InputWithIcon from "../input-with-icon";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const form = useForm({
    defaultValues: {
      query: "",
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const posts = searchParams.get("posts");
  const videos = searchParams.get("videos");
  const people = searchParams.get("people");

  const handleSearch = async (data: any) => {
    router.push(
      `/search?q=${data.query}&${posts ? "posts=1" : videos ? "videos=1" : people ? "people=1" : "posts=1"}`,
    );
  };

  return (
    <div className="hidden md:block">
      <Form form={form} onSubmit={handleSearch}>
        <div className="w-87.5">
          <InputWithIcon
            control={form.control}
            name="query"
            placeholder="Search..."
            icon={<Search />}
            className="w-full rounded-full"
          />
        </div>
      </Form>
    </div>
  );
}
