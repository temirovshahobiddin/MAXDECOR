<template>
    <section class="reset__container container">
        <div class="login__container-pos">
            <div class="login__title">Сброс Пароля</div>

            <form id="login_form" class="regist__container-form" 
                action="" @submit.prevent="submitLogin" method="post">
                <div class="regist__email-cont">
                    <input id="login_email" type="password" placeholder=" " v-model="resetPassword1" required />
                    <label for="login_email"> Пароль</label>
                </div>
                <div class="regist__password_1-cont">
                    <input id="login_password" type="password" placeholder=" " v-model="resetPassword2" required />
                    <label for="login_password">Потверждение пароля</label>
                </div>

                <div class="regist__agreement-cont">
                    <input id="remember" type="checkbox" />
                    <label for="remember">запомните меня</label>
                </div>

                <div class="regist__btn-sub_container">
                    <button @click="submitResetPassword()" class="regist__btn-sub-login" type="submit">
                        войти
                    </button>
                </div>


            </form>
        </div>
    </section>
</template>
    
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
    data: () => ({
        links: [
            { link: "#!", name: "Главная   >", right: ">" },
            { link: "#!", name: "Регистрация", right: ">" },
        ],
        /*     username: "",
          password: "", */
        resetPassword1: "",
        resetPassword2: "",
    }),
    computed: {
        ...mapGetters("auth", ["loginError"]),
    },
    methods: {
        submitResetPassword(e) {
            const formData = {
                password1: this.resetPassword1,
                password2: this.resetPassword2,
            };
            const device_id = localStorage.getItem("device_id");
            const uidb = this.$route.params.uidb;
            const token = this.$route.params.token;

            axios
                .post(`/users/reset_password/reset/${uidb}/${token}/`, formData)
                .then((response) => {
                    if (this.$route.path !== "/auth") {
                        this.$router.push("/auth");
                        /*          window.location.reload(); */
                    }
                    Swal.fire({
                        icon: "success",
                        title: 'Успешно',
                        text: 'Ваш пароль изменён',
                        showConfirmButton: false,
                        timer: 5000, // Display for 1.5 seconds
                    });
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "Что-то пошло не так!",
                        text: error.response.data.phone_number,
                        showConfirmButton: false,
                        timer: 5000, // Display for 1.5 seconds
                    });
                });
        },
    },
};
</script>
    
<style></style>