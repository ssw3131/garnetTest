/**
 * Created by ssw on 2014-04-28.
 */
Dk.init( function(){
    Dk.loader.js( ["http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/CSSPlugin.min.js", "http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenLite.min.js"], function(){
        var _doc = document, _body = _doc.body, _container, _maxWidth = 1600, _total = 0, _boxArr = [], _colNum, _boxRatio = 194 / 300;

        init();

        function init(){
            initStyle();
            initContainer();
            initResize();
            initWheel();

            loadData();
        }

        function initStyle(){
//            Dk.style( "*" ).st( "outline", "1px dashed red" );
            Dk.style( "body" ).st( "padding", 0, "margin", 0 );
            Dk.style( "#container" ).st( "maxWidth", _maxWidth/*, "bg", "#000"*/ );
            Dk.style( ".box" ).st( "position", "absolute", "display", "block" );
        }

        function initContainer(){
            _container = Dk.dom().id( "container" ).tr( "addParent", _body );
        }

        function initResize(){
            Dk.Doc.addResize( "resize", resize );
            calColNum();
        }

        function resize(){
            calColNum();
            align();
        }

        function calColNum(){
            var dw = Dk.Doc.width - 20;
            if( dw >= 1300 ){
                _colNum = 5;
            } else if( dw >= 1024 && dw < 1300 ){
                _colNum = 4;
            } else if( dw >= 768 && dw < 1024 ){
                _colNum = 3;
            } else if( dw < 768 ){
                _colNum = 2;
            }
        }

        function initWheel(){
            Dk.Doc.addWheel( "wheel", wheel )
        }

        function scrollTop(){
            return _doc.documentElement.scrollTop ? _doc.documentElement.scrollTop : _doc.body.scrollTop
        }

        var count = 0;

        function wheel( $delta ){
            setTimeout( function(){
                var ch, dh, st;
                if( $delta ){
                    ch =  _container.css( "height" );
                    dh = Dk.Doc.height;
                    st = scrollTop();
                    if( count++, ch - dh < st + 10 ){
                        loadData();
                    }
                }
            }, 100 )
        }

        /*Dk.core.addEvent( _doc, "mouseup", function(){
         log("upup");
         }, true )*/

        function loadData(){
            log( "loadDada" );
            Dk.loader.json( "asset/data.json", loadComplete );
        }

        function loadComplete( $data ){
            addList( $data.list );
        }

        function addList( $list ){
            var leng = $list.length, i = leng;
            while( i-- ){
                var box, img;
                box = Dk.dom().atr( "className", "box" ).tr( "addParent", _container ).css( "left", 0, "top", 0, "transition", "all 0.4s ease-in-out " + i / 30 + "s" );
                img = Dk.dom( "img" ).atr( "src", $list[ i ].img ).css( "width", "100%", "height", "auto", "opacity", 0 ).tr( "addParent", box );
                TweenLite.to( img.element, 1, { delay: i / 30, opacity:1, ease:Cubic.easeOut });
                _boxArr[ i + _total ] = box;
            }
            _total += leng;

            align();
        }

        function align(){
            var box, i = _total, x, y, w;
            var dw = Dk.Doc.width - 20;
            if( dw >= _maxWidth ){
                w = _maxWidth / _colNum;
            } else {
                w = dw / _colNum;
            }

            while( i-- ){
                box = _boxArr[ i ];
                x = ( i % _colNum ) * w;
                y = parseInt( i / _colNum ) * ( ( w - 10 ) * _boxRatio + 10 );
                box.css( "left", x, "top", y, "width", w - 10 );
            }

            _container.css( "height", _boxArr[ _total - 1 ].css( "top" ) + _boxArr[ 0 ].gcs( "height" ) + 100 );
        }
    } );
} )