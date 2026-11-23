import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Componentes/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dica curta que aparece ao passar o mouse ou focar o elemento, e some com Esc. O texto é ligado ao elemento por `aria-describedby`; quando repete o `aria-label` do elemento, fica fora da árvore de acessibilidade para não ser lido duas vezes.",
      },
    },
  },
  argTypes: {
    placement: { control: "select", options: ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end"] },
    text: { control: "text" },
  },
  args: {
    text: "Baixa o comprovante em PDF",
    placement: "top",
    children: <Button variant="tonal">Baixar comprovante</Button>,
  },
  decorators: [(Story) => <div style={{ padding: "64px 160px" }}><Story /></div>],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {};

export const Posicoes: Story = {
  name: "Posições",
  render: (args) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "80px 24px" }}>
      {(["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"] as const).map((placement) => (
        <Tooltip key={placement} {...args} placement={placement} text={`Posição ${placement}`}>
          <Button variant="outlined">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const TextoLongo: Story = {
  name: "Texto longo",
  args: {
    text: "O comprovante fica disponível por 30 dias depois do pagamento e pode ser baixado quantas vezes for preciso.",
    children: <Button variant="text">Saiba mais</Button>,
  },
};
