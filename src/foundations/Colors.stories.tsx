import type { Meta, StoryObj } from "@storybook/react-vite";
import { contrast, themes, themeValues, type PgmMode, type PgmThemeName } from "../tokens";
import style from "./styles.module.css";

const PAIRS: [string, string][] = [
  ["primary", "on-primary"],
  ["primary-container", "on-primary-container"],
  ["secondary", "on-secondary"],
  ["secondary-container", "on-secondary-container"],
  ["tertiary", "on-tertiary"],
  ["tertiary-container", "on-tertiary-container"],
  ["error", "on-error"],
  ["error-container", "on-error-container"],
  ["info", "on-info"],
  ["info-container", "on-info-container"],
  ["success", "on-success"],
  ["success-container", "on-success-container"],
  ["warning", "on-warning"],
  ["warning-container", "on-warning-container"],
  ["surface", "on-surface"],
  ["surface-container-low", "on-surface"],
  ["surface-container", "on-surface"],
  ["surface-container-high", "on-surface"],
  ["surface-container-highest", "on-surface-variant"],
  ["inverse-surface", "inverse-on-surface"],
];

const SINGLES = ["outline", "outline-variant", "inverse-primary", "shadow", "scrim", "brand-product"];

function Colors({ theme, mode }: { theme: PgmThemeName; mode: PgmMode }) {
  const values = themeValues(theme, mode);
  const color = (role: string) => String(values[`pgm-sys-color-${role}`]);

  return (
    <div className={style.page}>
      <section className={style.section}>
        <h2 className={style.heading}>
          {themes[theme].name} · {mode === "dark" && themes[theme].modes.dark ? "escuro" : "claro"}
        </h2>
        <p className={style.lead}>
          Papéis de cor MD3 do tema escolhido na barra de ferramentas. Cada cartão mostra a cor de fundo com a cor de
          texto do par e o contraste entre elas (mínimo 4,5:1 para texto normal, WCAG AA).
        </p>
        <div className={style.grid}>
          {PAIRS.map(([background, foreground]) => {
            const ratio = contrast(color(foreground), color(background));
            return (
              <div
                key={background}
                className={style.swatch}
                style={{ background: `var(--pgm-sys-color-${background})`, color: `var(--pgm-sys-color-${foreground})` }}
              >
                <span className={style.swatchName}>{background}</span>
                <span className={style.swatchMeta}>
                  --pgm-sys-color-{background}
                  <br />
                  {color(background)} · texto {foreground}
                </span>
                <span>
                  <span className={`${style.badge} ${ratio >= 4.5 ? style.pass : style.fail}`}>
                    {ratio.toFixed(2).replace(".", ",")}:1
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </section>
      <section className={style.section}>
        <h2 className={style.heading}>Outras cores</h2>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Cor</th>
              <th>Token</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {SINGLES.map((role) => (
              <tr key={role}>
                <td>
                  <div className={style.box} style={{ width: 56, height: 32, background: `var(--pgm-sys-color-${role})` }} />
                </td>
                <td className={style.code}>--pgm-sys-color-{role}</td>
                <td className={style.code}>{color(role)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

const meta: Meta = {
  title: "Fundações/Cores",
  parameters: { controls: { disable: true } },
};

export default meta;

export const Papeis: StoryObj = {
  name: "Papéis de cor",
  render: (_, { globals }) => <Colors theme={globals.theme ?? "portal"} mode={globals.mode ?? "light"} />,
};
