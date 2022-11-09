<template>
  <div class="books">
    <Navbar></Navbar>
    <div class="container">

      <div class="book-test">


        <h3 class="d-inline">Books list</h3>
        <button @click="addNew" class="btn btn-primary float-right">Add Book</button>

        <div class="table-responsive">

          <table class="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Year Published</th>
                <th>Number of Pages</th>
                <th>ISBN</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books">
                <td>
                  {{book.name}}
                </td>

                <td>
                  {{book.author}}
                </td>

                <td>
                  {{book.year_published}}
                </td>

                <td>
                  {{book.num_of_pages}}
                </td>

                <td>
                  {{book.isbn}}
                </td>

                <td>
                  {{book.price}}
                </td>

                <td>
                  {{book.category}}
                </td>

                <td>
                  {{book.description}}
                </td>

                <td>
                  <a class="edit" @click="editBook(book)" title="Edit" data-toggle="tooltip"><i class="fa fa-edit"
                      aria-hidden="true"></i></a>
                  <a class="delete" @click="deleteBook(book)" title="Delete" data-toggle="tooltip"><i
                      class="fa fa-trash" aria-hidden="true"></i></a>
                  <!-- 
                  <button class="btn btn-primary" @click="editBook(book)">Edit</button>
                  <button class="btn btn-danger" @click="deleteBook(book)">Delete</button> -->
                </td>

              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>

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
            <!-- <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
            </p> -->

            <div class="row">
              <!-- main book -->
              <div class="col-md-8">
                <div class="mb-3">
                  <span id="error" v-for="error in errors">{{ error.name }}</span>
                  <input type="text" placeholder="Book Name" v-model="book.name" class="form-control">
                </div>

                <div class="mb-3">
                  <span id="error" v-for="error in errors">{{ error.author }}</span>
                  <input type="text" placeholder="Book Author" v-model="book.author" class="form-control">
                </div>

                <div class="mb-3">
                  <span id="error" v-for="error in errors">{{ error.description }}</span>
                  <vue-editor v-model="book.description"></vue-editor>
                </div>
              </div>
              <!-- Book sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Book Details</h4>
                <hr>

                <div class="mb-3">
                  <span id="error" v-for="error in errors">{{ error.year_published }}</span>
                  <input type="text" placeholder="Book year published" v-model="book.year_published"
                    class="form-control">
                </div>

                <div class="mb-3">
                  <span id="error" v-for="error in errors">{{ error.num_of_pages }}</span>
                  <input type="text" placeholder="Book num_of_pages" v-model="book.num_of_pages" class="form-control">
                </div>

                <div class="mb-3">
                  <span id="error" v-for="error in errors">{{ error.isbn }}</span>
                  <input type="text" placeholder="Book isbn" v-model="book.isbn" class="form-control">
                </div>

                <div class="mb-3">
                  <span id="error" v-for="error in errors">{{ error.price }}</span>
                  <input type="text" placeholder="Book price" v-model="book.price" class="form-control">
                </div>

                <div class="mb-3">
                  <span id="error" v-for="error in errors">{{ error.category }}</span>
                  <select class="form-control" aria-label="Default select category" v-model="book.category" required>
                    <option value="null" disabled selected>Select Book Category</option>
                    <option value="Romance novel">Romance novel</option>
                    <option value="Horror">Horror</option>
                    <option value="Historical Fiction">Historical Fiction</option>
                    <option value="Nonfiction">Nonfiction</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Science fiction">Science fiction</option>
                    <option value="Biography">Biography</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Children's literature">Children's literature</option>
                    <option value="Travel literature">Travel literature</option>
                    <option value="Memoir">Memoir</option>
                    <option value="True crime">True crime</option>
                    <option value="Autobiography">Autobiography</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Drama">Drama</option>
                    <option value="Picture book">Picture book</option>
                    <option value="Paranormal romance">Paranormal romance</option>
                    <option value="Detective fiction">Detective fiction</option>
                    <option value="Historical romance">Historical romance</option>
                    <option value="Paranormal fiction">Paranormal fiction</option>
                    <option value="Encyclopedia">Encyclopedia</option>
                    <option value="Dictionary">Dictionary</option>
                  </select>
                </div>

                <div class="mb-3">
                  <b-form-tags @keyup.188="addTag" v-model="book.tags" class="mb-2"></b-form-tags>
                  <code v-for="tag in book.tags">Tags: {{tag}}</code>
                </div>

                <div class="mb-3">
                  <label for="book_image">Book Images</label>
                  <span id="error" v-for="error in errors">{{ error.imageError }}</span>
                  <span id="error" v-for="error in errors">{{ error.img }}</span>
                  <input type="file" @change="uploadImage" class="form-control">
                </div>

                <div class="mb-3 d-flex">
                  <div class="p-1" v-for="(image, index) in book.images">
                    <div class="img-wrapp">
                      <img :src="image" alt="" width="80px">
                      <span class="delete-img" @click="deleteImage(image,index)">X</span>
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="book_pdf">Book PDF</label>
                  <span id="error" v-for="error in errors">{{ error.fileError }}</span>
                  <span id="error" v-for="error in errors">{{ error.pdf }}</span>
                  <input type="file" @change="uploadPdf" class="form-control">
                </div>

                <div class="mb-3 d-flex text-center">
                  <div class="p-1" v-for="(pdf, index) in book.pdfFile">
                    <div class="pdf-wrapp">
                      <span class="delete-pdf" @click="deletePdf(pdf,index)"><button class="btn btn-danger">Delete File
                          X</button></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="addBook()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
            <button @click="updateBook()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply
              changes</button>
          </div>
        </div>
      </div>
    </div>




  </div>
