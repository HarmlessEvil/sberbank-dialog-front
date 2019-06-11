import Vue from 'vue'
import App from './App.vue'
import {store} from './store'

import BootstrapVue from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'

Vue.use(BootstrapVue);
Vue.use(new VueSocketIO({
    connection: 'http://46.229.213.223:3000/',
    debug: process.env.environment !== 'production',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}));

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store
}).$mount('#app');
