import { PrismaClient, Platform } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Upsert categories
  const categories = {
    authentication: await prisma.category.upsert({
      where: { name: "Authentication & Security" },
      update: {},
      create: { name: "Authentication & Security" },
    }),
    onboarding: await prisma.category.upsert({
      where: { name: "Onboarding & KYC" },
      update: {},
      create: { name: "Onboarding & KYC" },
    }),
    dashboard: await prisma.category.upsert({
      where: { name: "Dashboard" },
      update: {},
      create: { name: "Dashboard" },
    }),
    transaction: await prisma.category.upsert({
      where: { name: "Transaction History" },
      update: {},
      create: { name: "Transaction History" },
    }),
    transfer: await prisma.category.upsert({
      where: { name: "Fund Transfer" },
      update: {},
      create: { name: "Fund Transfer" },
    }),
    payments: await prisma.category.upsert({
      where: { name: "Bill Payments" },
      update: {},
      create: { name: "Bill Payments" },
    }),
    card: await prisma.category.upsert({
      where: { name: "Card Management" },
      update: {},
      create: { name: "Card Management" },
    }),
    notifications: await prisma.category.upsert({
      where: { name: "Notifications & Alerts" },
      update: {},
      create: { name: "Notifications & Alerts" },
    }),
    analytics: await prisma.category.upsert({
      where: { name: "Spending Analytics" },
      update: {},
      create: { name: "Spending Analytics" },
    }),
    profile: await prisma.category.upsert({
      where: { name: "User Profile & Settings" },
      update: {},
      create: { name: "User Profile & Settings" },
    }),
  };

  // 2. Define patterns
  const patterns = [
    {
      title: "Login & Authentication",
      description:
        "Single and two-factor authentication (password + OTP/SMS/biometric), social login options, clear error handling and input hints.",
      platform: Platform.IOS,
      categoryId: categories.authentication.id,
      screenshots: ["https://mobbin.design/screenshots/login-auth.png"],
    },
    {
      title: "Onboarding & KYC",
      description:
        "Step-by-step data collection for personal details, document uploads (ID/selfie) with progress bar and checklist.",
      platform: Platform.ANDROID,
      categoryId: categories.onboarding.id,
      screenshots: ["https://mobbin.design/screenshots/onboarding-kyc.png"],
    },
    {
      title: "Dashboard Overview",
      description:
        "Account cards showing balances, recent transactions, and quick actions for transfers or balance checks.",
      platform: Platform.WEB,
      categoryId: categories.dashboard.id,
      screenshots: ["https://mobbin.design/screenshots/dashboard-overview.png"],
    },
    {
      title: "Transaction History",
      description:
        "Filterable list of transactions by date, category, amount; search by payee or description; detailed view with status and fees.",
      platform: Platform.IOS,
      categoryId: categories.transaction.id,
      screenshots: [
        "https://mobbin.design/screenshots/transaction-history.png",
      ],
    },
    {
      title: "Fund Transfer",
      description:
        "Select sender/receiver from contacts or enter IBAN/BIC; confirm via PIN, SMS code or biometrics.",
      platform: Platform.ANDROID,
      categoryId: categories.transfer.id,
      screenshots: ["https://mobbin.design/screenshots/fund-transfer.png"],
    },
    {
      title: "Bill Payments & Subscriptions",
      description:
        "Choose provider from templates, set up recurring payments with reminders, QR-code scanner support.",
      platform: Platform.WEB,
      categoryId: categories.payments.id,
      screenshots: ["https://mobbin.design/screenshots/bill-payments.png"],
    },
    {
      title: "Card Management",
      description:
        "Instant block/unblock, limit adjustments (online, NFC), view recent card transactions.",
      platform: Platform.IOS,
      categoryId: categories.card.id,
      screenshots: ["https://mobbin.design/screenshots/card-management.png"],
    },
    {
      title: "Notifications & Alerts",
      description:
        "Push notifications for large transactions or low balances, threshold settings, channel history (push/SMS/email).",
      platform: Platform.ANDROID,
      categoryId: categories.notifications.id,
      screenshots: [
        "https://mobbin.design/screenshots/notifications-alerts.png",
      ],
    },
    {
      title: "Spending Analytics",
      description:
        "Pie or bar charts of spending by category, trends over periods (month, quarter), saving recommendations.",
      platform: Platform.WEB,
      categoryId: categories.analytics.id,
      screenshots: ["https://mobbin.design/screenshots/spending-analytics.png"],
    },
    {
      title: "User Profile & Settings",
      description:
        "Edit personal data, security settings (password, biometrics), manage connected devices and sessions.",
      platform: Platform.IOS,
      categoryId: categories.profile.id,
      screenshots: [
        "https://mobbin.design/screenshots/user-profile-settings.png",
      ],
    },
  ];

  // 3. Upsert patterns
  for (const p of patterns) {
    await prisma.uXPattern.upsert({
      where: { title: p.title },
      update: {
        description: p.description,
        platform: p.platform,
        categoryId: p.categoryId,
        screenshots: p.screenshots,
      },
      create: p,
    });
  }

  console.log("Database seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
