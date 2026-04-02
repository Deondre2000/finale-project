const NEWS_API_BASE_URL = "https://newsapi.org/v2/everything";
const NEWS_API_KEY = "af7602ea7d934a89b20dd81517a72c05";

export function normalizeEmail(email) {
  return email?.trim().toLowerCase() || "";
}

export function registerEmail(email, registeredEmails = []) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || registeredEmails.includes(normalizedEmail)) {
    return {
      success: false,
      emails: registeredEmails,
    };
  }

  return {
    success: true,
    emails: [...registeredEmails, normalizedEmail],
  };
}

export function loginWithEmail(email, registeredEmails = []) {
  const normalizedEmail = normalizeEmail(email);
  return (
    normalizedEmail.length > 0 && registeredEmails.includes(normalizedEmail)
  );
}

export async function getNewsByKeyword(query) {
  const trimmedQuery = query?.trim() || "";

  if (!trimmedQuery) {
    throw new Error("Search query is required");
  }

  const url = `${NEWS_API_BASE_URL}?q=${encodeURIComponent(trimmedQuery)}&pageSize=12&apiKey=${NEWS_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Search failed");
  }

  return data.articles || [];
}

