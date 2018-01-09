$(function() { 

	$("#canvasImg").hide();
	var canvas= document.getElementById("canvas");
	var ctx =canvas.getContext("2d");
	
	
	//Setup all the data the chart
	
	var lineChartData= {
		labels:["Jan", "Feb","Mar", "Apr", "May", "Jun", "Jul"],
		datasets:[
			
			{
			fillColor:"rgba(242,140,185,.5)",
			strokeColor:"rgba(242,140,185,1)",
			pointColor:"rgba(242,140,185,1)",
			pointStrokeColor:"#fff",
			data:[15,30,45,60,30,60,75]
			
			
			},
				{
			fillColor:"rgba(166,209,122,.5)",
			strokeColor:"rgba(166,209,122,1)",
			pointColor:"rgba(166,209,122,1)",
			pointStrokeColor:"#fff",
			data:[1,20,40,20,60,75,40]
			
			
			}
		
		
		
		]
		

		
		};
	
	var options ={
		//bezierCurve:false
		onAnimationComplete:done
		
		};
	
	
	//create our line chart
	var myLine = new Chart(ctx).Line(lineChartData, options);
	
	
	function done(){
		//console.log("test");
		var dataURL= canvas.toDataURL();
		
		//Set src of img tag
		document.getElementById("canvasImg").src =dataURL;
		
		$("#canvas").hide();
		$("#canvasImg").show();
		
		}
	
	
		
});