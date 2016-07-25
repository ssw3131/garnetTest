
// CSS :
dk.cls( 'Css', (function( $doc, $head, $detector ){
	var factory, Css, uuList = {}, proto = {}, el, sheet, rules;
	el = $doc.createElement( 'style' ), $head.appendChild( el ), sheet = el.sheet || el.styleSheet, rules = sheet.cssRules || sheet.rules,

		Css = sheet.insertRule ? function( $key ){
			this.sheet = sheet, this.rules = rules, this.cssId = rules.length, sheet.insertRule( $key + '{}', this.cssId );
		} : sheet.addRule ? function( $key ){
			this.sheet = sheet, this.rules = rules, this.cssId = rules.length, sheet.addRule( $key, ' ', this.cssId );
		} : function( $key ){
			dk.err( 'sheet에 rule을 추가할 수 없습니다.' );
		},
		Css.prototype.S = (function(){
			var prefixCss = $detector.prefixCss, nopx = { zIndex : 1, 'z-index' : 1 };
			return function(){
				var i = 0, j = arguments.length, k, v, s = this.rules[ this.cssId ].style, r, t0;
				while( i < j ){
					k = arguments[ i++ ];
					if( i == j ) return proto[ k ] ? proto[ k ].call( { style : s } ) :
						( r = s[ k ], r.indexOf( '%' ) > -1 ? r : ( t0 = parseFloat( r ), r = isNaN( t0 ) ? r : t0 ) );
					else  v = arguments[ i++ ],
						proto[ k ] ? proto[ k ].call( { style : s }, v ) :
							s[ k ] = s[ prefixCss + k ] = typeof v == 'number' ? nopx[ k ] ? v : v + 'px' : v
				}
				return this;
			}
		})(),

		factory = function( $k ){
			return uuList[ $k ] ? uuList[ $k ] : uuList[ $k ] = new Css( $k );
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
})( dk.DOC, dk.HEAD, dk.DETECTOR ) ),
	dk.PROTO.connect( dk.Css.fn, dk.PROTO.css );