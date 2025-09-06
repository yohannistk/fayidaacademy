import { createClient } from "@/utils/supabase/server";
import { AuthProvider } from "../context/AuthContext";
import { updateLoginStreak } from "@/actions/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    let newStreak = await updateLoginStreak(session.user.id);
  }
  return (
    <div className="max-w-[90rem] mx-auto">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
