var topics= ["Rick and Morty","Futurama","Simpsons","Family Guy", "South Park", "F is for Family"];
function createButtons() {
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {

        var btn = $("<button>");

        btn.addClass("topicBtn");

        btn.attr("data-name", topics[i]);

        btn.text(topics[i]);

        $("#buttons").append(btn);
    };

};
$("#newInput").on("click", function (event) {
    event.preventDefault();

    var newCartoon = $("#userInput").val().trim();

    topics.push(newCartoon);

    $("#userInput").val("");

    createButtons();

});

createButtons();

function fetchData() {

    var cartoon2 = $(this).attr("data-name");

    var Cartoon = cartoon2.split(" ").join("+");

    var queryURL = $.get("https://api.giphy.com/v1/gifs/search?q=" +
        Cartoon + "&api_key=mdAbEQ35ChJpM86J7JnCecluwdSqgTbn&limit=10");

        queryURL.done(function (response) {
            var results = response.data;
    
            $("#giphyFeed").empty();
    
            for (var i = 0; i < results.length; i++) {
    
                var gifDiv = $("#giphyFeed");
    
                var rating = results[i].rating;
    
                var p = $("<p>").text("Rating: " + rating);
                var cGif = $("<img>");

                cGif.attr("src", results[i].images.fixed_height.url);
                cGif.attr("data-state", "still");
                cGif.attr("data-positon", i);
    
                gifDiv.prepend(p);
                gifDiv.prepend(cGif)
    
            };
        })};
            function pausePlayGifs() {
                var state = $(this).attr("data-state");
               if (state === "still") {
                 $(this).attr("src", $(this).attr("data-animate"));
                 $(this).attr("data-state", "animate");
               } else {
                 $(this).attr("src", $(this).attr("data-still"));
                 $(this).attr("data-state", "still");
           }
         }
