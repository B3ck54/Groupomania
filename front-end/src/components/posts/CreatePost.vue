<template>
  <v-card class="mt-8 mb-8" color="gray">
    <v-form v-model="valid" @submit.prevent="onSubmit">
      <v-row align="center" class="pa-6">
        <v-col cols="10" class="text-left">
          Écrivez quelque chose <strong>{{ user.username }} !</strong>
          <v-text-field
            v-model="message"
            placeholder="Écrivez un post"
            filled
            rounded
            dense
            @keypress.enter="send"
          ></v-text-field>
          <input
            @change="uploadImage"
            type="file"
            accept="image/*"
            ref="file"
            name="Publier une photo"
          />
        </v-col>
        <v-col cols="2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon class="ml-2" @click="send" v-bind="attrs" v-on="on">
                <!-- pour éviter que ça vide les champs au moment où on pense -->
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </template>
            <span>Publier</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>


<script>
import { mapState } from "vuex";

export default {
  data: function () {
    return {
      valid: true,
      message: "",
      files: "",
    };
  },
  created() {
    this.$store.dispatch("getUser");
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    send() {
      const formData = new FormData();
      formData.append("message", this.message);

      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.$store.dispatch("createPost", formData);
      window.location.reload();
    },
  },
};
</script>

<style lang="css" scoped>
input, select, textarea{
    color: #000000;
}
</style>
