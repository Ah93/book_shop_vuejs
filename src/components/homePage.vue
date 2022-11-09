<template>
    <div>
        <body id="page-top">
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand" href="#page-top">Books4U</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars ms-1"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                        <li class="nav-item"><a class="nav-link" href="#" data-toggle="modal" data-target="#login">Login</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Masthead-->
        <header class="masthead">
            <div class="container">
                <div class="masthead-subheading">Welcome To Our Book Store!</div>
                <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
                <a class="btn btn-primary btn-xl text-uppercase" href="#services">Tell Me More</a>
            </div>
        </header>
        <!-- Services-->
        <section class="page-section" id="services">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Features</h2>
                    <h3 class="section-subheading text-muted">There are three main features of this product:</h3>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <i class="fas fa-circle fa-stack-2x text-primary"></i>
                            <i class="fas fa-database fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 class="my-3">Largest Books Database</h4>
                        <p class="text-muted">Which gives you the opportunity to explore millions of books and pick the best among them.</p>
                    </div>
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <i class="fas fa-circle fa-stack-2x text-primary"></i>
                            <i class="fas fa-download fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 class="my-3">Easy Download</h4>
                        <p class="text-muted">You can easily download the soft copy of your purchased books without further hustling.</p>
                    </div>
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <i class="fas fa-circle fa-stack-2x text-primary"></i>
                            <i class="fas fa-shipping-fast fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 class="my-3">Easy Delivery</h4>
                        <p class="text-muted">Once done purchasing, the book/s delivery will take maximum of two working days.</p>
                    </div>
                </div>
            </div>
        </section>
        <login-customer></login-customer>
        <!-- Footer-->
        <footer class="footer py-4 bg-dark">
            <div class="container">
                <div class="row align-items-center">
				<a class="text-decoration-none col-lg-4 text-lg-start" href="#!">Copyright &copy; Books4U 2022</a>  
                    <div class="col-lg-4 my-3 my-lg-0">
                        <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <div class="col-lg-4 text-lg-end">
                        <a class="text-decoration-none me-3" href="#!">Privacy Policy</a>
                        <a class="text-decoration-none" href="#!">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
       
    </body>
    </div>
</template>

<!-- <style scoped src="@/assets/homePage.css"></style> -->
<script>
import homePage from '../assets/js/homePage.js'

export default {
   name: "Home-Page",
   components: {
    
},
   props: {
      msg: String
   },

   mounted() {
        this.$nextTick(() => {
            homePage(this.$refs.homePage);
        });

    },
}
</script>
<style scoped>
  @import '../assets/homePage.scss';
</style>