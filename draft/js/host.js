/**
 * Created by ssw on 2014-04-03.
 */
Dk.init( function(){
    var W = window, _doc = document, _body = _doc.body,
        _data = dfData, _dataLeng = dfData.draft.length,
        _stageWidth = Dk.Doc.width, _stageHeight = Dk.Doc.height, _gap = 41,
        _container, _bg, _logo, _title, _boxArr = [], _acvateFunc;

    init();

    function init(){
        initBase(),
            initBox();
    }

    function initBase(){
        _container = Dk.dom().css( "width", _stageWidth, "height", _stageHeight, "backgroundColor", "#111" ).tr( "addParent", _body ),

            _bg = Dk.dom( "ui" ).css( "width", _stageWidth - _gap * 2, "height", _stageHeight - _gap * 2, "margin", _gap, "backgroundImage", "url('asset/bg.jpg')", "backgroundSize", "cover" ).tr( "addParent", _container ),

            _logo = Dk.dom( "img" ).atr( "src", "asset/logo.png" ).tr( "addParent", _container ).ev( "onload", function(){
                _logo.css( "left", _stageWidth - _gap - _logo.atr( "width" ), "top", _stageHeight - 10 - _logo.atr( "height" ) );
            } ),

            _title = Dk.dom().css( "left", _gap, "top", 10, "font", "16px Nanum Gothic", "color", "#FFF", "font-smoothing", "antialiased" ).tr( "text", _data.title, "addParent", _container );
    }

    function initBox(){
        var box, i, cel = 1 / ( _dataLeng * 8 + 1 ) * 100;
        for( i = 0; i < _dataLeng; i++ ){
            box = new Box();
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

            setTimeout( function() {
                var dataDraft = _data.draft[ id ];
                _container.tr( "removeParent", _body );
                _acvateFunc[ dataDraft.type ]( dataDraft.data );
            }, 1000 );
        }

        function activateImg( $data ) {
        }

        function activateHtml( $data ) {
        }

        function activateEmbed( $data ) {
        }

        _acvateFunc = { img : activateImg, html : activateHtml, embed : activateEmbed };
    }

    //-----------------------------------------------------------------------------------------------------------------------------------------------------//

    function Box(){
        var self = this, container, content, type;

        container = Dk.dom( "li" ).css( "position", "relative", "float", "left", "height", "80%" ),
            content = Dk.dom().css( "position", "relative", "width", "100%", "height", "88%", "box-shadow", "50px 50px 150px #354c5a", "cursor", "pointer" ).tr( "addParent", container ),
            type = Dk.dom().css( "position", "relative", "width", "100%", "height", "12%", "font", "16px/30px Nanum Gothic", "color", "#FFF", "font-smoothing", "antialiased" ).tr( "addParent", container ),

            self.container = container,
            self.content = content,
            self.type = type;
    }
} )