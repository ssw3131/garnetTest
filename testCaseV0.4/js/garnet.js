/**
 * Created by sewon on 2016-07-08.
 */
;
'use strict';
(function(){
	var dk;

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
		
		log( 'code end' );
})();