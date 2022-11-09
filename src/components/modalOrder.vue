<template>
    <div class="modal-order">
        <!-- Modal -->
        <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">My Orders</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" id="myOrder" placeholder="Search for orders..">

                        <table id="myTable">
                            <tr class="header">
                                <th style="width:40%;">Book Name</th>
                                <th style="width:40%;">Book Image</th>
                                <th style="width:40%;">Book Price</th>
                                <th style="width:40%;">Quantity</th>
                                <th style="width:40%;">Book Format</th>
                                <th style="width:40%;">Order Date</th>
                                <th style="width:40%;">Download PDF</th>
                            </tr>
                            <tr v-for="order in this.orders" :key="order.key">
                                <td>{{ order.Book_Name }}</td>
                                <td><img class="img-responsive" :src="order.Book_Image" alt="" height="130"
                                        width="130" /></td>
                                <td>{{ order.Book_Price }}</td>
                                <td>{{ order.Book_Quantity }}</td>
                                <td>{{ order.Book_Format }}</td>
                                <td>{{ order.Order_Date }}</td>
                                <td><a class="download" :href="order.Book_PDF" title="Download" data-toggle="tooltip"><i
                                            class="fa fa-download" aria-hidden="true"></i></a></td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal -->
    </div>
</template>
<script>
import { firebaseApp, db } from '../firebaseDb';
import '../assets/orderModal.scss'
import searchOrder from '../assets/js/orderModal.js'

export default {
    name: "modal-order",
    props: {
        msg: String
    },

    data() {
        return {
            orders: [],
            user_email: null,
        }
    },

        created() {
            this.user_email = firebaseApp.auth().currentUser.email;
            db.collection("orders")
                .where("User_Email", "==", this.user_email)
                .get()
                .then((snapshot) => {
                    this.orders = snapshot.docs.map(doc => doc.data())
                    //this.orders.push(documents)
                    //console.log(this.orders)
                })
      },
    mounted() {
        this.$nextTick(() => {
            searchOrder(this.$refs.searchOrder);
        });

    },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>