"use client";
import { Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitamos errores de hidratación asegurando que el componente esté montado
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  if (!mounted) return <div className="w-8 h-8" />; // Placeholder para evitar saltos visuales

  return (
    <Button
      shape="circle"
      icon={
        theme === "dark" ? (
          <SunOutlined className="text-yellow-400" />
        ) : (
          <MoonOutlined className="text-blue-600" />
        )
      }
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      // Limpiamos 'right-4' y 'z-50' porque el layout ya lo posiciona.
      // Usamos hover:shadow-lg y transición suave.
      className="flex items-center justify-center border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
    />
  );
}
