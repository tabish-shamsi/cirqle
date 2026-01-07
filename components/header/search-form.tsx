"use client";

import { useForm } from "react-hook-form";
import Form from "../form";
import InputWithIcon from "../input-with-icon";
import { Search } from "lucide-react";

export default function SearchForm() {
  const form = useForm({
    defaultValues: {
      query: "",
    },
  });

  const handleSearch = async (data: any) => {
    console.log(data);
    
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
