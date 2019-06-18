<template>
    <div class="app-input-w">
        <label
                v-if="label"
                :for="id"
                class="app-input-label"
        >{{ label }}</label>
        <b-form-input
                :id="id"
                class="app-input"
                @input="onInput"
                v-model="val"
        />
    </div>
</template>

<script>
    export default {
        name: "AppInput",
        props: {
            value: String,
            label: String,
            id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                val: this.value
            }
        },
        methods: {
            onInput(val) {
                this.$emit('input', val);
            }
        }
    }
</script>

<style scoped lang="scss" src="@/scss/components/_app_input.scss"></style>
