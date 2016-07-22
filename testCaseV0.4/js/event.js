;
// EVENT :
dk.fn( 'dkEvent', (function( $detector ){
	var t0 = $detector.currentTarget;
	return function( $e ){
		return {
			nativeEvent : $e,
			nativeTarget : $e[ t0 ]
		}
	}
})( dk.DETECTOR ) ),

	(function( $w, $detector ){
		var map = { over : 'mouseover', out : 'mouseout', down : 'mousedown', move : 'mousemove', up : 'mouseup', enter : 'mouseenter', leave : 'mouseleave' };
		$detector.touchBool ? ( map.down = 'touchstart', map.move = 'touchmove', map.up = 'touchend' ) : null,
			dk.fn( 'addEvent', (function(){
				return $w.addEventListener ? function( $el, $et, $cb, $cap ){
					$et = map[ $et ] ? map[ $et ] : $et, $el.addEventListener( $et, $cb, $cap );
				} : function( $el, $et, $cb ){
					$et = map[ $et ] ? map[ $et ] : $et, $el.attachEvent( 'on' + $et, $cb ); // ie8 이하 capture 불가능
				}
			})() ),
			dk.fn( 'delEvent', (function(){
				return $w.removeEventListener ? function( $el, $et, $cb, $cap ){
					$et = map[ $et ] ? map[ $et ] : $et, $el.removeEventListener( $et, $cb, $cap );
				} : function( $el, $et, $cb ){
					$et = map[ $et ] ? map[ $et ] : $et, $el.detachEvent( 'on' + $et, $cb ); // ie8 이하 capture 불가능
				}
			})() )
	})( dk.W, dk.DETECTOR );