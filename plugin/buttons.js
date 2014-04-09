/**
 * Created by ssw on 2014-04-08.
 */
(function(){
    if( Dk.gs( "buttons" ) ) return;

    var Info = { name : "Dk garnet plugIn - buttons", version : "v0.0.1", contact : "ssw3131@daum.net" },
        Doc = document;

    trace( Info ),

        (function(){
            var Buttons;

            Buttons = function( $data ){
                var self = this, data = $data, dList = data.list, dLeng = dList.length, di, ul, li, bt, liList = [];
                ul = Dk.dom( "ul" ).atr( "className", data.className );
                for( i = 0; i < dLeng; i++ ){
                    di = dList[ i ];
                    li = Dk.dom( "li" ).tr( "addParent", ul ).atr( "className", "li" );
                    if ( data.align == "hor" ){
                        li.css( "float", "left" );
                        if ( i != 0 ) li.css( "marginLeft", data.gap );
                    } else {
                        if ( i != 0 ) li.css( "marginTop", data.gap );
                    }
                    if ( di.elementType == "button" ) bt = Dk.dom( "button" ).tr( "addParent", li ).pp( "id", i ).ev( "mouseover", di.event, "mouseout", di.event, "click", di.event ).atr( "className", "button" );
                    else bt = Dk.dom( "a" ).tr( "addParent", li ).atr( "href", di.link, "target", di.target );
                    if ( di.text ) bt.tr( "text", di.text );
                    if ( di.img ) Dk.dom( "img" ).atr( "src", di.img ).tr( "addParent", bt ).atr( "className", "img" );
                    liList[ i ] = li;
                }
                self.data = data, self.container = ul, self.liList = liList;
            },

                Dk.gs( "buttons", function( $data ){
                    return new Buttons( $data );
                } )
        })()

})();