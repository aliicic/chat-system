<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <p v-if="$auth.loggedIn">{{ $auth.user.name }}</p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  data: () => ({
    message: "",
  }),

  async mounted() {
    //const {data} =  await  this.$axios.get('api/users/list')
    // console.log(data);
    //  this.message = data
    this.socket = this.$nuxtSocket({});
  },
};
</script>