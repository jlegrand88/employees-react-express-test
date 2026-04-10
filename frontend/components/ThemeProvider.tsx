"use client";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita errores de hidratación
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  if (!mounted) return <div style={{ visibility: "hidden" }}>{children}</div>;

  return (
    <ConfigProvider
      theme={{
        algorithm:
          resolvedTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff", // Mantener tu azul corporativo
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

// Wrapper principal
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeProvider>{children}</ThemeProvider>
    </NextThemesProvider>
  );
}
