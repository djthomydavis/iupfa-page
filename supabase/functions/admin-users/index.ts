// Edge Function: admin-users
// Acciones administrativas sobre cuentas de Auth que requieren la service_role key
// (borrar usuario, banear/desbanear, resetear contraseña). Nunca exponer esta
// key en el navegador: por eso vive acá, del lado del servidor.
//
// Deploy: supabase functions deploy admin-users --project-ref <tu-project-ref>
// (SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY los inyecta Supabase automáticamente,
// no hace falta configurarlos a mano).

import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!#$%";
  let out = "";
  for (let i = 0; i < 12; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization") || "";
  const callerToken = authHeader.replace("Bearer ", "");
  if (!callerToken) return json({ error: "Falta autenticación" }, 401);

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // Verifica que quien llama es un admin real (no confía en nada que venga del cliente).
  const { data: callerData, error: callerError } = await admin.auth.getUser(callerToken);
  if (callerError || !callerData?.user) return json({ error: "Sesión inválida" }, 401);

  const { data: callerProfile, error: profileError } = await admin
    .from("profiles")
    .select("role")
    .eq("id", callerData.user.id)
    .single();
  if (profileError || callerProfile?.role !== "admin") {
    return json({ error: "No autorizado" }, 403);
  }

  let payload: { action?: string; userId?: string };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Body inválido" }, 400);
  }

  const { action, userId } = payload;
  if (!action || !userId) return json({ error: "Faltan parámetros" }, 400);
  if (userId === callerData.user.id) return json({ error: "No podés aplicarte esta acción a vos mismo" }, 400);

  if (action === "delete") {
    const { error } = await admin.auth.admin.deleteUser(userId);
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true });
  }

  if (action === "ban" || action === "unban") {
    const { error } = await admin.auth.admin.updateUserById(userId, {
      ban_duration: action === "ban" ? "876000h" : "none",
    });
    if (error) return json({ error: error.message }, 400);
    await admin.from("profiles").update({ banned: action === "ban" }).eq("id", userId);
    return json({ ok: true });
  }

  if (action === "reset_password") {
    const newPassword = generatePassword();
    const { error } = await admin.auth.admin.updateUserById(userId, { password: newPassword });
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true, password: newPassword });
  }

  return json({ error: "Acción desconocida" }, 400);
});
