import type { Meta, StoryObj } from "@storybook/react-vite";
import { useCallback, useState } from "react";
import { Button } from "../Button";
import { Snackbar } from "./Snackbar";

const meta: Meta<typeof Snackbar> = {
  title: "Componentes/Snackbar",
  component: Snackbar,
  parameters: {
    docs: {
      description: {
        component:
          "Aviso rápido no rodapé da tela, que some sozinho depois de `duration` ms. A região `role=\"status\"` fica sempre montada, para o leitor de tela anunciar cada mensagem nova.",
      },
    },
  },
  argTypes: {
    message: { control: "text" },
    duration: { control: { type: "number", min: 1000, step: 500 } },
  },
  args: {
    message: "Contato salvo.",
    duration: 4000,
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Playground: Story = {
  render: function Render(args) {
    const [message, setMessage] = useState<string | null>(null);
    const close = useCallback(() => setMessage(null), []);
    return (
      <>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="tonal" onClick={() => setMessage(args.message ?? "Contato salvo.")}>Mostrar aviso</Button>
          <Button variant="outlined" onClick={() => setMessage("Notícia publicada no portal.")}>Publicar notícia</Button>
          <Button variant="outlined" onClick={() => setMessage("Não foi possível salvar. Tente novamente.")}>Simular erro</Button>
        </div>
        <Snackbar message={message} duration={args.duration} onClose={close} />
      </>
    );
  },
};
