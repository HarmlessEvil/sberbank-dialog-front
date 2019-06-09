<template>
    <div class="login-selector">
        <b-card-group deck>
            <b-card header="Войти как кассир">
                <b-button block variant="info" @click="logInAsCashier">Кассир</b-button>
                <br>
                <b-card-text>Войдите в приложение как кассир, если данное устройство будет установлено на стороне кассира</b-card-text>
            </b-card>
            <b-card header="Войти как клиент">
                <b-button block variant="success" @click="logInAsClient">Клиент</b-button>
                <br>
                <b-card-text>Войдите в приложение как кассир, если данное устройство предназначено для того, чтобы им пользовались клиенты</b-card-text>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        name: "LogInSelector",
        methods: {
            ...mapMutations(['LOG_IN_AS_CASHIER', 'LOG_IN_AS_CLIENT']),
            logInAsCashier() {
                this.$socket.emit('i_am_cashier');
                this.LOG_IN_AS_CASHIER();
            },
            logInAsClient() {
                this.$socket.emit('i_am_client');
                this.LOG_IN_AS_CLIENT();
            }
        }
    }
</script>

<style scoped lang="scss" src="@/scss/components/_login_selector.scss"></style>