/**
 * Created by ssw on 2014-04-08.
 */
(function(){
    if( Dk.gs( "buttons" ) ) return;

    var Info = { name : "Dk garnet plugIn - buttons", version : "v0.0.1", contact : "ssw3131@daum.net" };
    log( Info ),

        (function(){
            var Buttons;

            Buttons = function( $data ){
                var self = this, data = $data, dList = data.list, dLeng = dList.length, di, ul, li, bt, liList = [], i;
                ul = Dk.dom( "ul" ).atr( "className", data.className );
                for( i = 0; i < dLeng; i++ ){
                    di = dList[ i ],
                        li = Dk.dom( "li" ).tr( "addParent", ul ).atr( "className", "li" );

                    if( data.align == "hor" ) li.css( "float", "left" ), i == 0 ? null : li.css( "marginLeft", data.gap );
                    else i == 0 ? null : li.css( "marginTop", data.gap );

                    di.elementType == "button"
                        ? bt = Dk.dom( "button" ).tr( "addParent", li ).pp( "id", i ).ev( "mouseover", di.event, "mouseout", di.event, "click", di.event ).atr( "className", "button" )
                        : bt = Dk.dom( "a" ).tr( "addParent", li ).atr( "href", di.link, "target", di.target ),

                        di.text ? bt.tr( "text", di.text ) : null,
                        di.img ? Dk.dom( "img" ).atr( "src", di.img ).tr( "addParent", bt ).atr( "className", "img" ) : null,
                        liList[ i ] = li;
                }
                self.data = data, self.container = ul, self.liList = liList;
            },

                Dk.gs( "buttons", function( $data ){
                    return new Buttons( $data );
                } )
        })(),

        //----------------------------------------------------------------------------------------------------------------------------------------------//
        Dk.plugIn.add( "buttons" );
})();