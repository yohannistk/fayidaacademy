import { sendEmail } from "@/actions/sendEmail";
import { createClient } from "./client";

const supabase = createClient();
export async function updateLoginStreak(userId: string) {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("streak, last_login")
    .eq("id", userId)
    .single();

  if (!profile) return;

  const now = new Date();
  const lastLogin = profile.last_login ? new Date(profile.last_login) : null;

  let newStreak = 1;

  if (lastLogin) {
    const diffDays = Math.floor(
      (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      newStreak = profile.streak + 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    } else {
      newStreak = profile.streak;
    }
  }
  console.log("New Streak:", newStreak);
  await supabase
    .from("profiles")
    .update({ streak: newStreak, last_login: now.toISOString() })
    .eq("id", userId);
}
export async function addSession(
  userId: string,
  deviceInfo?: string,
  ipAddress?: string
) {
  const { data: sessions } = await supabase
    .from("user_sessions")
    .select("id")
    .eq("user_id", userId);

  if (sessions && sessions.length >= 2) {
    sendEmail({
      subject: "Maximum Active Sessions Reached",
      text: `User with ID ${userId} and name has reached the maximum number of active sessions.`,
    });
    throw new Error("Maximum active sessions reached");
  }

  const { data: sessionData, error } = await supabase
    .from("user_sessions")
    .insert({
      user_id: userId,
      device_info: navigator.userAgent,
      ip_address: "127.0.0.1",
    })
    .select()
    .single();

  if (!error && sessionData) {
    localStorage.setItem("sessionId", sessionData.id);
  }
}
