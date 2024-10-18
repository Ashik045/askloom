import Profile from "@/components/Profile/Profile";

interface Params {
  params: {
    id: string;
  };
}

export default function page({ params }: Params) {
  // const { id } = params;
  // const question = await getUserByuserId(id);
  return (
    <div>
      <h1>User</h1>

      <Profile />
    </div>
  );
}
