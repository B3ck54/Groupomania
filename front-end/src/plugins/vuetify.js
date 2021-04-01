import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import fr from 'vuetify/lib/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { fr },
      current: 'fr',
    },
  icons: {
    iconfont: 'md',
  },
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#ff5722',
        secondary:'#ffccbc',
        accent: '#ffffff',
        error: '#f44336',
        warning: '#ffc107',
        info: '#009688',
        success: '#4caf50'
      },
      dark: {
        primary: '#ff5722',
        secondary:'#dd2c00',
        accent: '#222222',
        error: '#f44336',
        warning: '#ffc107',
        info: '#009688',
        success: '#4caf50'
      }
    },
  },
});
