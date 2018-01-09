// JavaScript Document
// Written by Chris Converse for lynda.com

var barSpacing = 0;
var barWidth = 0;
var chartHeight = 0;
var chartHeightArea = 0;
var chartScale = 0;
var maxValue = 0;
var highestYlabel = 0;
var valueMultiplier = 0;

$(document).ready(function(){

    window.chartHeight = Number($('.chart-area').height());
    window.barWidth = $('.chart-area .chart-bar').width();
    window.highestYlabel = Number($('.chart-y-axis p').first().html());
    window.chartHeightArea = window.chartHeight - Number($('p.axis-value').first().height());
    window.chartScale = chartHeightArea / window.highestYlabel;
    window.barSpacing = Number($('.chart-area').attr('bar-spacing'));
    positionBars();

});

function positionBars(){
    $('.chart-area .chart-bar').each(function(index){

        var barPosition = (window.barWidth*index)+(index*barSpacing)+barSpacing;
        $(this).css('left',barPosition+'px');
        $(this).html('<p>'+$(this).attr('bar-value')+'</p>');
        $('.chart-x-axis').append('<p style="left:'+(barPosition-(window.barWidth/2))+'px;">'+$(this).attr('label')+'</p>');

        var barValue = Number($(this).attr('bar-value'));
        if(barValue > window.maxValue){
            window.maxValue = barValue;
            window.valueMultiplier = window.maxValue / window.highestYlabel;
        }

    });
    animateChart();
}

function animateChart(){

    $('.chart-area .chart-bar').each(function(index){
        var revisedValue = Number($(this).attr('bar-value'))*window.chartScale;
        var newDelay = 125*index;
        $(this).delay(newDelay).animate({height:revisedValue},1000, function(){
            $(this).children('p').delay(500).fadeIn(250);
        });
    });

    /* debug */ $('.valueMultiplier').html('valueMultiplier = '+window.valueMultiplier);
    /* debug */ $('.highestYlabel').html('highestYlabel = '+highestYlabel);
    /* debug */ $('.maxValue').html('maxValue = ' + window.maxValue);
    /* debug */ $('.chartHeight').html('chartHeight = '+window.chartHeight);
    /* debug */ $('.chartHeightArea').html('chartHeightArea = '+window.chartHeightArea);
    /* debug */ $('.chartScale').html('chartScale = '+window.chartScale);

}
