// STATIC :
;
dk.stt( 'LOOP', (function( $SList ){
	var r, start, end, loop;
	start = function(){
		loop = function(){
			r[ 'update' ](), requestAnimFrame( loop );
			//r[ 'update' ](), setTimeout( loop, 160 );
		}, loop();
	},
		end = function(){ loop = function(){}; },
		r = $SList( 'LOOP', true, start, end );
	return r;
})( dk.SList ) ),

	dk.stt( 'WIN', (function(){
		return {
			width : 0, height : 0
		}
	})() ),

	dk.stt( 'RESIZE', (function( $w, $doc, $SList, $addEvent, $delEvent, $detector, $dkWIN, $dkEvent ){
		var r, func, t0 = $doc.documentElement, t1 = $detector.ie8 ? t0 : $w, t2 = $w.innerWidth ? 'inner' : 'client';
		func = function( $e ){
			$dkWIN.width = t1[ t2 + 'Width' ], $dkWIN.height = t1[ t2 + 'Height' ], r[ 'update' ]( $dkEvent( $e ) );
		},
			$addEvent( $w, 'resize', func ),
			r = $SList( 'RESIZE', true ),
			r.dispatchEvent = $detector.ie8 ? function(){
				if( t0 ) t0.fireEvent( 'onresize', $doc.createEventObject() );
			} : function(){
				var ev = $doc.createEvent( 'UIEvents' );
				ev.initUIEvent( 'resize', true, false, $w, 0 ), $w.dispatchEvent( ev );
			}
		return r;
	})( dk.W, dk.DOC, dk.SList, dk.addEvent, dk.delEvent, dk.DETECTOR, dk.WIN, dk.dkEvent ) ),

	dk.stt( 'SCROLL', (function( $w, $doc, $SList, $addEvent, $delEvent, $dkEvent ){
		var r, func;
		func = function( $e ){
			r.scrollLeft = $doc.documentElement ? $doc.documentElement.scrollLeft ? $doc.documentElement.scrollLeft : $doc.body ? $doc.body.scrollLeft : 0 : $doc.body ? $doc.body.scrollLeft : 0,
				r.scrollTop = $doc.documentElement ? $doc.documentElement.scrollTop ? $doc.documentElement.scrollTop : $doc.body ? $doc.body.scrollTop : 0 : $doc.body ? $doc.body.scrollTop : 0,
				r[ 'update' ]( $dkEvent( $e ) );
		},
			$addEvent( $w, 'scroll', func ),
			r = $SList( 'SCROLL', true );
		return r;
	})( dk.W, dk.DOC, dk.SList, dk.addEvent, dk.delEvent, dk.dkEvent ) ),

	dk.stt( 'MOUSE', (function( $doc, $SList, $addEvent, $delEvent, $detector, $dkScroll, $dkEvent ){
		var r, cancelBubbling, func, oldX, oldY, startX, startY, press, map = { mousedown : 'down', mousemove : 'move', mouseup : 'up', touchstart : 'down', touchmove : 'move', touchend : 'up' };
		cancelBubbling = function( $e ){
			cancelBubbling = $e.stopPropagation !== undefined ? function( $e ){ $e.stopPropagation(); } : $w.event !== undefined ? function(){ $w.event.cancelBubble = true; } : null, cancelBubbling( $e );
		},
			func = $detector.touchBool ? function( $e ){
				var mouseX = 0, mouseY = 0, evType = $e.type, eTouches = $e.touches, i = eTouches.length, ev = $dkEvent( $e );
				if( i ){
					r.mouseX = mouseX = eTouches[ 0 ].clientX, r.speedX = mouseX - oldX, oldX = mouseX, r.pageX = mouseX + $dkScroll.scrollLeft,
						r.mouseY = mouseY = eTouches[ 0 ].clientY, r.speedY = mouseY - oldY, oldY = mouseY, r.pageY = mouseY + $dkScroll.scrollTop,
						r.touches = eTouches, r.targetTouches = $e.targetTouches, r.changedTouches = $e.changedTouches;
				}
				cancelBubbling( $e ),
					ev.type = map[ evType ] ? map[ evType ] : evType;
				// move
				switch( evType ){
					case'touchstart':
						eTouches.length == 1 ? ( startX = mouseX, startY = mouseY, r.moveX = r.moveY = 0, r.speedX = r.speedY = 0 ) : null;
						break;
					case'touchmove':
						r.moveX = mouseX - startX, r.moveY = mouseY - startY;
						break;
					case'touchend':
						eTouches.length == 0 ? r.moveX = r.moveY = 0 : null;
						break;
				}
				r[ 'update' ]( ev );
			} : function( $e ){
				var mouseX, mouseY, evType = $e.type, ev = $dkEvent( $e );
				r.mouseX = mouseX = $e.clientX, r.speedX = mouseX - oldX, oldX = mouseX, r.pageX = mouseX + $dkScroll.scrollLeft,
					r.mouseY = mouseY = $e.clientY, r.speedY = mouseY - oldY, oldY = mouseY, r.pageY = mouseY + $dkScroll.scrollTop,
					ev.type = map[ evType ] ? map[ evType ] : evType;
				switch( evType ){
					case'mousedown':
						press = true, startX = mouseX, startY = mouseY, r.moveX = r.moveY = 0;
						break;
					case'mousemove':
						r.moveX = press ? mouseX - startX : 0, r.moveY = press ? mouseY - startY : 0;
						break;
					case'mouseup':
						press = false, r.moveX = r.moveY = 0;
						break;
				}
				r[ 'update' ]( ev );
			},
			$addEvent( $doc, 'down', func, true ), $addEvent( $doc, 'move', func, true ), $addEvent( $doc, 'up', func, true ),
			r = $SList( 'MOUSE', true );
		return r;
	})( dk.DOC, dk.SList, dk.addEvent, dk.delEvent, dk.DETECTOR, dk.SCROLL, dk.dkEvent ) ),

	dk.stt( 'WHEEL', (function( $w, $SList, $addEvent, $delEvent, $detector, $dkEvent ){
		var r, func, start, end;
		func = function( $e ){
			var dkEvent, ev = $w.event || $e, delta = ev.detail ? ev.detail < 0 ? -1 : 1 : ev.wheelDelta > 0 ? -1 : 1;
			dkEvent = $dkEvent( ev ), dkEvent.delta = delta,
				r[ 'update' ]( dkEvent );
		},
			start = function(){ $addEvent( $w, $detector.wheelEvent, func ); },
			end = function(){ $delEvent( $w, $detector.wheelEvent, func ); },
			r = $SList( 'WHEEL', true, start, end );
		return r;
	})( dk.W, dk.SList, dk.addEvent, dk.delEvent, dk.DETECTOR, dk.dkEvent ) ),

	dk.stt( 'KEY', (function( $w, $SList, $addEvent, $delEvent, $dkEvent ){
		var r, func, start, end, list, t0 = {}, t1 = {}, t2 = ( "SPACE,32,BACKSPACE,8,TAB,9,ENTER,13,SHIFT,16,CTRL,17,ALT,18,PAUSE,19,CAPSLOCK,20,ESC,27," + "PAGE_UP,33,PAGE_DOWN,34,END,35,HOME,36,LEFT_ARROW,37,UP_ARROW,38,RIGHT_ARROW,39,DOWN_ARROW,40,INSERT,45,DELETE,46,NUMLOCK,144,SCROLLLOCK,145," + "0,48,1,49,2,50,3,51,4,52,5,53,6,54,7,55,8,56,9,57,A,65,B,66,C,67,D,68,E,69,F,70,G,71,H,72,I,73,J,74,K,75,L,76,M,77,N,78,O,79,P,80,Q,81,R,82,S,83,T,84,U,85,V,86,W,87,X,88,Y,89,Z,90," + "NUMPAD_0,96,NUMPAD_1,97,NUMPAD_2,98,NUMPAD_3,99,NUMPAD_4,100,NUMPAD_5,101,NUMPAD_6,102,NUMPAD_7,103,NUMPAD_8,104,NUMPAD_9,105," + "'*',106,'+',107,'-',109,'.',110,'/',111,'=',187,COMA,188,'SLASH',191,'BACKSLASH',220," + "F1,112,F2,113,F3,114,F4,115,F5,116,F6,117,F7,118,F8,119,F9,120,F10,121,F11,122,F12,123" ).split( "," ), i = t2.length;
		func = function( $e ){
			var ev = $dkEvent( $e ), t0 = list[ t1[ ev.keyCode = $e.keyCode ] ];
			//ev.target = dk.Dom( ev.nativeTarget );
			t0 ? t0( ev ) : 0;
		},
			start = function(){ $addEvent( $w, 'keydown', func ); },
			end = function(){ $delEvent( $w, 'keydown', func ); },
			r = $SList( 'KEY', 0, start, end ),
			list = r.list;
		while( i-- ) t1[ t2[ i-- ] ] = t2[ i ].toUpperCase(), t0[ t2[ i ].toUpperCase() ] = 0;
		return r;
	})( dk.W, dk.SList, dk.addEvent, dk.delEvent, dk.dkEvent ) ),

	dk.stt( 'REG', (function(){
		return {
			numeric : function( k ){ return /^[+-]*[0-9]*\.?\d+$/.test( k ) },
			stringOnly : function( k ){ return /^[^0-9]*$/.test( k ) },
			stripHTMLTags : function( k ){ return k.replace( /<\/?[^\<\/]+\/?>/g, "" ) },
			lineModify : function( k ){ return k.split( "\r\n" ).join( "\n" ) },
			Email : function( k ){ return /^(.+)\@(.+)\.(\w+)$/.test( k ) },
			ip : function( k ){ return /^[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?$/.test( k ) },
			url : function( k ){ return /^(https?\:\/\/)(www\.)?(.+)\.(\w)+/.test( k ) && k.match( /\./g ).length > 1 },
			KoreanRegistrationNumber : function( k ){ return /^[0-9]{6}-?[0-9]{7}$/.test( k ) },
			empty : function( k ){
				if( !k ) return true;
				return !k.length
			}
		}
	})() );