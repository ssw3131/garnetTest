;
// PROTOTYPE :
dk.stt( 'PROTO', {
	connect : function( $fn/* , $obj, $obj */ ){
		var i = arguments.length, k, param = [];
		while( i-- > 1 ){
			for( k in arguments[ i ] ) param.push( k ), param.push( arguments[ i ][ k ] );
		}
		$fn.apply( undefined, param );
	},
	attr : (function(){
		return {
			'@addClass' : function( $v ){
				var e = this.el, r, check = new RegExp( '(\\s|^)' + $v + '(\\s|$)' );
				r = e.getAttribute( 'class' ), r = r ? r.replace( check, ' ' ).replace( trim, '' ) + ' ' + $v : $v,
					e.setAttribute( 'class', r.replace( trim, '' ) );
			},
			'@delClass' : function( $v ){
				var e = this.el, r, check = new RegExp( '(\\s|^)' + $v + '(\\s|$)' );
				r = e.getAttribute( 'class' ), r ? e.setAttribute( 'class', r.replace( check, ' ' ).replace( trim, '' ) ) : null;
			},
			scrollLeft : function( $v ){
				var e = this.el;
				if( $v === undefined ) return e[ 'scrollLeft' ];
				else e[ 'scrollLeft' ] = $v;
			},
			scrollTop : function( $v ){
				var e = this.el;
				if( $v === undefined ) return e[ 'scrollTop' ];
				else e[ 'scrollTop' ] = $v;
			}
		}
	})(),
	css : (function( $detector ){
		var prefixCss = $detector.prefixCss, dtFloat = $detector.float, t0 = $detector.ie8;
		return {
			bgColor : t0 ? function( $v ){
				var s = this.style, t0;
				if( $v === undefined ) return s[ 'backgroundColor' ];
				else $v.indexOf( 'rgba' ) >= 0 ? ( t0 = $v.replace( 'rgba', 'rgb' ).split( ',' ), t0.pop(), $v = t0.join( ',' ) + ')' ) : null, s[ 'backgroundColor' ] = $v;
			} : function( $v ){
				var s = this.style;
				if( $v === undefined ) return s[ 'backgroundColor' ];
				else s[ 'backgroundColor' ] = $v;
			},
			bgImg : function( $v ){
				var s = this.style;
				if( $v === undefined ) return s[ 'backgroundImage' ];
				else s[ 'backgroundImage' ] = 'url(' + $v + ')';
			},
			float : function( $v ){
				var s = this.style;
				if( $v === undefined ) return s[ dtFloat ];
				else s[ dtFloat ] = $v;
			},
			fontSmoothing : function( $v ){
				var s = this.style;
				if( $v === undefined ) return s[ 'font-smoothing' ];
				else s[ 'font-smoothing' ] = $v, s[ prefixCss + 'font-smoothing' ] = $v;
			},
			opacity : t0 ? function( $v ){
				var s = this.style;
				if( $v === undefined ) return s[ 'opacity' ];
				else s[ 'opacity' ] = $v, s[ 'filter' ] = 'alpha(opacity=' + ( $v * 100 ) + ')';
			} : function( $v ){
				var s = this.style;
				if( $v === undefined ) return s[ 'opacity' ];
				else s[ 'opacity' ] = $v;
			}
		}
	})( dk.DETECTOR ),
	tree : (function( $doc, $detector ){
		var text = $detector.innerText ? 'innerText' : 'textContent';
		return {
			'>' : function( $v ){ this.el.appendChild( $v.list[ 0 ].el ); },
			'<' : function( $v ){ $v === 'body' ? $doc.body.appendChild( this.el ) : $v.list[ 0 ].el.appendChild( this.el ); },
			'>-' : function( $v ){ this.el.removeChild( $v.list[ 0 ].el ); },
			'<-' : function( $v ){ $v === 'body' ? $doc.body.removeChild( this.el ) : $v.list[ 0 ].el.removeChild( this.el ); },
			'html' : function( $v ){ return ( $v === undefined ) ? this.el.innerHTML : this.el.innerHTML = $v; },
			'+html' : function( $v ){ return this.el.innerHTML = $v + this.el.innerHTML; },
			'html+' : function( $v ){ return this.el.innerHTML = this.el.innerHTML + $v; },
			'text' : function( $v ){ return $v === undefined ? this.el[ text ] : this.el[ text ] = $v; },
			'+text' : function( $v ){ return this.el[ text ] = $v + this.el[ text ]; },
			'text+' : function( $v ){ return this.el[ text ] = this.el[ text ] + $v; }
		}
	})( document, dk.DETECTOR ),
	event : (function( $w, $dkEvent, $addEvent, $delEvent ){
		var r = {}, evList = [ 'over', 'out', 'down', 'move', 'up', 'click', 'enter', 'leave', 'contextmenu', 'dblclick' ], i = evList.length,
			cancleMap = { mousedown : 1, mouseup : 1, mousemove : 1 }, t0,
			cancelBubbling, makeListener, make;

		cancelBubbling = function( $e ){
			cancelBubbling = $e.stopPropagation ? function( $e ){ $e.stopPropagation(); } : $w.event ? function(){ $w.event.cancelBubble = true; } : null, cancelBubbling( $e );
		},
			makeListener = function( $k, $dom, $cb ){
				return $dom.eventList[ $k ] = function( $e ){
					var ev = $dkEvent( $e ), type = $e.type;
					cancleMap[ type ] ? null : cancelBubbling( $e ), ev.type = type, ev.target = $dom, $cb( ev );
				}
			},
			make = function( $k ){
				return function( $v ){
					var el = this.el;
					$v ? $addEvent( el, $k, makeListener( $k, this, $v ) ) : ( $delEvent( el, $k, this.eventList[ $k ] ), delete this.eventList[ $k ] );
				}
			};

		while( i-- ) r[ t0 = evList[ i ] ] = make( t0 );
		return r;
	})( window, dk.dkEvent, dk.addEvent, dk.delEvent )
} );