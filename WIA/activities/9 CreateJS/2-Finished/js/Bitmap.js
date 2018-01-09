window.onload = function() {
			
			//Canvas & Stage
			var canvas=document.getElementById("canvas");
			
			var stage= new createjs.Stage(canvas);
			
			var bmp = new createjs.Bitmap();
			
			//Get the image 
			var img = new Image();
			img.src = "images/ship.svg";
			img.onload = updateStage;
			
			function updateStage(e){
				bmp = new createjs.Bitmap(e.target);
				
				//Center of the canvas
				var centerX = canvas.width/2;
				var centerY = canvas.height/2;
				
				// Set our images x & y
				bmp.x = centerX;
				bmp.y = centerY;
				
				//Change reg points
				bmp.regX = 50;
				bmp.regY = 50;
				
				//Scale it up
				bmp.scaleX = 4;
				bmp.scaleY = 4;
				
				stage.addChild(bmp);
				
				//stage.update();
				
		}			
				// Add event listener for our "tick"
				createjs.Ticker.addEventListener("tick", ticker);
				
		function ticker(){
			//Anything in here will run default of 20 fps
			bmp.rotation +=2;
			bmp.x +=2;

			stage.update();
			
			}
				
	
				
				
		
			
}