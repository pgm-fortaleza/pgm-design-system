import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Componentes/Skeleton",
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          "Marcação de conteúdo carregando. Fica fora da árvore de acessibilidade (`aria-hidden`): o anúncio de carregamento é responsabilidade de quem usa (`aria-busy` ou `role=\"status\"`). A pulsação para com `prefers-reduced-motion`.",
      },
    },
  },
  argTypes: {
    shape: { control: "inline-radio", options: ["text", "rect", "circle"] },
    width: { control: "text" },
    height: { control: "text" },
  },
  args: { shape: "text" },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {};

export const Formatos: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
      <Skeleton shape="circle" />
      <Skeleton shape="text" />
      <Skeleton shape="text" width="50%" />
      <Skeleton shape="rect" />
    </div>
  ),
};

export const Cartao: Story = {
  name: "Cartão carregando",
  render: () => (
    <div
      aria-busy="true"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 320,
        padding: 16,
        borderRadius: 12,
        border: "1px solid var(--pgm-sys-color-outline-variant)",
      }}
    >
      <Skeleton width="70%" height={16} />
      <Skeleton width="90%" />
      <Skeleton width="60%" />
      <span role="status" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        Carregando contato
      </span>
    </div>
  ),
};
