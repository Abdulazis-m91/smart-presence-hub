import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Create developer account
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const devExists = existingUsers?.users?.find(u => u.email === 'abdulazisf2000@gmail.com');

    if (!devExists) {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: 'abdulazisf2000@gmail.com',
        password: 'Jquerym91',
        email_confirm: true,
        user_metadata: { name: 'Abdul Azis F', role: 'developer' },
      });
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, message: 'Developer account created', userId: data.user.id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Developer account already exists' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
