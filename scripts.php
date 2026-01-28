<script src="https://thevegancalculator.com/js/vegan-calculator.js"></script>
<script src="https://thevegancalculator.com/js/modernizr.js"></script>
<script src="https://thevegancalculator.com/js/foundation.js"></script>
<script src="https://thevegancalculator.com/js/foundation.equalizer.js"></script>
<!-- <script src="https://thevegancalculator.com/js/smoothscroll.js"></script> -->
<script>
    $(document).foundation({
        equalizer : {
        // Specify if Equalizer should make elements equal height once they become stacked.
        equalize_on_stack: true
        }
    });
</script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<script>
// Load the share API's once the entire page is loaded.
    $(window).bind("load", function () {
        $.getScript('js/share.js',
        setTimeout(function () {
            $('.share').removeClass('show-loader');
        }, 10000)
        );
    });
</script>