var topHeight = 0;

(function (window) {
    function resize() {
        var $sidebar = document.getElementById('sidebar');
        if ($sidebar) {
            $sidebar.style.height = (document.documentElement.clientHeight - topHeight) + 'px';
        }
    }
    window.tocs = [];
    window.utils = {
        // 空格=>-；字母变小写
        createHashByTOCName: function(tocName) {
            return encodeURI(tocName.trim().toLowerCase().replace(/\s+/g, '-'));
        },
        createTOCAnchorNameByHash: function(hashName) {
            return '_' + hashName;
        },
        createTOCAnchorNameByTOCName: function(tocName, isHashed) {
            var name = tocName;
            if (!isHashed) {
                name = this.createHashByTOCName(tocName);
            }
            return this.createTOCAnchorNameByHash(name);
        },
        activateTOCAnchor: function (name, isHashed) {
            var anchorName = this.createTOCAnchorNameByTOCName(name, isHashed);
            var anchorObj = document.getElementById(anchorName);
            var indicator = document.getElementById('indicator');
            if (indicator) {
                if (anchorObj)
                    indicator.style.top = anchorObj.offsetTop + 'px';
            }
        },
        scrollResize: function () {
            var headerHeight = 100;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var originTopHeight = topHeight;
            topHeight = headerHeight - scrollTop;
            if (topHeight < 0) topHeight = 0;
            if (originTopHeight == 0 && topHeight == 0) {
                // do nothing.
                console.log('do nothing.')
            } else {
                resize();
            }
        },
        scrollPosition: function () {
            var isComputed = false;
            window.tocs.map(function (anchorHash) {
                if (isComputed) return;
                var anchorObj = window.document.getElementById(anchorHash);
                if (anchorObj) {
                    var rect = anchorObj.getBoundingClientRect()
                    if (rect.top > 0 && rect.top < 100) {
                        window.utils.activateTOCAnchor(anchorHash, true);
                        // window.scrollTo({
                        //     left: 0,
                        //     top: anchorObj.offsetTop,
                        //     behavior: 'smooth'
                        // })
                        isComputed = true;
                    }
                }
            })
        }
    }
    window.addEventListener("scroll", window.utils.scrollResize)
    // window.addEventListener("scroll", window.utils.scrollPosition)
    window.addEventListener("resize", function () {
        resize()
    })
})(window)