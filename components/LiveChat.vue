<template>
    <!-- <div class="live-chat" id="temp_top" ref="liveChat" @click="LiveChatHandler" :style="[mobileChatStatus ? {'height':'calc(69vh - 10px)'} : {'height':'43vh'} ]"> -->
    <div class="live-chat" id="temp_top">
      <section class="msger">
        <div class="msger-header">
          <div class="msger-header-title">چت گروهی</div>
          <div class="msger-header-options">
            <span
              class="messages"
              :class="{ green: messagerTab }"
              @click="messagerTab = true"
              >پیام ها</span
            >
            <span
              class="members"
              :class="{ green: !messagerTab }"
              @click="messagerTab = false"
              >شرکت کنندگان</span
            >
          </div>
        </div>
        <main v-show="messagerTab" class="msger-chat" id="msger-chat">
          <div
            class="msg f-is"
            v-for="(message, index) in messages"
            :key="index"
            :class="[
              { 'right-msg': sender !== message.name },
              { 'left-msg': sender === message.name },
            ]"
          >
            <div class="msg-img" style="background: url('')"></div>
  
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-info-name">{{ message.name }}</div>
                <div class="msg-info-time">{{ message.dateTime }}</div>
              </div>
              <div class="msg-text">
                {{ message.message }}
              </div>
            </div>
          </div>
        </main>
  
        <p v-show="messagerTab" class="istyping">{{ typing }}</p>
        <form v-show="messagerTab" class="msger-inputarea">
          <input
            type="text"
            class="msger-input"
            placeholder="پیام خود را وارد کنید"
            v-model="yourMessage"
            @keyup="handle()"
          />
          <button class="msger-send-btn" @click.prevent="submit">
            <svg
              style="height: 40px; width: 40px; color: rgb(255, 255, 255)"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cursor-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
                fill="#ffffff"
              ></path>
            </svg>
          </button>
        </form>
  
        <div
          v-show="messagerTab == false"
          class="msger-chat"
          style="margin-top: 100px"
        >
          <ul>
            <li
              style="display: flex; align-items: center"
              v-for="(item, index) in onlineUsers"
              :key="index"
           
              class="mb-2 usersList"
            >
              <div
                class="msg-img mr-2"
                style="background: url('')"
              ></div>
              <div>{{ item.name }}</div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "LiveChat",
    // props: ["confirmedMessage", "oldMessages"],
    props: {
      confirmedMessage: {
        type: Object,
      },
      oldMessages: {
        type: Array,
        required: true,
      },
      onlineUsers: {
        type: Array,
      },
     
    },
    data: () => ({
      messagerTab: true,
      sender: "",
  
      yourMessage: "",
      PersonName: "علی",
      PersonImg: "/person.jpg",
      msgerChat: "",
      typing: "",
      time: "19:29",
      messages: [],
    }),
    mounted() {
      this.scrollToEnd();
      //? get sender info from local strorage to set name and sender class for messages bubble
      this.sender = localStorage.getItem("name");
    },
    watch: {
      //? client send message to server after that server send message again to all client ,after recive message from server confirmed messsage changes and watcher do this function
      confirmedMessage() {
        let today = new Date();
        let date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        let time = today.getHours() + ":" + today.getMinutes();
        setTimeout(() => {
          // console.log(this.confirmedMessage, "chat")
          this.appendMessage(
            this.confirmedMessage.sender,
            this.PersonImg,
            "left",
            this.confirmedMessage.message,
            time
          );
        }, 10);
      },
      async oldMessages() {
        await this.messages.push(...this.oldMessages);
        this.msgerChat.scrollTop = this.msgerChat.scrollHeight;
      },
    },
    methods: {
      
      handle() {
        this.typing = "درحال تایپ کردن ...";
        let oldmsg = this.yourMessage;
        setTimeout(() => {
          if (oldmsg === this.yourMessage) {
            this.typing = "";
          }
        }, 2000);
      },
      async submit() {
        //? send message to server
        if (!this.yourMessage) return;
        this.$emit("submit", this.yourMessage);
        this.yourMessage = "";
      },
      //? this method needs to setm timeout for getting old message , and trasported to watch mothod to remove set timout function .
      //  async getOldMessage() {
      //      setTimeout(async () => {
      //      await this.messages.push(...this.oldMessages)
      //       this.msgerChat.scrollTop = this.msgerChat.scrollHeight;
      //   }, 1000)
      //   },
      //? show received message to chatbotx
      async appendMessage(name, img, dir, msg, time) {
        await this.messages.push({
          name: name,
          // image: img,
          // dir: dir,
          message: msg,
          dateTime: time,
        });
        await this.scrollToEnd();
      },
      scrollToEnd() {
        this.msgerChat = document.getElementById("msger-chat");
        this.msgerChat.scrollTop = this.msgerChat.scrollHeight;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .live-chat {
    display: flex;
    justify-content: center;
    width:100%;
    // align-items: start;
    height: 100%;
    transition: 0.4s all;
    @media (min-width: 992px) {
      height: 100vh !important;
      align-items: center;
    }
    .msger {
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
      width: 100%;
      max-width: 867px;
      margin: 25px 10px;
      height: calc(100% - 30px);
      // height: 69vh;
      border: var(--border);
      border-radius: 15px;
      overflow: hidden;
      background: #edf0f5;
      box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
      position: relative;
      @media (max-width: 992px) {
        margin: 0px 0px;
        height: 100%;
      }
    }
    .msger .istyping {
      margin-bottom: 0;
      font-size: 10px;
      margin-right: 20px;
      display: inline;
      position: absolute;
      bottom: 70px;
    }
    .msger-header {
      display: flex;
      justify-content: space-between;
      padding: 20px 10px;
      border-bottom: var(--border);
      background: #edf0f5b2;
      color: #666;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      backdrop-filter: blur(5px);
      box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    }
    .msger-header span {
      margin: 0 10px;
      font-size: 0.8rem;
      // @media(max-width:992px){
      //   font-size: 12px;
      // }
    }
    .msger-header .messages,
    .msger-header .members {
      // background: #d1e6e7;
      // color: #2e7e71;
      padding: 10px;
      border-radius: 15px;
      cursor: pointer;
      transition: 0.4s all;
    }
    .msger-header .members:hover,
    .msger-header .messages:hover {
      background: #d1e6e7;
      color: #2e7e71;
    }
    .green {
      background: #d1e6e7;
      color: #2e7e71;
    }
    .msger-chat {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
    }
    .msger-chat::-webkit-scrollbar {
      width: 6px;
    }
    .msger-chat::-webkit-scrollbar-track {
      background: #ddd;
    }
    .msger-chat::-webkit-scrollbar-thumb {
      background: #bdbdbd;
    }
    .msg {
      display: flex;
      align-items: flex-end;
      margin-bottom: 10px;
    }
    .msg:first-child {
      padding-top: 50px;
    }
    .msg-text {
      color: black;
      font-size: 0.8rem;
      word-wrap: break-word;
      //  @media(max-width:992px){
      //   font-size: 12px;
      // }
    }
    .msg:last-of-type {
      margin: 0;
    }
    .msg-img {
      width: 40px;
      height: 40px;
      min-width: 40px;
      border: 1px solid white;
      margin-right: 10px;
      background: #ddd;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover !important;
      border-radius: 50%;
      //    @media(max-width:992px){
      // // width: 40px;
      // //   height: 40px;
      // //    }
    }
    .msg-bubble {
      max-width: 450px;
      padding: 15px;
      border-radius: 15px;
      background: #d0d3e2;
      margin: 10px;
    }
    .msg-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .msg-info-name {
      margin-right: 10px;
      font-weight: bold;
      font-size: 0.8rem;
      margin-left: 15px;
      //  @media(max-width:992px){
      //   font-size: 12px;
      // }
    }
    .msg-info-time {
      font-size: 0.85em;
      @media (max-width: 992px) {
        font-size: 12px;
      }
    }
    .left-msg .msg-bubble {
      border-bottom-right-radius: 0;
    }
    .right-msg {
      flex-direction: row-reverse;
    }
    .right-msg .msg-bubble {
      background: white;
      color: black;
      border-bottom-left-radius: 0;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }
    .right-msg .msg-img {
      margin: 0 0 0 10px;
    }
    .msger-inputarea {
      display: flex;
      padding: 5px;
      border-top: var(--border);
      background: white;
      margin: 10px;
      border-radius: 15px;
    }
    .msger-inputarea * {
      padding: 10px;
      border: none;
      border-radius: 3px;
      font-size: 1em;
    }
    .msger-input {
      flex: 1;
      outline: none;
      //background: #ddd;
    }
    .msger-send-btn {
      margin-right: 10px;
      background: #00a193;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      transition: opacity 0.23s;
      padding: 3px;
      border-radius: 15px;
    }
    .msger-send-btn:hover {
      opacity: 0.8;
    }
    .msger-chat {
      background-color: #edf0f5;
    }
  }
  .usersList{
    transition: .4s all;
    cursor:pointer;
    padding: 10px;
  }
  .usersList :hover{
    // transform: translateX(-10px);
  }
  /* we will explain what these classes do next! */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  </style>