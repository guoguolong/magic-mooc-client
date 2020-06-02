var topHeight = 0;
(function(window) {
    function resize() {
        var $sidebar = document.getElementById('sidebar');
        if ($sidebar) {
            $sidebar.style.height = (document.documentElement.clientHeight - topHeight) + 'px';
        }
    }
    window.addEventListener("scroll", function() {
        var headerHeight = 100;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var originTopHeight = topHeight;
        topHeight = headerHeight - scrollTop;
        if (topHeight < 0) topHeight = 0;
        if (originTopHeight == 0 && topHeight == 0) {
            // do nothing.
            // console.log('do nothing.')
        } else {
            resize();
        }
    })

    window.addEventListener("resize", function() {
        resize()
    })
})(window)