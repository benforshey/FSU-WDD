$(function() { 


	$("#slideup").click(function(){
		
			$("#theDiv").slideUp("normal");
		
		});
		
		
	$("#slidedown").click(function(){
		
			$("#theDiv").slideDown(1000);
		
		});	
	
	$("#toggle").click(function(){
		
			$("#theDiv").slideToggle(1500);
		
		});		

});

