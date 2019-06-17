<script type="text/jsx">
    import {mapGetters} from "vuex";


    export default {
        name: "AnswerBar",
        props: {
            answers: {
                type: Array,
                required: true
            },
            question: {
                type: Object
            }
        },
        data() {
            return {
                waiting: false
            };
        },
        render() {
            const question = this.question ?
                <b-row class="answer-bar-question-row">
                    <b-col>
                        <h2>{this.questionText}</h2>
                    </b-col>
                </b-row> : null;

            const inputRows = this.question.payload_fields ?
                this.question.payload_fields.map(field => {
                        return <b-row class="answer-bar-row" key={field.id}>
                            <b-col>
                                <b-form-group
                                    class="answer-bar-input"
                                    label={field.text}
                                    label-cols="3"
                                    label-for={field.id}
                                >
                                    <b-form-input id={field.id} required="" style="font-size: 2rem;"/>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    }
                ) : null;

            const answerRows = this.answers.length === 1 && inputRows ?
                null :
                this.chunkedAnswers.map((row, i) =>
                    <b-row class="answer-bar-row" key={`${i}`}>
                        {
                            row.map(item =>
                                <b-col class="answer-bar-answer" key={item.id}>
                                    <b-button
                                        squared=""
                                        variant="outline-dark"
                                        size="lg"
                                        class="answer-bar-action"
                                        onClick={this.sendReply.bind(this, item)}
                                        disabled={this.waiting}
                                    >
                                        {item.text}
                                    </b-button>
                                </b-col>)
                        }
                    </b-row>
                );

            return (
                <div class="answer-bar">
                    <div class="answer-bar-content">
                        <div class="answer-bar-toolbar">
                            {this.role === 'cashier' ?
                                <b-button variant="outline-light" onClick={this.restart}>🔁</b-button> :
                                <b-dropdown text="Язык" className="m-md-2">
                                    <b-dropdown-item onClick={this.changeLanguage}>ru</b-dropdown-item>
                                    <b-dropdown-item onClick={this.changeLanguage}>zh</b-dropdown-item>
                                </b-dropdown>
                            }
                        </div>
                        <b-container class="answer-bar-container">
                            {question}
                            <b-form onSubmit={this.submitForm}>
                                {inputRows}
                                {inputRows ? <b-button type="submit" variant="primary" block
                                                       class="answer-bar-form-submit">Отправить</b-button> : ''}
                            </b-form>
                            {answerRows}
                            {this.waiting && <b-form-text>Ожидаем ответа...</b-form-text>}
                        </b-container>
                    </div>
                </div>
            )
        },
        computed: {
            ...mapGetters(['role']),
            chunkedAnswers() {
                const chunkSize = 2;
                return this.answers.reduce((reduced, item, i) => {
                    if (i % chunkSize === 0) {
                        reduced.push([]);
                    }

                    const lastChunk = reduced[Math.floor(i / chunkSize)];
                    lastChunk.push(item);

                    return reduced;
                }, []);
            },
            form() {
                return this.question.payload_fields.map(field => field.id)
            },
            opponent() {
                return {
                    cashier: 'Клиент',
                    client: 'Кассир'
                }[this.role];
            },
            questionText() {
                if (!this.question.text) {
                    return '';
                }

                return `${this.opponent}: «${this.question.text}»`;
            }
        },
        methods: {
            restart() {
                this.$socket.emit('restart');
                this.$emit('restart');
            },
            sendReply(reply) {
                this.waiting = true;
                this.$socket.emit('reply', reply);
            },
            submitForm(event) {
                event.preventDefault();

                const reply = this.answers[0];
                reply.payload = this.form.map(id => ({id, value: document.getElementById(id).value}));

                this.sendReply(reply);
            },
            changeLanguage(event) {
                this.$socket.emit('language_change', event.target.text);
            }
        },
        watch: {
            questionText() {
                this.waiting = false;
            }
        }
    }
</script>

<style scoped lang="scss" src="@/scss/components/_answer_bar.scss"></style>
