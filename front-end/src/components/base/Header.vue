<template>
  <v-toolbar elevation color="primary">
    <v-toolbar-title align="center"
      ><a
        :href="redirect"
        class="d-flex align-center"
        style="text-decoration: 'none'"
      >
        <img
          src="../../assets/icon-left-font-monochrome-white.png"
          alt="Groupomania"
          contain
          height="250px"
        /> </a
    ></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        text
        class="mr-5"
        dark
        v-if="loggedIn == false"
        @click="redirectToRegister()"
      >
        <span>Inscription</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn
        text
        class="mr-5"
        dark
        v-if="loggedIn == true"
        @click="redirectToProfile()"
      >
        <span>Mon Profil</span>
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn
        text
        class="mr-5"
        dark
        v-if="loggedIn == true"
        @click="redirectToPost()"
      >
        <span>Chat</span>
        <v-icon>chat</v-icon>
      </v-btn>

      <v-btn
        text
        class="mr-5"
        dark
        v-if="loggedIn == true && user.isAdmin == true"
        @click="redirectToAdmin()"
      >
        <span>Admin</span>
        <v-icon>security</v-icon>
      </v-btn>

      <v-btn text @click="logout()" v-if="loggedIn == true" dark>
        <span>Déconnexion</span>
        <v-icon>logout</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-menu bottom left z-index="9">
      <template v-slot:activator="{ on }">
        <v-btn icon class="hidden-md-and-up" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>
            <v-btn
              text
              class="mr-5"
              v-if="loggedIn == false"
              @click="redirectToRegister()"
            >
              <span>Inscription</span>
              <v-icon>account_circle</v-icon>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn
              text
              class="mr-5"
              @click="redirectToAdmin()"
              v-if="loggedIn == true && user.isAdmin == true"
            >
              <span>Admin</span>
              <v-icon>security</v-icon>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn
              text
              class="mr-5"
              v-if="loggedIn == true"
              @click="redirectToProfile()"
            >
              <span >Mon Profil</span>
              <v-icon>person</v-icon>
            </v-btn>
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>
            <v-btn
              text
              class="mr-5"
              v-if="loggedIn == true"
              @click="redirectToPost()"
            >
              <span>Chat</span>
              <v-icon>chat</v-icon>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn text @click="logout()" v-if="loggedIn == true">
              <span>Déconnexion</span>
              <v-icon>logout</v-icon>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
  <!-- <v-toolbar elevation color="primary">
    <v-toolbar-title align="center">
      
    </v-toolbar-title>

    <v-spacer /> -->

  <!-- <router-link to="/login">
      <v-btn  text class="mr-5" v-if="user.token == null">
        <span>Connexion</span>
        <v-icon>login</v-icon>
      </v-btn>
    </router-link> -->

  <!-- 
    </v-btn> -->
  <!-- </v-toolbar> -->
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      redirectLogin: "/",
      redirectPosts: "/chat",
    };
  },
  created() {
    this.$root.token = this.token;
  },

  computed: {
    ...mapState(["user"]),
    redirect() {
      if (this.loggedIn == false) {
        return this.redirectLogin;
      } else {
        return this.redirectPosts;
      }
    },
    loggedIn() {
      return this.$store.getters.token;
    },
  },
  methods: {
    redirectToAdmin() {
      this.$router.push(`admin`).catch((err) => err);
    },
    redirectToProfile() {
      this.$router.push(`profile`).catch((err) => err);
    },
    redirectToRegister() {
      this.$router.push(`register`).catch((err) => err);
    },
    redirectToPost() {
      this.$router.push(`chat`).catch((err) => err);
    },
    logout() {
      this.$store.dispatch("logOut").catch((err) => err);
    },
  },
};
</script>

 
<style>
a {
  text-decoration: none;
}
</style>