<template>
   <div class="login">
      <div class="sidenav">
         <div class="login-main-text">
            <h2>Books4U</h2>
            <p>Register from here to access.</p>
         </div>
      </div>
      <div class="main">
         <div class="col-md-9 col-sm-12">
            <div class="login-form">
               <h3>Register first to enjoy the service.</h3>
               <hr>
               <div class="form-group">
                  <input type="text" v-model="runame" class="form-control" placeholder="User Name">
               </div>
               <div class="form-group">
                  <input type="email" v-model="ruemail" class="form-control" placeholder="User Email">
               </div>
               <div class="form-group">
                  <input type="password" v-model="rupassword" class="form-control" placeholder="Password">
               </div>
               <button type="submit" @click="registerUser" class="btn btn-primary">Register</button>

            </div>
            <router-link to="/">You already have an account?</router-link>
         </div>
      </div>
   </div>
</template>

<script>
import { firebaseApp, db} from '../firebaseDb';

export default {
   name: "register",
   components: {

   },
   props: {
      msg: String
   },
   data() {
      return {
         runame: null,
         ruemail: null,
         rupassword: null
      }
   },
   methods: {
      registerUser() {
         firebaseApp.auth().createUserWithEmailAndPassword(this.ruemail, this.rupassword)
            .then((user) => {
               db.collection("user_profiles").doc(user.user.uid).set({
                  runame: this.runame
               })
                  .then(function () {
                     console.log("Document successfully written!");
                  })
                  .catch(function (error) {
                     console.error("Error writing document: ", error);
                  });
               this.$router.replace('/books');
            })
            .catch(function (error) {
               // Handle Errors here.
               var errorCode = error.code;
               var errorMessage = error.message;
               if (errorCode == 'auth/weak-password') {
                  alert('The password is too weak.');
               } else {
                  alert(errorMessage);
               }
               console.log(error);
            });
      }
   },
};
</script>