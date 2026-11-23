import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusTag } from "./StatusTag";

const meta: Meta<typeof StatusTag> = {
  title: "Componentes/StatusTag",
  component: StatusTag,
  parameters: {
    docs: {
      description: {
        component:
          "Etiqueta de situação, só leitura, usada em listagens (Publicada, Rascunho, Ativo, Inativo). O texto sempre diz a situação; a cor e o ponto só reforçam.",
      },
    },
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["success", "warning", "error", "info", "secondary", "neutral"] },
    dot: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    tone: "success",
    dot: true,
    children: "Publicada",
  },
};

export default meta;

type Story = StoryObj<typeof StatusTag>;

export const Playground: Story = {};

export const Tons: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <StatusTag {...args} tone="success">Ativo</StatusTag>
      <StatusTag {...args} tone="warning">Rascunho</StatusTag>
      <StatusTag {...args} tone="error">Vencido</StatusTag>
      <StatusTag {...args} tone="info">Em análise</StatusTag>
      <StatusTag {...args} tone="secondary">Agendado</StatusTag>
      <StatusTag {...args} tone="neutral">Inativo</StatusTag>
    </div>
  ),
};

export const SemPonto: Story = {
  name: "Sem ponto",
  args: { dot: false, tone: "info", children: "Novo" },
};
