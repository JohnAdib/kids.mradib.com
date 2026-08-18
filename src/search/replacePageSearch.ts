export function replacePageSearch(search: string) {
  const next = search.length > 0 ? `?${search}` : window.location.pathname;
  window.history.replaceState(null, "", next);
}
