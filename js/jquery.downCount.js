/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {

    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
                date: 120000
            }, options);

        // Save container
        var container = this;
        var interval;
        var startflag = false;
        /**
         * Main downCount function that calculates everything
         */
        function countdown () {


            // difference of dates
            settings.date = settings.date - 1000;   
            var difference = settings.date;

            // if difference is negative than it's pass the target date
            if (difference < 0) {
                // stop timer
                clearInterval(interval);

                if (callback && typeof callback === 'function') 
                    callback();
                return;
            }

            // basic math variables
            var _second = 1000,
                _minute = _second * 60;

            // calculate dates
            var minutes = Math.floor(difference / _minute),
                seconds = Math.floor((difference % _minute) / _second);

            // based on the date change the refrence wording
            var ref_minutes = (minutes === 1) ? 'Minute' : 'Minutes',
                ref_seconds = (seconds === 1) ? 'Second' : 'Seconds';

            // alarm
            var alarm=$('#audio')[0];
            if(seconds<6 && minutes==0)
                alarm.play();
            if(seconds == 0 && minutes==0)
                alarm.pause();

            // fix dates so that it will show two digets
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;


            // set to DOM
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds);

            if(seconds == 0 && minutes == 0)
            {
               container.find('.minutes').text("Time");
               container.find('.seconds').text("Up");
               container.find('.minutes_ref').text("");
               container.find('.seconds_ref').text("");
               container.find('.tune').text("");

            }

        };
         // start
        $("#start").click(function(){
            container.find('#start').attr('disabled',true);
            container.find('#tuneMup').attr('disabled',true);
            container.find('#tuneMdown').attr('disabled',true);
            container.find('#tuneSup').attr('disabled',true);
            container.find('#tuneSdown').attr('disabled',true);
            // container.find('#clock1').attr('disabled','true');
            // container.find('#clock2').attr('disabled','true');
            interval = setInterval(countdown, 1000);
            startflag = true;
        });

         $("#pause").click(function(){
            if(startflag){
                clearInterval(interval);
                startflag = false;
                container.find('#start').attr('disabled',false);
            }
            
            
        });


        var min = Math.floor(settings.date / 60000),
            sec = Math.floor((settings.date % 60000) / 1000);
        

        // clock sample change
        $("#clock0").click(function(){
            container.find('.minutes').text("01");
            container.find('.seconds').text("00");
            container.find('.minutes_ref').text("Minute");
            settings.date=60000;
            min=1, sec=0;
            container.find('#start').attr('disabled',false);
            container.find('#tuneMup').attr('disabled',false);
            container.find('#tuneMdown').attr('disabled',false);
            container.find('#tuneSup').attr('disabled',false);
            container.find('#tuneSdown').attr('disabled',false);
            clearInterval(interval);
        });
        $("#clock1").click(function(){
            container.find('.minutes').text("02");
            container.find('.seconds').text("00");
            settings.date=120000;
            min=2, sec=0;
            container.find('#start').attr('disabled',false);
            container.find('#tuneMup').attr('disabled',false);
            container.find('#tuneMdown').attr('disabled',false);
            container.find('#tuneSup').attr('disabled',false);
            container.find('#tuneSdown').attr('disabled',false);
            clearInterval(interval);
        });
        $("#clock2").click(function(){
            container.find('.minutes').text("05");
            container.find('.seconds').text("00");
            settings.date=300000;
            min=5, sec=0;
            container.find('#start').attr('disabled',false);
            container.find('#tuneMup').attr('disabled',false);
            container.find('#tuneMdown').attr('disabled',false);
            container.find('#tuneSup').attr('disabled',false);
            container.find('#tuneSdown').attr('disabled',false);
            clearInterval(interval);
        });
          // tune minutes & seconds
        $("#tuneMup").click(function(){
            min=min+1;
            ref_minutes = (min === 1) ? 'Minute' : 'Minutes';
            container.find('.minutes_ref').text(ref_minutes);
            min_text = (String(min).length >= 2) ? min : '0' + min;   
            container.find('.minutes').text(min_text);
            settings.date += 60000;
            if (min > 99)
            {
                container.find('.minutes').text("00");
                settings.date = settings.date - 100 * 60000;
                min=0;
            }
        });
        $("#tuneMdown").click(function(){
            min=min-1;
            ref_minutes = (min === 1) ? 'Minute' : 'Minutes';
            container.find('.minutes_ref').text(ref_minutes);
            min_text = (String(min).length >= 2) ? min : '0' + min;
            container.find('.minutes').text(min_text);
            settings.date -= 60000;
            if (min < 0)
            {
                container.find('.minutes').text("99");
                settings.date = settings.date + 100 * 60000;
                min=99;
            }
        });
        $("#tuneSup").click(function(){
            sec=sec+10;
            sec_text = (String(sec).length >= 2) ? sec : '0' + sec;
            container.find('.seconds').text(sec_text);
            settings.date += 10000;
            if (sec > 50)
            {
                container.find('.seconds').text("00");
                settings.date = settings.date - 60 * 1000;
                sec=0;
            }
        });
        $("#tuneSdown").click(function(){
            sec=sec-10;
            sec_text = (String(sec).length >= 2) ? sec : '0' + sec;
            container.find('.seconds').text(sec_text);
            settings.date -= 10000;
            if (sec < 0)
            {
                container.find('.seconds').text("50");
                settings.date = settings.date + 60 * 1000;
                sec=50;
            }
        });

    };

})(jQuery);