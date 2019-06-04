<template>
    <div id="app">
        <img class="sberbank_logo" src="@/assets/sberbank_logo.svg" alt="Sberbank logo">
        <answer-bar :answers="answers" />
    </div>
</template>

<script>
    import AnswerBar from '@/components/AnswerBar'

    export default {
        name: 'app',
        components: {
            AnswerBar
        },
        data() {
            return {
                answersCollection: [
                    'Заказать карту',
                    'Заплатить по ЖКХ',
                    'Оформить кредит',
                    'Обменять валюту',
                    'Здравствуйте',
                    'Я хочу продать доллары',
                    'Нет',
                    'Да',
                    'Мой счёт уже застрахован'
                ]
            }
        },
        computed: {
            answers() {
                return [...this.answersCollection]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);
            }
        }
    }
</script>

<style lang="scss" src="./scss/main.scss"></style>
