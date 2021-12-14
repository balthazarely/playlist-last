module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // fontFamily: {
      //   Rampart: ["Inter", "san serif"],
      // },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to bottom, rgba(42, 58, 84, 0.9), rgba(30, 41, 59, 1)), url('../src/img/guitar2.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2dd4bf" /* Primary color */,
          "primary-focus": "#22bfaa" /* Primary color - focused */,
          "primary-content":
            "#f0fdfa" /* Foreground content color to use on primary color */,

          secondary: "#A554D5" /* Secondary color */,
          "secondary-focus": "#f3cc30" /* Secondary color - focused */,
          "secondary-content":
            "#ffffff" /* Foreground content color to use on secondary color */,

          accent: "#36FAC8" /* Accent color */,
          "accent-focus": "#2aa79b" /* Accent color - focused */,
          "accent-content":
            "#ffffff" /* Foreground content color to use on accent color */,

          neutral: "#3d4451" /* Neutral color */,
          "neutral-focus": "#2a2e37" /* Neutral color - focused */,
          "neutral-content":
            "#ffffff" /* Foreground content color to use on neutral color */,

          "base-100":
            "#1e293b" /* Base color of page, used for blank backgrounds */,
          "base-200": "#1F2937" /* Base color, a little darker */,
          "base-300": "#475569" /* Base color, even more darker */,
          "base-content":
            "#EBECF0" /* Foreground content color to use on base color */,

          info: "#dbdbdb" /* Info */,
          success: "#009485" /* Success */,
          warning: "#ff9900" /* Warning */,
          error: "#ff5724" /* Error */,
        },
      },
    ],
  },
};
