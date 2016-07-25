
// SPRITE SHEET :
dk.cls( 'Sheet', (function( $doc, $dkDom, $dkAjax, $dkJSON ){
	var factory, Sheet, proto = {}, uuId = 0;

	Sheet = function( $cb, $img, $json, $framerate ){
		var dom, self = this;
		this.uuId = 'Sheet' + uuId++,
			dom = $dkDom().S( 'bgImg', $img ), this.dom = dom, this.el = dom.el, this.style = this.el.style,
			this.arr = null, this.repeat = true, this.currentFrame = 1, this.totalFrames = 1, this.startFrame = 1, this.endFrame = 1, this.currentRate = 0, this.frameRate = 30, this.direction = true,
			$dkAjax( function( $data ){
				var data = $dkJSON.parse( $data ), arr = self.arr = data.frames;
				self.totalFrames = self.endFrame = arr.length, self.frameRate = $framerate == undefined ? 2 : 60 / $framerate,
					dom.S( 'width', arr[ 0 ].sourceSize.w, 'height', arr[ 0 ].sourceSize.h ), $cb( self );
			}, $json );
	},
		Sheet.prototype.S = function(){
			var r = this.dom.S.apply( this.dom, arguments );
			return r === this.dom ? this : r;
		},
		Sheet.prototype.S2 = function(){
			var i = arguments.length, k = arguments[ 0 ];
			i == 1 ? proto[ k ].call( this ) : proto[ k ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
			return this;
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
})( dk.DOC, dk.Dom, dk.ajax, dk.JSON ) ),

	dk.PROTO.connect( dk.Sheet.fn, (function( $dkLOOP, $SList ){
		var sList, func, start, end, goFrame;
		func = function(){
			var list = sList._list, i = list.length, sheet;
			while( i-- ){
				sheet = list[ i ];
				if( sheet.arr == null ) continue;
				if( ++sheet.currentRate % sheet.frameRate < 1 ){
					if( sheet.direction ){
						++sheet.currentFrame > sheet.endFrame ?
							sheet.repeat ? sheet.currentFrame = sheet.startFrame : ( sheet.currentFrame = sheet.endFrame, sList.S( sheet.uuId, null ) )
							: null
					}else{
						--sheet.currentFrame < sheet.endFrame ?
							( sheet.currentFrame = sheet.endFrame, sList.S( sheet.uuId, null ) )
							: null
					}
				}
				goFrame( sheet );
			}
		},
			start = function(){ $dkLOOP.S( 'SHEET', func ) },
			end = function(){ $dkLOOP.S( 'SHEET', null ) },
			sList = $SList( 'SHEET', false, start, end ),

			goFrame = function( $sheet ){
				var arr = $sheet.arr, x, y;
				x = arr[ $sheet.currentFrame - 1 ].frame.x,
					y = arr[ $sheet.currentFrame - 1 ].frame.y,
					$sheet.S( 'backgroundPosition', -x + "px " + -y + "px" );
			}

		return {
			repeat : function(){
				this.direction = true, this.repeat = true, this.startFrame = 1, this.endFrame = this.totalFrames,
					sList.S( this.uuId, this );
			},
			play : function(){
				this.direction = true, this.repeat = false, this.endFrame = this.totalFrames,
					this.currentFrame + 1 > this.endFrame ? this.startFrame = this.currentFrame = this.endFrame : null,
					sList.S( this.uuId, this )
			},
			stop : function(){
				sList.S( this.uuId, null )
			},
			rewind : function(){
				this.direction = false, this.repeat = false, this.endFrame = 1,
					this.currentFrame - 1 < 1 ? this.startFrame = this.currentFrame = 1 : null,
					sList.S( this.uuId, this )
			},
			gotoAndStop : function( $frame ){
				this.currentFrame = $frame,
					sList.S( this.uuId, null ),
					goFrame( this );
			},
			gotoAndPlay : function( $frame ){
				this.direction = true, this.repeat = false, this.currentFrame = $frame, this.endFrame = this.totalFrames,
					sList.S( this.uuId, this );
			},
			abRepeat : function( $startFrame, $endFrame ){
				this.direction = true, this.repeat = true, this.startFrame = this.currentFrame = $startFrame, this.endFrame = $endFrame,
					sList.S( this.uuId, this );
			}
		};
	})( dk.LOOP, dk.SList ) );