<template>
    <button
            class="answer-button"
            :class="{outline, round}"
            @click="$emit('click')"
    >
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "AnswerButton",
        props: {
            outline: {
                type: Boolean,
                default: false
            },
            round: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="scss" src="@/scss/components/_answer_button.scss"></style>
