<template>
    <div>
      <div class="container-fluid" style="direction: rtl">
        <div class="row webinar-live">
          <div class="col-lg-7 webinar-live__main">
            <div class="webinar-live__header" :class="{ hidden: chatStatus }">
              <div class="webinar-live__back">
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 25.451 25.451"
                  xml:space="preserve"
                  fill="#000"
                  class="arrow"
                  style="width: 10px"
                >
                  <g>
                    <g id="c185_triangle">
                      <path
                        d="M20.982,0.521v2.006L8.57,12.315c-0.121,0.101-0.195,0.251-0.195,0.41s0.074,0.311,0.195,0.41l12.412,9.79v2.005
              c0,0.199-0.115,0.383-0.297,0.469c-0.178,0.086-0.395,0.064-0.549-0.061L4.664,13.136c-0.122-0.1-0.194-0.251-0.194-0.41
              s0.072-0.31,0.194-0.41L20.136,0.113c0.154-0.126,0.371-0.148,0.549-0.061C20.866,0.139,20.982,0.322,20.982,0.521z"
                      ></path>
                    </g>
                    <g id="Capa_1_58_"></g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
              </div>
              <h4 class="webinar-live__title">{{ userName }}</h4>
              <span class="webinar-live__badge ml-2 webinar-live__badge_purple">
                {{ $nuxt._route.params.room }}
              </span>
              <span
                class="webinar-live__badge ml-2 webinar-live__badge_green"
                style="cursor: pointer"
                @click="connect()"
              >
                شروع وبینار
              </span>
            </div>
  
            <div class="webinar-live__info" :class="{ hidden: chatStatus }">
              <div class="webinar-live__invited">
                <svg
                  style="height: 20px; width: 20px; color: rgb(162, 169, 177)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    fill="#a2a9b1"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                    fill="#a2a9b1"
                  ></path>
                  <path
                    d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                    fill="#a2a9b1"
                  ></path>
                </svg>
                <span>تعداد افراد دعوت شده :</span>
                <span class="webinar-live__badge webinar-live__badge_green f-is"
                  >6</span
                >
              </div>
              <div class="webinar-live__absent">
                <svg
                  style="height: 20px; width: 20px; color: rgb(162, 169, 177)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-x-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                    fill="#a2a9b1"
                  ></path>
                </svg>
                <span>افراد آنلاین : </span>
                <span class="webinar-live__badge webinar-live__badge_red f-is">{{
                  onlineCount
                }}</span>
              </div>
              <div class="webinar-live__add-user">
                <span class="badge">
                  <svg
                    style="height: 20px; width: 20px; color: rgb(255, 255, 255)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                      fill="#ffffff"
                    ></path>
                  </svg>
                </span>
                <span>اضافه کردن کاربران به وبینار</span>
              </div>
            </div>
  
            <!-- <div
              id="video-container"
              @mousemove="overLayController(3000)"
              class="webinar-live-player"
            > -->
            <div id="video-container" class="webinar-live-player">
              <div id="remote_videos">
                <div class="videos-inner">
                  <div
                    v-for="(item, index) in videos"
                    :key="index"
                    :id="`user_${item.id}`"
                    class="videoWrap"
                  >
                  <div class="close-remote-video" @click="closeRemotevideo" v-if="userName =='admin' && item.id != 'admin'">
                  <i class="fa fa-times" aria-hidden="true"></i>
                  </div>
                    <div class="display_name">{{ item.id }}</div>
                    <video
                      :srcObject.prop="item.src"
                      autoplay
                      :muted="item.id == userName"
                      :id="`remote_${item.id}`"
                      class="video"
                    ></video>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 live-chat" style="flex: auto; overflow-y: auto">
            <LiveChat
              @mobileChatStatus="chatHandler"
              @submit="send"
              :confirmedMessage="confirmedMessage"
              :oldMessages="messages"
              :onlineUsers="onlineUsers"
              :chooseUser="chooseUser"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  let peer = null;

  export default {
    // middleware: ["auth"],
    // layout: "blank",
    // components : {
    //   name: 'liveChat'
    // }
    data: () => ({
      localStream: null,
      fullScreenFlag: false,
      idleTimer: null,
      idleState: false,
      isMute: false,
      chatStatus: false,
      onlineCount: 0,
      onlineUsers: [],
      socket: null,
      endpoint: "webinars",
      roomName: "room1",
      confirmedMessage: null,
      userName: "admin",
      messages: [],
      cameraOff: false,
      VolumeCounter: 3,
      //
      configuration: {
        iceServers: [
          { urls: "stun:stun.stunprotocol.org:3478" },
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: ["turn:13.250.13.83:3478?transport=udp"],
            username: "YzYNCouZM1mhqhmseWk6",
            credential: "YzYNCouZM1mhqhmseWk6",
          },
        ],
      },
      localUUID: null,
      localStream: null,
      connection: null,
      consumers: new Map(),
      clients: new Map(),
      remoteContainer: null,
      videos: [],
      secondPlayerIs : false,
      choosedUserIdToCall : "",
      peerObject : '',
    }),
    watch:{
     videos(){
      if(this.videos.length>1){
        this.secondPlayerIs = true
      }
     }
    },
    methods: {

      async send(message) {
        await this.socket.emit("newMessage", {
          sender: this.userName,
          message,
          roomName: this.roomName,
          endpoint: this.endpoint,
        });
        // await this.socket.on('confirmMessage',  data => {
        //  this.confirmedMessage=data
        //   console.log(this.confirmedMessage, 'confirmed message')
        // })
      },
      chatHandler(status) {
        this.chatStatus = status;
        // if(status){
        //   this.$refs.mobileHeader.style.height = 0
        //   this.$refs.webinarInfo1.style.height = 0
        //   this.$refs.webinarInfo2.style.height = 0
        //   this.$refs.webinarInfo2.style.padding = 0
        //   this.$refs.webinarInfo2.style.padding = 0
        //   this.$refs.webinarInfo2.style.height = 0
        // }
      },

      //   // if (screen.orientation && screen.orientation.lock) {
      //   screen.orientation.lock("landscape-primary");
      //   // }
      // },
      // overLayController(time) {
      //   clearTimeout(this.idleTimer);
      //   if (this.idleState == true) {
      //     // $("#foo").removeClass("inactive");
      //     document.getElementById("over-lay").style.opacity = 1;
      //   }
      //   this.idleState = false;
      //   this.idleTimer = setTimeout(() => {
      //     document.getElementById("over-lay").style.opacity = 0;
      //     this.idleState = true;
      //   }, time);
      // },
      async roomInfo() {
        await this.socket.on("roomInfo", (roomInfo) => {
          this.roomName = roomInfo.name;
          // console.log(roomInfo, 'rooooom')
         // this.messages = roomInfo.messages;
          // console.log(this.roomName , 'this is roomname')
        });
        await this.socket.on("countOfOnlineUsers", (count) => {
          console.log(count);
          this.onlineCount = count.length;
          this.onlineUsers = count;
        });
        //? when it was at submit function / client couldn't recive first message befor sending message
        await this.socket.on("confirmMessage", (data) => {
          this.confirmedMessage = data;
          console.log(this.confirmedMessage, "confirmed message");
        });
      },

      async init() {
        console.log("window loaded");
        this.socket.on("connect", (e) => {
          console.log("socket connected");
          console.log(socket.id, "socket");
          connectBtn.disabled = false;
        });
      },
    },
    beforeMount() {
    //  this.userName = localStorage.getItem("name");
   //   console.log(this.userName);
      this.socket = this.$nuxtSocket({});
      this.socket.on("connect", () => {
        this.socket.emit("joinRoom", {
          roomName: this.$nuxt._route.params.room,
          userName: this.userName,
        });
      });
    },
    mounted() {

      this.roomInfo();

      this.socket.on("message", (e) => {
        console.log("socket message");
        this.handleMessage(e);
      });
      this.socket.on("disconnect", (e) => {
        console.log("socket desconnected");
        this.handleClose;
      });

      window.addEventListener("resize", () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
  };
  </script>
  
  <style scoped lang="scss">
  body {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
    overflow: hidden;
  }
  .webinar-live {
    * {
      color: black;
    }
    //height: calc(100vh - 30px);
    height: 100vh;
    // min-height: -webkit-fill-available;
    height: calc(var(--vh, 1vh) * 100);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap !important;
    @media (min-width: 992px) {
      flex-direction: row !important;
    }
    &__chat {
      background: blue;
    }
    &__main {
      background: white;
      @media (min-width: 992px) {
        border-right: 2px solid rgba(85, 85, 85, 0.192);
        border-radius: 20px;
      }
    }
    &__header {
      padding: 30px 10px;
      border-bottom: 2px solid rgba(85, 85, 85, 0.192);
      display: flex;
      align-items: center;
      transition: 0.4s all;
      @media (max-width: 992px) {
        padding: 5px;
      }
    }
    &__back {
      background: rgba(190, 190, 190, 0.575);
      padding: 5px 10px;
      border-radius: 10px;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        transform: rotate(180deg);
      }
    }
    &__title {
      margin-bottom: 0;
      font-size: 16px;
      @media (max-width: 992px) {
        font-size: 14px;
      }
    }
    &__info {
      display: flex;
      align-items: center;
      padding: 20px 10px;
      flex-wrap: nowrap;
      overflow-x: scroll;
      transition: 0.4s all;
      @media (max-width: 992px) {
        padding: 10px 10px;
      }
      div {
        font-size: 0.9rem;
        @media (max-width: 992px) {
          min-width: 200px;
          //  span{
          //    font-size:.9rem;
          //  }
        }
      }
    }
    &__info::-webkit-scrollbar {
      display: none;
    }
    &__invited {
      margin-left: 30px;
      display: flex;
      align-items: center;
      * {
        margin: 0 3px;
      }
    }
    &__badge {
      padding: 5px 10px;
      border-radius: 10px;
      font-size: 0.8rem;
      &_green {
        background: #d1e6e7;
        color: #4fad9f;
        border-color: #4fad9f !important;
        outline: none;
      }
      &_red {
        background: #fcf2f1;
        color: #d27178;
      }
      &_purple {
        background: #d3d5e4;
        color: #5b5e87;
      }
    }
    &__absent {
      margin-left: 10px;
      display: flex;
      align-items: center;
      * {
        margin: 0 3px;
      }
    }
    &__add-user {
      margin-right: auto;
      display: flex;
      align-items: center;
      //      *{
      //    margin: 0 3px;
      //  }
      span {
        color: green;
      }
      .badge {
        background: #039e8c;
        padding: 5px;
        border-radius: 10px;
        margin-left: 5px;
      }
    }
    &__tab {
      padding-top: 15px;
      padding-bottom: 15px;
      background: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      transition: 0.4s all;
      @media (max-width: 992px) {
        flex-direction: row;
        padding-top: 5px;
        padding-bottom: 5px;
      }
    }
    &__tabs-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @media (max-width: 992px) {
        flex-direction: row;
      }
    }
    &__tabs {
      margin: 5px 0;
      padding: 10px 12px;
      border-radius: 15px;
      transition: background 0.4s;
      cursor: pointer;
      svg path {
        transition: background 0.4s;
      }
      &:hover {
        background: #dff3f1;
        svg path {
          fill: #05a28d !important;
        }
      }
    }
    &__person-pic {
      width: 80%;
      @media (max-width: 992px) {
        width: 10%;
        text-align: left;
      }
      img {
        width: 100%;
        border-radius: 100%;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      }
    }
    &__logo {
      width: 80%;
      width: 80%;
      @media (max-width: 992px) {
        width: 10%;
      }
      img {
        width: 100%;
      }
    }
  }
  .webinar-live-player {
    position: relative;
    overflow: hidden;
    &__overlay {
      height: 100%;
      width: 100%;
      border-radius: 15px;
      position: absolute;
      // background: rgba(0, 0, 0, 0.369);
      background: rgb(0, 0, 0);
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.33239233193277307) 0%,
        rgba(255, 255, 255, 0) 73%
      );
      z-index: 1;
      // opacity: 0;
      transition: 0.3s opacity;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @media (max-width: 768px) {
        //justify-content: start;
      }
      &:hover {
        opacity: 1;
      }
    }
    &__video {
      width: 100%;
      height: 100%;
      border-radius: 15px;
      &[poster] {
        //  height: 100%;
        object-fit: cover;
      }
    }
    &__header {
      display: flex;
      padding: 20px 30px;
      justify-content: space-between;
      //align-items: center;
    }
    &__publisher {
      @media (max-width: 992px) {
        display: none;
      }
      width: 200px;
      display: flex;
      align-items: center;
      .img-frame {
        width: 40%;
        margin-left: 20px;
        background: white;
        border-radius: 20px;
        // overflow: hidden;
        img {
          width: 100%;
          border-radius: 20px;
          border: 2px solid white;
        }
      }
      .content {
        // width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        span {
          font-size: 0.8rem;
          line-height: 2.3rem;
          color: white;
        }
        h5 {
          color: white;
          font-size: 0.9rem;
        }
      }
    }
    &__timer {
      span {
        background: rgba(0, 0, 0, 0.644);
        border-radius: 10px;
        padding: 5px;
        color: white;
      }
    }
    &__footer {
      text-align: center;
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
      @media (max-width: 992px) {
        margin-bottom: 0;
        justify-content: center;
      }
    }
    &__controlbox {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      span {
        padding: 10px 12px;
        border-radius: 100% !important;
        background-color: rgba(162, 162, 162, 0.73) !important;
        backdrop-filter: blur(5px);
        margin: 15px;
        transition: all 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 992px) {
          margin: 7px;
          padding: 9px 11px;
        }
        @media (min-width: 992px) {
          &:hover {
            transform: translateY(-8px);
            cursor: pointer;
          }
        }
      }
      span:nth-child(3) {
        background: #ff5956 !important;
        padding: 24px 26px;
        //border-radius: 24px !important;
        @media (max-width: 992px) {
          padding: 18px;
        }
      }
    }
    &__valume-control {
      @media (max-width: 992px) {
        display: none;
      }
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: row;
      background-color: rgba(202, 202, 202, 0.493) !important;
      padding: 23px 0px;
      border-radius: 200px !important;
      height: 0;
      width: 147px;
      justify-content: space-evenly;
      transform: rotate(90deg);
      // span {
      //   // position: absolute;
      //   top: -34px;
      //   // width: 41px;
      //   // height: 134px;
      //   left: 50px;
      // }
      svg {
        // position: absolute;
        // bottom: 10px;
        // left: 11px;
        transform: rotate(-90deg);
      }
      input {
        //  -webkit-appearance: none;
        margin: 18px 0;
        width: 60%;
        height: 4px;
        z-index: 2;
        // transform: rotate(90deg);
        position: relative;
        left: 6px;
        background: #fff;
        accent-color: #039e8c;
        border-radius: 5px;
        background: #d3d3d3;
        outline: none;
        //opacity: 0.7;
      }
      input:focus {
        background: #ffffff !important;
        accent-color: #039e8c !important;
        cursor: grab;
      }
      input:hover {
        background: #d3d3d3 !important;
        accent-color: #039e8c !important;
        cursor: pointer;
      }
      input::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        // border: 1px solid #000000;
        height: 16px;
        width: 16px;
        border-radius: 100%;
        background: black !important;
        cursor: pointer;
      }
      input::-ms-fill-upper {
        background: #039e8c !important;
        //border-radius: 2.6px;
      }
    }
  }
  @media (min-width: 992px) {
    .col-lg-1 {
      flex: 0 0 4.333333%;
      max-width: 4.333333%;
    }
    .col-lg-7 {
      flex: 0 0 62.333333%;
      max-width: 62.333333%;
    }
  }
  @media (max-width: 992px) {
    .col-lg-1,
    .col-lg-7,
    .col-lg-4 {
      padding: 5px !important;
    }
  }
  @media screen and (orientation: landscape) and (max-width: 768px) {
    .live-chat,
    .webinar-live__tab,
    .webinar-live__info,
    .webinar-live__header {
      display: none;
    }
    .webinar-live__main {
      padding: 0 !important;
      height: 100vh;
      max-width: 100% !important;
      flex: 0 0 100%;
    }
    .webinar-live-player {
      height: 100%;
    }
  }
  .hidden {
    overflow: hidden !important;
    padding: 0 !important;
    height: 0px !important;
    opacity: 0 !important;
    transition: 0.4s all;
  }
  #remote_videos {
    width: 100%;
    height: 100%;
    // margin: 20px auto;
  }
  .videos-inner {
    width: 100%;
    display: flex;
    gap: 1.2rem;
    justify-content: center;
  }
  .videos-inner .videoWrap {
    width: 100% !important;
    border-radius: 20px;
    position: relative;
  }
  .videos-inner .videoWrap video {
    width: 100% !important;
    // height: 100%;
    border-radius: 20px !important;
  }
  .videos-inner .display_name {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.6);
    padding: 0.8rem 1.5rem;
    color: white;
    font-weight: bold;
    font-family: Arial;
    border-radius: 20px;
    max-width: 98%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    z-index: 2;
    font-size: 0.95rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
  }
  .close-remote-video{
    position: absolute;
    top: 20px;  
    left: 20px;
    z-index: 10;
    font-size: 20px;
    background: white;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    transition: .4s all;
    cursor: pointer;
    &:hover{
     // opacity: .5;
      i{
        color: red;
      }
    }
    i{
      color: rgb(253, 128, 128);
      font-size: 30px;
      transition: .4s all;
   
    }
  }
  </style>