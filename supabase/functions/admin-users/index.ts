// Edge Function: admin-users
// Acciones administrativas sobre cuentas de Auth que requieren la service_role key
// (borrar usuario, banear/desbanear, generar código de restablecimiento de
// contraseña y aplicar la contraseña que el usuario elige con ese código).
// Nunca exponer la service_role key en el navegador: por eso vive acá.
//
// Deploy: supabase functions deploy admin-users --project-ref <tu-project-ref>
// (SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY los inyecta Supabase automáticamente).
// verify_jwt está desactivado para esta función (ver supabase/config.toml) porque
// la acción confirm_password_reset la ejecuta un usuario sin sesión iniciada;
// la autorización de las demás acciones se valida a mano acá adentro.

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

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let payload: {
    action?: string;
    userId?: string;
    email?: string;
    code?: string;
    newPassword?: string;
  };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Body inválido" }, 400);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const { action } = payload;

  // --- Acción pública: el usuario confirma el código que le mandó un admin ---
  if (action === "confirm_password_reset") {
    const { email, code, newPassword } = payload;
    if (!email || !code || !newPassword) return json({ error: "Faltan datos" }, 400);
    if (newPassword.length < 6) return json({ error: "La contraseña debe tener al menos 6 caracteres" }, 400);

    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("id, password_reset_code, password_reset_expires")
      .eq("email", email)
      .single();

    if (profileError || !profile) return json({ error: "Código inválido o vencido" }, 400);
    if (!profile.password_reset_code || profile.password_reset_code !== code) {
      return json({ error: "Código inválido o vencido" }, 400);
    }
    if (!profile.password_reset_expires || new Date(profile.password_reset_expires) < new Date()) {
      return json({ error: "Código inválido o vencido" }, 400);
    }

    const { error: updateError } = await admin.auth.admin.updateUserById(profile.id, { password: newPassword });
    if (updateError) return json({ error: updateError.message }, 400);

    await admin.from("profiles").update({ password_reset_code: null, password_reset_expires: null }).eq("id", profile.id);
    return json({ ok: true });
  }

  // --- El resto de las acciones son solo para admins autenticados ---
  const authHeader = req.headers.get("Authorization") || "";
  const callerToken = authHeader.replace("Bearer ", "");
  if (!callerToken) return json({ error: "Falta autenticación" }, 401);

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

  const { userId } = payload;
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
    const code = generateCode();
    const expires = new Date(Date.now() + 30 * 60000).toISOString();
    const { error } = await admin
      .from("profiles")
      .update({ password_reset_code: code, password_reset_expires: expires })
      .eq("id", userId);
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true, code });
  }

  return json({ error: "Acción desconocida" }, 400);
});
