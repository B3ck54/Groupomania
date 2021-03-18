import axios from "axios";

let baseUrl = "http://localhost:3000/api"; // url commune à toutes nos requêtes

// requête relative au service
export default {
  getPosts() { // on va exporter un objet dont chaque propriété sera une méthode qui permet de faire du CRUD
    // return axios.get(`${baseUrl}/posts`); // Retourne la promesse que nous retourne la méthode get d'axios
    return axios.get(`${baseUrl}/posts`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })

  },
  createPost(post) {
    return axios.post(`${baseUrl}/posts`, post, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
  }
};