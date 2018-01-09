$(function() { 

            $("#right").click(function() {
                $("#theDiv").animate({ width: "500px" }, 1000, "easeInCubic");
            });

            $("#text").click(function() {
                $("#theDiv").animate({ fontSize: "24pt" }, 1000, "easeInOutElastic");
            });

            $("#move").click(function() {
                $("#theDiv").animate({ left: "500" }, 1000, "easeOutBounce");
            });
            
            $("#multiple").click(function() {
                $("#theDiv").animate({height: "500px", width: "500px", left: "500", fontSize: "24pt" }, 1000, "easeInBack");
            });

            $("#reset").click(function() {
                $("#theDiv").animate({ height: "180px", width: "250px", left: "0", fontSize: "16pt" }, 1000, "easeInOutBack");
             }); 
					
 
});