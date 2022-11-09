import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFirestore from 'vue-firestore'
import $ from 'jquery'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js';
import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'
// import 'bootstrap-input-spinner.js'
// import '@fortawesome/fontawesome-free/css/all.css'
import './assets/app.scss'
import './assets/login_register.scss'
import './assets/user_dashboard.scss'
import './assets/sidebar.scss'
import Swal from 'sweetalert2';
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)
// import VoerroTagsInput from '@voerro/vue-tagsinput';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)
window.$ = $
Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})
Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('modal-cart', require('./components/modalCart.vue').default);
Vue.component('modal-order', require('./components/modalOrder.vue').default);
Vue.component('Sidebar', require('./components/sidebar.vue').default);
Vue.component('login-customer', require('./components/auth_customer.vue').default);

Vue.use(VueFirestore)
Vue.config.productionTip = false
// Make BootstrapVue available throughout your project
// Vue.use(createPopper)
import store from './store.js';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;
