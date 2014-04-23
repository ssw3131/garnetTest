/**
 * Created by ssw on 2014-04-08.
 */
(function(){
    if( Dk.gs( "slide" ) ) return;

    Dk.loader.js( ["http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/CSSPlugin.min.js", "http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenLite.min.js"], function(){
        var Info = { name : "Dk garnet plugIn - slide", version : "v0.0.1", contact : "ssw3131@daum.net" },
            _prototype;
        log( Info ),

            (function(){
                var animationF = { opacity : aniOpa, leftRight : aniLR, rightLeft : aniRL, topBottom : aniTB, bottomTop : aniBT };

                function aniOpa( $self, $id ){
                    var self = $self, data = self.data, liList = self.liList, i = liList.length, li, time = data.time, ease = data.ease;
                    while( i-- )
                        li = liList[ i ],
                                i == $id ? TweenLite.to( li.element, time, { opacity : 1, ease : ease } ) : TweenLite.to( li.element, time, { opacity : 0, ease : ease } );
                }

                function aniLR( $self, $id ){
                    var self = $self, data = self.data, liList = self.liList, i = liList.length, li, time = data.time, ease = data.ease, w = data.width;
                    while( i-- ){
                        li = liList[ i ];
                        if( i == $id )
                            li.css( "left", -w ), TweenLite.to( li.element, time, { left : 0, ease : ease } );
                        else
                            TweenLite.to( li.element, time, { left : w, ease : ease } );
                    }
                }

                function aniRL( $self, $id ){
                    var self = $self, data = self.data, liList = self.liList, i = liList.length, li, time = data.time, ease = data.ease, w = data.width;
                    while( i-- ){
                        li = liList[ i ];
                        if( i == $id )
                            li.css( "left", w ), TweenLite.to( li.element, time, { left : 0, ease : ease } );
                        else
                            TweenLite.to( li.element, time, { left : -w, ease : ease } );
                    }
                }

                function aniTB( $self, $id ){
                    var self = $self, data = self.data, liList = self.liList, i = liList.length, li, time = data.time, ease = data.ease, h = data.height;
                    while( i-- ){
                        li = liList[ i ];
                        if( i == $id )
                            li.css( "top", -h ), TweenLite.to( li.element, time, { top : 0, ease : ease } );
                        else
                            TweenLite.to( li.element, time, { top : h, ease : ease } );
                    }
                }

                function aniBT( $self, $id ){
                    var self = $self, data = self.data, liList = self.liList, i = liList.length, li, time = data.time, ease = data.ease, h = data.height;
                    while( i-- ){
                        li = liList[ i ];
                        if( i == $id )
                            li.css( "top", h ), TweenLite.to( li.element, time, { top : 0, ease : ease } );
                        else
                            TweenLite.to( li.element, time, { top : -h, ease : ease } );
                    }
                }

                _prototype = function( $id ){
                    var self = this;
                    animationF[ self.data.animation ]( self, $id );
                }
            })(),

            (function(){
                var Slide;

                Slide = function( $data ){
                    var self = this, data = $data, dLeng = data.leng, w = data.width, h = data.height, ani, ul, li, m, liList = [], i;
                    data.animation = data.animation ? data.animation : "leftRight",
                        data.time = data.time ? data.time : 1,
                        data.ease = data.ease ? data.ease : Cubic,
                        ani = data.animation,
                        ul = Dk.dom( "ul" ).css( "listStyle", "none", "padding", 0, "margin", 0, "width", w, "height", h ),
                        m = Dk.dom().css( "position", "absolute", "overflow", "hidden", "width", w, "height", h ).tr( "addParent", ul );
                    for( i = 0; i < dLeng; i++ ){
                        liList[ i ] = li = Dk.dom( "li" ).css( "position", "absolute", "width", w, "height", h ).tr( "addParent", m );
                        switch( ani ){
                            case "opacity" :
                                i == 0 ? null : li.css( "opacity", 0 );
                                break;
                            case "leftRight" :
                                i == 0 ? null : li.css( "left", w );
                                break;
                            case "rightLeft" :
                                i == 0 ? null : li.css( "left", -w );
                                break;
                            case "topBottom" :
                                i == 0 ? null : li.css( "top", h );
                                break;
                            case "bottomTop" :
                                i == 0 ? null : li.css( "top", -h );
                                break;
                        }
                    }
                    self.data = data, self.container = ul, self.liList = liList;
                },

                    Slide.prototype = { activate : _prototype },

                    Dk.gs( "slide", function( $data ){
                        return new Slide( $data );
                    } )
            })(),

            //----------------------------------------------------------------------------------------------------------------------------------------------//
            Dk.plugIn.add( "slide" );
    } )
})();