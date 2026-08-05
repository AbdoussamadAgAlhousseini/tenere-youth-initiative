import { db } from "@/server/db";

export function getUserDocuments(userId: string) {
  return db.document.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export function getUserMessages(userId: string) {
  return db.message.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export function getUserNotifications(userId: string) {
  return db.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getMemberOverview(userId: string) {
  const [documents, messages, notifications, unread] = await Promise.all([
    db.document.count({ where: { userId } }),
    db.message.count({ where: { userId } }),
    db.notification.count({ where: { userId } }),
    db.notification.count({ where: { userId, read: false } }),
  ]);
  return { documents, messages, notifications, unread };
}
