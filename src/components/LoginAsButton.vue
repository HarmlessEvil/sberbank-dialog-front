<template>
    <div class="login-as-card">
        <header class="login-as-header">{{ header }}</header>
        <p class="login-as-content">{{ text }}</p>
    </div>
</template>

<script>
    export default {
        name: "LoginAsButton",
        props: {
            header: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss" src="@/scss/components/_login_as_button.scss"></style>
