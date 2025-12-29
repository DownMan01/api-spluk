// app/api/v1/profiles/[username]/route.ts
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const { data, error } = await supabaseServer
    .from("profiles")
    .select("username, display_name, bio, avatar_url, theme_color")
    .eq("username", username.toLowerCase())
    .single();

  if (!data || error) {
    return Response.json({ error: "Profile not found" }, { status: 404 });
  }

  return Response.json({ success: true, profile: data });
}