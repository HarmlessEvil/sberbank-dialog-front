<template>
    <div id="app">
        <img class="sberbank_logo" src="@/assets/sberbank_logo.svg" alt="Sberbank logo">
        <div class="app-w">
            <h2>Войти как</h2>
            <answer-bar v-if="isLoggedIn" :answers="answers" :question="question" @restart="restart"/>
            <template v-else>
                <login-as-button header="Кассир" text="Войдите в приложение как кассир, если данное устройство будет установлено на стороне кассира" />
            </template>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import AnswerBar from '@/components/AnswerBar'
    import LoginAsButton from '@/components/LoginAsButton'
    // import LogInSelector from '@/components/LogInSelector'

    export default {
        name: 'app',
        components: {
            AnswerBar,
            LoginAsButton
            // LogInSelector
        },
        data() {
            return {
                answers: [],
                question: {
                    text: '',
                    type: 'text'
                }
            }
        },
        computed: mapGetters(['isLoggedIn']),
        sockets: {
            new_message(data) {
                this.question = {text: data.text} || '';
                if (data.payload_fields) {
                    this.question.payload_fields = data.payload_fields;
                }
                this.answers = data.replies;
            },
            end_conversation(data) {
                console.log('The conversation has ended!');
            }
        },
        methods: {
            restart() {
                this.answers = [];
                this.question = {text: ''};
            }
        }
    }
</script>

<style lang="scss" src="./scss/main.scss"></style>
