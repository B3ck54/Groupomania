import http from "../http-commons";

// requête relative au service
export default {
  getPosts() { // on va exporter un objet dont chaque propriété sera une méthode qui permet de faire du CRUD
    // return axios.get(`${baseUrl}/posts`); // Retourne la promesse que nous retourne la méthode get d'axios
    return http.get("/posts", { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
  },
  createPost(post) {
    return http.post("/posts", post, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
  }
};