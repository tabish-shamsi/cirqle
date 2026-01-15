"use client";

import { useForm } from "react-hook-form";
import Form from "../form";
import InputWithIcon from "../input-with-icon";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const form = useForm({
    defaultValues: {
      query: "",
    },
  });

  const router = useRouter();

  const handleSearch = async (data: any) => {
    router.push(`/search?q=${data.query}&posts=1`);
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
