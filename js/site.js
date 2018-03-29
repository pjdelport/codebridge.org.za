// Smooth scroll to something
function scrollToSomething(id){
  $('html,body').animate({
   scrollTop: $("#" + id).offset().top},
   'slow');
};