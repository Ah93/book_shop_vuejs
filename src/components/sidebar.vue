<template>
  <div id="Sidebar">
    <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <div class="sidebar-brand text-center">
            <a href="#">Books4U</a>
            <div id="close-sidebar">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <div class="sidebar-header">
            <div class="user-info">
              <span class="user-name">
                <strong>{{luemail}}</strong>
              </span>
              <span class="user-role">User</span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <div class="sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>General</span>
              </li>
              <li>
                <a href="#" data-toggle="modal" data-target="#cartModal">
                  <i class="fa-solid fa-cart-shopping"></i>
                  <span>My Cart</span>
                </a>
                <a href="#" data-toggle="modal" data-target="#orderModal">
                  <i class="fa fa-history"></i>
                  <span>Orders</span>
                </a>
                <!-- <a href="#">
                  <i class="fa fa-user"></i>
                  <span>Account Setting</span>
                </a> -->
                <a @click="signout()" href="">
                  <i class="fa fa-sign-out"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
      </nav>
      <!-- sidebar-wrapper  -->
  </div>
</template>
<script>
import { firebaseApp } from '../firebaseDb';

export default {
  name: "Sidebar",
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
    signout() {
      firebaseApp.auth().signOut()
        .then(() => {
          this.$store.commit('clearCart');
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