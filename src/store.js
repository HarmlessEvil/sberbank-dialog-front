import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        role: null
    },
    getters: {
        isLoggedIn(state) {
            return state.role != null;
        },
        role(state) {
            return state.role;
        }
    },
    mutations: {
        LOG_IN_AS_CASHIER(state) {
            state.role = 'cashier'
        },
        LOG_IN_AS_CLIENT(state) {
            state.role = 'client'
        }
    },
    actions: {
        logIn({commit}, role) {
            const loginRoleMutations = {
                cashier: 'LOG_IN_AS_CASHIER',
                client: 'LOG_IN_AS_CLIENT'
            };
            const mutation = loginRoleMutations[role];

            if (mutation) {
                commit(mutation);
            }
        }
    }
});