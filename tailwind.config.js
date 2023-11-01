/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,svelte}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "primary": "#b4befe",
        },
      },
    ],
  },
}

