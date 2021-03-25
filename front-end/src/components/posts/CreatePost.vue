<template>
  <v-container fluid>
    <v-row justify="center" class="text-center">
      <v-col>
        <v-card class="mb-8" color="secondary">
          <v-row align="center" class="pa-6">
            <v-col cols="10" class="text-left">
              Écrivez quelque chose <strong>{{ user.username }} !</strong>
              <v-text-field
                v-model="post.message"
                placeholder="Écrivez un post"
                @keypress.enter="send"
              ></v-text-field>
              <v-file-input
                accept="image/*"
                chips
                truncate-length="34"
                color="white"
                label="Publier une photo"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
            <v-col cols="2">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="ml-2"
                    @click.prevent="send"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <!-- pour éviter que ça vide les champs au moment où on pense -->
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </template>
                <span>Publier</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapState } from "vuex";

export default {
  data: function () {
    return {
      post: {
        message: "",
      },
    };
  },
  created() {
    this.$store.dispatch("getUser");
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    send() {
      // console.log(this.post);
      this.$store.dispatch("createPost", this.post); //recevra un payload ici le message
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
