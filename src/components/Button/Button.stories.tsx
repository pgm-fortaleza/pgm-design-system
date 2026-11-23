import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

const symbol = (name: string) => <span className="material-symbols-sharp">{name}</span>;

const ICONS = { nenhum: undefined, search: symbol("search"), add: symbol("add"), download: symbol("download") };

const meta: Meta<typeof Button> = {
  title: "Componentes/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Botão MD3 com cinco variantes, três tamanhos e dois formatos. Usa `<button>` nativo, ou `<a>` quando recebe `href`. Botão só com ícone exige `aria-label`.",
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["filled", "tonal", "outlined", "text", "elevated"] },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    shape: { control: "inline-radio", options: ["round", "square"] },
    icon: { control: "select", options: Object.keys(ICONS), mapping: ICONS },
    trailingIcon: { control: "select", options: Object.keys(ICONS), mapping: ICONS },
    children: { control: "text" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    href: { control: "text" },
  },
  args: {
    children: "Consultar débitos",
    variant: "filled",
    size: "small",
    shape: "round",
    disabled: false,
    fullWidth: false,
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Button {...args} variant="filled">Filled</Button>
      <Button {...args} variant="tonal">Tonal</Button>
      <Button {...args} variant="outlined">Outlined</Button>
      <Button {...args} variant="text">Text</Button>
      <Button {...args} variant="elevated">Elevated</Button>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      <Button {...args} size="small">Small</Button>
      <Button {...args} size="medium">Medium</Button>
      <Button {...args} size="large">Large</Button>
    </div>
  ),
};

export const ComIcone: Story = {
  name: "Com ícone",
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      <Button {...args} icon={symbol("search")}>Buscar</Button>
      <Button {...args} variant="outlined" trailingIcon={symbol("open_in_new")}>Abrir em nova aba</Button>
      <Button {...args} variant="tonal" icon={symbol("add")} aria-label="Adicionar" children={undefined} />
      <Button {...args} variant="text" shape="square" icon={symbol("download")} aria-label="Baixar" children={undefined} />
    </div>
  ),
};

export const Desabilitado: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Button {...args} disabled variant="filled">Filled</Button>
      <Button {...args} disabled variant="tonal">Tonal</Button>
      <Button {...args} disabled variant="outlined">Outlined</Button>
      <Button {...args} disabled variant="text">Text</Button>
      <Button {...args} disabled variant="elevated">Elevated</Button>
    </div>
  ),
};

export const ComoLink: Story = {
  name: "Como link",
  args: { href: "https://example.com", target: "_blank", rel: "noreferrer", trailingIcon: symbol("open_in_new"), children: "Abrir site de exemplo" },
};
