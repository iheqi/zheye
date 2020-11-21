import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import router from './router';

const store = createStore({
  state: {
    count: 0,
  },
});

const app = createApp(App);
app.use(router);

app.mount('#app');
