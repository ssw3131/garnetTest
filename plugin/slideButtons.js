/**
 * Created by ssw on 2014-04-08.
 */
(function(){
    if( Dk.gs( "slideButtons" ) ) return;

    Dk.plugIn( [ { id : "slide", url : "slide.js" }, { id : "buttons", url : "buttons.js" } ], function(){
        var Info = { name : "Dk garnet plugIn - slideButtons", version : "v0.0.1", contact : "ssw3131@daum.net" },
            _prototype;
        trace( Info ),

            (function(){
                var SlideButtons;

                SlideButtons = function( $slideData, $buttonsData ){
                    var self = this, slide, buttons;

                    slide = Dk.slide( $slideData );
                    buttons = Dk.buttons( $buttonsData );


                    self.slide = slide, self.buttons = buttons;
                },

                    Dk.gs( "slideButtons", function( $slideData, $buttonsData ){
                        return new SlideButtons( $slideData, $buttonsData );
                    } )
            })(),

            //----------------------------------------------------------------------------------------------------------------------------------------------//
            Dk.plugIn.add( "slideButtons" );
    } )
})();