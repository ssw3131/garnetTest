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
			} : null,
			this.start = $start, this.end = $end, this.isStart = false;
	},

		reset = function(){
			var k, t0 = this.list, t1 = [];
			for( k in t0 ) t1.push( t0[ k ] );
			this._list = t1;
			//t1.length  ? this.start ? this.start() : null : this.end ? this.end() : null;
			if( this.start && this.end ){
				if( t1.length ) this.isStart ? null : this.start(), this.isStart = true;
				else this.isStart ? this.end() : null, this.isStart = false;
			}
		},

		SList.prototype.S = function(){
			var i = 0, j = arguments.length, k, v;
			while( i < j ){
				k = arguments[ i++ ];
				if( i == j ) return this.list[ k ];
				else v = arguments[ i++ ], v === null ? delete this.list[ k ] : this.list[ k ] ? null : this.list[ k ] = v;
				//else v = arguments[ i++ ], v === null ? delete this.list[ k ] : this.list[ k ] ? dk.err( 'dk.SList에 이미 ' + k + '값이 존재합니다' ) : this.list[ k ] = v;
			}
			reset.call( this );
			return this;
		}
	return function( $k, $update, $start, $end ){
		return new SList( $k, $update, $start, $end );
	}
})() );