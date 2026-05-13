import { createServer } from "http";

const PORT = 3001;

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clients = [
  "Acme Corp",
  "TechStart",
  "BigCorp",
  "StartupXYZ",
  "Enterprise Inc",
  "VisionFlow",
  "FutureScale",
];

const descriptions = [
  "Sales call",
  "Discovery meeting",
  "Product demo",
  "Client onboarding",
  "Strategy session",
  "Follow-up call",
  "Consultation",
];

const participantNames = [
  "Jane Smith",
  "Alex Johnson",
  "Michael Brown",
  "Sarah Wilson",
  "Emily Davis",
];

const users = {
  u1: {
    profile: {
      id: "u1",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      login_method: "google",
      status: "active",
      is_hintro_admin: false,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-06-20T14:30:00Z",
    },

    dashboard: {
      subscription: null,
      usage: {
        kb_files: {
          used: 0,
          limit: 100,
          percentage: 0,
        },
        vocab_terms: 0,
        notes: 0,
      },
    },

    stats: {
      totalSessions: 0,
      averageDuration: 0,
      totalAIInteractions: 0,
      lastSession: [],
    },

    callSessions: [],
  },

  u2: {
    profile: {
      id: "u2",
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Smith",
      login_method: "google",
      status: "active",
      is_hintro_admin: false,
      createdAt: "2024-02-10T08:00:00Z",
      updatedAt: new Date().toISOString(),
    },
  },
};

const generateStats = () => ({
  totalSessions: random(1, 200),
  averageDuration: random(300, 8000),
  totalAIInteractions: random(1, 70),
  lastSession: [
    new Date().toISOString(),
    new Date(Date.now() - 86400000).toISOString(),
    new Date(Date.now() - 172800000).toISOString(),
  ],
});

const generateDashboard = () => ({
  subscription: {
    plan: "professional",
    billing_cycle: "monthly",
    status: "active",
  },
  usage: {
    kb_files: {
      used: random(50, 500),
      limit: 1000,
      percentage: random(5, 90),
    },
    vocab_terms: random(20, 200),
    notes: random(5, 100),
  },
});

const generateCallSessions = (limit = 10, page = 1) => {
  const sessions = [];
  const totalCount = 15;
  const totalPages = Math.ceil(totalCount / limit);

  for (let i = 0; i < limit; i++) {
    const duration = random(300, 3600);
    const startedAt = new Date(Date.now() - random(1, 60) * 86400000);
    const endedAt = new Date(startedAt.getTime() + duration * 1000);

    sessions.push({
      _id: `cs${i + 1}`,
      user_id: "u2",
      status: "ended",
      client: clients[random(0, clients.length - 1)],
      description: descriptions[random(0, descriptions.length - 1)],
      started_at: startedAt.toISOString(),
      ended_at: endedAt.toISOString(),
      total_duration_seconds: duration,
      language: ["en"],
      auto_gen_ai_response: Math.random() > 0.5,
      save_transcript: true,
      transcript: null,
      transcript_final: Math.random() > 0.5,
      ai_interactions: random(1, 10),
      call_framework_id: null,
      participants: [
        {
          name: participantNames[random(0, participantNames.length - 1)],
          isUser: true,
        },
        {
          name: "Client",
          isUser: false,
        },
      ],
      ended_reason: "user_ended",
      createdAt: startedAt.toISOString(),
      updatedAt: endedAt.toISOString(),
    });
  }

  return {
    callSessions: sessions,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

const generateFeedback = () => ({
  feedback: [
    {
      title: "My First Call",
      rating: "2/5",
      description: "- Had issues with...",
      date: "10th May 2026",
      time: "5:00 pm",
    },
    {
      title: "My First Call",
      rating: "4/5",
      description: "- The boxy feature...",
      date: "11th May 2026",
      time: "5:00 pm",
    },
  ],
});

const server = createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-user-id");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const userId = req.headers["x-user-id"] || "u1";

  if (url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", message: "Mock server is running" }));
    return;
  }

  if (url.pathname === "/api/auth/profile") {
    const profile = users[userId]?.profile || users.u1.profile;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(profile));
    return;
  }

  if (url.pathname === "/api/auth/dashboard") {
    let response;
    if (userId === "u1") {
      response = {
        user: users.u1.profile,
        subscription: users.u1.dashboard.subscription,
        usage: users.u1.dashboard.usage,
      };
    } else {
      response = {
        user: users.u2.profile,
        subscription: generateDashboard().subscription,
        usage: generateDashboard().usage,
      };
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
    return;
  }

  if (url.pathname === "/api/call-sessions/stats") {
    const response = userId === "u1" ? users.u1.stats : generateStats();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
    return;
  }

  if (url.pathname === "/api/call-sessions") {
    const limit = Number(url.searchParams.get("limit") || 10);
    const page = Number(url.searchParams.get("page") || 1);
    const response = userId === "u1" ? {
      callSessions: [],
      pagination: {
        page,
        limit,
        totalCount: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    } : generateCallSessions(limit, page);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
    return;
  }

  if (url.pathname === "/api/feedback") {
    const response = userId === "u1" ? { feedback: [] } : generateFeedback();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});