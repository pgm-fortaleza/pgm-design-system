import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { Pill } from "./Pill";

const meta: Meta<typeof Pill> = {
  title: "Componentes/Pill",
  component: Pill,
  parameters: {
    docs: {
      description: {
        component:
          "Filtro que liga e desliga (chip de filtro MD3). É um `<button>` com `aria-pressed`; selecionado, mostra o ícone de confirmação.",
      },
    },
  },
  argTypes: {
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    selected: false,
    disabled: false,
    children: "Em aberto",
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const Playground: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState(args.selected);
    return (
      <Pill
        {...args}
        selected={selected}
        onChange={(value) => {
          setSelected(value);
          args.onChange(value);
        }}
      />
    );
  },
};

const FILTERS = ["Em aberto", "Pago", "Vencido", "Cancelado", "Suspenso"];

export const Filtros: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(["Pago"]);
    return (
      <div role="group" aria-label="Filtrar por situação" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {FILTERS.map((filter) => (
          <Pill
            key={filter}
            selected={selected.includes(filter)}
            onChange={(value) => setSelected((current) => (value ? [...current, filter] : current.filter((item) => item !== filter)))}
          >
            {filter}
          </Pill>
        ))}
      </div>
    );
  },
};

export const Desabilitado: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Pill disabled selected={false} onChange={() => undefined}>Não selecionado</Pill>
      <Pill disabled selected onChange={() => undefined}>Selecionado</Pill>
    </div>
  ),
};
