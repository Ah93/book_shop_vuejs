<template>
    <div>
    <div class="page-wrapper chiller-theme toggled">
      <sidebar></Sidebar>
      <main class="page-content">
        <div class="shop-items">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-8">
                <h2>Book <b>Lists</b></h2>
              </div>
              <div class="col-sm-4">
                <div class="search-box">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input type="text" class="form-control" id="searchBooks" placeholder="Search...">
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-3 col-sm-6" v-for="book in books" :key="book.key">
                <div class="item target">
                  <img class="img-responsive" :src="book.images" alt="" height="200" width="200">
                  <div class="item-dtls">
                    <h4><a href="#" @click="viewBook(book.id)">{{book.name}}</a></h4>
                    <span class="price lblue">{{book.price | currency}}</span>
                  </div>
                  <div class="ecom bg-lblue">
                    <add-to-cart :name="book.name" :price="book.price" :images="book.images" :pdfs="book.pdfFile" :bId="book.id">
                    </add-to-cart>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->


    <!-- Modal -->
    <!-- <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">My Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li v-for="item in this.$store.state.cart" class="media">
                <img :src="item.bookImage" width="80px" class="align-self-center mr-3" alt="">
                <div class="media-body">
                  <h5 class="mt-0">{{item.bookName}}

                    <span class='float-right' @click="$store.commit('removeFromCart',item)">X</span>
                  </h5>
                  <p class="mt-0">{{item.bookPrice | currency}}</p>
                  <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue Shopping</button>
            <button type="button" class="btn btn-primary">Checkout</button>
          </div>
        </div>
      </div>
    </div> -->
    <modal-cart></modal-cart>
    <!-- End Modal -->
    <modal-order></modal-order>
    <!--Modal view-->
     <!-- Modal -->
     <div class="modal fade" id="book" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Edit Book</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- main book -->
              <div class="col-md-8">
                <div class="mb-3">
                  <input type="text" placeholder="Book Name" v-model="book.name" class="form-control" readonly>
                </div>

                <div class="mb-3">
                  <input type="text" placeholder="Book Author" v-model="book.author" class="form-control" readonly>
                </div>

                <div class="mb-3">
                  <vue-editor v-model="book.description" :aria-disabled="true"></vue-editor>
                </div>
              </div>
              <!-- Book sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Book Details</h4>
                <hr>

                <div class="mb-3">
                  <input type="text" v-model="book.year_published"
                    class="form-control" readonly>
                </div>

                <div class="mb-3">
                  <input type="text" v-model="book.num_of_pages" class="form-control" readonly>
                </div>

                <div class="mb-3">
                  <input type="text" v-model="book.isbn" class="form-control" readonly>
                </div>

                <div class="mb-3">
                  <input type="text" v-model="book.price" class="form-control" readonly>
                </div>

                <div class="mb-3">
                  <input class="form-control" v-model="book.category" readonly>
                </div>

                <div class="mb-3">
                  <input class="form-control" v-model="book.tags" readonly>
                </div>

                <div class="mb-3 d-flex">
                  <div class="p-1" v-for="(image, index) in book.images">
                    <div class="img-wrapp">
                      <img :src="image" alt="" width="80px">
                    </div>
                  </div>
                </div>

                <div class="mb-3 d-flex text-center">
                  <div class="p-1" v-for="(pdf, index) in book.pdfFile">
                    <div class="pdf-wrapp">
                      <input class="form-control" type="text" v-model="book.pdfFile" readonly>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--End modal-->
  </div>
</template>
<script>

</script>
<script>
import { db } from '../firebaseDb';
import ModalCart from './modalCart.vue';
import sidebar from '../assets/js/sidebar.js'
import searchBook from '../assets/js/BookSearch.js'
import { VueEditor } from "vue2-editor";

export default {
  name: "user_dashboard",
  components: {
    ModalCart,
    VueEditor
  },
  props: {
    msg: String
  },
  data() {
    return {
      books: [],
      book: {
        name: null,
        author: null,
        isbn: null,
        price: null,
        category: null,
        description: null,
        year_published: null,
        num_of_pages: null,
        tags: [],
        pdfFile: [],
        images: [],
      },
      luemail: null
    }
  },
  firestore() {
    return {
      books: db.collection('books'),
    }
  },

  methods: {
     //pop up modal and show data in the fields
     viewBook(id) {
            $('#book').modal('show');
            let dbRef = db.collection('books').doc(id);
            dbRef.get().then((doc) => {
                this.book = doc.data();
            }).catch((error) => {
                console.log(error)
            })
            // this.book = book.data();
            console.log(this.book)
        },
  },
 mounted() {
  this.$nextTick(() => {
    searchBook(this.$refs.search);
  });

  this.$nextTick(() => {
    sidebar(this.$refs.Sidebar);
  });

 },
  }
  
</script>