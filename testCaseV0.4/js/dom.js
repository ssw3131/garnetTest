;
// DOM :
dk.cls( 'Dom', (function( $doc, $selector, $detector ){
	var factory, DomList, Dom, uuList = {}, proto = {}, maker = $doc.createElement( 'div' ), parser;

	DomList = function( $arr ){
		var leng = $arr.length, i = leng;
		this.domList = [], this.elList = [], this.length = leng;
		while( i-- ) this.domList[ i ] = new Dom( $arr[ i ], i ), this.elList[ i ] = this.domList[ i ].el;
		this.dom = this.domList[ 0 ], this.el = this.elList[ 0 ]; // 리스트 첫번째 요소
	},
		DomList.prototype.S = function(){
			var r, i, leng = this.length;
			r = this.dom.S.apply( this.dom, arguments );
			for( i = 1; i < leng; i++ ) this.domList[ i ].S.apply( this.domList[ i ], arguments );
			return r === false ? this : r;
		},

		Dom = function( $el, $idx ){
			this.el = $el, this.style = $el.style, this.idx = $idx, this.eventList = {};
		},
		Dom.prototype.S = (function(){
			var prefixCss = $detector.prefixCss, nopx = { zIndex : 1, 'z-index' : 1 };
			return function(){
				var i = 0, j = arguments.length, k, v, e = this.el, s = this.style, r, t0;
				while( i < j ){
					k = arguments[ i++ ];
					if( i === j ) return proto[ k ] ? proto[ k ].call( this ) :
						k.indexOf( '@' ) > -1 ? e.getAttribute( k.replace( '@', '' ) ) :
							( r = s[ k ], r.indexOf( '%' ) > -1 ? r : ( t0 = parseFloat( r ), r = isNaN( t0 ) ? r : t0 ) );
					else  v = arguments[ i++ ],
						proto[ k ] ? proto[ k ].call( this, v ) :
							k.indexOf( '@' ) > -1 ? e.setAttribute( k.replace( '@', '' ), v ) :
								s[ k ] = s[ prefixCss + k ] = typeof v === 'number' ? nopx[ k ] ? v : v + 'px' : v
				}
				return false;
			}
		})(),

		parser = function( $str ){
			if( $str.indexOf( '>' ) < 0 ) return $doc.createElement( $str.substring( 1, $str.length ) );
			else return ( maker.innerHTML = $str, maker ).firstChild;
		},

		factory = function( $k, $v ){
			if( $v === null ) return uuList[ $k ]; // 캐싱제거
			if( $k === undefined ) return new DomList( [ $doc.createElement( 'div' ) ] );
			else if( typeof $k === 'string' ){ // 문자열
				if( $k.charAt( 0 ) === '<' ) return new DomList( [ parser( $k ) ] ); // 태그문자
				else return uuList[ $k ] ? uuList[ $k ] : uuList[ $k ] = new DomList( $selector( $k ) ); // 셀렉터, 캐싱
			}else if( $k instanceof Object && $k.length ) return new DomList( $k ); // element 배열
			else return $k.nodeType === 1 ? new DomList( [ $k ] ) : null;
		},
		factory.fn = function(){
			var i = 0, j = arguments.length, k, v;
			while( i < j ){
				k = arguments[ i++ ];
				if( i == j ) return proto[ k ];
				else v = arguments[ i++ ], v === null ? delete proto[ k ] : proto[ k ] = v;
			}
		};

	return factory;
})( document, dk.selector, dk.DETECTOR ) ),
	dk.PROTO.connect( dk.Dom.fn, dk.PROTO.attr, dk.PROTO.css, dk.PROTO.tree, dk.PROTO.event );