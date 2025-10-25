// small helpers for localStorage and defaults

export const ADMIN_CREDENTIALS = { email: "admin@quizapp.com", password: "admin123", name: "Admin" };

export function getStoredTheme() {
  return localStorage.getItem("theme") || null;
}

export function saveAttempt(attempt) {
  // attempt: { id, userEmail, quizId, answers: [...], score, total, timeTaken, date }
  const stored = JSON.parse(localStorage.getItem("attempts") || "[]");
  stored.push(attempt);
  localStorage.setItem("attempts", JSON.stringify(stored));
  return attempt.id;
}

export function getQuizzes() {
  return JSON.parse(localStorage.getItem("quizzes") || "[]");
}

export function getQuestions() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}

export function getCategories() {
  return JSON.parse(localStorage.getItem("categories") || "[]");
}
