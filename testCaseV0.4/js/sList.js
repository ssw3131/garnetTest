// SList :
;
dk.cls( 'SList', (function(){
	var SList, reset;
	SList = function( $k, $update, $start, $end ){
		this.list = {}, this._list = [], this.name = $k,
			this.update = $update ? function( $param ){
				var t, i, j;
				t = this._list, i = t.length, j = i % 8;
				while( i-- > j ) t[ i-- ]( $param ), t[ i-- ]( $param ), t[ i-- ]( $param ), t[ i-- ]( $param ), t[ i-- ]( $param ), t[ i-- ]( $param ), t[ i-- ]( $param ), t[ i ]( $param );
				while( j-- ) t[ j ]( $param );
			} : 0,
			this.start = $start, this.end = $end;
	},

		reset = function(){
			var k, t0 = this.list, t1 = [];
			for( k in t0 ) t1.push( t0[ k ] );
			this._list = t1, t1.length ? this.start ? this.start() : null : this.end ? this.end() : null;
		},

		SList.prototype.S = function(){
			var i = 0, j = arguments.length, k, v;
			while( i < j ){
				k = arguments[ i++ ];
				if( i == j ) return this.list[ k ];
				else v = arguments[ i++ ], v === null ? delete this.list[ k ] : this.list[ k ] = v;
			}
			reset.call( this );
			return v;
		}
	return function( $k, $update, $start, $end ){
		return new SList( $k, $update, $start, $end );
	}
})() );