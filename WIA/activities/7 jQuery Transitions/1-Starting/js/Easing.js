$(function() {

            $("#right").click(function() {
                $("#theDiv").animate({ width: "500px" }, 1000, "easeInQuart");
            });

            $("#text").click(function() {
                $("#theDiv").animate({ fontSize: "24pt" }, 1000, "easeInOutSine");
            });

            $("#move").click(function() {
                $("#theDiv").animate({ left: "500" }, 1000, "easeInOutExpo");
            });

            $("#multiple").click(function() {
                $("#theDiv").animate({height: "500px", width: "500px", left: "500", fontSize: "24pt" }, 1000, "easeInOutCirc");
            });

            $("#reset").click(function() {
                $("#theDiv").animate({ height: "180px", width: "250px", left: "0", fontSize: "16pt" }, 1000, "easeInExpo");
             });


});
