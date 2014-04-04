/**
 * Created by ssw on 14. 1. 22.
 */
"use strict";


df.ready( function() {
	var W = window, doc = document, body = doc.body, sprite = df.sprite, util = df.util;
	var data = dfData, total = data.draft.length, stageWidth = util.widthWindow(), stageHeight = util.heightWindow(), gap = 41, container, bg, title, logo, boxArr = [], subContainer, home;

	init();

	function init() {
		initBase();
		initBox();
		initHome();

		initResize();
	};

	function initBase() {
		container = new sprite( "div" );
		container.css( "width", stageWidth + "px", "height", stageHeight + "px", "background-color", "#111" );
		body.appendChild( container.dom );

		bg = new sprite( "ui" );
		bg.css( "width", stageWidth - gap * 2 + "px", "height", stageHeight - gap * 2 + "px", "margin", gap + "px", "background-image", "url('asset/bg.jpg')", "background-size", "cover" );
		container.addChild( bg );

		logo = new sprite( "img" );
		logo.atr( "src", "asset/logo.png" );
		logo.css( "left", stageWidth - gap - 70 + "px", "top", stageHeight - 31 + "px" );
		container.addChild( logo );

		title = new sprite( "div" );
		title.css( "left", gap + "px", "top", "10px", "font", "16px Nanum Gothic", "color", "#FFF", "font-smoothing", "antialiased" );
		title.innerHTML( data.title );
		container.addChild( title );
	}

	function initBox() {
		var i, box, cel = 1 / ( total * 8 + 1 ) * 100;
		for ( i = 0; i < total; i++ ) {
			box = new spriteBox();
			if ( i == 0 ) box.container.css( "width", cel * 7 + "%", "margin", "0% " + cel + "%" );
			else box.container.css( "width", cel * 7 + "%", "margin-right", cel + "%" );
			box.container.css( "top", util.heightElement( bg.dom ) * 0.15 + "px" );

			box.type.innerHTML( "TYPE" + ( i + 1 ) );

			box.content.id = i;
			box.content.css( "background-image", "url(" + data.draft[ i ].thumbUrl + ")", "background-position", data.draft[ i ].thumbPosition, "background-size", "cover" );
			box.content.addListener( "mouseover", boxOver );
			box.content.addListener( "mouseout", boxOut );
			box.content.addListener( "click", boxClick );

			bg.addChild( box.container );

			boxArr[ i ] = box;
		}
	}

	function boxOver( $e ) {
		var content = $e.currentTarget;
		TweenLite.killTweensOf( content.dom );
		TweenLite.to( content.dom, 0.5, { top : -20, ease : Quint.easeOut } );
	}

	function boxOut( $e ) {
		var content = $e.currentTarget;
		TweenLite.killTweensOf( content.dom );
		TweenLite.to( content.dom, 0.5, { top : 0, ease : Quint.easeOut } );
	}

	function boxClick( $e ) {
		var id = $e.currentTarget.id;
		TweenLite.to( container.dom, 1, { top : -stageHeight, ease : Quint.easeInOut } );

		setTimeout( function() {
			var dataDraft = data.draft[ id ];
			body.removeChild( container.dom );
			if ( dataDraft.type == "img" ) activateImg( dataDraft.data );
			else if ( dataDraft.type == "html" ) activateHtml( dataDraft.data );
			else if ( dataDraft.type == "embed" ) activateEmbed( dataDraft.data );
		}, 1000 );

	}

	function initHome() {
		var timer;
		home = new sprite( "div" );
		home.css( "top", "-35px", "width", "100%", "height", "40px", "font", "16px/40px Nanum Gothic", "text-align", "center", "color", "#FFF", "background-color", "#000", "z-index", "100", "opacity", 0 );
		home.innerHTML( "GO GATE" );
		body.appendChild( home.dom );

		home.addListener( "mouseover", function() {
			clearTimeout( timer );
			TweenLite.to( home.dom, 0.5, { top : 0, opacity : 0.8, ease : Quint.easeOut } );
		} )

		home.addListener( "mouseout", function() {
			timer = setTimeout( function(){
				TweenLite.to( home.dom, 0.5, { top : -35, opacity : 0, ease : Quint.easeOut } );
			}, 1000 );
		} )

		home.addListener( "click", function() {
			TweenLite.to( home.dom, 0.5, { top : -35, opacity : 0, ease : Quint.easeOut } );
			TweenLite.to( subContainer.dom, 1, { opacity : 0, ease : Quint.easeOut } );
			setTimeout( function() {
				body.removeChild( subContainer.dom );

				body.appendChild( container.dom );
				TweenLite.to( container.dom, 1, { top : 0, ease : Quint.easeOut } );
			}, 1000 );

		} )
	}

	function activateImg( $data ) {
		var leng = $data.length, i = leng, img, imgArr = [];

		subContainer = new sprite( "div" );
		subContainer.css( "width", "100%", "height", "100%" );
		body.appendChild( subContainer.dom );

		while ( i-- ) {
			img = new sprite( "img" );
			subContainer.addChild( img );
			img.atr( "src", $data[ i ] );
			if ( i == 0 ) img.css( "display", "block", "left", "50%", "margin-left", -img.atr( "width" ) / 2 + "px" );
			else img.css( "display", "none", "left", "50%", "margin-left", -img.atr( "width" ) / 2 + "px" );

			util.onLoad( img.dom, function( $element ) {
				$element.style.marginLeft = -$element.width / 2 + "px";
			} );

			imgArr[ i ] = img;

			img.id = i;
			img.addListener( "click", function( $e ) {
				var id = $e.currentTarget.id, oldImg = imgArr[ id ], currentImg;
				currentImg = ( ++id >= leng ) ? imgArr[ 0 ] : imgArr[ id ];
				oldImg.css( "display", "none" );
				TweenLite.killTweensOf( currentImg.dom );
				currentImg.css( "display", "block", "opacity", 0 );
				TweenLite.to( currentImg.dom, 2, { opacity : 1, ease : Quint.easeOut } );
			} );
		}

		subContainer.css( "top", -imgArr[ 0 ].atr( "height" ) + "px" );
		TweenLite.to( subContainer.dom, 1, { delay : 0.5, top : 0, ease : Quint.easeOut } );
	}

	function activateHtml( $data ) {
		subContainer = new sprite( "div" );
		subContainer.css( "width", "100%", "height", "100%" );
		body.appendChild( subContainer.dom );

		var ifr = new sprite( "iframe" );
		ifr.atr( "src", $data, "width", "100%", "height", "100%" );
		ifr.css( "border", 0 );
		subContainer.addChild( ifr );

		subContainer.css( "top", -stageHeight + "px" );
		TweenLite.to( subContainer.dom, 1, { delay : 0.5, top : 0, ease : Quint.easeOut } );
	}

	function activateEmbed( $data ) {
		subContainer = new sprite( "div" );
		subContainer.css( "width", "100%", "height", "100%" );
		body.appendChild( subContainer.dom );

		subContainer.innerHTML( $data );

		subContainer.css( "top", -stageHeight + "px" );
		TweenLite.to( subContainer.dom, 1, { delay : 0.5, top : 0, ease : Quint.easeOut } );
	}

	function initResize() {
		df.managerResize.add( "draftHost", resize )
	}

	function resize() {
//		stageWidth = util.widthElement( body ), stageHeight = util.heightElement( body );
		stageWidth = util.widthWindow(), stageHeight = util.heightWindow();

		container.css( "width", stageWidth + "px", "height", stageHeight + "px" );
		bg.css( "width", stageWidth - gap * 2 + "px", "height", stageHeight - gap * 2 + "px" );
		logo.css( "left", stageWidth - gap - 70 + "px", "top", stageHeight - 31 + "px" );

		var i = total;
		while ( i-- ) {
			boxArr[ i ].container.css( "top", ( stageHeight - gap * 2 ) * 0.15 + "px" );
		}
	}

	function spriteBox() {
		var me = this, container, content, type;
		container = new sprite( "li" );
		container.css( "position", "relative", "float", "left", "height", "80%" );

		content = new sprite( "div" );
		content.css( "position", "relative", "width", "100%", "height", "88%", "box-shadow", "50px 50px 150px #354c5a", "cursor", "pointer" );
		container.addChild( content );

		type = new sprite( "div" );
		type.css( "position", "relative", "width", "100%", "height", "12%", "font", "16px/30px Nanum Gothic", "color", "#FFF", "font-smoothing", "antialiased" );
		container.addChild( type );

		me.container = container;
		me.content = content;
		me.type = type;
	}

} );