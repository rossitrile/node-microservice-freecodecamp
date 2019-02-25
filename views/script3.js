$(document).ready(function() {
  var head = document.querySelectorAll(".exercise__right .paper > span");
  var infoUserId = head[0];
  var infoNewExercise = head[1];
  var infoLog = head[2];

  var formUser = document.getElementById("form_user");
  var formExercise = document.getElementById("form_exercise");
  var formLog = document.getElementById("form_log");

  formUser.addEventListener("submit", function(e) {
    e.preventDefault();
    var username = formUser.childNodes[0].firstChild.value;
    formUser.childNodes[0].firstChild.value = "";

    ajaxHelper(
      "/api/exercise/new-user",
      "POST",
      { username },
      function(data, status, xhr) {
        infoUserId.innerHTML = data["_id"];
      },
      function(xhr, status, error) {
        var errorMessage = xhr.responseJSON.error;
        infoUserId.innerHTML = errorMessage;
      }
    );
  });
  formExercise.addEventListener("submit", function(e) {
    e.preventDefault();
    var userId = formExercise.childNodes[0].firstChild.value;
    var duration = formExercise.childNodes[1].firstChild.value;
    var description = formExercise.childNodes[2].firstChild.value;
    var date = formExercise.childNodes[3].firstChild.value;

    for (var i = 1; i < 4; i++) {
      formExercise.childNodes[i].firstChild.value = "";
    }

    ajaxHelper(
      "/api/exercise/add",
      "POST",
      { userId, duration, description, date },
      function(data, status, xhr) {
        infoNewExercise.innerHTML = `
            <span class="u_mb-s">Duration: <strong>${
              data.duration
            } minutes</strong></span>
            <span class="u_mb-s">Description: <strong>${
              data.description
            }</strong></span>
            <span>Date: <strong>${data.date} minutes</strong></span>
            `;
      },
      function(xhr, status, error) {
        var errorMessage = xhr.responseJSON.error;
        infoNewExercise.innerHTML = errorMessage;
      }
    );
  });
  formLog.addEventListener("submit", function(e) {
    e.preventDefault();
    var userId = formLog.childNodes[0].firstChild.value;
    var from = formLog.childNodes[1].firstChild.value;
    var to = formLog.childNodes[2].firstChild.value;
    var limit = formLog.childNodes[3].firstChild.value;

    var queryString = [
      `userId=${userId}`,
      `from=${from}`,
      `to=${to}`,
      `limit=${limit}`
    ].join("&");

    ajaxHelper(
      "/api/exercise/log?" + queryString,
      "GET",
      null,
      function(data, status, xhr) {
        var exercises = data.exercises;
        infoLog.innerHTML = "<ol class='list u_ml-m'></ol>";
        for (var i = 0; i < exercises.length; i++) {
          infoLog.firstChild.innerHTML += `
                    <li>
                        <span class="u_mb-s">Duration: <strong>${
                          exercises[i].duration
                        } minutes</strong></span>
                        <span class="u_mb-s">Description: <strong>${
                          exercises[i].description
                        } minutes</strong></span>
                        <span>Duration: <strong>${
                          exercises[i].date
                        }</strong></span>
                    </li>
                `;
        }
      },
      function(xhr, status, error) {
        var errorMessage = xhr.responseJSON.error;
        infoLog.innerHTML = errorMessage;
      }
    );
  });

  function ajaxHelper(url, type, data, success, error) {
    return $.ajax({
      url,
      contentType: type === "POST" ? "application/json" : false,
      type,
      cache: false,
      processData: false,
      data: data ? JSON.stringify(data) : null,
      success,
      error
    });
  }
});
