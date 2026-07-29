const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem("signbridge-theme");
    var theme = stored || "dark";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
