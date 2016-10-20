/*global
    $
*/

$(document).ready(function(){
    var focusNote = $("#focus-note"),
        fillingArea = $(".filling-area"),
        newNote = $("#newNoteContent");

    focusNote.focus();

    focusNote.on("click", function (e) {
        $(this).addClass("hidden");
        fillingArea.fadeIn(200);
        fillingArea.removeClass("hidden");

    });

    newNote.on("blur", function () {
        focusNote.removeClass("hidden");
        fillingArea.addClass("hidden");
        focusNote.focus();
    })
});
