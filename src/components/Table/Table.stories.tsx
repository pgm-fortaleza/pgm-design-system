import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { IconButton } from "../IconButton";
import { StatusTag } from "../StatusTag";
import { Pagination } from "./Pagination";
import { Table, type TableColumn, type TableProps } from "./Table";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  active: boolean;
}

const SECTORS = [
  "Atendimento",
  "Financeiro",
  "Jurídico",
  "Recursos Humanos",
  "Compras e Contratos",
  "Tecnologia",
  "Comunicação",
  "Ouvidoria",
  "Protocolo",
  "Arquivo",
  "Gabinete",
  "Administrativo",
];

const CONTACTS: Contact[] = SECTORS.map((name, index) => ({
  id: index + 1,
  name,
  email: `setor${index + 1}@example.com`,
  phone: index % 3 === 0 ? "—" : `(00) 1234-${String(5600 + index).padStart(4, "0")}`,
  active: index % 4 !== 3,
}));

const symbol = (name: string) => <span className="material-symbols-sharp">{name}</span>;

const columns: TableColumn<Contact>[] = [
  { key: "position", header: "Ordem", render: (row) => row.id, width: "80px" },
  { key: "name", header: "Setor", render: (row) => row.name },
  { key: "phone", header: "Telefone", render: (row) => row.phone, width: "160px" },
  {
    key: "status",
    header: "Situação",
    width: "120px",
    render: (row) => <StatusTag tone={row.active ? "success" : "neutral"}>{row.active ? "Ativo" : "Inativo"}</StatusTag>,
  },
  {
    key: "actions",
    header: "Ações",
    srOnlyHeader: true,
    align: "end",
    width: "120px",
    render: (row) => (
      <span style={{ display: "inline-flex" }}>
        <IconButton tooltip label={`Editar ${row.name}`} icon={symbol("edit")} />
        <IconButton tooltip label={`Excluir ${row.name}`} icon={symbol("delete")} />
      </span>
    ),
  },
];

const compactRow = (row: Contact) => (
  <>
    <strong>{row.name}</strong>
    <span>{row.email}</span>
    <StatusTag tone={row.active ? "success" : "neutral"}>{row.active ? "Ativo" : "Inativo"}</StatusTag>
  </>
);

const meta: Meta<typeof Table<Contact>> = {
  title: "Componentes/Table",
  component: Table<Contact>,
  parameters: {
    docs: {
      description: {
        component:
          "Tabela para listagens. `caption` é obrigatório (fica visível só para leitores de tela). Com `renderCompactRow`, abaixo de 840px a tabela vira lista. Durante o carregamento mostra linhas-esqueleto e marca `aria-busy`. `Pagination` acompanha a tabela.",
      },
    },
  },
  argTypes: {
    loading: { control: "boolean" },
    loadingRows: { control: { type: "number", min: 1, max: 10 } },
    caption: { control: "text" },
  },
  args: {
    caption: "Contatos",
    columns,
    rows: CONTACTS.slice(0, 5),
    rowKey: (row: Contact) => row.id,
    loading: false,
    loadingRows: 5,
  },
};

export default meta;

type Story = StoryObj<TableProps<Contact>>;

export const Playground: Story = {};

export const Carregando: Story = {
  args: { loading: true },
};

export const Vazia: Story = {
  args: {
    rows: [],
    emptyState: <p style={{ margin: 0, textAlign: "center" }}>Nenhum contato encontrado para a busca.</p>,
  },
};

export const ListaCompacta: Story = {
  name: "Lista compacta (mobile)",
  args: { renderCompactRow: compactRow },
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const ComPaginacao: Story = {
  name: "Com paginação",
  render: function Render(args) {
    const [page, setPage] = useState(1);
    const perPage = 5;
    return (
      <div>
        <Table {...args} rows={CONTACTS.slice((page - 1) * perPage, page * perPage)} />
        <Pagination page={page} perPage={perPage} total={CONTACTS.length} onChange={setPage} />
      </div>
    );
  },
};
