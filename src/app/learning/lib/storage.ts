export function storageKey(k: string) {
  return `replix_learning_${k}`;
}

export function loadProgress(courseId: string) {
  try {
    const raw = localStorage.getItem(storageKey(`progress_${courseId}`));
    return raw ? JSON.parse(raw) : { completed: [] };
  } catch (e) { return { completed: [] }; }
}
export function saveProgress(courseId: string, progress: any) {
  try { localStorage.setItem(storageKey(`progress_${courseId}`), JSON.stringify(progress)); } catch (e) {}
}

export function loadBadges() {
  try { const raw = localStorage.getItem(storageKey("badges")); return raw ? JSON.parse(raw) : []; } catch (e) { return []; }
}
export function saveBadges(badges: any[]) { try { localStorage.setItem(storageKey("badges"), JSON.stringify(badges)); } catch (e) {} }