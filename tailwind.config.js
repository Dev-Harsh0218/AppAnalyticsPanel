/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 0px 8.8px 0px #B5B5C3",
        custom2:"0px 0px 40px 0px #00000026",
        custom3:" 0px 15.25px 38px 0px #00000040"
      },
      fontFamily:{
        Segoe:['Segoe UI','sans-serif'],
        kanit:['kanit','sans-serif'],
        inter:['Inter','sans-serif'],
        Tiempos:['Tiempos','sans-serif'],
        Helvetica:['Helvetica','sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        poppins:['Poppins','sans-serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
