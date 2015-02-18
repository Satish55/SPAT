$(document).ready(function() {
	$('#st-bottom-links').onePageNav({
	    currentClass: 'st-pactive',
	    changeHash: false,
	    scrollSpeed: 200,
	    scrollThreshold: 0.5,
	    filter: '',
	    easing: 'linear',
	    begin: function() {
	        //I get fired when the animation is starting
	    },
	    end: function() {
	        //I get fired when the animation is ending
	    },
	    scrollChange: function($currentListItem) {
	        //I get fired when you enter a section and I pass the list item of the section
	    }
	});

	function stcurrenttime() {
		var dt = new Date();
		//dt.toDateString();      // "Mon Feb 162015"
		//dt.toISOString();       // "2015-02-16T17:55:38.130Z"
		//dt.toLocaleDateString() // "16/02/2015"
		//dt.toLocaleString()     // "16/02/2015 18.55.38"
		//dt.toUTCString() 
		var stdate = dt.toDateString() +' , '+dt.getHours()+" : "+dt.getMinutes()+" : "+dt.getSeconds();
		$('.st-bdate').text(stdate);
	}
	setInterval(function(){stcurrenttime()},1000);
	if (jQuery().datepicker) {
            $('.date-picker').datepicker({
                orientation: "right",
                format: 'yyyy/mm/dd',
                autoclose: true,
                todayHighlight: true
            });
            //$('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
    }
    var headerH = $(".page-header").height();
    var footerH = $("#st-bottom-links").height();
    var windowH = $(window).height();
    var rh = windowH-(footerH+headerH)-65;
    $(".st-mwrap").css('min-height',rh);
    //console.log(windowH);
});

window.onload = function () {

		// dataPoints
		var dataPoints1 = [];
		var dataPoints2 = [];

		var chart = new CanvasJS.Chart("dashboard-report",{
			zoomEnabled: true,
			title: {
				text: ""		
			},
			toolTip: {
				shared: true
				
			},
			legend: {
				verticalAlign: "top",
				horizontalAlign: "center",
                                fontSize: 14,
				fontWeight: "bold",
				fontFamily: "calibri",
				fontColor: "dimGrey"
			},
			axisX: {
				title: "chart updates every 3 secs"
			},
			axisY:{
				prefix: '',
				includeZero: true
			}, 
			data: [{ 
				// dataSeries1
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Report A",
				dataPoints: dataPoints1
			},
			{				
				// dataSeries2
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Report B" ,
				dataPoints: dataPoints2
			}],
          legend:{
            cursor:"pointer",
            itemclick : function(e) {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
              chart.render();
            }
          }
		});



		var updateInterval = 3000;
		// initial value
		var yValue1 =0; 
		var yValue2 = 20;

		var time = new Date;
		time.setHours(9);
		time.setMinutes(30);
		time.setSeconds(00);
		time.setMilliseconds(00);
		// starting at 9.30 am

		var updateChart = function (count) {
			count = count || 1;

			// count is number of times loop runs to generate random dataPoints. 

			for (var i = 0; i < count; i++) {
				
				// add interval duration to time				
				time.setTime(time.getTime()+ updateInterval);


				// generating random values
				var deltaY1 = .5 + Math.random() *(-.5-.5);
				var deltaY2 = .5 + Math.random() *(-.5-.5);

				// adding random value and rounding it to two digits. 
				yValue1 = Math.round((yValue1 + deltaY1)*100)/100;
				yValue2 = Math.round((yValue2 + deltaY2)*100)/100;
				
				// pushing the new values
				dataPoints1.push({
					x: time.getTime(),
					y: yValue1
				});
				dataPoints2.push({
					x: time.getTime(),
					y: yValue2
				});


			};

			// updating legend text with  updated with y Value 
			chart.options.data[0].legendText = " Tracker Ang";
			chart.options.data[1].legendText = " Sun Ang"; 

			chart.render();

		};

		// generates first set of dataPoints 
		updateChart(3000);	
		 
		// update chart after specified interval 
		setInterval(function(){updateChart()}, updateInterval);
	}