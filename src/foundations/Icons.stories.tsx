import type { Meta, StoryObj } from "@storybook/react-vite";
import style from "./styles.module.css";

const PORTAL_ICONS = [
  "account_circle", "add", "admin_panel_settings", "apps", "arrow_back", "arrow_downward", "arrow_forward",
  "arrow_upward", "attach_money", "balance", "ballot", "barcode", "bolt", "call", "campaign", "chat", "checkbook",
  "chevron_left", "chevron_right", "close", "concierge", "contact_page", "contact_phone", "contact_support",
  "content_copy", "corporate_fare", "currency_exchange", "dark_mode", "delete", "diversity_3", "domain", "download",
  "eco", "edit", "error", "event_note", "gavel", "group", "groups", "handshake", "home", "image", "info", "insights",
  "link", "local_library", "lock_reset", "login", "logout", "mail", "manage_accounts", "menu", "menu_open",
  "my_location", "newspaper", "open_in_new", "password", "person", "person_add", "person_search", "phone",
  "picture_as_pdf", "power_settings_new", "qr_code_2", "schedule", "search", "signature", "smartphone",
  "support_agent", "trending_up", "verified_user", "view_carousel", "visibility", "warning",
];

const SIZES = [20, 24, 40, 48];

interface IconProps {
  name: string;
  size: number;
  filled: boolean;
}

function Icon({ name, size, filled }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className="material-symbols-sharp"
      style={{ fontSize: size, fontVariationSettings: `"FILL" ${filled ? 1 : 0}, "opsz" ${Math.min(Math.max(size, 20), 48)}` }}
    >
      {name}
    </span>
  );
}

function Icons({ size, filled }: { size: number; filled: boolean }) {
  return (
    <div className={style.page}>
      <section className={style.section}>
        <h2 className={style.heading}>Material Symbols Sharp</h2>
        <p className={style.lead}>
          Fonte de ícones usada nos três produtos. O ícone é o nome em texto dentro de um elemento com a classe{" "}
          <code>material-symbols-sharp</code>; o preenchimento e o tamanho óptico mudam por{" "}
          <code>font-variation-settings</code>. Ícone decorativo leva <code>aria-hidden="true"</code>; ícone sozinho
          num botão exige <code>aria-label</code> no botão.
        </p>
        <pre className={style.code}>{`<span class="material-symbols-sharp" aria-hidden="true">search</span>`}</pre>
      </section>
      <section className={style.section}>
        <h2 className={style.heading}>Tamanhos</h2>
        <div className={style.row}>
          {SIZES.map((value) => (
            <div key={value} className={style.icon}>
              <Icon name="search" size={value} filled={filled} />
              <span className={style.code}>{value}px</span>
            </div>
          ))}
        </div>
      </section>
      <section className={style.section}>
        <h2 className={style.heading}>Ícones usados no Portal</h2>
        <div className={style.icons}>
          {PORTAL_ICONS.map((name) => (
            <div key={name} className={style.icon}>
              <Icon name={name} size={size} filled={filled} />
              <span className={style.code}>{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta: Meta<typeof Icons> = {
  title: "Fundações/Ícones",
  component: Icons,
  argTypes: {
    size: { name: "Tamanho", control: { type: "select" }, options: SIZES },
    filled: { name: "Preenchido", control: "boolean" },
  },
  args: { size: 24, filled: false },
};

export default meta;

export const Catalogo: StoryObj<typeof Icons> = { name: "Catálogo" };
