import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import secrets from "./secrets.js";
import "react-native-url-polyfill/auto";

export const supabase = createClient(
  secrets.supabaseUrl,
  secrets.supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
