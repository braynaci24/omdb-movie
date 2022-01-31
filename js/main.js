$(document).ready(function () {

  var apiKey = 'd5b08408';

  $('#movie_form').submit(function (e) {
    e.preventDefault();

    var movie = $('#movie').val();
    var url = "http://www.omdbapi.com/?apikey=" + apiKey;
    $.ajax({
      method: "GET",
      url: url + "&t=" + movie,
      success: function (data) {
        if (movie === "") {
          Swal.fire({
            icon: 'error',
            title: 'Lütfen film veya dizi arayınız'
          })
        } else if (data.Error === "Movie not found!") {
          Swal.fire({
            icon: 'error',
            title: 'Böyle bir film bulunamadı'
          })
        } else {
          result = `
          <div class="card mb-3 w-100" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4 item_image_container">
              <img src="${data.Poster}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body d-flex justify-content-around  align-items-flex-end">
                <h5 class="card-title item_title">${data.Title}</h5>
                <i class="far fa-star favorites_icon"></i>
              </div>
              <div class="movie_comment-container">
              <textarea id="movie_comment" maxlength="200" rows="4" cols="30">
              </textarea>
              <button id="comment_submit">Comment</button>
              </div>
              <button id="show_comment">Add Comment</button>
              
            </div>
          </div>
        </div>
          `
          $('#result').append(result);
        }
      }
    });
  });

  $('body').on("click", '.favorites_icon', function () {
    let itemName = $(this).prev().text();
    let itemImage = $(this).parent().parent().prev().find("img").attr("src");
    let yourMovieComment = $(this).parent().parent().find("p").text();
    $(this).css("pointer-events", "none");
    $(this).toggleClass("far, fas");
    $('.favorites_body').append(`<div class="card fav_card">
              <img class="card-img-top w-25" src="${itemImage}">
              <div class="fav_information">
              <div>
                <h5 class="card-title fav_movie_title">${itemName}</h5>
                <i class="fas fa-star unfow_icon"></i>
                </div>
             <p>${yourMovieComment}</p>
             </div>

            </div>`);
  });

  $('body').on("click", '.unfow_icon', function () {
    let unfowMovieTitle = $(this).prev().text();
    $(this).parent().parent().parent().remove();
    if (unfowMovieTitle === $('.item_title').text()) {
      $('.favorites_icon').css("pointer-events", "auto");
      $('.favorites_icon').removeClass("fas");
    }
  });


  // Add Comment

  $('body').on('click', '#show_comment', function () {
    $(this).prev().toggleClass("show_class");
    if ($(this).text() === "Add Comment") {
      $(this).text("Close Comment")
    } else {
      $(this).text("Add Comment")
    }
  });

  $('body').on('click', '#comment_submit', function () {
    let movieComment = $(this).prev().val();
    $(this).parent().prev().nextAll().hide();
    $(`<p class='mx-4 '>
     Your Comment:  ${movieComment}
      </p>`).insertAfter($(this).parent().prev());
  });

  // SCORE
  /* 
    $('body').on("click", '.up_score', function () {
      if ($('.movie_point').val() < 10) {
        $(this).prev().val(+$(this).prev().val() + 1);
      }
    });

    $('body').on("click", '.down_score', function () {
      if ($('.movie_point').val() > 0) {
        $(this).next().val(+$(this).next().val() - 1);
      }
    }); */

})