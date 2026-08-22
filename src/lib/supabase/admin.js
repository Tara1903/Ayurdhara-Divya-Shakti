"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminClient = createAdminClient;
var supabase_js_1 = require("@supabase/supabase-js");
// Use this strictly on the server for admin tasks
// NEVER expose this to the client
function createAdminClient() {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined');
    }
    return (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
