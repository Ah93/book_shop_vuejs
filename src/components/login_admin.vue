<template>
    <div class="login">
   <div class="sidenav">
         <div class="login-main-text">
            <h2>Books4U</h2>
            <p>Login or register from here to access.</p>
         </div>
      </div>
      <div class="main">
         <div class="col-md-9 col-sm-12">
            <div class="login-form">
               <h3>Login As an Admin.</h3>
            <hr>
                  <div class="form-group">
                     <input type="email" v-model="aemail" class="form-control" placeholder="User Email">
                  </div>
                  <div class="form-group">
                     <input type="password" v-model="apassword" class="form-control" placeholder="Password">
                     <router-link to="/login">You don't have an account?</router-link>
                  </div>
                  <button type="submit" @click="login" class="btn btn-primary">Login</button>
            </div>
               <router-link to="/register">You don't have an account?</router-link>
         </div>
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
      aemail: null,
      apassword: null
    }
  },

  methods: {
   login(){
      firebaseApp.auth().signInWithEmailAndPassword(this.aemail, this.apassword)
                        .then(() => {
                          this.$router.replace('/books');  
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode === 'auth/wrong-password') {
                                alert('Wrong password.');
                            } else {
                                alert(errorMessage);
                            }
                            console.log(error);
                    });
   }
  },
};
</script>