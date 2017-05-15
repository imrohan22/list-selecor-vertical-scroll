/*
 * Flux 3D Carousel
 * Author: Dean Coulter
 * Licensed under the MIT license
 * 
 * Version 0.1
 */

(function ($) {
    $.fn.carousel3d = function (args) {

        var el = ({
            carousel_frame: $(this)
        });

        var size = el.carousel_frame.children().size();
        var panelSize = el.carousel_frame.height();
        console.log(panelSize);
        var translateZ = Math.round((panelSize / 2) / Math.tan(Math.PI / size));

        el.carousel_frame.css({
            "transform": "rotateX(0deg) translateZ(-" + translateZ + "px)"
        });

        var rotateX = 0;
        var rotate_int = 0;
        var rx = 360 / size;
        var box = 0;
        var window_width = $(window).width();


        function animate_slider() {
            rotateX = rx * rotate_int;
//            $("#test").text(rotateX + ", " + rotate_int + ", ");

            var main_j;
            for (i = 0; i < size; i++) {
                var z = (rotate_int * rx) + (i * rx);
                if (z === 360 || z === 0) {
                    main_j = i;
                }
            }

            tot_size = size - 1;
            var j = [];
            j[3] = main_j;
            j[2] = ((j[3] - 1) <= 0) ? tot_size : j[3] - 1;
            j[1] = (j[2] - 1) < 0 ? tot_size - j[2] : j[2] - 1;
            j[0] = (j[1] - 1) < 0 ? tot_size - j[1] : j[1] - 1;

            j[4] = ((j[3] + 1) > tot_size) ? j[3] - tot_size : j[3] + 1;
            j[5] = ((j[4] + 1) > tot_size) ? tot_size - j[4] : j[4] + 1;
            j[6] = ((j[5] + 1) > tot_size) ? tot_size - j[5] : j[5] + 1;

            var opace_arr = [0.7, 0.8, 0.9, 1, 0.9, 0.8, 0.7];
//            var font_size_arr = (window_width > 768)?[11,14,17,20,17,14,11]:[11,13,15,17,15,13,11];
            var font_size_arr = [11,14,17,20,17,14,11];
            console.log(j);
            console.log(opace_arr);
            for (i = 0; i < size; i++) {
                var z = (rotate_int * rx) + (i * rx);
//                console.log(z + ' - ' + rotate_int + ' - ' + rx + ' - ' + i);
//                console.log(" - " + i);
                j_index = jQuery.inArray(i, j);
                if (j_index !== -1) {
                    opace = opace_arr[j_index];
                    font_size = font_size_arr[j_index];
                } else {
                    opace = 0;
                    font_size = 0;
                }
//                console.log(opace);
                el.carousel_frame.children("li:eq(" + i + ")").css({
                    "transform": "rotateX(" + z + "deg ) translateZ(" + translateZ + "px)",
                    "font-size": font_size + "px",
                    "opacity": opace
                });
            }

            rotateX = 0;
            box = 0; // reset rotateX, ready for re-use
        }

        animate_slider();

        $(".next").on("click", function () {
            rotate_int -= 1;
            animate_slider();
        });

        $(".prev").on("click", function () {
            rotate_int += 1;
            animate_slider();
        });

        el.carousel_frame.children().on("click", function () {
            new_int = -1 * $(this).index();
            if (new_int < rotate_int + (-1 * (size / 2))) {
                rotate_int = size + new_int;
            } else {
                rotate_int = new_int;
            }

            animate_slider();
        });

        $('.menu a').on("click", function () {
            var filter_char = $(this).text();
            var list = $('#carousel li').filter(function () {
                return $(this).text().indexOf(filter_char) === 0;
            });
            console.log(list.length);
            if (list.length > 0) {
                var index = $(list[0]).parent().children().index(list[0]);
                new_int = -1 * index;
                if (new_int < rotate_int + (-1 * (size / 2))) {
                    rotate_int = size + new_int;
                } else {
                    rotate_int = new_int;
                }

                animate_slider();
            }

        });

    }
})(jQuery);

