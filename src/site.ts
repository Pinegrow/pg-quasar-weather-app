// since `.js, .ts` files are not included by default,
// the following comment tells UnoCSS to force scan this file (to pick the logo icon).
// @unocss-include

export default {
  title: 'Vue Designer',
  description: 'Weather App',
  author: 'Pinegrow',
  url: 'https://pg-quasar-weather-app.netlify.app',
  nav: [
    {
      text: 'Home',
      link: '/',
      type: 'primary',
      icon: 'i-mdi-home',
    },
    {
      text: 'Quick Start',
      link: '/quick-start',
      type: 'primary',
      icon: 'i-mdi-home',
    },
    {
      text: 'Subscribe',
      link: '/subscribe',
      type: 'secondary',
      icon: 'i-mdi-home',
    },
  ],
}
