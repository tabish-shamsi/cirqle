import FriendCard from "../friends/friend-card";

export default function PeopleGrid({ people }: { people: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {people.map((p: any) => (
        <FriendCard key={p.id} friend={p} />
      ))}
    </div>
  );
}
