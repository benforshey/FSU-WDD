/*jshint
    browser: true,
    devel: true*/

/*
     Name: Ben Forshey
     Date: 20141208
     Class & Section:  WIA-01
     Comments: "Presentation"
 */
(function () {

    var barChart = {
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [171.27, 170.69, 154.31, 130.20, 120.25, 106.81, 124.28, 121.36, 125.51, 138.37, 134.93, 173.29],
                [180.54, 170.27, 183.87, 134.02, 117.06, 118.95, 103.63, 122.37, 136.92, 101.18, 94.66, 175.08]
            ]
        },
        options: {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            axisY: {

                offset: 50,

                labelInterpolationFnc: function(value) {
                    return '$' + value;
                }
            }
        },
        responsiveOptions: [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function (value) {
                    return value[0];
                  }
                }
            }]
        ]
    };

    var pieChart = {
        data: {
            labels: ['Example', 'Presentation'],
            series: [4, 3.5]
        },

        options: {
            labelInterpolationFnc: function(value) {
                return value[0];
            }
        },

        responsiveOptions: [
            ['screen and (min-width: 640px)', {
                chartPadding: 50,
                labelOffset: 100,
                labelDirection: 'explode',
                labelInterpolationFnc: function(value) {
                    return value;
                }
            }],
            ['screen and (min-width: 1024px)', {
                labelOffset: 100,
                chartPadding: 50
            }]
        ]

    };


    new Chartist.Bar('.bar-chart', barChart.data, barChart.options, barChart.responsiveOptions); // 1st parameter must be unique
    new Chartist.Pie('.pie-chart', pieChart.data, pieChart.options, pieChart.responsiveOptions);

//    var data = {
//      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//      series: [
//        [171.27, 170.69, 154.31, 130.20, 120.25, 106.81, 124.28, 121.36, 125.51, 138.37, 134.93, 173.29],
//        [180.54, 170.27, 183.87, 134.02, 117.06, 118.95, 103.63, 122.37, 136.92, 101.18, 94.66, 175.08]
//      ]
//    };
//
//    var options = {
//        seriesBarDistance: 10,
//        axisX: {
//            showGrid: false
//        },
//        axisY: {
//
//            offset: 45,
//
//            labelInterpolationFnc: function(value) {
//                return '$' + value;
//            }
//        }
//    };
//
//    var responsiveOptions = [
//      ['screen and (max-width: 640px)', {
//        seriesBarDistance: 5,
//        axisX: {
//          labelInterpolationFnc: function (value) {
//            return value[0];
//          }
//        }
//      }]
//    ];

//    new Chartist.Bar('.ct-chart', data, options, responsiveOptions);

})();
