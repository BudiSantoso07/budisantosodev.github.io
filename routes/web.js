document.addEventListener("DOMContentLoaded", function() {
    let sideNavigation = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sideNavigation);
    loadNavigation();
    
    function loadNavigation() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status != 200) return;
       
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elemen) {
              elemen.innerHTML = xhttp.responseText;
            });
       
            document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
              elm.addEventListener("click", function(event) {
                
                let sideNavigation = document.querySelector(".sidenav");
                M.Sidenav.getInstance(sideNavigation).close();
       
                let page = event.target.getAttribute("href").substr(1);
                loadPage(page);
              });
            });
          }
        };
        xhttp.open("GET", "navigation.html", true);
        xhttp.send();
      }
  });

let page = window.location.hash.substr(1);
if (page === "") page = "home";
loadPage(page);
 
function loadPage(page) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      let content = document.querySelector("#body-content");
      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status == 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
      } else {
        content.innerHTML = "<p>Halaman tidak dapat diakses.</p>";
      }
    }
  };
  xhttp.open("GET", "pages/" + page + ".html", true);
  xhttp.send();

  if(page === "team"){
      getAllPlayer();
  }else if(page === "home"){
      getStandings();
  }
}