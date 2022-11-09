<template>
    <div class="checkout">
        <Navbar></Navbar>

        <body>
            <div class="container px-4 py-5 mx-auto">
                <div class="row d-flex justify-content-center">
                    <div class="col-5">
                        <h4 class="heading">Shopping Bag</h4>
                    </div>
                    <div class="col-7">
                        <div class="row text-right">
                            <div class="col-3">
                                <h6 class="mt-2">Format</h6>
                            </div>
                            <div class="col-3">
                                <h6 class="mt-2">Quantity</h6>
                            </div>
                            <div class="col-3">
                                <h6 class="mt-2">Price</h6>
                            </div>
                            <div class="col-3">
                                <h6 class="mt-2">Remove</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-for="item in this.$store.state.cart" class="row d-flex justify-content-center border-top">
                    <div class="col-5">
                        <div class="row d-flex">
                            <div class="book">
                                <img :src="item.bookImage" class="book-img">
                            </div>
                            <div class="my-auto flex-column d-flex pad-left">
                                <h6 class="mob-text">{{ item.bookName }}</h6>
                                <!-- <div v-for="carts of cart">{{carts.bookName}}</div> -->
                                <!-- <input type="hidden" name="" v-model="bok"> -->
                                <!-- <div v-for="cart in book_orders">{{ cart.bookName }} </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="my-auto col-7">
                        <div class="row text-right">
                            <div class="col-3">
                                <p class="mob-text">PDF</p>
                            </div>
                            <div class="col-3">
                                <div class="row d-flex justify-content-end px-3">
                                    <input type="number" class="form-control-sm" v-model="item.bookQuantity" min="1"
                                        max="1000" step="0" />
                                </div>
                            </div>
                            <div class="col-3">
                                <h6 class="mob-text">{{ item.bookPrice | currency }}</h6>
                            </div>
                            <div class="col-3">
                                <h6 class="mob-text" @click="$store.commit('removeFromCart', item)">X</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center mt-5">
                    <div class="col-lg-12" style="border: 1px solid black">
                        <div class="row">
                            <div class="col-lg-3 radio-group">
                                <div class="row d-flex px-3 radio">
                                    <img class="pay" src="https://i.imgur.com/WIAP9Ku.jpg">
                                    <p class="my-auto">Credit Card</p>
                                </div>
                                <div class="row d-flex px-3 radio gray">
                                    <img class="pay" src="https://i.imgur.com/OdxcctP.jpg">
                                    <p class="my-auto">Debit Card</p>
                                </div>
                                <div class="row d-flex px-3 radio gray mb-3">
                                    <img class="pay" src="https://i.imgur.com/cMk1MtK.jpg">
                                    <p class="my-auto">PayPal</p>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div class="row px-2">
                                    <div class="form-group col-md-6">
                                        <label class="form-control-label">Name on Card</label>
                                        <input type="text" placeholder="Johnny Doe">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="form-control-label">Card Number</label>
                                        <input type="text" placeholder="1111 2222 3333 4444">
                                    </div>
                                </div>
                                <div class="row px-2">
                                    <div class="form-group col-md-6">
                                        <label class="form-control-label">Expiration Date</label>
                                        <input type="text" placeholder="MM/YYYY">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="form-control-label">CVV</label>
                                        <input type="text" placeholder="***">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 mt-2">
                                <div class="row d-flex justify-content-between px-4">
                                    <p class="mb-1 text-left">Subtotal</p>
                                    <h6 class="mb-1 text-right">{{ $store.getters.subTotal | currency }}</h6>
                                </div>
                                <div class="row d-flex justify-content-between px-4">
                                    <p class="mb-1 text-left">Shipping</p>
                                    <h6 class="mb-1 text-right">$2.99</h6>
                                </div>
                                <div class="row d-flex justify-content-between px-4" id="tax">
                                    <p class="mb-1 text-left">Total (tax included)</p>
                                    <h6 class="mb-1 text-right">{{ $store.getters.totalPrice | currency }}</h6>
                                </div>
                                <button @click="addOrder" class="btn-block btn-blue">
                                    <span>
                                        <span id="checkout">Pay</span>
                                        <span id="check-amt">{{ $store.getters.totalPrice | currency }}</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </div>
</template>
<script>
import '../assets/checkout.scss'
import credit from '../assets/js/pay.js'
import { firebaseApp, db } from '../firebaseDb';

export default {
    name: "checkout",
    props: {
        msg: String
    },
    data() {
        return {
            user_email: null,
            // price: null,
            // quantity: null,
            // image: String
        }
    },
    methods: {
        addOrder() {
            let user = firebaseApp.auth().currentUser;
            this.user_email = user.email;
            let date = new Date().toLocaleString();
            const books = JSON.parse(localStorage.getItem("cart"));
            for (let i = 0; i < books.length; i++) {
                //console.log(books[i].bookPrice)
                db.collection("orders").doc().set({
                    Book_Name: books[i].bookName,
                    Book_Price: books[i].bookPrice,
                    Book_Quantity: books[i].bookQuantity,
                    Book_Image: books[i].bookImage,
                    Book_PDF: books[i].bookPdfs,
                    User_Email: this.user_email,
                    Book_Format: 'PDF',
                    Order_Date: date
                })
                this.$router.replace('/user_dashboard');
                Toast.fire({
                    type: 'success',
                    title: 'Order Successfully Done'
                })
            }
        }
    },

    mounted() {
        this.$nextTick(() => {
            credit(this.$refs.credit);
        });

    },
};
</script>