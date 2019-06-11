<template>
    <div id="app">
        <img class="sberbank_logo" src="@/assets/sberbank_logo.svg" alt="Sberbank logo">
        <answer-bar v-if="isLoggedIn" :answers="answers" :question="question" @restart="restart"/>
        <log-in-selector v-else/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import AnswerBar from '@/components/AnswerBar'
    import LogInSelector from '@/components/LogInSelector'

    export default {
        name: 'app',
        components: {
            AnswerBar,
            LogInSelector
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
