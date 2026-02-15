import { getUsers } from "@/data/user";
import PeopleGrid from "./people-grid";
import { nanoid } from "nanoid";

export default async function UsersWrapper({ q }: { q: string }) {
  const users = await getUsers({ search: q });
  const id = nanoid()

  if (users.length > 0) {
    return <PeopleGrid key={id} initialUsers={users} />;
  } else {
    return (
      <p className="text-sm text-muted-foreground">No people found</p>
    );
  }
}
