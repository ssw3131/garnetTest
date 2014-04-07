/**
 * Created by ssw on 14. 1. 28.
 */
"use strict";

Dk.init( function(){
    trace( Dk );
    var W = window, _doc = document, _body = _doc.body,
        _dkViewContainer, _dkContainerWidth, _dkContainerHeight, _compContainer, _compX = 20, _compY = 20, _compWidth = 250, _gap = 80, _dkView, _setTotal, _total = -1,
        _util, Comp, Button;

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // 유틸
    _util = {
        css : function( $obj ){
            for( var key in $obj ){
                this.style[ key ] = $obj[ key ];
            }
        },

        html : function( $html ){
            if( $html == undefined ){
                return this.element.innerHTML;
            } else {
                return this.element.innerHTML = $html;
            }
        },

        textObj : function( $obj ){
            var str = "";
            for( var key in $obj ){
                str += "<br> " + key + " : " + $obj[ key ];
            }
            return str;
        },

        /**
         * 윈도우 내부 가로값을 가져온다
         * @returns {number}
         */
        getWindowWidth : (function(){
            if( W.innerWidth ){
                return function(){ return W.innerWidth };
            } else {
                return function(){ return _doc.documentElement.clientWidth };
            }
        })(),

        /**
         * 윈도우 내부 세로값을 가져온다
         * @returns {number}
         */
        getWindowHeight : (function(){
            if( W.innerHeight ){
                return function(){ return W.innerHeight };
            } else {
                return function(){ return _doc.documentElement.clientHeight };
            }
        })()
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // Comp
    Comp = function(){
        var element = _doc.createElement( "div" );
        this.element = element;
        this.style = element.style;

        this.css( {
            position : "relative",
            display : "block",
            margin : "0px 0px 10px 0px",
            padding : "20px",
            backgroundColor : "#000",
            color : "#FFFFFF",
            fontFamily : "돋움, sans-serif",
            fontSize : "12px",
            lineHeight : "20px"
        } );
    };

    Comp.prototype = {
        css : _util.css,
        html : _util.html
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // Button
    Button = function(){
        var element = _doc.createElement( "input" );
        element.type = "button";
        this.element = element;
        this.style = element.style;

        this.css( {
            position : "relative",
            display : "inline",
            margin : "2px",
            height : "20px",
            fontFamily : "돋움, sans-serif",
            fontSize : "12px",
            cursor : "pointer"
        } );
    };

    Button.prototype = {
        css : _util.css,

        value : function( $value ){
            if( $value == undefined ){
                return this.element.value;
            } else {
                this.element.value = $value;
            }
        },

        disabled : function( $bool ){
            if( $bool == undefined ){
                return this.element.disabled;
            } else {
                this.element.disabled = $bool;
            }
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // 초기화
    init();

    /**
     * 초기화
     */
    function init(){
        initStyle();
        initContainer();
        initView();
        initTotal();

        initInformation();
//		initDetector();
        initDom();
        initLoop();
        initTween();
        initAddEvent();
        initTree();
        initHierarchy();
        initMouse();
        initKeyboardManager();
        initJsLoader();
        initAjaxLoader();
//		initAssetLoader();
        initSpriteSheet();
        initFlash();
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * style
     */
    function initStyle(){
        Dk.style( "body" ).st( "backgroundColor", "#353740", "margin", 0, "padding", 0 );
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * 컨테이너
     */
    function initContainer(){
        // View 컨테이너
        _dkViewContainer = new Comp();
        _body.appendChild( _dkViewContainer.element );
        _dkViewContainer.css( {
            position : "absolute",
            left : _compX + _compWidth + _gap + "px",
            top : _compY + "px",
            margin : "0px",
            padding : "0px"
        } );

        // Comp 컨테이너
        _compContainer = new Comp();
        _body.appendChild( _compContainer.element );
        _compContainer.css( {
            position : "absolute",
            left : _compX + "px",
            top : _compY + "px",
            backgroundColor : "",
            margin : "0px",
            padding : "0px",
            overflow : "auto",
            width : _compWidth + 65 + "px",
            height : _util.getWindowHeight() - 50 + "px"
        } );
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * view 생성
     */
    function initView(){
        _dkContainerWidth = Dk.Doc.width - 500;
        _dkContainerHeight = Dk.Doc.height - 50;

        _dkView = Dk.dom( "div" ).css( "position", "absolute", "width", _dkContainerWidth, "height", _dkContainerHeight, "backgroundColor", "#000", "overflow", "hidden" );

        _dkViewContainer.element.appendChild( _dkView.pp( "element" ) );

        Dk.Doc.addResize( "viewResize", viewResize );

        function viewResize( $key ){
            _dkContainerWidth = Dk.Doc.width - 500;
            _dkContainerHeight = Dk.Doc.height - 50;
            _dkView.css( "width", _dkContainerWidth, "height", _dkContainerHeight );

            _compContainer.css( {
                height : _dkContainerHeight + "px"
            } );
            trace( $key, Dk.Doc.height )
        }

//
//		DkUtil.disableContextMenu();
//		// DkUtil.disableDrag();
//		DkUtil.disableSelect( _dkView );
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * total, numChildren
     */
    function initTotal(){
        var title = new Comp();
        _dkViewContainer.element.appendChild( title.element );
        title.css( {
            position : "absolute",
            top : "0px",
            left : "90px",
            margin : "0px",
            padding : "0px",
            width : "100px",
            zIndex : 1
        } );

        _setTotal = function(){
            _total++;
            var str = "total : " + _total + " / numchildren : " + _dkView.tr( "numChildren" );
            title.html( str );
        };
        _setTotal();
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * Information
     */
    function initInformation(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Information</b><br>";
        str += _util.textObj( Dk.Information );
        comp.html( str );
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * Detector
     */
    function initDetector(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Detector</b><br>";
        str += _util.textObj( Dk.Detector );
        comp.html( str );
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * dom
     * dom, text, img, video, audio 생성
     */
    function initDom(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Dom / Text / Img / Video</b><br><br>";
        comp.html( str );

        var bt0 = new Button();
        comp.element.appendChild( bt0.element );
        bt0.value( "add dom" );
        bt0.element.onclick = function(){
            var i = 100;
            while( i-- ){
                addDom();
            }
        };

        var bt1 = new Button();
        comp.element.appendChild( bt1.element );
        bt1.value( "add text" );
        bt1.element.onclick = function(){
            var i = 1;
            while( i-- ){
                addText();
            }
        };

        var bt2 = new Button();
        comp.element.appendChild( bt2.element );
        bt2.value( "add img" );
        bt2.element.onclick = function(){
            var i = 10;
            while( i-- ){
                addImg( i );
            }
        };
    };

    Dk.style( ".circle" ).st( "borderRadius", 25 );
    Dk.style( ".box" ).st( "width", "50px", "height", 50, "opacity", 0.5 );

    /**
     * dom 생성
     */
    function addDom( $i ){
        _setTotal();
        var box = Dk.dom( "div" ).tr( "addParent", _dkView ).css( "position", "absolute", "left", Dk.util.randomRange( _dkContainerWidth - 50 ), "top", Dk.util.randomRange( _dkContainerHeight - 50 ),
//            "transform",
//                "rotateX(" + Dk.util.randomRange( 360 ) + "deg)" +
//                "rotateY(" + Dk.util.randomRange( 360 ) + "deg)" +
//                "rotateZ(" + Dk.util.randomRange( 360 ) + "deg)" +
//                " scale(" + Dk.util.randomRange( 1, 0.5 ) + ", " + Dk.util.randomRange( 1, 0.5 ) + ")"
            "backgroundColor", Dk.util.randomColor() );
        box.atr( "className", "box circle" );
//        box.atr( "className", "box" );
//		trace( box.css( "opacity" ) );
//		trace( box.css( "width" ) );
//		trace( box.css( "display" ) );
    };

    /**
     * Text 생성
     */
    function addText(){
        _setTotal();
        var box = Dk.dom( "div" ).tr( "text", "<br> text hi", "addParent", _dkView )
            .css( "position", "absolute", "font", "20px/30px verdana", "color", Dk.util.randomColor(), "textAlign", "center",
            "left", Dk.util.randomRange( _dkContainerWidth - 50 ), "top", Dk.util.randomRange( _dkContainerHeight - 50 ),
            "opacity", 1,
//				 "overflow", "scroll",
            "width", 50, "height", 60,
//				 "transform",
//				 "rotateX("+Dk.util.randomRange(360)+"deg)"+
//					 "rotateY("+Dk.util.randomRange(360)+"deg)"+
//					 "rotateZ("+Dk.util.randomRange(360)+"deg)",
            "backgroundColor", "#fff" );
    };

    /**
     * Img 생성
     */
    function addImg( $i ){
        var box = Dk.dom( "img" ).atr( "src", "asset/img.jpg" )
            .css( "position", "absolute", "left", Dk.util.randomRange( _dkContainerWidth - 300 ), "top", Dk.util.randomRange( _dkContainerHeight - 300 ),
            "transform",
                "rotateX(" + Dk.util.randomRange( 360 ) + "deg)" +
                "rotateY(" + Dk.util.randomRange( 360 ) + "deg)" +
                "rotateZ(" + Dk.util.randomRange( 360 ) + "deg)" +
                " scale(" + 0.3 + ", " + 0.3 + ")",
            "opacity", 1 );

        box.ev( "onload", loadComplete )
            .id( "id" + $i );

        function loadComplete( $target ){
            _dkView.tr( "addChild", $target );
            _setTotal();
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * loop
     */
    function initLoop(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Loop</b><br><br>";
        comp.html( str );

        var bt0 = new Button();
        comp.element.appendChild( bt0.element );
        bt0.value( "Loop start" );
        bt0.element.onclick = function(){
            Dk.Loop.add( "Loop", loop );
        };
        var bt1 = new Button();
        comp.element.appendChild( bt1.element );
        bt1.value( "Loop stop" );
        bt1.element.onclick = function(){
            Dk.Loop.del( "Loop" );
        };

        var angleX = 0;
        var angleY = 0;
        var centerX = _dkContainerWidth / 2 - 50;
        var centerY = _dkContainerHeight / 2 - 50;
        var rangeX = 1;
        var rangeY = 0.5;
        var xspeed = .03;
        var yspeed = .03;
        var mathSin = Math.sin;
        var mathCos = Math.cos;

        function loop( $key ){
            // trace( $key );
            var list = _dkView.pp( "children" );
            var i = list.length;
            while( i-- ){
                var box = list[ i ];
                var x = centerX + mathSin( angleX + i / 10 ) * rangeX * i;
                var y = centerY + mathCos( angleY + i / 10 ) * rangeY * i;
//				box.css( "left", x + "px", "top", y + "px" );
                box.css( "left", x, "top", y/*,
                 "transform", "rotateX(" + x + "deg)" + "rotateY(" + y + "deg)"*/ );
//				box.css( "rotateX", x );// 불가
//				box.css( "rotateZ", box.css( "rotateZ" ) + 1 );// 불가
//				box.css( "width", box.css( "width" ) + 1 );
//				box.css( "opacity", box.css( "opacity" ) + 0.001 );
            }
            angleX += xspeed;
            angleY += yspeed;
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * tween
     */
    function initTween(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Tween</b><br><br>";
        comp.html( str );

        var bt0 = new Button();
        comp.element.appendChild( bt0.element );
        bt0.value( "tween start" );
        bt0.element.onclick = function(){
            tween();
        };

        var bt1 = new Button();
        comp.element.appendChild( bt1.element );
        bt1.value( "tween stop" );
        bt1.element.onclick = function(){
            var list = _dkView.children;
            var i = list.length;
            while( i-- ){
                var box = list[ i ];
                TweenLite.killTweensOf( box.pp( "element" ) );
            }
        };

        function tween(){
            var list = _dkView.pp( "children" );
            var i = list.length;
            while( i-- ){
                var box = list[ i ];
                repeat( box );
            }
        }

        function repeat( $box ){
            var radiusWidth = _dkContainerWidth / 2 - 25;
            var radiusHeight = _dkContainerHeight / 2 - 25;
            var duration = 0.5;
            $box.css( "left", _dkContainerWidth / 2, "top", _dkContainerHeight / 2 );

            TweenLite.to( $box.pp( "element" ), 0, { scaleX : 0, scaleY : 0 } );

            var angle = Math.random() * Math.PI * 2;
            var x = Math.cos( angle ) * radiusWidth + radiusWidth;
            var y = Math.sin( angle ) * radiusHeight + radiusHeight;

            TweenLite.to( $box.pp( "element" ), duration, { delay : Math.random() * duration * 2, left : x, top : y, scaleX : 1, scaleY : 1, ease : Cubic.easeOut, onComplete : function(){
                repeat( $box );
            } } );
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * add event
     */
    function initAddEvent(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>add event</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "add event" );
        bt.element.onclick = function(){
            addEvent();
        };
    };

    /**
     * add dom addListener
     */
    function addEvent(){
        _setTotal();
        Dk.dom( "div" ).tr( "addParent", _dkView ).css( "position", "absolute", "left", Dk.util.randomRange( _dkContainerWidth - 50 ), "top", Dk.util.randomRange( _dkContainerHeight - 50 ),
            "width", "50px", "height", 50,
            "backgroundColor", "#FFF" )
            .ev( "click", boxClick, "mouseover", boxOver, "mouseout", boxOut )
            .ev( "mouseout" );

        function boxClick( $eventObj ){
            trace( $eventObj.type );
        };

        function boxOver( $eventObj ){
            trace( $eventObj.type );
            $eventObj.currentTarget.css( "transform", "scale( 2, 2 )" );
        };

        function boxOut( $eventObj ){
            trace( $eventObj.type );
            $eventObj.currentTarget.css( "transform", "scale( 1, 1 )" );
        };
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * tree 생성
     */
    function initTree(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Tree</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "link" );
        bt.element.onclick = function(){
            window.open( "tree.html", "_blank" );
        };
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * hierarchy
     */
    function initHierarchy(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Hierarchy</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "add hierarchy" );
        bt.element.onclick = function(){
            addHierarchy();
        };
    };

    /**
     * add hierarchy
     */
    function addHierarchy(){
        _setTotal();
        var box0 = Dk.dom( "div" ).tr( "addParent", _dkView )
            .css( "position", "absolute", "left", _dkContainerWidth / 2 - 100, "top", _dkContainerHeight / 2 - 100,
            "width", 200, "height", 150,
            "opacity", 0.8,
            "backgroundColor", Dk.util.randomColor() );

        _setTotal();
        var box1 = Dk.dom( "div" ).tr( "addParent", box0 )
            .css( "position", "absolute", "left", 150, "top", 75,
            "width", 100, "height", 150,
            "opacity", 0.8,
            "backgroundColor", Dk.util.randomColor() );

        _setTotal();
        var box2 = Dk.dom( "img" ).tr( "addParent", box1 )
            .atr( "src", "asset/img.jpg" )
            .css( "position", "absolute", "left", 50, "top", 75,
            "width", 100, "height", 150,
            "opacity", 0.8 );

        box0.ev( "mouseover", boxOver, "mouseout", boxOut );
        box1.ev( "mouseover", boxOver, "mouseout", boxOut );
        box2.ev( "mouseover", boxOver, "mouseout", boxOut );

        function boxOver( $e ){
            var target = $e.currentTarget;
            target.css( "backgroundColor", Dk.util.randomColor() );
            TweenLite.to( target.pp( "element" ), 1, { rotation : Dk.util.randomRange( 360 ) } );
        }

        function boxOut( $e ){
            var target = $e.currentTarget;
            target.css( "backgroundColor", Dk.util.randomColor() );
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * mouse
     */
    function initMouse(){
//		trace.show();
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Mouse</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "Mouse touch wheel" );
        bt.element.onclick = function(){
            addMouse();
        };
    };

    /**
     * add Mouse touch position
     */
    function addMouse(){
        _setTotal();
        var box = Dk.dom( "div" ).tr( "addParent", _dkView )
            .css( "position", "absolute", "left", 50,
            "top", 100,
            "width", 300,
            "height", 200,
            "color", "#000",
            "backgroundColor", "#FFF" )
            .ev( "mousedown", mouseMove, "mousemove", mouseMove, "mouseup", mouseMove );

        function mouseMove( $e ){
            var target = $e.currentTarget;
            var str = $e.type + "\npageX : " + Dk.Mouse.x + ", y : " + Dk.Mouse.y;
            str += "\nbox localX : " + target.pp( "localX" ) + ", box y : " + target.pp( "localY" ) + "\n";

            var touchList = Dk.Mouse.touchList;
            if( touchList ){
                var leng = touchList.length;
                for( var i = 0; i < leng; i++ ){
                    str += "\n touchX" + ( i + 1 ) + " : " + touchList[ i ].x + " touchY" + ( i + 1 ) + " : " + touchList[ i ].y;
                }
            }
            target.tr( "text", str );
        }

        Dk.Mouse.addWheel( "wheel", wheel );
        function wheel( $delta, $e, $key ){
            var str = "delta : " + $delta + " / e : " + $e + " / " + $key;
            box.tr( "text", str );
        }

    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * Keyboard manager
     */
    function initKeyboardManager(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Keyboard Manager</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "Keyboard manager" );
        bt.element.onclick = function(){
            addKeyboardManager();
        };
    };

    /**
     * add KEYBOARD manager
     */
    function addKeyboardManager(){
        _setTotal();
        var box = Dk.dom( "div" ).tr( "addParent", _dkView )
            .css( "position", "absolute", "left", 400,
            "top", 100,
            "width", 300,
            "height", 100,
            "color", "#000",
            "backgroundColor", "#FFF" );

        Dk.Keyboard.add( "keyboard", keyboard );
        function keyboard( $type, $keyCode, $key ){
            var str = "type : " + $type + "\nkeyCode : " + $keyCode + "\nkey : " + $key;
            box.tr( "text", str );
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * js loader
     */
    function initJsLoader(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>JS Loader</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "js load" );
        bt.element.onclick = function(){
            Dk.loader.js( [ "js/sub.js" ], complete );
            function complete(){
                trace( "js load total complete" );
            };
        };
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * ajax loader
     */
    function initAjaxLoader(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Ajax Loader</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "xml load" );
        bt.element.onclick = function(){
            loadAjax();
        };
    };

    /**
     * load ajax
     */
    function loadAjax(){
        _setTotal();
        var box = Dk.dom().css( "position", "absolute", "left", 400, "top", 400, "width", 300, "height", 100, "backgroundColor", "#FFF", "color", "#000" ).tr( "addParent", _dkView );

        Dk.loader.text( "asset/text.txt", textComplete, { type : "GET", cache : false } );
//        Dk.loader.text( "asset/text.txt", textComplete, { type : "POST", postParam : "TEST", cache : true } );
        Dk.loader.json( "asset/particle.json", jsonComplete );
//        Dk.loader.xml( "asset/test.xml", xmlComplete );

        function textComplete( $data ){
            trace( $data );
            box.tr( "text", box.tr( "text" ) + "\ntextComplete : " + $data );
        }

        function jsonComplete( $data ){
            trace( $data );
            box.tr( "text", box.tr( "text" ) + "\njsonComplete : " + $data );
        }

        function xmlComplete( $data ){
            trace( $data );
            box.tr( "text", box.tr( "text" ) + "\nxmlComplete : " + $data.navi.sub );
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * sprite sheet
     */
    function initSpriteSheet(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>SpriteSheet</b><br><br>";
        comp.html( str );

        var box_arr = [];

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "add spriteSheet" );
        bt.element.onclick = function(){
            var i = 1;
            while( i-- ){
                box_arr.push( addSpriteSheet() );
            }
        };
        comp.element.appendChild( document.createElement( "br" ) );

        var btLoop = new Button();
        comp.element.appendChild( btLoop.element );
        btLoop.value( "repeat" );
        btLoop.element.onclick = function(){
            var i = box_arr.length;
            while( i-- ){
                box_arr[ i ].ss( "repeat" );
            }
        };

        var btPlay = new Button();
        comp.element.appendChild( btPlay.element );
        btPlay.value( "play" );
        btPlay.element.onclick = function(){
            var i = box_arr.length;
            while( i-- ){
                box_arr[ i ].ss( "play" );
            }
        };

        var btStop = new Button();
        comp.element.appendChild( btStop.element );
        btStop.value( "stop" );
        btStop.element.onclick = function(){
            var i = box_arr.length;
            while( i-- ){
                box_arr[ i ].ss( "stop" );
            }
        };

        var btGotoAndStop = new Button();
        comp.element.appendChild( btGotoAndStop.element );
        btGotoAndStop.value( "gotoAndStop" );
        btGotoAndStop.element.onclick = function(){
            var i = box_arr.length;
            while( i-- ){
                box_arr[ i ].ss( "gotoAndStop", 10 );
            }
        };

        var btAbRepeat = new Button();
        comp.element.appendChild( btAbRepeat.element );
        btAbRepeat.value( "abRepeat" );
        btAbRepeat.element.onclick = function(){
            var i = box_arr.length;
            while( i-- ){
                box_arr[ i ].ss( "abRepeat", 20, 30 );
            }
        };

        var btGotoAndPlay = new Button();
        comp.element.appendChild( btGotoAndPlay.element );
        btGotoAndPlay.value( "gotoAndPlay" );
        btGotoAndPlay.element.onclick = function(){
            var i = box_arr.length;
            while( i-- ){
                box_arr[ i ].ss( "gotoAndPlay", 10 );
            }
        };
    }

    /**
     * add spriteSheet 생성
     * @returns {DkSpriteSheet}
     */
    function addSpriteSheet(){
        trace( 1 );
        _setTotal();
//		var box = Dk.dom( "sheet" ).css( "left", Dk.util.randomIntRange( _dkContainerWidth - 50 ), "top", Dk.util.randomIntRange( _dkContainerHeight - 50 ) ).tr( "addParent", _dkView )
//			.ss( "load", "asset/box.png", "asset/box.json" ).ss("repeat");

        var x = Dk.util.randomIntRange( _dkContainerWidth - 400 ), y = Dk.util.randomIntRange( _dkContainerHeight - 200 );
        Dk.dom().css( "position", "absolute", "left", x, "top", y, "width", 400, "height", 200, "backgroundColor", Dk.util.randomColor(), "opacity", 0.05 ).tr( "addParent", _dkView );
        var box2 = Dk.sheet().css( "left", x, "top", y ).tr( "addParent", _dkView );
//            .ss( "load", "asset/particle.png", "asset/particle.txt", 30 );
//            .ss( "load", "asset/particle.png", "asset/particle.txt", 30 ).ss( "repeat" );
        return box2;
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * flash
     */
    function initFlash(){
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Flash</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "add flash" );
        bt.element.onclick = function(){
            addFlash();
        };
        comp.element.appendChild( document.createElement( "br" ) );

        var btSetSize = new Button();
        comp.element.appendChild( btSetSize.element );
        btSetSize.value( "setSize" );
        btSetSize.element.onclick = function(){
            Dk.getById( "flash" ).fl( "setSize", 700, 480 );
        };

        var btShow = new Button();
        comp.element.appendChild( btShow.element );
        btShow.value( "show" );
        btShow.element.onclick = function(){
            Dk.getById( "flash" ).fl( "show" );
        };

        var btHide = new Button();
        comp.element.appendChild( btHide.element );
        btHide.value( "hide" );
        btHide.element.onclick = function(){
            Dk.getById( "flash" ).fl( "hide" );
        };

        var btRefresh = new Button();
        comp.element.appendChild( btRefresh.element );
        btRefresh.value( "refresh" );
        btRefresh.element.onclick = function(){
            Dk.getById( "flash" ).fl( "refresh" );
        };

        var btAdd = new Button();
        comp.element.appendChild( btAdd.element );
        btAdd.value( "add" );
        btAdd.element.onclick = function(){
            Dk.getById( "flash" ).fl( "add" );
        };

        var btDel = new Button();
        comp.element.appendChild( btDel.element );
        btDel.value( "del" );
        btDel.element.onclick = function(){
            Dk.getById( "flash" ).fl( "del" );
        };

        var btToFlash1 = new Button();
        comp.element.appendChild( btToFlash1.element );
        btToFlash1.value( "toFlash1" );
        btToFlash1.element.onclick = function(){
            Dk.getById( "flash" ).fl( "toFlash", "test1", [ 0, 1, 2 ] );
        };

        var btToFlash2 = new Button();
        comp.element.appendChild( btToFlash2.element );
        btToFlash2.value( "toFlash2" );
        btToFlash2.element.onclick = function(){
            Dk.getById( "flash" ).fl( "toFlash", "test2" );
        };
    }

    /**
     * add spriteSheet 생성
     * @returns {DkSpriteSheet}
     */
    function addFlash(){
        _setTotal();
        var x = Dk.util.randomIntRange( _dkContainerWidth - 600 ), y = Dk.util.randomIntRange( _dkContainerHeight - 480 );
        var flash = Dk.flash().css( "position", "absolute", "left", x, "top", y, "backgroundColor", Dk.util.randomColor() ).tr( "addParent", _dkView ).id( "flash" )
//            .fl( "load", "asset/flashAs3.swf", 500, 400, { wmode : "transparent", allowScriptAccess : "sameDomain" } )
//            .fl( "load", "asset/flashAs3.swf", 500, 400, { version : 13 } );
            .fl( "load", "asset/flashAs3.swf", 500, 400 )
    };
} );

