import { getProfile } from "@/actions/auth";
import DashboardTabs from "@/components/dashboard/dashboard-tab";
import Navigation from "@/components/main-navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  let userResponse = await supabase.auth.getUser();
  const profile = await getProfile();

  if (!profile) {
    return null;
  }
  return (
    <>
      <Navigation user={userResponse.data.user} />
      <div className="h-full p-6 relative pt-28">
        <div className="p-4  border rounded-md max-w-md bg-yellow-50">
          <h2 className="text-xl font-bold mb-2">
            Hello, {profile!.first_name} {profile!.last_name}!
          </h2>
          <p className="text-gray-700">
            🔥 Current login streak:{" "}
            <span className="font-semibold">{profile!.streak}</span> day
            {profile!.streak === 1 ? "" : "s"}
          </p>
        </div>
        <DashboardTabs profile={profile} />
      </div>
    </>
  );
}
