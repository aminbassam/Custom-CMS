export const localDashboardMetrics = {
  pageViews: 45231,
  visitors: 12543,
  conversions: 523,
  publishedContent: 89,
  submissions: 18,
  users: 4,
  exports: 3,
  activity: 42
};

export const localDashboardActivity = [
  {
    id: "activity-1",
    summary: "New blog post published",
    entityType: "blog_post",
    actorName: "Sarah Johnson",
    createdAt: new Date("2026-03-30T09:30:00.000Z")
  },
  {
    id: "activity-2",
    summary: "Landing page content helper updated",
    entityType: "landing_page",
    actorName: "Michael Chen",
    createdAt: new Date("2026-03-29T15:00:00.000Z")
  },
  {
    id: "activity-3",
    summary: "Contact submission reviewed",
    entityType: "form_submission",
    actorName: "Emma Williams",
    createdAt: new Date("2026-03-29T11:45:00.000Z")
  }
];

export const localSubmissions = [
  {
    id: "submission-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (713) 555-0192",
    company: "Acme Growth",
    message: "We need a new service site with a better CMS setup and a simple client portal for internal approvals.",
    status: "new",
    createdAt: new Date("2026-03-30T08:15:00.000Z"),
    notes: [
      {
        id: "submission-note-1",
        note: "High-fit lead. Wants speed and a scalable content workflow.",
        authorName: "Demo Admin"
      }
    ]
  },
  {
    id: "submission-2",
    name: "Maria Garcia",
    email: "maria@creativestudio.com",
    phone: null,
    company: "Creative Studio",
    message: "Interested in local landing pages and content strategy support after launch.",
    status: "in_review",
    createdAt: new Date("2026-03-29T14:20:00.000Z"),
    notes: []
  }
] as const;

export const localUsers = [
  {
    id: "demo-admin",
    name: "Demo Admin",
    email: "admin@example.com",
    status: "active",
    roles: ["Administrator"]
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "active",
    roles: ["Content Manager"]
  }
];

export const localRoles = [
  {
    id: "role-admin",
    name: "Administrator",
    description: "Full operational access across the dashboard.",
    permissions: [
      "dashboard:view",
      "submissions:view",
      "submissions:manage",
      "users:view",
      "users:manage",
      "roles:manage",
      "settings:manage",
      "activity:view",
      "content-helper:view"
    ]
  },
  {
    id: "role-content",
    name: "Content Manager",
    description: "Can access content helper routes and review publishing workflows.",
    permissions: ["dashboard:view", "content-helper:view"]
  }
];
