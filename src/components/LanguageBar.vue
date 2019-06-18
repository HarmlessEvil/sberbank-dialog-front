<script type="text/jsx">
    export default {
        name: "LanguageBar",
        data() {
            return {
                languages: {
                    ru: require('@/assets/images/russia.svg'),
                    en: require('@/assets/images/usa.svg'),
                    zh: require('@/assets/images/china.svg')
                }
            }
        },
        render() {
            const languageIcons = Object.entries(this.languages).map(([code, image]) =>
                <img
                    class="language-icon"
                    src={image}
                    alt={`Change language to ${code}`}
                    title={code}
                    onClick={this.changeLanguage.bind(this, code)}
                />
            );

            return (
                <div class="language-bar">
                    {languageIcons}
                </div>
            );
        },
        methods: {
            changeLanguage(langCode) {
                this.$i18n.locale = langCode;
                this.$socket.emit('language_change', langCode);
            }
        }
    }
</script>

<style scoped lang="scss" src="@/scss/components/_language_bar.scss"></style>
