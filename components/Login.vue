<template>
    <div class="login-frame">
      <div class="form">
        <h5>نام خود را وارد کنید</h5>
        <input type="text" name="" id="" v-model="loginInfo" />
        <Transition>
          <input
            v-if="loginInfo == 'admin'"
            type="text"
            name=""
            id=""
            v-model="password"
          />
        </Transition>
        <button @click="login">ورود به وبینار</button>
        <!-- <ul>
        <li v-for="(item, index) in items" :key="index" class="fa-is">
          <nuxt-link :to="{ name: 'webinar-room', params: { room: item.name } }">
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul> -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    layout: "blank",
    data: () => ({
      loginInfo: "",
      items: [],
      username: "login first",
      password: "",
    }),
    methods: {
      login() {
      
          // Displaying results to console
            if (this.loginInfo == "") return;
            if (this.loginInfo == "admin" && this.password != "qwerty") return;
            localStorage.setItem("name", this.loginInfo);
            // this.username = json.username;
            this.$router.push({
              name: "webinar-room",
              params: { room: "room1" },
            });
          
      },
      async getRooms() {
        await this.socket.on("roomList", (data) => {
          console.log(data, "this is data");
          this.items = data;
        });
      },
    },
    mounted() {
      this.socket = this.$nuxtSocket({});
      this.getRooms();
    },
  };
  </script>
  <style lang="scss" scoped>
  </style>