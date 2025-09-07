"use server";
import { Profile } from "@/types";
import { createClient } from "@/utils/supabase/server";

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getAllStudents(): Promise<Profile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

export async function updateLoginStreak(userId: string) {
  const supabase = await createClient();

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
    console.log("diffDays", diffDays);
    if (diffDays === 1) {
      newStreak = profile.streak + 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    } else {
      newStreak = profile.streak;
    }
  }
  await supabase
    .from("profiles")
    .update({ streak: newStreak, last_login: now.toISOString() })
    .eq("id", userId);

  return newStreak;
}
