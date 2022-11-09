<template>
  <div id="Navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand float-left">Books4u</a>
        <ul class="nav navbar-nav flex-row float-right">
          <!-- <li class="nav-item">
              <router-link class="nav-link pr-3" to="/">Logout</router-link>
            </li> -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              {{luemail}}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#" @click="logout()">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { firebaseApp } from '../firebaseDb';

export default {
  name: "login",
  components: {

  },
  props: {
    msg: String
  },
  data() {
    return {
      luemail: null,
    }
  },

  methods: {
    logout() {
      firebaseApp.auth().signOut()
        .then(() => {
          this.$router.replace('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    let user = firebaseApp.auth().currentUser;
    this.luemail = user.email;
  },
};
</script>