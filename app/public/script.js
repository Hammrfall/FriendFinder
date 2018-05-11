$(document).ready(function () {
    
});

$('#submit').on("click", function () {
    if (dataisValid()) {
        var answersArray = []
        for (var i = 1; i <= 10; i++) {
            answersArray.push(parseInt($('#q' + i).val().substring(0, 1)))
        }
        var newFriend = {
            name: $("#name").val().trim(),
            photo: $("#picture").val().trim(),
            scores: answersArray
        };

        $.post("/api/friends",newFriend,
        function (data) {
            $("#matchname").text("Name: " + data.name)
            var matchPictureDiv = $("<img>");
            matchPictureDiv.attr("src",data.photo,"alt","No pic available")
            matchPictureDiv.css('width','200px')
            $("#matchpicture").html(matchPictureDiv)
            $('#modal1').modal('show');
        });
    }
});

function dataisValid() {
    var returnValue = true;
    if ($("#name").val().trim() === "") {
        alert("enter a valid name")
        returnValue = false;
    } else if ($("#picture").val().trim() === "") {
        alert("enter a valid photo link")
        returnValue = false;
    }
    return returnValue;
}

