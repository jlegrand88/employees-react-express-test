import js from "@eslint/js";
import globals from "globals";

export default [
  // 1. Usa las reglas recomendadas de JavaScript
  js.configs.recommended,
  
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      // 2. Define que estás en un entorno Node.js
      globals: {
        ...globals.node,
        ...globals.express, // Opcional si tienes instalada la lib 'globals'
      },
    },
    rules: {
      // 3. Tus reglas personalizadas
      "no-unused-vars": "warn",
      "no-console": "off", // En el backend solemos usar console.log
    },
  },
  
  // 4. Ignorar carpetas pesadas
  {
    ignores: ["node_modules/", "dist/"]
  }
];