/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        primary:'#D32F2F',
        secondary:'#C2185B',
        accent:'#FFF000',
        neutral:'#F5F5F5',
        neutralop:'#212121',
        basic:"#00008b",
      },
      fontFamily:{
        dm:'"DM Sans", sans-serif',
        lato:'"Lato", sans-serif',
      },
      backgroundImage: {
        'basic-bg': "url('https://i.ibb.co/3N4vv7G/pexels-therato-19275547.jpg')",
        'signIn': "url('https://i.ibb.co/f0gTBDS/pexels-bri-schneiter-28802-346529.jpg')",
        'newsletter': "url('https://i.ibb.co/bL2xbYT/pexels-leo-willians-789496294-19365740.jpg')",
      }
    },
  },
  plugins: [require("daisyui")],
}

