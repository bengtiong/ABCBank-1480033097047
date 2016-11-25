// Show panel
function showpanel(thechosenone) {
  $('.panel').each(function(index) {
    if ($(this).attr("id") == thechosenone) {
      $(this).show(200);
    }
    else {
      $(this).hide(600);
    }
  });
}