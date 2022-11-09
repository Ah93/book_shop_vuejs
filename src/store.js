import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseApp, db} from './firebaseDb.js';

Vue.use(Vuex)

let cart = window.localStorage.getItem('cart');

export default new Vuex.Store({
    state: {
      cart: cart ? JSON.parse(cart) : [],
    },

    getters: {

      cartBooks: state => {
        return state.cart
    },
      bName: state => {
        return state.cart.map(bName => bName.bookName)
      },
      bPrice: state => {
        return state.cart.map(bPrice => bPrice.bookPrice)
      },
      bQuantity: state => {
        return state.cart.map(bQuantity => bQuantity.bookQuantity)
      },
      bImage: state => {
        return state.cart.map(bImage => bImage.bookImage)
      },
      test: state => {
        let test = 0;

        state.cart.filter((item) => {
          test = item.bookName
      });
      return test;
      },
      subTotal: state => {
        let total = 0;
        state.cart.filter((item) => {
            total += (item.bookPrice * item.bookQuantity);
        });

        return total;
      },
      totalPrice: state => {
        let shipping_cost = 0;

        state.cart.filter((item) => {
          shipping_cost += (item.bookPrice * item.bookQuantity + 2.99);
      });
      return shipping_cost;
      }
    },

    
    mutations:{
        addToCart(state, item){

          let found = state.cart.find(book => book.bookID == item.bookID);

          if(found){
              found.bookQuantity++;
          }else{
            state.cart.push(item);
          }
          this.commit('saveData');
        },
        // addToDb(state, item){
        //   let found = state.cart.find(book => book.bookID == item.bookID);

        //   if(found){
        //     console.log(found.bookName)
        //   }else{
        //     console.log("No Data.")
        //   }
        //     // console.log(item.bookName)
        //     // db.collection("orders").doc().set({
        //     //       bName: this.$store.getters.bName,
        //     //       bPrice: this.$store.getters.bPrice,
        //     //       bQuantity: this.$store.getters.bQuantity,
        //     //       bFormat: 'PDF',
        //     //       nCard: this.nCard,
        //     //       cardNum: this.cardNum,
        //     //       cardExp: this.cardExp,
        //     //       cardCVV: this.cardCVV,
        //     //       subTotal: this.$store.getters.subTotal,
        //     //       totalPrice: this.$store.getters.totalPrice
        //     //    })
       
        // },
        saveData(state){
          window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        // getData(state){
        //   window.localStorage.getItem('cart', JSON.stringify(state.cart));
        // },
        removeFromCart(state, item){
  
            let index = state.cart.indexOf(item);
            state.cart.splice(index,1);
  
          this.commit('saveData');
  
        },
        clearCart(){
            window.localStorage.clear('cart');
        },
  
    },
    actions:{
      getData(context){
        
      }
    },

  })