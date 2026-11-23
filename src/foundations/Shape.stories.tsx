import type { Meta, StoryObj } from "@storybook/react-vite";
import { base } from "../tokens";
import style from "./styles.module.css";

const CORNERS = ["none", "extra-small", "small", "medium", "large", "extra-large", "full"];
const LEVELS = [0, 1, 2, 3, 4];
const SPACING = Object.keys(base)
  .filter((name) => name.startsWith("pgm-sys-spacing-"))
  .sort((a, b) => parseFloat(String(base[a])) - parseFloat(String(base[b])));

function Corners() {
  return (
    <div className={style.page}>
      <section className={style.section}>
        <h2 className={style.heading}>Cantos</h2>
        <p className={style.lead}>Raio dos cantos de cartões, botões e campos.</p>
        <div className={style.row}>
          {CORNERS.map((corner) => (
            <div key={corner} className={style.section}>
              <div className={style.box} style={{ borderRadius: `var(--pgm-sys-shape-corner-${corner})` }}>
                {base[`pgm-sys-shape-corner-${corner}`]}
              </div>
              <span className={style.code}>--pgm-sys-shape-corner-{corner}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Elevation() {
  return (
    <div className={style.page}>
      <section className={style.section}>
        <h2 className={style.heading}>Elevação</h2>
        <p className={style.lead}>Sombras dos níveis 0 a 4, para cartões, menus e diálogos.</p>
        <div className={style.row}>
          {LEVELS.map((level) => (
            <div key={level} className={style.section}>
              <div className={style.surfaceBox} style={{ boxShadow: `var(--pgm-sys-elevation-level${level})` }}>
                nível {level}
              </div>
              <span className={style.code}>--pgm-sys-elevation-level{level}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Spacing() {
  return (
    <div className={style.page}>
      <section className={style.section}>
        <h2 className={style.heading}>Espaçamento</h2>
        <p className={style.lead}>Escala de 4 em 4 px para margens, paddings e gaps.</p>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Valor</th>
              <th>Exemplo</th>
            </tr>
          </thead>
          <tbody>
            {SPACING.map((name) => (
              <tr key={name}>
                <td className={style.code}>--{name}</td>
                <td className={style.code}>{base[name]}</td>
                <td style={{ width: "50%" }}>
                  <div className={style.bar} style={{ width: `var(--${name})` }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

const meta: Meta = {
  title: "Fundações/Forma e espaço",
  parameters: { controls: { disable: true } },
};

export default meta;

export const Cantos: StoryObj = { render: () => <Corners /> };
export const Elevacao: StoryObj = { name: "Elevação", render: () => <Elevation /> };
export const Espacamento: StoryObj = { name: "Espaçamento", render: () => <Spacing /> };