</template>
  
<script>
import { VueEditor } from "vue2-editor";
import { firebaseApp, db } from '../firebaseDb';
export default {
  name: "books",
  components: {
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
      activeItem: null,
      modal: null,
      errors: [],
      //tag: null
    }
  },
  firestore() {
    return {
      books: db.collection('books'),
    }
  },
  methods: {
    deleteImage(img, index) {
      let image = firebaseApp.storage().refFromURL(img);
      this.book.images.splice(index, 1);
      image.delete().then(function () {
        console.log('image deleted');
      }).catch(function (error) {
        // Uh-oh, an error occurred!
        console.log('an error occurred');
      });
    },

    deletePdf(pdff, index) {
      let pdf = firebaseApp.storage().refFromURL(pdff);
      this.book.pdfFile.splice(index, 1);
      pdf.delete().then(function () {
        console.log('pdf file deleted');
      }).catch(function (error) {
        // Uh-oh, an error occurred!
        console.log('an error occurred');
      });
    },

    addTag() {
      this.book.tags.push();
      this.book.tags = "";
      // return console.log(this.tag);
    },
    uploadImage(e) {
      if (e.target.files[0]) {

        let file = e.target.files[0];

        this.errors = [{ imageError: 'Only Image extensions PNG, JPG are accepted.', status: true }];

        if (file.name.includes(".jpg") || file.name.includes(".png")) {

          var storageRef = firebaseApp.storage().ref('books/' + Math.random() + '_' + file.name);

          let uploadTask = storageRef.put(file);

          uploadTask.on('state_changed', (snapshot) => {

          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.book.images.push(downloadURL);
            });
          });
        } else {
          this.errors.imageError;
        }
      }
    },

    uploadPdf(e) {
      if (e.target.files[0]) {

        let file = e.target.files[0];
        this.errors = [{ fileError: 'Only PDF file is accepted.', status: true }];

        if (file.name.includes(".pdf")) {

          var storageRef = firebaseApp.storage().ref('books/' + Math.random() + '_' + file.name);

          let uploadTask = storageRef.put(file);

          uploadTask.on('state_changed', (snapshot) => {

          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.book.pdfFile.push(downloadURL);
            });
          });
        } else {
          this.errors.fileError;
        }
      }
    },

    reset() {
      this.book = {
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
      }
    },
    addNew() {
      this.modal = 'new';
      this.reset();
      $('#book').modal('show');
    },
    updateBook() {
      this.$firestore.books.doc(this.book.id).update(this.book);
      Toast.fire({
        type: 'success',
        title: 'Book updated successfully'
      })
      $('#book').modal('hide');
    },
    editBook(book) {
      this.modal = 'edit';
      this.book = book;
      $('#book').modal('show');
    },
    deleteBook(doc) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$firestore.books.doc(doc.id).delete()
          //add delete from storage
          Toast.fire({
            type: 'success',
            title: 'Deleted  successfully'
          })

        }
      })

    },
    readData() {


    },
    addBook() {

      this.errors = [
        { name: 'Name field required.', status: true },
        { isbn: 'Isbn field required.', status: true },
        { price: 'Price field required.', status: true },
        { author: 'Author field required.', status: true },
        { category: 'Category field required.', status: true },
        { description: 'Description field required.', status: true },
        { year_published: 'year_published field required.', status: true },
        { num_of_pages: 'num_of_pages field required.', status: true },
        { img: 'Upload Image required.', status: true },
        { pdf: 'Upload PDF file required.', status: true }

      ];

      if (this.book.name == null) {
        this.errors.name;
      }
      if (this.book.author == null) {
        this.errors.author;
      }
      if (this.book.isbn == null) {
        this.errors.isbn;
      }
      if (this.book.year_published == null) {
        this.errors.year_published;
      }
      if (this.book.num_of_pages == null) {
        this.errors.num_of_pages;
      }
      if (this.book.price == null) {
        this.errors.price;
      }
      if (this.book.category == null) {
        this.errors.category;
      }
      if (this.book.description == null) {
        this.errors.description;
      }
      if (this.book.images == "") {
        this.errors.images;
      }
      if (this.book.pdfFile == "") {
        this.errors.pdfFile;
      }

      else {
        this.$firestore.books.add(this.book);

        Toast.fire({
          type: 'success',
          title: 'Book created successfully'
        })
        $('#book').modal('hide');
      }
    }
  },
  
created() {

}
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-wrapp {
  position: relative;
}

.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}

.img-wrapp span.delete-img:hover {
  cursor: pointer;
}
</style>