export default function search() {
$("#searchBooks").on("keyup", function(){
      var input = document.getElementById("searchBooks");
    var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName('target');
  
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].innerText.toLowerCase().includes(filter)) {
        nodes[i].style.display = "block";
      } else {
        nodes[i].style.display = "none";
      }
    }
});
}