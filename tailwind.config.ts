import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xs": "375px",
        xs: "475px",
        mds: "799px",
        mdl: "910px",
        "3xl": "1760px",
      },
      colors: {
        mainWhite: "rgb(var(--color-mainWhite) / <alpha-value>)",
        darkGray: "rgb(var(--color-darkGray) / <alpha-value>)",
        mainGreen: "rgb(var(--color-mainGreen) / <alpha-value>)",
        mainYellow: "rgb(var(--color-mainYellow) / <alpha-value>)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      padding: {
        navbar: "var(--navbar)",
      },
      margin: {
        navbar: "var(--navbar)",
      },
      height: {
        navbar: "var(--navbar)",
      },
      minHeight: {
        navbar: "var(--navbar)",
        max: "calc(100vh - var(--navbar))",
      },
      minWidth: {
        sidebar: "var(--sidebar)",
        max: "100vw",
      },
      maxHeight: {
        max: "calc(100vh - var(--navbar))",
      },
      maxWidth: {
        sidebar: "var(--sidebar)",
        max: "100vw",
      },
      inset: {
        navbar: "var(--navbar)",
      },
      boxShadow: {
        navbarShadow: "0px 6px 20px 3px rgba(186, 182, 182, 1)",
        logoMenuShadow: "0px 20px 20px 2px rgba(186, 182, 182, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
