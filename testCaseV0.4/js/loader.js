
// LOADER :
dk.stt( 'JSON', {
	parse : function( $v ){ return ( new Function( '', 'return ' + $v ) )(); }
} ),

	dk.fn( 'ajax', (function( $w ){
		var checkXMLHttp, async;
		checkXMLHttp = (function(){
			if( $w[ 'XMLHttpRequest' ] !== undefined ) return function(){ return new XMLHttpRequest() };
			var t0 = [ 'MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP' ], i = 0, leng = t0.length;
			while( i < leng ){
				try{
					new ActiveXObject( t0[ i ] );
					return function(){ return new ActiveXObject( t0[ i ] ); }
				}catch( $e ){
					i++;
				}
			}
		})(),
			async = function( $cb, $url ){
				var rq = checkXMLHttp(),
					timeId = setTimeout( function(){
						if( timeId == -1 ) return;
						if( rq.readyState !== 4 ) rq.abort();
						timeId = -1, rq.onreadystatechange = null, $cb( null, 'timeout' );
					}, 5000 ),
					param = function( $arg ){
						var i = 2, j = $arg.length, k, v, r = '';
						if( !$arg || j < i + 1 ) return '';
						while( i < j ){
							r += i == 2 ? '?' : '&', k = $arg[ i++ ], v = $arg[ i++ ],
								r += encodeURIComponent( k ) + '=' + encodeURIComponent( v )
						}
						return r;
					},
					url = $url + param( arguments, 2 );
				rq.open( 'get', url, true ),
					rq.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' ),
					rq.onreadystatechange = function(){
						if( rq.readyState !== 4 || timeId == -1 ) return;
						clearTimeout( timeId ), timeId = -1;
						if( rq.readyState == 4 ){
							if( rq.status == 404 ) return $cb( null, rq.status );
							if( rq.status >= 200 && rq.status < 300 || rq.status == 304 ){
								rq.onreadystatechange = null;
								$cb( rq.responseText, rq.status )
							}
						}
					},
					rq.send( null );
			};
		return async;
	})( dk.W ) ),

	dk.fn( 'js', (function( $w, $doc, $head ){
		var js;
		js = (function(){
			var uuId = 0;
			return function( $cb, $url ){
				var el = $doc.createElement( 'script' ), t0, t1, id = uuId++;
				$cb ? ( t0 = $url.charAt( $url.length - 1 ) ) : 0, t1 = ( t0 == '=' ),
					t1 ? $w[ '____callbacks' + id ] = function(){
						$cb.apply( null, arguments ), $w[ '____callbacks' + id ] = null;
					} : $doc.addEventListener ? el.onload = $cb : el.onreadystatechange = function(){
						if( el.readyState == 'loaded' || el.readyState == 'complete' ) el.onreadystatechange = null, $cb ? $cb() : 0;
					},
					el.type = 'text/javascript', el.charset = 'utf-8', el.src = $url + ( t1 ? ( '____callbacks' + id ) : '' ), $head.appendChild( el )
			}
		})();
		return function( $cb, $url/* , [ $url ], $url, $url */ ){
			var arg = arguments, arr, i, leng, load, complete;
			arr = (function(){
				var r = [], i, leng = arg.length, j, leng2;
				for( i = 1; i < leng; i++ ){
					if( Object.prototype.toString.call( arg[ i ] ) === '[object Array]' ){
						leng2 = arg[ i ].length;
						for( j = 0; j < leng2; j++ ){
							r.push( arg[ i ][ j ] )
						}
					}else{
						r.push( arg[ i ] )
					}
				}
				return r;
			})(),
				i = 0, leng = arr.length,
				load = function(){ js( complete, arr[ i++ ] ); },
				complete = function(){ i == leng ? $cb ? $cb() : null : load(); },
				leng == 1 ? js( $cb, arr[ i++ ] ) : load();
		}
	})( dk.W, dk.DOC, dk.HEAD ) ),

	dk.fn( 'img', (function( $doc, $detector ){
		var onload = (function(){
			if( $detector.ie8 )
				return function( $el, $cb ){
					var timeId = setTimeout( function(){
							if( timeId == -1 ) return;
							timeId = -1, $cb( false, $el );
						}, 5000 ),
						t0 = setInterval( function(){
							// todo $el.complete 이 무조건 뜬다
							$el.complete ? ( clearInterval( t0 ), clearTimeout( timeId ), timeId = -1, $cb( true ) ) : null;
						}, 16 );
				}
			else
				return function( $el, $cb ){
					$el.onload = function(){
						$el.onerror = $el.onabort = $el.onload = null, $cb( true );
					},
						$el.onerror = $el.onabort = function(){
							$el.onerror = $el.onabort = $el.onload = null, $cb( false, $el );
						}
				}
		})();

		return function( $cb, $src /* , [ $src ], $src, $src */ ){
			var arg = arguments, arr, i, leng, load, complete, r = [], el;
			arr = (function(){
				var r = [], i, leng = arg.length, j, leng2;
				for( i = 1; i < leng; i++ ){
					if( Object.prototype.toString.call( arg[ i ] ) === '[object Array]' ){
						leng2 = arg[ i ].length;
						for( j = 0; j < leng2; j++ ){
							r.push( arg[ i ][ j ] )
						}
					}else{
						r.push( arg[ i ] )
					}
				}
				return r;
			})(),
				i = 0, leng = arr.length,
				load = function(){ el = $doc.createElement( 'img' ), onload( el, complete ), el.src = arr[ i++ ], r.push( el ); },
				complete = function( $bool, $el ){
					if( $bool ){
						i == leng ? $cb( r ) : load();
					}else{
						$cb( false, $el.src );
					}
				},
				load();
		}
	})( dk.DOC, dk.DETECTOR ) );