<template>
    <div class="answer-bar">
        <b-container class="answer-bar-container">
            <b-row class="answer-bar-row" v-for="(row, i) in chunkedAnswers" :key="`${i}`">
                <b-col class="answer-bar-answer" v-for="item in row" :key="item">
                    <b-button squared variant="outline-dark" size="lg" class="answer-bar-action">
                        {{ item }}
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
        }
    }
</script>

<style scoped lang="scss" src="@/scss/components/_answer_bar.scss"></style>
