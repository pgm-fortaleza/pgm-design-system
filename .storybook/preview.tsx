import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "../dist/tokens/css/base.css";
import "../dist/tokens/css/themes.css";
import "./preview.css";

document.documentElement.setAttribute("data-pgm-theme", "portal");
document.documentElement.setAttribute("data-pgm-mode", "light");

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "portal";
  const mode = theme === "portal" ? "light" : context.globals.mode ?? "light";

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-pgm-theme", theme);
    root.setAttribute("data-pgm-mode", mode);
  }, [theme, mode]);

  return <Story />;
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Tema do produto",
      toolbar: {
        title: "Tema",
        icon: "paintbrush",
        items: [
          { value: "portal", title: "Portal PGM" },
          { value: "processos", title: "Ágilis Processos" },
          { value: "divida", title: "Ágilis Dívida" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Modo claro ou escuro (o Portal só tem o claro)",
      toolbar: {
        title: "Modo",
        icon: "mirror",
        items: [
          { value: "light", title: "Claro" },
          { value: "dark", title: "Escuro" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "portal", mode: "light" },
  parameters: {
    layout: "padded",
    controls: { expanded: true, sort: "requiredFirst" },
    a11y: { test: "todo" },
    options: {
      storySort: { order: ["Introdução", "Fundações", ["Cores", "Tipografia", "Forma e espaço", "Ícones"], "Componentes"] },
    },
  },
};

export default preview;
