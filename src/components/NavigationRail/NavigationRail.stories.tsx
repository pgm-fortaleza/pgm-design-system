import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { NavigationRail, type NavigationRailProps, type NavigationRailSection } from "./NavigationRail";

const SECTIONS: NavigationRailSection[] = [
  {
    key: "service",
    label: "Atendimento",
    items: [
      { key: "requests", label: "Solicitações", icon: "support_agent", href: "#solicitacoes" },
      { key: "team", label: "Equipe", icon: "groups", href: "#equipe" },
    ],
  },
  {
    key: "content",
    label: "Conteúdo",
    items: [
      { key: "news", label: "Notícias", icon: "newspaper", href: "#noticias" },
      { key: "banners", label: "Banners", icon: "view_carousel", href: "#banners" },
      { key: "people", label: "Pessoas", icon: "diversity_3", href: "#pessoas" },
      { key: "contacts", label: "Contatos", icon: "contact_phone", href: "#contatos" },
      { key: "reports", label: "Relatórios", icon: "insights", href: "#relatorios" },
      { key: "notices", label: "Avisos", icon: "campaign", href: "#avisos" },
    ],
  },
  {
    key: "settings",
    label: "Configurações",
    items: [{ key: "users", label: "Usuários", icon: "manage_accounts", href: "#usuarios" }],
  },
];

const meta: Meta<typeof NavigationRail> = {
  title: "Componentes/NavigationRail",
  component: NavigationRail,
  parameters: {
    docs: {
      description: {
        component:
          "Menu lateral de área administrativa, em seções. O item ativo recebe `aria-current=\"page\"` e o ícone preenchido. Seções sem itens (por falta de permissão) não aparecem. Para usar com o React Router, passe `renderLink` devolvendo um `<Link to={href}>`.",
      },
    },
  },
  args: {
    label: "Menu da área administrativa",
    sections: SECTIONS,
  },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export default meta;

type Story = StoryObj<typeof NavigationRail>;

function InteractiveRail(args: NavigationRailProps) {
  const initial = args.sections.flatMap((section) => section.items).find((item) => item.active)?.key ?? "news";
  const [active, setActive] = useState(initial);
  const sections = args.sections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({ ...item, active: item.key === active })),
  }));
  return (
    <NavigationRail
      {...args}
      sections={sections}
      renderLink={({ children, href, ...props }) => (
        <a
          {...props}
          href={href}
          onClick={(event) => {
            event.preventDefault();
            const item = args.sections.flatMap((section) => section.items).find((entry) => entry.href === href);
            if (item) setActive(item.key);
          }}
        >
          {children}
        </a>
      )}
    />
  );
}

export const Playground: Story = {
  render: (args) => <InteractiveRail {...args} />,
};

export const SemPermissao: Story = {
  name: "Perfil com menos permissões",
  args: {
    sections: [
      { ...SECTIONS[0], items: [] },
      { ...SECTIONS[1], items: SECTIONS[1].items.slice(0, 4) },
      { ...SECTIONS[2], items: [] },
    ],
  },
  render: (args) => <InteractiveRail {...args} />,
};
