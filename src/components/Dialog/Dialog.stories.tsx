import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ReactNode } from "react";
import { fn } from "storybook/test";
import { Button } from "../Button";
import { Dialog, type DialogProps } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Componentes/Dialog",
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          "Janela de diálogo modal sobre o `<dialog>` nativo (`showModal`): foco preso dentro da janela, fundo inerte, Esc e clique fora fecham (a menos que `dismissible` seja falso) e o foco volta para quem abriu.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    dismissible: { control: "boolean" },
    title: { control: "text" },
    closeLabel: { control: "text" },
    open: { control: false },
  },
  args: {
    title: "Excluir item",
    closeLabel: "Fechar",
    size: "small",
    dismissible: true,
    onClose: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

interface TriggerProps extends Omit<DialogProps, "open" | "actions"> {
  trigger: string;
  renderActions?(close: () => void): ReactNode;
}

function WithTrigger({ trigger, renderActions, ...args }: TriggerProps) {
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
    args.onClose();
  };

  return (
    <>
      <Button variant="tonal" onClick={() => setOpen(true)}>
        {trigger}
      </Button>
      <Dialog
        {...args}
        open={open}
        onClose={close}
        actions={
          renderActions ? (
            renderActions(close)
          ) : (
            <>
              <Button variant="text" onClick={close}>Cancelar</Button>
              <Button onClick={close}>Excluir</Button>
            </>
          )
        }
      />
    </>
  );
}

export const Confirmacao: Story = {
  name: "Confirmação",
  render: (args) => (
    <WithTrigger {...args} trigger="Excluir item">
      <p style={{ margin: 0 }}>O item sai da listagem. Esta ação não pode ser desfeita.</p>
    </WithTrigger>
  ),
};

export const ComIcone: Story = {
  name: "Com ícone",
  args: {
    title: "Sessão expirada",
    icon: <span className="material-symbols-sharp">schedule</span>,
    closeLabel: undefined,
    dismissible: false,
  },
  render: (args) => (
    <WithTrigger
      {...args}
      trigger="Simular sessão expirada"
      renderActions={(close) => <Button onClick={close}>Entrar novamente</Button>}
    >
      <p style={{ margin: 0 }}>Por segurança, sua sessão foi encerrada. Entre novamente para continuar.</p>
    </WithTrigger>
  ),
};

export const Formulario: Story = {
  name: "Formulário",
  args: { title: "Novo período", size: "medium" },
  render: (args) => (
    <WithTrigger
      {...args}
      trigger="Cadastrar período"
      renderActions={(close) => (
        <>
          <Button variant="text" onClick={close}>Cancelar</Button>
          <Button onClick={close}>Salvar</Button>
        </>
      )}
    >
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        Mês de referência
        <input type="month" style={{ font: "inherit", padding: 8 }} />
      </label>
    </WithTrigger>
  ),
};

export const ConteudoLongo: Story = {
  name: "Conteúdo longo",
  args: { title: "Termos de uso", size: "large" },
  render: (args) => (
    <WithTrigger {...args} trigger="Ler termos" renderActions={(close) => <Button onClick={close}>Li e concordo</Button>}>
      {Array.from({ length: 12 }, (_, index) => (
        <p key={index} style={{ margin: 0 }}>
          {index + 1}. Este serviço disponibiliza consultas e emissão de documentos. As informações exibidas têm caráter
          informativo e não substituem documentos oficiais.
        </p>
      ))}
    </WithTrigger>
  ),
};
