import type { Meta, StoryObj } from "@storybook/react-vite";
import { base } from "../tokens";
import style from "./styles.module.css";

const ROLES = ["display", "headline", "title", "body", "label"];
const SIZES = ["large", "medium", "small"];

function Typography() {
  return (
    <div className={style.page}>
      <section className={style.section}>
        <h2 className={style.heading}>Escala tipográfica</h2>
        <p className={style.lead}>
          Montserrat em todos os produtos. Use os tokens <code>--pgm-sys-typescale-&lt;papel&gt;-&lt;tamanho&gt;-*</code>{" "}
          em vez de tamanhos fixos.
        </p>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Exemplo</th>
              <th>Token</th>
              <th>Tamanho / linha</th>
              <th>Peso</th>
            </tr>
          </thead>
          <tbody>
            {ROLES.flatMap((role) =>
              SIZES.map((size) => {
                const token = `pgm-sys-typescale-${role}-${size}`;
                return (
                  <tr key={token}>
                    <td
                      style={{
                        fontFamily: `var(--${token}-font)`,
                        fontSize: `var(--${token}-size)`,
                        lineHeight: `var(--${token}-line-height)`,
                        fontWeight: `var(--${token}-weight)` as unknown as number,
                        letterSpacing: `var(--${token}-tracking)`,
                      }}
                    >
                      {role} {size}
                    </td>
                    <td className={style.code}>--{token}-*</td>
                    <td className={style.code}>
                      {base[`${token}-size`]} / {base[`${token}-line-height`]}
                    </td>
                    <td className={style.code}>{base[`${token}-weight`]}</td>
                  </tr>
                );
              }),
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

const meta: Meta = {
  title: "Fundações/Tipografia",
  parameters: { controls: { disable: true } },
};

export default meta;

export const Escala: StoryObj = {
  name: "Escala",
  render: () => <Typography />,
};
