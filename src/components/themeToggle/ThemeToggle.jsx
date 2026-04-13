"use client";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("winter");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "night" : "winter");
  };

  return (
    <div className="mr-2">
      <input
        type="checkbox"
        className="toggle"
        checked={theme === "night"}
        onChange={(e) => handleTheme(e.target.checked)}
      />
    </div>
  );
};

export default ThemeToggle;
