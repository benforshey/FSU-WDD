$(function() { 
		$("#coffeeNumber").hide();
		$("#teaNumber").hide();
		
		
		$("#moveIt").click(function(){
			$("#coffee").animate({width:"300px", height:"100px"}, 1000);
			$("#coffeeNumber").slideDown(1000);
			
			$("#tea").animate({width:"300px"}, 1000);
			$("#teaNumber").slideDown(1000);
			
			});
		
		
});