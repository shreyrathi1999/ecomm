import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js';
import store from './store/index.js';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';

const app = createApp(App);
app.use(router);
app.use(store);

app.component(BaseCard);
app.component(BaseButton);
app.component(BaseDialog);
app.component(BaseSpinner);

app.mount('#app');
