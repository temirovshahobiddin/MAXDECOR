<template>
  <section class="login__container container">
    <div class="login__container-pos">
      <div class="login__title">{{ title }}</div>
      <div class="login__btn-select-form">
        <div class="login__btn-select_login" ref="loginBtnSelectLogin" @click="selectLogin">
          Вход
        </div>
        <div class="login__btn-select_regist" ref="loginBtnSelectRegist" @click="selectRegistration">
          Регистрация
        </div>
        <div class="login__btn-select_bgr" ref="loginBtnSelectBgr" :class="{
          login__btn_active: isLoginSelected || isRegistrationSelected,
        }"></div>
      </div>

      <form id="regist_form" class="regist__container-form" :class="{ 'login_dis-none': isLoginSelected }" action=""
        @submit.prevent="submitRegister">
        <div class="regist__name-cont">
          <input type="text" name="name" id="name" placeholder=" " v-model="registerUsername" required />
          <label for="name">Ваше имя</label>
        </div>
        <div class="regist__tel-cont">
          <input type="tel" name="tel" id="tel" placeholder=" " v-model="registerNumber" required />
          <label for="tel">Номер телефона </label>
        </div>
        <div class="regist__email-cont">
          <input type="email" name="email" id="email" placeholder=" " required v-model="registerEmail" />
          <label for="email"> Email</label>
        </div>
        <div class="regist__password_1-cont">
          <input type="password" name="password_1" id="password_1" placeholder=" " required v-model="registerPassword1" />
          <label for="password_1">Пароль</label>
          <div class="password__description" v-html="PASSWORDDESCRIPTION"></div>
        </div>
        <div class="regist__password_2-cont">
          <input type="password" name="password_2" id="password_2" placeholder=" " required v-model="registerPassword2" />
          <label for="password_2"> Повторите пароль</label>
        </div>

        <div class="regist__agreement-cont">
          <input type="checkbox" name="agreement" id="agreement" required />
          <label for="agreement">Я согласен с «Условиями пользовательского соглашения»</label>
        </div>

        <div class="regist__btn-sub_container">
          <button class="regist__btn-sub-register" type="submit">
            зарегистрироваться
          </button>
        </div>
      </form>

      <form id="login_form" class="regist__container-form" :class="{ 'login_dis-none': isRegistrationSelected }" action=""
        @submit.prevent="submitLogin" method="post">
        <div class="regist__email-cont">
          <input id="login_email" type="text" placeholder=" " v-model="username" required />
          <label for="login_email"> Email</label>
        </div>
        <div class="regist__password_1-cont">
          <input id="login_password" type="password" placeholder=" " v-model="password" required />
          <label for="login_password">Пароль</label>
        </div>

        <div class="regist__agreement-cont">
          <input id="remember" type="checkbox" />
          <label for="remember">запомните меня</label>
        </div>

        <div class="regist__btn-sub_container">
          <button @click="submitLogin()" class="regist__btn-sub-login" type="submit">
            войти
          </button>
        </div>

        <a class="regist__btn-recover-pas" @click="emailAdd()">Забыли пароль?</a>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
