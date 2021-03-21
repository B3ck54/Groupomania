import http from "../http-commons";

// requête relative au service
export default {
  getUser() {
    return http.get("auth/me", { headers: { Authorization: "Bearer " + localStorage.getItem("token")} })
  }
};