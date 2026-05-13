const BASE_URL = "https://mock-backend-hintro.vercel.app";

const getUserId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("hintro_user_id") || "u1";
  }
  return "u1";
};

export interface DashboardStats {
  totalSessions: number;
  averageDuration: number;
  totalAIInteractions: number;
  lastSession: string[];
}

export interface Participant {
  name: string;
  isUser: boolean;
}

export interface CallSession {
  _id: string;
  client: string;
  description: string;
  started_at: string;
  participants: Participant[];
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CallHistoryResponse {
  callSessions: CallSession[];
  pagination: PaginationInfo;
}

export interface FeedbackItem {
  title: string;
  rating: string;
  description: string;
  date: string;
  time: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  login_method: string;
  status: string;
  is_hintro_admin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardResponse {
  user: UserProfile;
  subscription: {
    plan: string;
    billing_cycle: string;
    status: string;
  } | null;
  usage: {
    kb_files: { used: number; limit: number; percentage: number };
    vocab_terms: number;
    notes: number;
  };
}

export async function getStats(): Promise<DashboardStats | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/call-sessions/stats`, {
      headers: { "x-user-id": getUserId() },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}

export async function getCallHistory(limit = 10, page = 1): Promise<CallHistoryResponse | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/call-sessions?limit=${limit}&page=${page}`, {
      headers: { "x-user-id": getUserId() },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching call history:", error);
    return null;
  }
}

export async function getProfile(): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/profile`, {
      headers: { "x-user-id": getUserId() },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function getDashboardData(): Promise<DashboardResponse | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/dashboard`, {
      headers: { "x-user-id": getUserId() },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
}
