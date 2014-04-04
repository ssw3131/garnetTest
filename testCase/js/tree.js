/**
 * @author ssw
 */
"use strict";

Dk.init( function() {
	var W = window, _doc = document, _body = _doc.body,
		_dkViewContainer, _dkContainerWidth, _dkContainerHeight, _compContainer, _compX = 20, _compY = 20, _compWidth = 300, _gap = 80, _dkView, _output, _boxContainer,
		_util, Comp, Button, Input;

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	// 유틸
	_util = {
		css : function( $obj ) {
			for ( var key in $obj ) {
				this.style[ key ] = $obj[ key ];
			}
		},

		html : function( $html ) {
			if ( $html == undefined ) {
				return this.element.innerHTML;
			} else {
				return this.element.innerHTML = $html;
			}
		},

		textObj : function( $obj ) {

			for ( var key in $obj ) {
				str += "<br> " + key + " : " + $obj[ key ];
			}
			return str;
		},

		/**
		 * 윈도우 내부 가로값을 가져온다
		 * @returns {number}
		 */
		getWindowWidth : (function() {
			if ( W.innerWidth ) {
				return function() { return W.innerWidth };
			} else {
				return function() { return _doc.documentElement.clientWidth };
			}
		})(),

		/**
		 * 윈도우 내부 세로값을 가져온다
		 * @returns {number}
		 */
		getWindowHeight : (function() {
			if ( W.innerHeight ) {
				return function() { return W.innerHeight };
			} else {
				return function() { return _doc.documentElement.clientHeight };
			}
		})()
	};

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	// Comp
	Comp = function() {
		var element = _doc.createElement( "div" );
		this.element = element;
		this.style = element.style;

		this.css( {
					  position        : "relative",
					  display         : "block",
					  margin          : "0px 0px 10px 0px",
					  padding         : "20px",
					  backgroundColor : "#000",
					  color           : "#FFFFFF",
					  fontFamily      : "돋움, sans-serif",
					  fontSize        : "12px",
					  lineHeight      : "20px"
				  } );
	};

	Comp.prototype = {
		css  : _util.css,
		html : _util.html
	};

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	// Button
	Button = function() {
		var element = _doc.createElement( "input" );
		element.type = "button";
		this.element = element;
		this.style = element.style;

		this.css( {
					  position   : "relative",
					  display    : "inline",
					  margin     : "2px",
					  width      : "120px",
					  height     : "20px",
					  fontFamily : "돋움, sans-serif",
					  fontSize   : "12px",
					  cursor     : "pointer"
				  } );
	};

	Button.prototype = {
		css : _util.css,

		value : function( $value ) {
			if ( $value == undefined ) {
				return this.element.value;
			} else {
				this.element.value = $value;
			}
		},

		disabled : function( $bool ) {
			if ( $bool == undefined ) {
				return this.element.disabled;
			} else {
				this.element.disabled = $bool;
			}
		}
	};

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	// input
	Input = function() {
		var element = _doc.createElement( "input" );
		element.type = "text";
		this.element = element;
		this.style = element.style;

		this.css( {
					  position   : "relative",
					  display    : "inline",
					  margin     : "2px",
					  width      : "150px",
					  height     : "14px",
					  fontFamily : "돋움, sans-serif",
					  fontSize   : "12px"
				  } );
	};

	Input.prototype = {
		css : _util.css,

		value : function( $value ) {
			if ( $value == undefined ) {
				return this.element.value;
			} else {
				this.element.value = $value;
			}
		},

		disabled : function( $bool ) {
			if ( $bool == undefined ) {
				return this.element.disabled;
			} else {
				this.element.disabled = $bool;
			}
		}
	};

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	// 초기화
	init();

	/**
	 * 초기화
	 */
	function init() {
		_dkContainerWidth = _util.getWindowWidth() - 500;
		_dkContainerHeight = _util.getWindowHeight() - 50;

		initContainer();
		initView();
		initTree();
	};

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

	/**
	 * 컨테이너
	 */
	function initContainer() {
		// View 컨테이너
		_dkViewContainer = new Comp();
		_body.appendChild( _dkViewContainer.element );
		_dkViewContainer.css( {
								  position        : "absolute",
								  left            : _compX + _compWidth + _gap + "px",
								  top             : _compY + "px",
								  width           : _dkContainerWidth + "px",
								  height          : _dkContainerHeight + "px",
								  backgroundColor : "",
								  margin          : "0px",
								  padding         : "0px"
							  } );

		// Comp 컨테이너
		_compContainer = new Comp();
		_body.appendChild( _compContainer.element );
		_compContainer.css( {
								position        : "absolute",
								left            : _compX + "px",
								top             : _compY + "px",
								backgroundColor : "",
								margin          : "0px",
								padding         : "0px"
							} );
	};

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

	/**
	 * view 생성
	 */
	function initView() {
		var vw = ( _dkContainerWidth < 1000 ) ? 1000 : _dkContainerWidth;
		var vh = ( _dkContainerHeight < 500 ) ? 500 : _dkContainerHeight;
		// view 생성
		_dkView = Dk.dom( "div" ).css( "width", vw, "height", vh, "backgroundColor", "#000" );

		_dkViewContainer.element.appendChild( _dkView.pp("element") );

		_output = Dk.dom( "div" ).css( "left", 50, "top", 50, "width", 300, "height", 100, "backgroundColor", "#353740" )
			.tr( "addParent", _dkView );

		_boxContainer = Dk.dom( "div" ).css( "left", 400, "top", 50, "width", _dkContainerWidth - 450, "height", _dkContainerHeight - 100, "backgroundColor", "#353740" )
			.tr( "addParent", _dkView );
	};

	function initTree() {
		// tree 생성
		var comp = new Comp();
		_compContainer.element.appendChild( comp.element );
		comp.css( {
					  width : _compWidth + "px"
				  } );
		var str = "<b>Tree</b><br><br>";
		comp.html( str );

		var box;

		// numChildren
		( function() {
			var bt = new Button();
			comp.element.appendChild( bt.element );
			bt.value( "numChildren" );
			bt.element.onclick = function() {
				_output.tr( "text", "numChildren : " + _boxContainer.tr( "numChildren" ) );
			};

			comp.element.appendChild( document.createElement( "br" ) );
		}() );

		// addChild
		( function() {
			var bt = new Button();
			comp.element.appendChild( bt.element );
			bt.value( "addChild" );
			bt.element.onclick = function() {
				box = addChildBox();
			};

			comp.element.appendChild( document.createElement( "br" ) );
		}() );

		// addChildAt
		( function() {
			var bt = new Button();
			comp.element.appendChild( bt.element );
			bt.value( "addChildAt" );
			bt.element.onclick = function() {
				box = addChildAtBox( tf.value() );
			};

			var tf = new Input();
			comp.element.appendChild( tf.element );
			tf.value( 0 );

			comp.element.appendChild( document.createElement( "br" ) );
		}() );

		// getChildAt
		( function() {
			var bt = new Button();
			comp.element.appendChild( bt.element );
			bt.value( "getChildAt" );
			bt.element.onclick = function() {
				_output.tr( "text", _boxContainer.tr( "getChildAt", tf.value() ).tr( "text" ) );
			};

			var tf = new Input();
			comp.element.appendChild( tf.element );
			tf.value( 0 );

			comp.element.appendChild( document.createElement( "br" ) );
		}() );

		// getChildIndex
		( function() {
			var bt = new Button();
			comp.element.appendChild( bt.element );
			bt.value( "getChildIndex" );
			bt.element.onclick = function() {
				_output.tr( "text", _boxContainer.tr( "getChildIndex", box ) );
			};

			comp.element.appendChild( document.createElement( "br" ) );
		}() );

		// removeChild
		( function() {
			var bt = new Button();
			comp.element.appendChild( bt.element );
			bt.value( "removeChild" );
			bt.element.onclick = function() {
				_boxContainer.tr( "removeChild", box );
			};

			comp.element.appendChild( document.createElement( "br" ) );
		}() );

		// removeChildAt
		( function() {
			var bt = new Button();
			comp.element.appendChild( bt.element );
			bt.value( "removeChildAt" );
			bt.element.onclick = function() {
				_boxContainer.tr( "removeChildAt", tf.value() );
			};

			var tf = new Input();
			comp.element.appendChild( tf.element );
			tf.value( 0 );

			comp.element.appendChild( document.createElement( "br" ) );
		}() );

		// removeChildren
		( function() {
			var bt = new Button();
			comp.element.appendChild( bt.element );
			bt.value( "removeChildren" );
			bt.element.onclick = function() {
				trace( _boxContainer.tr( "removeChildren" ) );
			};

			comp.element.appendChild( document.createElement( "br" ) );
		}() );
	};

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	var addChildBox;
	var addChildAtBox;

	function makeBox() {
		return Dk.dom( "div" ).css( "width", 50,
									"height", 50,
									"position", "relative",
									'borderStyle', 'solid',
									'borderWidth', 1,
									'borderColor', '#000',
									'color', '#000' );
	};

	( function() {
		var count = 0;

		addChildBox = function() {
			count++;

			var box = makeBox();
			box.tr( "addParent", _boxContainer, "text", "box" + count )
				.css( "backgroundColor", "#FFFFFF" );

			return box;
		};

		addChildAtBox = function( $index ) {
			count++;

			var box = makeBox();
			box.css( "backgroundColor", "#CCCCCC" )
				.tr( "text", "box" + count );

			_boxContainer.tr( "addChildAt", [ box, $index ] );

			return box;
		};
	}() );

} )
;