import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { IconButton } from "./IconButton";

const symbol = (name: string) => <span className="material-symbols-sharp">{name}</span>;

const ICONS = { edit: symbol("edit"), delete: symbol("delete"), search: symbol("search"), close: symbol("close") };

const meta: Meta<typeof IconButton> = {
  title: "Componentes/IconButton",
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          "Botão só com ícone. `label` é obrigatório: vira o `aria-label` e, com `tooltip`, a dica mostrada ao passar o mouse ou focar.",
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["standard", "filled", "tonal", "outlined"] },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    icon: { control: "select", options: Object.keys(ICONS), mapping: ICONS },
    tooltip: { control: "select", options: [false, true, "top", "bottom", "bottom-end"] },
    disabled: { control: "boolean" },
  },
  args: {
    icon: ICONS.edit,
    label: "Editar",
    variant: "standard",
    size: "small",
    tooltip: true,
    disabled: false,
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {};

export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, paddingTop: 32 }}>
      <IconButton {...args} variant="standard" />
      <IconButton {...args} variant="filled" />
      <IconButton {...args} variant="tonal" />
      <IconButton {...args} variant="outlined" />
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", paddingTop: 32 }}>
      <IconButton {...args} variant="tonal" size="small" />
      <IconButton {...args} variant="tonal" size="medium" />
      <IconButton {...args} variant="tonal" size="large" />
    </div>
  ),
};

export const Desabilitado: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16 }}>
      <IconButton {...args} disabled variant="standard" />
      <IconButton {...args} disabled variant="filled" />
      <IconButton {...args} disabled variant="tonal" />
      <IconButton {...args} disabled variant="outlined" />
    </div>
  ),
};

export const AcoesDeLinha: Story = {
  name: "Ações de linha",
  render: (args) => (
    <div style={{ display: "flex", gap: 4, paddingTop: 32 }}>
      <IconButton {...args} icon={symbol("arrow_upward")} label="Mover para cima" />
      <IconButton {...args} icon={symbol("arrow_downward")} label="Mover para baixo" />
      <IconButton {...args} icon={symbol("edit")} label="Editar" />
      <IconButton {...args} icon={symbol("delete")} label="Excluir" />
    </div>
  ),
};
