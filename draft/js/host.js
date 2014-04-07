/**
 * Created by ssw on 2014-04-03.
 */
Dk.init( function(){
        var W = window, _doc = document, _body = _doc.body,
            _data = dfData, _dataLeng = dfData.draft.length,
            _stageWidth = Dk.Doc.width, _stageHeight = Dk.Doc.height, _gap = 41,
            _container, _bg, _logo, _title, _boxArr = [], _acvateFunc, _subContainer, _home;

        init();

        function init(){
            Dk.style( "div, ui, li" ).st( "position", "absolute", "display", "block" ),

                initBase(),
                initBox(),
                initResize(),
                initHome();
        }

        function initBase(){
            _container = Dk.dom().css( "width", _stageWidth, "height", _stageHeight, "backgroundColor", "#111" ).tr( "addParent", _body ),

                _bg = Dk.dom( "ui" ).css( "width", _stageWidth - _gap * 2, "height", _stageHeight - _gap * 2, "margin", _gap, "backgroundImage", "url('asset/bg.jpg')", "backgroundSize", "cover" ).tr( "addParent", _container ),

                _logo = Dk.dom( "img" ).atr( "src", "asset/logo.png" ).tr( "addParent", _container ).ev( "onload", function(){
                    _logo.css( "position", "absolute", "left", _stageWidth - _gap - _logo.atr( "width" ), "top", _stageHeight - 10 - _logo.atr( "height" ) );
                } ),

                _title = Dk.dom().css( "left", _gap, "top", 10, "font", "16px Nanum Gothic", "color", "#FFF", "font-smoothing", "antialiased" ).tr( "text", _data.title, "addParent", _container );
        }

        function initBox(){
            var box, i, cel = 1 / ( _dataLeng * 8 + 1 ) * 100;
            for( i = 0; i < _dataLeng; i++ ){
                box = makeBox();
                if( i == 0 ) box.container.css( "width", cel * 7 + "%", "margin", "0% " + cel + "%" );
                else box.container.css( "width", cel * 7 + "%", "margin-right", cel + "%" );
                box.container.css( "top", _bg.pp( "scrollHeight" ) * 0.15 + "px" );

                box.type.tr( "text", "TYPE" + ( i + 1 ) );

                box.content.pp( "id", i )
                    .css( "background-image", "url(" + _data.draft[ i ].thumbUrl + ")", "background-position", _data.draft[ i ].thumbPosition, "background-size", "cover" )
                    .ev( "mouseover", boxOver, "mouseout", boxOut, "click", boxClick );

                _bg.tr( "addChild", box.container );

                _boxArr[ i ] = box;
            }
        }

        function boxOver( $e ){
            var content = $e.currentTarget;
            TweenLite.killTweensOf( content.element );
            TweenLite.to( content.element, 0.5, { top : -20, ease : Quint.easeOut } );
        }

        function boxOut( $e ){
            var content = $e.currentTarget;
            TweenLite.killTweensOf( content.element );
            TweenLite.to( content.element, 0.5, { top : 0, ease : Quint.easeOut } );
        }

        function boxClick( $e ){
            var id = $e.currentTarget.pp( "id" );
            TweenLite.to( _container.element, 1, { top : -_stageHeight, ease : Quint.easeInOut } );

            setTimeout( function(){
                var dataDraft = _data.draft[ id ];
                _container.tr( "removeParent", _body );
                _acvateFunc[ dataDraft.type ]( dataDraft.data );
            }, 1000 );
        }

        function activateImg( $data ){
            var i = _dataLeng, img, imgArr = [];

            _subContainer = Dk.dom().css( "width", "100%", "height", "100%" ).tr( "addParent", _body );

            while( i-- ){
                img = Dk.dom( "img" ).tr( "addParent", _subContainer ).atr( "src", $data[ i ] ).css( "margin", "0 auto" );

                if( i == 0 ){
                    img.css( "display", "block", "opacity", 0 );
                    TweenLite.to( img.element, 2, { opacity : 1, ease : Quint.easeOut } );
                } else {
                    img.css( "display", "none" );
                }

                imgArr[ i ] = img;

                img.pp( "id", i ).ev( "click", function( $e ){
                    var id = $e.currentTarget.pp( "id" ), oldImg = imgArr[ id ], currentImg;
                    currentImg = ( ++id >= _dataLeng ) ? imgArr[ 0 ] : imgArr[ id ],
                        oldImg.css( "display", "none" ),
                        TweenLite.killTweensOf( currentImg.element ),
                        currentImg.css( "display", "block", "opacity", 0 ),
                        TweenLite.to( currentImg.element, 2, { opacity : 1, ease : Quint.easeOut } );
                } );
            }
        }

        function activateHtml( $data ){
            _subContainer = Dk.dom().css( "width", "100%", "height", "100%", "top", -_stageHeight ).tr( "addParent", _body );
            Dk.dom( "iframe" ).atr( "src", $data, "width", "100%", "height", "100%" ).css( "border", 0 ).tr( "addParent", _subContainer );
            TweenLite.to( _subContainer.element, 1, { delay : 0.5, top : 0, ease : Quint.easeOut } );
        }

        function activateEmbed( $data ){
            _subContainer = Dk.dom().css( "width", "100%", "height", "100%", "top", -_stageHeight ).tr( "addParent", _body, "innerHTML", $data );
            TweenLite.to( _subContainer.element, 1, { delay : 0.5, top : 0, ease : Quint.easeOut } );
        }

        _acvateFunc = { img : activateImg, html : activateHtml, embed : activateEmbed };

        function initResize(){
            Dk.Doc.addResize( "draftHost", resize );
        }

        function resize(){
            _stageWidth = Dk.Doc.width, _stageHeight = Dk.Doc.height;
            _container.css( "width", _stageWidth, "height", _stageHeight );
            _bg.css( "width", _stageWidth - _gap * 2, "height", _stageHeight - _gap * 2 );
            _logo.css( "left", _stageWidth - _gap - 70, "top", _stageHeight - 31 );

            var i = _dataLeng;
            while( i-- ){
                _boxArr[ i ].container.css( "top", ( _stageHeight - _gap * 2 ) * 0.15 );
            }
        }

        function initHome(){
            var timer;
            _home = Dk.dom().css( "top", -35, "width", "100%", "height", 40, "font", "16px/40px Nanum Gothic", "text-align", "center", "color", "#FFF", "background-color", "#000", "z-index", 100, "opacity", 0 )
                .tr( "text", "GO GATE", "addParent", _body )
                .ev( "mouseover", homeOver, "mouseout", homeOut, "click", homeClick );

            function homeOver(){
                clearTimeout( timer );
                TweenLite.to( _home.element, 0.5, { top : 0, opacity : 0.8, ease : Quint.easeOut } );
            };

            function homeOut(){
                timer = setTimeout( function(){
                    TweenLite.to( _home.element, 0.5, { top : -35, opacity : 0, ease : Quint.easeOut } );
                }, 1000 );
            }

            function homeClick(){
                TweenLite.to( _home.element, 0.5, { top : -35, opacity : 0, ease : Quint.easeOut } );
                TweenLite.to( _subContainer.element, 1, { opacity : 0, ease : Quint.easeOut } );
                setTimeout( function(){
                    _subContainer.tr( "removeParent", _body );
                    _container.tr( "addParent", _body );
                    TweenLite.to( _container.element, 1, { top : 0, ease : Quint.easeOut } );
                }, 1000 );
            }
        }

        //-----------------------------------------------------------------------------------------------------------------------------------------------------//

        Dk.style( ".container" ).st( "position", "relative", "display", "block", "float", "left", "height", "80%" );
        Dk.style( ".content" ).st( "position", "relative", "display", "block", "width", "100%", "height", "88%", "box-shadow", "50px 50px 150px #354c5a", "cursor", "pointer" );
        Dk.style( ".type" ).st( "position", "relative", "display", "block", "width", "100%", "height", "12%", "font", "16px/30px Nanum Gothic", "color", "#FFF", "font-smoothing", "antialiased" );

        function makeBox(){
            var container, content, type;

            container = Dk.dom( "li" ).atr( "className", "container" );
            content = Dk.dom().atr( "className", "content" ).tr( "addParent", container ),
                type = Dk.dom().atr( "className", "type" ).tr( "addParent", container );
//            container = Dk.dom( "li" ).css( "position", "relative", "float", "left", "height", "80%" ),
//                content = Dk.dom().css( "position", "relative", "width", "100%", "height", "88%", "box-shadow", "50px 50px 150px #354c5a", "cursor", "pointer" ).tr( "addParent", container ),
//                type = Dk.dom().css( "position", "relative", "width", "100%", "height", "12%", "font", "16px/30px Nanum Gothic", "color", "#FFF", "font-smoothing", "antialiased" ).tr( "addParent", container );

            return { container : container,
                content : content,
                type : type
            }
        }
    }
)