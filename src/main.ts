import { createApp } from 'vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import directive from './directive';
import './mock';
import App from './App.vue';
import '@/assets/style/global.less';
import '@/api/interceptor';

const app = createApp(App);

// app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(store);
app.use(router);
app.use(globalComponents);
app.use(directive);

app.mount('#app');
