import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "vuetify/styles";
import { md3 } from "vuetify/blueprints";
import { createVuetify } from "vuetify";
import router from "../src/router/index";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createPinia } from "pinia";
// import router from '@/router'
const geasTheme = {
  dark: true,
  colors: {
    primary: "#FFB423",
    surface: "#232323",
    background: "#151415",
    error: "#FF0000",
    success: "#38FF88",
  },
};
const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
  theme: {
    defaultTheme: "geasTheme",
    themes: {
      geasTheme,
    },
  },
  defaults: {
    VBtn: {
      rounded: "lg",
      flat: true,
      class: ["text-body-1"],
    },
    VChip: { rounded: "pill", link: true },
    VContainer: {
      class: "pa-0",
    },
    VTab: {
      class: "text-body-1",
    },
    VTextField: {
      variant: "outlined",
      hideDetails: true,
    },
    VSelect: {
      variant: "outlined",
      hideDetails: true,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
});

createApp(App).use(createPinia()).use(router).use(vuetify).mount("#app");
