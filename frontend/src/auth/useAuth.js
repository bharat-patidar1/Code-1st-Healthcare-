import { useEffect, useState } from "react";
import api from "../lib/axios";
import { toast } from "sonner";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        toast.error("Authentication failed. Please log in again.");
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return { user, setUser };
}