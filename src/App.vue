<template>
    <div id="app">
        <img class="sberbank_logo" src="@/assets/sberbank_logo.svg" alt="Sberbank logo">
        <answer-bar v-if="!isLoggedIn" :answers="answers" :question="question" />
        <log-in-selector v-else />
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
                answersCollection: [
                    {
                        id: 0,
                        text: 'Заказать карту'
                    },
                    {
                        id: 1,
                        text: 'Заплатить по ЖКХ'
                    },
                    {
                        id: 2,
                        text: 'Оформить кредит'
                    },
                    {
                        id: 3,
                        text: 'Обменять валюту'
                    },
                    {
                        id: 4,
                        text: 'Здравствуйте'
                    },
                    {
                        id: 5,
                        text: 'Я хочу продать доллары'
                    },
                    {
                        id: 6,
                        text: 'Нет'
                    },
                    {
                        id: 7,
                        text: 'Да'
                    },
                    {
                        id: 8,
                        text: 'Мой счёт уже застрахован'
                    }
                ],
                question: 'Как вас зовут?'
            }
        },
        computed: {
            ...mapGetters(['isLoggedIn']),
            answers() {
                return [...this.answersCollection]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);
            }
        },
        sockets: {
            new_message: data => {
                this.question = data.text || '';
                this.answers = data.replies
            }
        }
    }
</script>

<style lang="scss" src="./scss/main.scss"></style>
