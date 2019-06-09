<template>
    <div class="answer-bar">
        <b-container class="answer-bar-container">
            <b-row v-if="question" class="answer-bar-question-row">
                <b-col>
                    <h2>{{ question }}</h2>
                </b-col>
            </b-row>
            <b-row class="answer-bar-row" v-for="(row, i) in chunkedAnswers" :key="`${i}`">
                <b-col class="answer-bar-answer" v-for="item in row" :key="item.id">
                    <b-button squared variant="outline-dark" size="lg" class="answer-bar-action" @click="sendReply(item)">
                        {{ item.text }}
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "AnswerBar",
        props: {
            answers: {
                type: Array,
                required: true
            },
            question: {
                type: String
            }
        },
        computed: {
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
            }
        },
        methods: {
            sendReply(reply) {
                this.$socket.emit('reply', reply);
            }
        }
    }
</script>

<style scoped lang="scss" src="@/scss/components/_answer_bar.scss"></style>
