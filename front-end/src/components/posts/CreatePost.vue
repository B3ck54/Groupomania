<template>
  <div>

        <v-row no-gutters>
          <v-col>
            <div class="d-flex flex-row align-center">
              <v-text-field
                v-model="post.message"
                placeholder="Type Something"
                @keypress.enter="send"
              ></v-text-field>
              <v-btn icon class="ml-4" @click.prevent="send"> <!-- pour éviter que ça vide les champs au moment où on pense -->
              <v-icon>mdi-send</v-icon></v-btn
              >
            </div>
          </v-col>
        </v-row>
  </div>
</template>


<script>
export default {
     data: function () {
    return {
      post: {
        message: ""
      }
    };
  },
methods: {
  send() {
    // console.log(this.post);
    this.$store.dispatch("createPost", this.post ) //recevra un payload ici le message

  }
},
};
</script>

<style lang="scss" scoped>
</style>
