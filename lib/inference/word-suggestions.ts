/**
 * A small, static list of common English words used for prefix-based
 * autocomplete while fingerspelling. This is plain dictionary lookup —
 * not a language model — and is labeled as such in the UI.
 */
const COMMON_WORDS = [
  "a", "about", "after", "again", "all", "also", "always", "am", "and",
  "any", "are", "ask", "at", "bad", "be", "because", "been", "before",
  "best", "big", "bye", "call", "can", "come", "day", "do", "does",
  "done", "eat", "even", "every", "family", "feel", "find", "fine",
  "food", "for", "friend", "from", "get", "give", "go", "good", "goodbye",
  "great", "hard", "have", "he", "hello", "help", "her", "here", "hi",
  "his", "home", "hope", "hour", "how", "hungry", "i", "if", "in", "is",
  "it", "just", "keep", "know", "later", "learn", "like", "little",
  "live", "look", "love", "make", "many", "may", "me", "mean", "meet",
  "more", "most", "my", "name", "need", "new", "next", "no", "not",
  "now", "of", "off", "ok", "okay", "on", "one", "only", "or", "our",
  "out", "over", "people", "please", "put", "read", "ready", "same",
  "say", "see", "she", "should", "since", "so", "some", "sorry", "still",
  "stop", "sure", "take", "talk", "tell", "thank", "thanks", "that",
  "the", "their", "them", "then", "there", "these", "they", "thing",
  "think", "this", "time", "to", "today", "tomorrow", "too", "try",
  "understand", "up", "us", "use", "very", "wait", "want", "was", "water",
  "way", "we", "well", "what", "when", "where", "which", "who", "why",
  "will", "with", "work", "would", "yes", "yesterday", "you", "your",
];

export function suggestWords(prefix: string, limit = 5): string[] {
  const normalized = prefix.trim().toLowerCase();
  if (!normalized) return [];

  return COMMON_WORDS.filter((word) => word.startsWith(normalized))
    .sort((a, b) => a.length - b.length)
    .slice(0, limit);
}
