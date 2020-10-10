/**-----------------------

 scrollCue.js - ver.2.0.0
 URL : https://prjct-samwest.github.io/scrollCue/

 created by SamWest.
 Copyright (c) 2020 SamWest.
 This plugin is released under the MIT License.

 -----------------------**/

const scrollCue = (function () {

    let $f = {}, $e, $q;
    let resizeTimer = 0, scrollEnable = true, enable = true, ds = false, pcr = false;

    let $op, $defaultOptions = {
        duration : 600,
        interval : -0.7,
        percentage : 0.75,
        enable : true,
        docSlider : false,
        pageChangeReset : false
    };

    $f = {
        setEvents : function(startHash){

            let scroll = function () {

                if (scrollEnable) {
                    requestAnimationFrame(function () {
                        scrollEnable = true;

                        if (enable) {
                            $f.setQuery();
                            $f.runQuery();
                        }

                    });
                    scrollEnable = false;
                }
            }

            if(enable &&!startHash){

                window.addEventListener('load',$f.runQuery);

            }


            window.addEventListener('scroll',scroll);

            if(ds){

                let pages = docSlider.getElements().pages;

                for(let i =0; i<pages.length; i++){

                    let page = pages[i];

                    page.addEventListener('scroll',function (e){

                        let c = (docSlider.getCurrentIndex()) + '';
                        let i = e.target.getAttribute('data-ds-index');

                        if(c !== i)
                            return false;

                        if(docSlider._getWheelEnable())
                            scroll();

                    });

                }

            }

            window.addEventListener('resize',function () {

                if (resizeTimer > 0) { clearTimeout(resizeTimer); }
                resizeTimer = setTimeout(function () {

                    if(enable) {
                        $f.searchElements();
                        $f.setQuery();
                        $f.runQuery();
                    }

                }, 200);

            });

        },
        setOptions : function (tgt,add) {

            let resultOptions = {};

            if(typeof tgt === 'undefined') return;

            Object.keys(tgt).forEach(function (key) {

                if(Object.prototype.toString.call(tgt[key]) === "[object Object]") {

                    resultOptions[key] = $f.setOptions(tgt[key],add[key]);

                }else{

                    resultOptions[key] = tgt[key];

                    if(typeof add !== 'undefined' && typeof add[key] !== 'undefined'){

                        resultOptions[key] = add[key];

                    }
                }

            });

            return resultOptions;
        },
        searchElements : function () {

            let parents, selector;

            $e = [];

            parents = document.querySelectorAll('[data-cues]:not([data-disabled])');

            for(let i=0; i<parents.length; i++){

                let parent = parents[i];

                for(let j=0; j<parent.children.length; j++){

                    let child = parent.children[j];

                    $f.setAttrPtoC(child, 'data-cue', parent, 'data-cues', '');
                    $f.setAttrPtoC(child, 'data-duration', parent, 'data-duration', false);
                    $f.setAttrPtoC(child, 'data-interval', parent, 'data-interval', false);
                    $f.setAttrPtoC(child, 'data-sort', parent, 'data-sort', false);
                    $f.setAttrPtoC(child, 'data-addClass', parent, 'data-addClass', false);
                    $f.setAttrPtoC(child, 'data-group', parent, 'data-group', false);
                    $f.setAttrPtoC(child, 'data-delay', parent, 'data-delay', false);

                }

                parent.setAttribute('data-disabled','true');

            }

            selector = document.querySelectorAll('[data-cue]:not([data-show="true"])');

            for (let i=0; i<selector.length; i++){

                let elm = selector[i];

                $e.push({

                    elm      : elm,
                    cue      : $f.getAttr(elm,'data-cue','fadeIn'),
                    duration : Number( $f.getAttr(elm,'data-duration',$op.duration) ),
                    interval : Number( $f.getAttr(elm,'data-interval',$op.interval) ),
                    order    : $f.getOrderNumber(elm),
                    sort     : $f.getAttr(elm,'data-sort',null),
                    addClass : $f.getAttr(elm,'data-addClass',null),
                    group    : $f.getAttr(elm,'data-group',null),
                    delay    : Number( $f.getAttr(elm,'data-delay',0))

                });

            }

            if(ds){

                let pages = docSlider.getElements().pages.length;

                for(let i=0; i<pages; i++){

                    let elms = document.querySelectorAll('[data-ds-index="'+ i +'"] [data-cue]:not([data-scpage])');

                    for(let j=0; j<elms.length; j++){

                        elms[j].setAttribute('data-scpage',i);

                    }

                }

            }

        },
        sortElements : function(){

            let obj = arguments[0];
            let keys = [].slice.call(arguments).slice(1);

            for(let i=0; i<keys.length; i++){

                obj.sort(function (a,b) {

                    let asc = typeof keys[i][1] === 'undefined' ? true : keys[i][1];
                    let key = keys[i][0];

                    if(a[key] > b[key]) return asc ? 1 : -1;
                    if(a[key] < b[key]) return asc ? -1 : 1;

                    return 0;

                });

            }

        },
        randElements : function(array){

            for(let i = array.length - 1; i > 0; i--){

                let j = Math.floor(Math.random() * (i + 1));
                let tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;

            }

            return array;

        },
        setDurationValue : function(interval, pElm, cInt){

            if(typeof pElm === 'undefined'){
                return interval;
            }

            let result = interval;
            let pDura = pElm.duration;

            if(!((cInt+'').indexOf('.') !== -1)){

                result = result + pDura + cInt;

            }else{

                result = result + pDura + (pDura * cInt);

            }

            result = result < 0 ? 0 : result;

            return result;

        },
        getOrderNumber : function(elm){

            if(elm.hasAttribute('data-order')){

                let num = Number(elm.getAttribute('data-order'));

                return num >= 0 ? num : Math.pow(2, 53) - 1 + num;

            }else{

                return  Math.pow(2, 52) - 1;

            }

        },
        setAttrPtoC : function (child ,attrC, parent, attrP, value) {

            if(parent.hasAttribute(attrP)){

                if(!child.hasAttribute(attrC)){

                    child.setAttribute(attrC, parent.getAttribute(attrP));

                }

            }else{

                if(value !== false){

                    child.setAttribute(attrC, value);

                }

            }

        },
        getAttr : function (elm, attr, value) {

            if(elm.hasAttribute(attr)){

                return elm.getAttribute(attr);

            }else{

                return value;

            }

        },
        getOffsetTop : function(elm){

            let rect = elm.getBoundingClientRect();
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            return rect.top + scrollTop; // offset().top;

        },
        setClassNames : function(elm, classNames){

            if(!classNames){

                return;

            }

            let classNamesArr = classNames.split(' ');

            for(let i=0; i<classNamesArr.length; i++){

                elm.classList.add(classNamesArr[i]);

            }


        },
        setQuery : function () {

            $q = {};

            for(let i=0; i<$e.length; i++){

                let elm = $e[i];
                let group = elm.group ? elm.group : '$' + $f.getOffsetTop(elm.elm);

                if(elm.elm.hasAttribute('data-show')){

                    continue;

                }

                if(ds){

                    let iIndex = elm.elm.getAttribute('data-scpage');
                    let cIndex = docSlider.getCurrentIndex() + '';

                    if(iIndex !== cIndex && !(iIndex === null)){

                        continue;

                    }

                }

                if(typeof $q[group] === "undefined"){

                    $q[group] = [];

                }

                $q[group].push(elm);

            }

        },
        runQuery : function () {

            let groups = Object.keys($q);

            for(let i=0; i<groups.length; i++){

                let elms = $q[groups[i]];

                if($f.isElementIn(elms[0].elm)){

                    if(elms[0].sort === 'reverse'){
                        elms.reverse();
                    }else if(elms[0].sort === 'random'){
                        $f.randElements(elms);
                    }

                    $f.sortElements(elms,['order']);

                    let interval = 0;

                    for(let j=0; j<elms.length; j++){

                        (function (j) {

                            elms[j].elm.setAttribute('data-show','true');

                            $f.setClassNames(elms[j].elm,elms[j].addClass);

                            interval = $f.setDurationValue(interval,elms[j-1],elms[j].interval);

                            elms[j].elm.style.animationName = elms[j].cue;
                            elms[j].elm.style.animationDuration = elms[j].duration + 'ms';
                            elms[j].elm.style.animationTimingFunction = 'ease';
                            elms[j].elm.style.animationDelay = interval + elms[j].delay + 'ms';
                            elms[j].elm.style.animationDirection = 'normal';
                            elms[j].elm.style.animationFillMode = 'both';

                        })(j);

                    }

                    delete $q[groups[i]];

                }


            }

        },
        isElementIn : function (elm) {

            let scrollEndJudge = elm.hasAttribute('data-scpage') ? $f.isScrollEndWithDocSlider : $f.isScrollEnd;

            return (window.pageYOffset > $f.getOffsetTop(elm)  - window.innerHeight * $op.percentage) || scrollEndJudge();

        },
        isScrollEnd : function () {

            let body = window.document.body;
            let html = window.document.documentElement;
            let scrollTop = body.scrollTop || html.scrollTop;

            return scrollTop >= html.scrollHeight - html.clientHeight;

        },
        isScrollEndWithDocSlider : function (){

            let page = docSlider.getCurrentPage();

            return page.scrollTop  >= page.scrollHeight - page.clientHeight;

        }
    };

    return {
        init : function (options) {

            $op = $f.setOptions($defaultOptions, options);
            enable = $op.enable;
            ds = $op.docSlider;
            pcr = $op.pageChangeReset;


            if(ds){
                return;
            }

            $f.setEvents();
            $f.searchElements();
            $f.setQuery();

        },
        update : function () {
            if(enable) {
                $f.searchElements();
                $f.setQuery();
                $f.runQuery();
            }
        },
        enable : function (bool){
            enable = typeof bool === 'undefined' ? !enable : bool;
            scrollCue.update();
        },
        _hasDocSlider : function (){
            return ds;
        },
        _hasPageChangeReset : function (){
            return pcr;
        },
        _initWithDocSlider : function (startHash){
            $f.setEvents(startHash);
            $f.searchElements();
            $f.setQuery();
        },
        _updateWithDocSlider : function (){
            if(enable){
                $f.setQuery();
                $f.runQuery();
            }
        },
        _searchElements : function (){
            $f.searchElements()
        }
    }

})();

