window.onload = function() {
	
	$(".lightbox_trigger").click(function(e){
			
			//Prevent default action (make them not clickable)
			e.preventDefault();
			
			//Get the clicked links href
			var image_href = $(this).attr("href");
			//console.log(image_href);
			
			//Setup the lightbox if it doesnt exist or use the lightbox if it DOES exist
			
			if($("#lightbox").length>0){
					//Lightbox DIV is already created, so then we can use it
					
					//Place the clicked href into our lightbox div img tag
					$("#content").html('<img src="'+image_href+'"/>');
					
					$("#lightbox").slideDown(1000);
					
				
				}else{
					//First Time lightbox DIV will not exist, so let make it
					
					var lightbox=
						'<div id="lightbox">' +
						'<p>Click To Close</p>'+
						'<div id="content">' + 
						//Insert the clicked link href into an img
						'<img src="' + image_href + '" />'+
						'</div>' +
						'</div>';
					
					//Insert the lightbox HTML into our page
					
					$("body").append(lightbox);
					
					$("#lightbox").hide();
					$("#lightbox").slideDown(1000);
					
					
					
					}
		
		
		});
	
	
	//Setup our to click to close
	$("#lightbox").live('click', function(){
		
			$("#lightbox").slideUp(1000);
		
		});
	

}