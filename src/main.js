import Vue from 'vue'
import App from './App.vue'
import {store} from './store'

import BootstrapVue from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'
import i18n from './i18n'

Vue.use(BootstrapVue);
Vue.use(new VueSocketIO({
    connection: 'http://46.229.213.223:3000/',
    debug: process.env.NODE_ENV !== 'production',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}));

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    i18n,
    store
}).$mount('#app');
