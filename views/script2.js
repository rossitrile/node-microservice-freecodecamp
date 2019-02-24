$(document).ready(function() {
  var formSubmit = document.getElementById("form");
  var container = document.querySelector(".container");
  
  var file = document.getElementById("upfile");
  var fileName = document.getElementById("file_name");
  file.addEventListener("change", function(e) {
    fileName.innerHTML = file.files[0].name;
  });

  formSubmit.addEventListener("submit", function(e) {
    e.preventDefault();
    var data = file.files[0];
    var form_data = new FormData();
    form_data.append("upfile", data, data.name);

    $.ajax({
      enctype: "multipart/form-data",
      url: "/api/metadata",
      contentType: false,
      type: "POST",
      cache: false,
      processData: false,
      data: form_data,
      success: function(data, status, xhr) {
        // create a new a element with necessary data and append to the containe
        var listInfo = document.createElement("ul");
        var name = document.createElement("li");
        var type = document.createElement("li");
        var size = document.createElement("li");
        name.innerHTML = "filename : " + data.name;
        type.innerHTML = "type : " + data.type;
        size.innerHTML = "size : " + data.size + "bytes";

        listInfo.classList.add("list");
        listInfo.classList.add("u_ml-m");
        listInfo.appendChild(name);
        listInfo.appendChild(type);
        listInfo.appendChild(size);
        container.appendChild(listInfo);
      },
      error: function(xhr, status, error) {
        alert("Something went wrong, please try again later");
      }
    });
  });
});
