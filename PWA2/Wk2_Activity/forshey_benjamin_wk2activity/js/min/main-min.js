function appendId(){var t=1;$("div.faq").each(function(){$(this).find(".faq_question").attr("id","question"+t),t+=1})}function findAnchorLink(){if(-1!==location.href.indexOf("#")){var t=window.location.hash;$(t).trigger("click")}}$(document).ready(function(){$(".faq").each(function(){$(this).append('<div class="letter_q"></div><div class="letter_a"></div>')}),$(".faq_question").on("click",function(){if($(this).parent().is(".open"))$(this).closest(".faq").find(".faq_answer_container").animate({height:"0"},500),$(this).closest(".faq").find(".letter_a").fadeOut(500),$(this).closest(".faq").find(".letter_q").animate({left:"25px"}),$(this).closest(".faq").removeClass("open");else{var t=$(this).closest(".faq").find(".faq_answer").height()+"px";$(this).closest(".faq").find(".faq_answer_container").animate({height:t},500),$(this).closest(".faq").find(".letter_a").fadeIn(500),$(this).closest(".faq").find(".letter_q").animate({left:"10px"}),$(this).closest(".faq").addClass("open")}}),appendId(),findAnchorLink()});