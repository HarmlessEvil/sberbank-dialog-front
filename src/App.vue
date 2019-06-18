<template>
    <div id="app">
        <img class="sberbank_logo" src="@/assets/sberbank_logo.svg" alt="Sberbank logo">
        <div class="app-w">
            <h2>{{ header }}</h2>
            <answer-button v-if="question.text && !isConversationFinished"
                    disabled
                    outline
            >
                {{ question.text }}
            </answer-button>
            <template v-if="isLoggedIn">
                <template v-if="!isConversationFinished">
                    <form
                            v-if="question.payload_fields.length"
                            @submit="submitForm"
                            class="form"
                    >
                        <app-input
                                v-for="payload in question.payload_fields"
                                :id="payload.id"
                                :key="payload.id"
                                :label="payload.text"
                                v-model="formData[payload.id]"
                        />
                        <answer-button
                                round
                                class="submit"
                                :disabled="this.waiting"
                        >
                            Отправить
                        </answer-button>
                    </form>
                    <answer-button
                            v-for="answer in displayedAnswers"
                            :key="answer.id"
                            :class="{active: answer === selectedAnswer}"
                            :disabled="answer === selectedAnswer"
                            :round="isCashier"
                            @click="selectAnswer(answer)"
                    >
                        {{ answer.text }}
                    </answer-button>
                </template>
            </template>
            <template v-else>
                <login-as-button
                        header="Кассир"
                        text="Войдите в приложение как кассир, если данное устройство будет установлено на стороне кассира"
                        @click="loginAsCashier"
                />
                <login-as-button
                        header="Клиент"
                        text="Войдите в приложение как клиент, если данное устройство предназначено для того, чтобы им пользовались клиенты"
                        @click="loginAsClient"
                />
            </template>
            <p
                    v-if="isConversationFinished"
                    class="page-text"
            >Диалог окночен. Спасибо!</p>
            <app-loader v-if="waiting && !isConversationFinished" />
            <answer-button
                    v-if="isCashier"
                    round
                    class="reset"
                    @click="restart"
            >
                <img src="@/assets/images/reset.svg" alt="Reset dialog">&nbsp; Начать диалог заново
            </answer-button>
            <language-bar v-if="isClient"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    // import AnswerBar from '@/components/AnswerBar'
    import AnswerButton from '@/components/AnswerButton'
    import AppInput from '@/components/AppInput'
    import AppLoader from '@/components/AppLoader'
    import LanguageBar from '@/components/LanguageBar'
    import LoginAsButton from '@/components/LoginAsButton'
    // import LogInSelector from '@/components/LogInSelector'

    export default {
        name: 'app',
        components: {
            // AnswerBar,
            AnswerButton,
            AppInput,
            AppLoader,
            LanguageBar,
            LoginAsButton
            // LogInSelector
        },
        data() {
            return {
                answers: [],
                headerText: 'Войти как',
                question: {
                    payload_fields: [],
                    text: '',
                    type: 'text'
                },
                waiting: false,
                selectedAnswer: null,
                formData: {},
                isConversationFinished: false
            }
        },
        computed: {
            ...mapGetters(['isLoggedIn', 'role']),
            displayedAnswers() {
                if (this.question.payload_fields.length) {
                    return [];
                }

                if (!this.waiting) {
                    return this.answers;
                }

                return [this.selectedAnswer];
            },
            header() {
                return this.isConversationFinished ? '' : this.headerText;
            },
            isClient() {
                return this.role === 'client'
            },
            isCashier() {
                return this.role === 'cashier'
            }
        },
        sockets: {
            new_message(data) {
                this.waiting = false;
                this.isConversationFinished = false;

                if (this.isCashier) {
                    this.headerText = 'Клиент хочет:'
                }

                this.question = {
                    text: data.text,
                    payload_fields: []
                };
                if (data.payload_fields) {
                    this.question.payload_fields = data.payload_fields;
                }
                this.answers = data.replies;
            },
            end_conversation() {
                this.isConversationFinished = true;
            }
        },
        methods: {
            ...mapMutations(['LOG_IN_AS_CASHIER', 'LOG_IN_AS_CLIENT']),
            loginAsCashier() {
                this.$socket.emit('i_am_cashier');
                this.LOG_IN_AS_CASHIER();

                this.headerText = '';
            },
            loginAsClient() {
                this.$socket.emit('i_am_client');
                this.LOG_IN_AS_CLIENT();

                this.headerText = 'Какую операцию вы хотите совершить?';
            },
            restart() {
                this.answers = [];
                this.question = {
                    payload_fields: [],
                    text: ''
                };
                this.waiting = false;
                this.selectAnswer = null;
                this.headerText = '';
                this.isConversationFinished = false;

                this.$socket.emit('restart');
            },
            selectAnswer(answer) {
                this.waiting = true;
                this.headerText = 'Вы выбрали:';
                this.selectedAnswer = answer;

                this.$socket.emit('reply', answer);
            },
            submitForm(event) {
                event.preventDefault();

                this.waiting = true;
                this.headerText = 'Вы выбрали:';
                this.selectedAnswer = this.answers[0];

                const reply = this.answers[0];
                reply.payload = Object.entries(this.formData).map(([id, value]) => ({
                    id,
                    value
                }));

                this.$socket.emit('reply', reply);
            }
        }
    }
</script>

<style lang="scss" src="./scss/main.scss"></style>
<style lang="scss">
    .form {
        margin-bottom: 5rem;
    }

    .submit {
        margin-top: 2rem;
    }

    .page-text {
        font-size: 2rem;
        font-weight: lighter;
    }
</style>
