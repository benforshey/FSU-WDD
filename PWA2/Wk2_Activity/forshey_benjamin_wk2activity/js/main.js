// Project: jQuery FAQ (Week 2 Activity)
// Author: Ben Forshey (Adapted from Chris Converse's Lynda.com Course)

// adds an ID to each question, allowing more dynamic question linking for FAQ of unknown length
function appendId(){
  var i = 1;
  $('div.faq').each(function(){
    $(this).find('.faq_question').attr('id', 'question' + i);
    i = i + 1;
  });
}

// seemed simpler to just use the ID...
function findAnchorLink(){
  // if the octothorpe is found in the url (linking to an ID)
  if (location.href.indexOf('#') !== -1) {
    // collect the url after (and including) the octothorpe
    var namedAnchor = window.location.hash;
    // triggers the click event on the appropriate question
    $(namedAnchor).trigger('click');
  }
}

$(document).ready(function(){
  // appends the 'q' and 'a' divs to each div.faq for the CSS to style
  $('.faq').each(function(){
    $(this).append('<div class="letter_q"></div><div class="letter_a"></div>');
  });

  $('.faq_question').on('click', function(){
    // when clicked, if the parent element has a class of 'open' .closest traverses up the DOM (starting with the element it was called upon) to find '.faq' (a div, in this case)
    // .find then grabs the answer container and animates it closed, removing the .open class
    if ($(this).parent().is('.open')) {
      $(this).closest('.faq').find('.faq_answer_container').animate({'height':'0'},500);
      $(this).closest('.faq').find('.letter_a').fadeOut(500);
      $(this).closest('.faq').find('.letter_q').animate({'left':'25px'});
      $(this).closest('.faq').removeClass('open');
    }else{
      // var to grab the height of the faq answer (so we know how large to animate the height), concatenating px for the object's string literal
      // animates open, finally adding an open class for the next click
      var newHeight = $(this).closest('.faq').find('.faq_answer').height() + 'px';
      $(this).closest('.faq').find('.faq_answer_container').animate({'height':newHeight},500);
      $(this).closest('.faq').find('.letter_a').fadeIn(500);
      $(this).closest('.faq').find('.letter_q').animate({'left':'10px'});
      $(this).closest('.faq').addClass('open');
    }
  });
  // end anonymous function

  // call appendId
  appendId();

  // call findAnchorLink
  findAnchorLink();

});
// end document.ready
