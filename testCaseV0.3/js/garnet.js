;
'use strict';
(function(){
	var dk;
	var W = window, DOC = document, HEAD = DOC.getElementsByTagName( 'head' )[ 0 ];
	var trim = /^\s*|\s*$/g;

// 보정패치 :
	W.console = W[ 'console' ] ? W[ 'console' ] : { log : function(){} },
		W.log = W[ 'log' ] ? W[ 'log' ] : function(){ W.console.log( arguments[ 0 ] ) },
		Date.now = Date.now * 1 || function(){ return +new Date },
		W.requestAnimFrame = (function(){ return W.requestAnimationFrame || W.webkitRequestAnimationFrame || W.mozRequestAnimationFrame || function( $loop ){ W.setTimeout( $loop, 17 ) } })(),
		(function( f ){ W.setTimeout = f( W.setTimeout ), W.setInterval = f( W.setInterval ) })( function( f ){
			return function( $a, $b ){
				var a = [].slice.call( arguments, 2 );
				return f( function(){ $a.apply( this, a ); }, $b );
			};
		} ),

// dk :
		W.dk = W[ 'dk' ] ? W[ 'dk' ] : dk = (function( $doc ){
			return function( $host ){
				var check;
				check = setInterval( function(){
					switch( $doc.readyState ){
						case'complete':
						case'interactive':
						case'loaded':
							break;
						default:
							return
					}
					if( $doc && $doc.getElementsByTagName && $doc.getElementById && $doc.body ){
						clearInterval( check ), $host ? $host() : null;
					}
				}, 10 );
			}
		})( DOC ),

// CORE :
		dk.fn = function( $k, $v ){
			$k = $k.replace( trim, '' ), $k = $k.charAt( 0 ).toLowerCase() + $k.substring( 1, $k.length ),
				dk[ $k ] ? dk.err( 'dk.fn에 이미 ' + $k + '값이 존재합니다' ) : dk[ $k ] = $v;
		},
		dk.cls = function( $k, $v ){
			$k = $k.replace( trim, '' ), $k = $k.charAt( 0 ).toUpperCase() + $k.substring( 1, $k.length ),
				dk[ $k ] ? dk.err( 'dk.cls에 이미 ' + $k + '값이 존재합니다' ) : dk[ $k ] = $v;
		},
		dk.obj = function( $k, $v ){
			$k = $k.replace( trim, '' ).toUpperCase(),
				dk[ $k ] ? dk.err( 'dk.obj에 이미 ' + $k + '값이 존재합니다' ) : dk[ $k ] = $v;
		},

// INFO :
		dk.obj( 'INFO', { name : 'Dk garnet', version : 'v0.3.1', github : 'https://github.com/ssw3131/garnet.git' } ),

// ERROR :
		dk.fn( 'err', function( $log ){ log( 'err : ' + $log ); } ),
// DETECTOR :
		// todo detector update
		dk.obj( 'DETECTOR', (function( $w, $doc ){
			var navi = $w.navigator, agent = navi.userAgent.toLowerCase(), platform = navi.platform.toLowerCase(), app = navi.appVersion.toLowerCase(),
				device = 'pc', os, osv, browser, bv, flash,
				prefixCss, prefixStyle, transform3D, keyframe = $w[ 'CSSRule' ],
				docMode = 0,
				d = $doc.createElement( 'div' ), s = d.style, c = $doc.createElement( 'canvas' ), a = $doc.createElement( 'audio' ), v = $doc.createElement( 'video' ), t0,
				ie, chrome, firefox, safari, opera, naver;

			log( navi );
			log( agent );
			log( platform );
			log( app );

			return {
			}
		})( W, DOC ) ),

		log( 'code end' );
})();