import Accountprofile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user?.id,
    objectid: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };
  return (
    <main className="mx-auto flex flex-col max-w-3xl justify-start py-20 px-10">
      <h1 className="head-text "> Onboarding</h1>
      <p className="text-lAccount Profileight-2 mt-3 text-base-regular">
        Complete your profile here to get started with Threads.
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <Accountprofile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;