const tokenRefreshInterval = 15 * 60 * 60 * 24 * 1000;
export default {
  data() {
    return {
      title: "Мой аккаунт",
      isRegistrationSelected: false,
      isLoginSelected: true,
      username: "",
      password: "",
      registerUsername: "",
      registerNumber: "",
      registerEmail: "",
      registerPassword1: "",
      registerPassword2: "",

      PASSWORDDESCRIPTION: "количество символов в пароле не меньше восьми",
    };
  },
  computed: {
    ...mapGetters("auth", ["loginError"]),
  },
  methods: {
    submitRegister(e) {
      const formData = {
        username: this.registerUsername,
        first_name: this.registerUsername,
        last_name: this.registerUsername,
        phone_number: this.registerNumber,
        email: this.registerEmail,
        password1: this.registerPassword1,
        password2: this.registerPassword2,
      };
      const device_id = localStorage.getItem("device_id");
      axios
        .post(`/users/register/?device_id=${device_id}/`, formData)
        .then((response) => {
          axios
            .post("/token/", {
              username: this.registerUsername,
              password: this.registerPassword1,
            })
            .then((loginResponse) => {
              const token = loginResponse.data.access;
              this.$store.commit("setToken", token);
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + token;
              localStorage.setItem("token", token);
              if (this.$route.path !== "/user") {
                this.$router.push("/user");
                window.location.reload();
              }
            })
            .catch((error) => { });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Что-то пошло не так!",
            iconColor: "#192965",
            text: error.response.data.phone_number,
            showConfirmButton: false,
            timer: 5000, // Display for 1.5 seconds
          });
        });
    },
    async submitLogin(e) {
      const formData = { username: this.username, password: this.password };
      const device_id = localStorage.getItem("device_id");
      axios.post(`/users/login/?device_id=${device_id}`, formData);
      axios
        .post(`/token/?device_id=${device_id}`, formData)
        .then((response) => {
          const token = response.data.access;
          const refresh = response.data.refresh;
          this.$store.commit("setToken", token, refresh);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          localStorage.setItem("token", token);
          localStorage.setItem("refresh", refresh);
          if (this.$route.path !== "/user") {
            this.$router.push("/user");
            window.location.reload();
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Что-то пошло не так!",
            iconColor: "#192965",
            text: `Вы ввели неправильный пароль или логин!`,
            showConfirmButton: false,
            timer: 5000, // Display for 1.5 seconds
          });
          this.username = "";
          this.password = "";
        });
    },
    async refreshToken() {
      const refresh = localStorage.getItem("refresh");
      const token = localStorage.getItem("token");
      const data = { refresh: refresh };
      if (token) {
        try {
          const response = await axios.post("/token/refresh/", data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const newAccessToken = response.data.access;
          this.$store.commit("setToken", newAccessToken);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + newAccessToken;
          localStorage.setItem("token", newAccessToken);
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
    },
    suibmitRegistration() { },

    selectLogin() {
      const loginBtnSelectBgr = this.$refs.loginBtnSelectBgr;

      if (!loginBtnSelectBgr.classList.contains("login__btn_active")) {
        loginBtnSelectBgr.classList.toggle("login__btn_active");
        this.isLoginSelected = true;
        this.isRegistrationSelected = false;
        setTimeout(() => {
          this.title = "мой аккаунт";
        }, 200);
      } else {
        loginBtnSelectBgr.classList.add("shake_btn-acive");
        setTimeout(() => {
          loginBtnSelectBgr.classList.remove("shake_btn-acive");
        }, 400);
      }
    },
    selectRegistration() {
      const loginBtnSelectBgr = this.$refs.loginBtnSelectBgr;

      if (loginBtnSelectBgr.classList.contains("login__btn_active")) {
        loginBtnSelectBgr.classList.toggle("login__btn_active");
        this.isRegistrationSelected = true;
        this.isLoginSelected = false;
        setTimeout(() => {
          this.title = "создать аккаунт";
        }, 200);
      } else {
        loginBtnSelectBgr.classList.add("shake_btn");
        setTimeout(() => {
          loginBtnSelectBgr.classList.remove("shake_btn");
        }, 400);
      }
    },
    async emailAdd() {
      const { value: email } = await Swal.fire({
        // Use Swal.fire
/*         title: "Сброс пароля", */
        input: "email",
        inputLabel: "Чтобы сбросить пароль вам необходимо ввести свою почту ",
        inputPlaceholder: "введите email",
        confirmButtonText: "отправить",
      });

      if (email) {
        try {
          const response = await axios.post(
            "/users/reset_password/send_link/",
            { email }
          );

          if (response.status === 200) {
            Swal.fire({
              // Use Swal.fire
              icon: "success",
              title: "Успешно отправлено",
              text: "На указанный адрес было отправлено электронное письмо.",
            });
          } else {
            Swal.fire({
              // Use Swal.fire
              icon: "error",
              title: "Error",
              text: "Failed to send the email. Please try again later.",
            });
          }
        } catch (error) {
          Swal.fire({
            // Use Swal.fire
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again later.",
          });
        }
      }
    },
  },
  async mounted() {
    // Set up the timer to refresh the token every 15 minutes
  },
};
</script>

<style>
.swal2-confirm {
  background: #192965 !important;
  border-radius: 15px !important;
  width: 250px !important;

}
.swal2-input-label{
  text-align: center !important;
}
</style>
