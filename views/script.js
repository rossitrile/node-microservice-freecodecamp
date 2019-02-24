$(document).ready(function() {
  var formSubmit = document.getElementById("form");
  var container = document.querySelector(".container");

  formSubmit.addEventListener("submit", function(e) {
    e.preventDefault();
    var url = e.target[0];
    var data = JSON.stringify({ url: url.value });
    $.ajax({
      url: "/api/shorturl",
      contentType: "application/json",
      type: "POST",
      data,
      success: function(data, status, xhr) {
        // create a new a element with necessary data and append to the container
        var newLink = document.createElement("a");
        newLink.classList.add("link");
        var shortUrl =
          "http://" +
          window.location.host +
          "/api/shorturl/" +
          data["short_url"];
        // var text = document.createTextNode(shortUrl);
        newLink.innerHTML = shortUrl;
        newLink.href = shortUrl;
        newLink.target = "_blank";

        container.appendChild(newLink);
      },
      error: function(xhr, status, error) {
        url.value = "Read the above rule carefully and try it again.";
      }
    });
  });

  var form = document.getElementById("uploadForm");
  var file = document.getElementById("upfile");
  var uploadButton = document.getElementById('upload_button');
  var fileName = document.getElementById("file_name");
  file.addEventListener("change", function(e) {
    fileName.innerHTML = file.files[0].name;
  });
  uploadButton.addEventListener('click', function(e) {
    if(!file.files[0]) return alert('Please select a file fist')
    var data = file.files[0];
    var form_data = new FormData();
    form_data.append(data)
    console.log(form_data)
  })
});
