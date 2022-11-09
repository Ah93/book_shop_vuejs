<template>
    <div id="add-to-cart">
        <a class="btn" @click="addToCart">Add to Cart</a>
    </div>
</template>

<script>
export default {
    name: "add-to-cart",
    components: {

    },
    props: {
        name: String,
        price: String,
        images: [],
        pdfs: [],
        bId: String
    },
    data() {
        return {
            item: {
                bookName: this.name,
                bookPrice: this.price,
                bookImage: this.images,
                bookPdfs: this.pdfs,
                bookID: this.bId,
                bookQuantity: 1
            }
        }
    },
    methods: {
        addToCart() {
            $('#cartModal').modal('show');
            this.$store.commit('addToCart', this.item)
        }
    },
}
</script>