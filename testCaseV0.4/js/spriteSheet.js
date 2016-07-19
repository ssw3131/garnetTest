;
// SPRITE SHEET :
dk.cls( 'Sheet', (function( $doc ){
	var factory, Sheet, uuList = {}, proto = {};

	Sheet = function( $img, $json, $framerate ){
		var dom;
		dom = dk.Dom(), this.dom = dom, this.el = dom.el, this.style = this.el.style;
	},
		Sheet.prototype.S = function(){
			this.dom.S.apply( this.dom, arguments );
		},

		factory = function( $img, $json, $framerate ){
			return new Sheet( $img, $json, $framerate );
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
})( document ) ),
	//dk.PROTO.connect( dk.Sheet.fn, dk.PROTO.attr, dk.PROTO.css, dk.PROTO.tree, dk.PROTO.event );
	log( 'a' );

// todo 중복 구현말고 dom 을 확장하라 !!!