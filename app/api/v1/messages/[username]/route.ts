// app/api/v1/messages/[username]/route.ts
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const body = await req.json();
  const { content, sender_name, is_hidden = false } = body;

  if (!content?.trim()) {
    return Response.json({ error: "Content is required" }, { status: 400 });
  }

  const { data: profile } = await supabaseServer
    .from("profiles")
    .select("id, is_link_paused")
    .eq("username", username.toLowerCase())
    .single();

  if (!profile) return Response.json({ error: "User not found" }, { status: 404 });
  if (profile.is_link_paused) return Response.json({ error: "This link is paused" }, { status: 403 });

  const { error } = await supabaseServer.functions.invoke("send-message", {
    body: {
      recipient_id: profile.id,
      content: content.trim(),
      sender_name,
      is_hidden,
    },
  });

  if (error) return Response.json({ error: "Failed to send message" }, { status: 500 });

  return Response.json({ success: true });
}