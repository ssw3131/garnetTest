/**
 * Created by sewon on 2014-09-10.
 */
;
dk( function(){
	'use strict';
	var body = document.body;

    testTag();
    testSelctor();
    testElement();
    testCache();
    testS();
	testEvent();
    testStyle();
    testAjax();
    testJs();
    testImg();
	testPlugin();


//	log( dk.random() );
//	log( dk.randomInt( 2 ) );
//	log( dk.randomColor() );


	function testTag(){
		var a0 = dk.Dom( '<div></div>' );
		var a1 = dk.Dom( '<div style="height: 100px; background-color: #000000;"></div>' );
		var a2 = dk.Dom( '<button><p>test</p></button>' );
		var a3 = dk.Dom( '<div' );
		var a4 = dk.Dom();
		body.appendChild( a0.el );
		body.appendChild( a1.el );
		body.appendChild( a2.el );
		body.appendChild( a3.el );
		body.appendChild( a4.el );
		log( 'testTag' );
		log( a0 );
		log( a1 );
		log( a2 );
		log( a3 );
		log( a4 );
	}

	function testSelctor(){
		var a0 = dk.Dom( '#test' );
		var a1 = dk.Dom( 'div .test' );
		var a2 = dk.Dom( 'body nav div .menu' );
		log( 'testSelctor' );
		log( a0 );
		log( a1 );
		log( a2 );
	}

	function testElement(){
		var a0 = dk.Dom( document.getElementById( 'test' ) );
		var a1 = dk.Dom( document.getElementsByTagName( 'span' ) );
		var a2 = dk.Dom( [ document.getElementById( 'test1' ), document.getElementById( 'test2' ) ] );
		log( 'testElement' );
		log( a0 );
		log( a1 );
		log( a2 );
	}

	function testCache(){
		log( 'testCache : ' + dk.Dom( '#test' ) );
		var test1 = dk.Dom( '#test', null );
		log( 'testCache null : ' + test1 );
	}

	function testS(){
		var a0 = dk.Dom().S( 'width', 500, 'height', '200px', 'bgColor', '#000000', 'opacity', 1, '@width', 100 );
		a0.S( '<', 'body' );
		log( 'width : ' + a0.S( 'width' ) );
		log( '@width : ' + a0.S( '@width' ) );
		log( 'opacity : ' + a0.S( 'opacity' ) );
		log( 'bgColor : ' + a0.S( 'bgColor' ) );
		log( 'height : ' + a0.S( 'height' ) );

		var a1 = dk.Dom( '<div></div>' ).S( 'height', 100 );
		a1.S( '<', a0 );
		a1.S( 'height', null );
		log( 'height : ' + a1.S( 'height' ) );
	}

	function testEvent(){
		var a0 = dk.Dom().S( 'width', 500, 'height', 200, 'bgColor', '#dfdfdf' );
		a0.S( '<', 'body' );

		var a1 = dk.Dom().S( 'width', 300, 'height', 100, 'bgColor', '#333' );
		a1.S( '<', a0 );

		function handler( $e ){
			log( $e.target.S( 'width' ) + ' : ' + $e.type );
		}

		a0.S( 'click', handler, 'mouseover', handler, 'down', handler );
		a1.S( 'click', handler, 'mouseover', handler, 'down', handler );
	}

	function testStyle(){
		dk.Style( 'body' ).S( 'bgColor', '#666', 'margin', 100 );
		dk.Style( 'div' ).S( 'bgColor', '#fff', 'margin', 0 );
	}

	function testAjax(){
		dk.ajax( getTest, 'json/test1.txt' )
		function getTest( data ){
			log( '로딩완료-test1.txt', data )
		}

		// get을 이용한 제이슨/xml로딩 및 파싱테스트
		dk.ajax( getJSON_test, 'json/json.json' )
		function getJSON_test( d ){
			var data = JSON.parse( d );
			log( '로딩완료-json.json', data )
		}

		dk.ajax( getXMLtest, 'json/test.xml' )
		function getXMLtest(){
			var data = arguments[0]
			log( '로딩완료-test.xml', arguments[0] )
		}
	}

	function testJs(){
		dk.js( jsCallBack, 'js/test1.js' )
		function jsCallBack(){
			log( '로딩완료-js콜백테스트' )
		}

		dk.js( function(){
			log( 'js 멀티 로드완료' )
		}, 'js/test1.js', 'js/test2.js' )

		var str = dk.DETECTOR.browser == 'ie' ? encodeURIComponent( '언어의정원' ) : '언어의정원';

		function openAPICallBakcTest2( d ){
			log( d )
			console.log( d.channel.q, d )
		}

//		dk.js( openAPICallBakcTest2, 'http://apis.daum.net/contents/movie?apikey=' + 'bffaf40ba59dff1a741998dd1d594e122f4260af&q=' + str + '&output=json&callback=' )
	}

	function testImg(){
		dk.img( getImageTest, 'imgs/01.jpg', 'imgs/02.jpg', 'imgs/03.jpg', 'imgs/04.jpg', 'imgs/01.jpg', 'imgs/02.jpg', 'imgs/03.jpg', 'imgs/04.jpg' )
		function getImageTest( d ){
			console.log( '이미지로드!', d )
			var arr = dk.Dom( d ), i = arr.length;
			while( i-- ){
				arr[ i ].S( 'position', 'absolute', 'left', i * 100, 'top', i * 100, '<', 'body' );
			}
		}
	}

	function testPlugin(){
//		dk.pluginRoot( '/garnet/testCaseV0.2/plugin/' );
		dk.plugin( function(){
			var a0 = dk.Flash( 'flash' ).load( 'url', 'flash/flashAs2.swf', 'width', 800, 'height', 600, 'version', 9, 'wmode', 'transparent'/*, paramK, paramV...*/ );
			a0.S( 'bgColor', '#000000', '<', 'body', 'width', 400, 'height', 300 );
			dk.Dom().S( 'bgColor', '#ccc', '<', 'body', 'click', function(){
				a0.S( 'toFlash', 'test1()')
			} )
			dk.Dom().S( 'bgColor', '#ccc', '<', 'body', 'click', function(){
				a0.S( 'toFlash', 'test2( test, 1, 2 )' )
			} )
		}, 'flash' );
	}
} );
/*    dk( function(){
 var leng = 100000, i = leng;

 dk.timeCheck();
 while( i-- ){
 var t0 = 'MSXML2.XMLHTTP.6.0,MSXML2.XMLHTTP.5.0,MSXML2.XMLHTTP.4.0,MSXML2.XMLHTTP.3.0,MSXML2.XMLHTTP,Microsoft.XMLHTTP'.split( ',' ), j = t0.length;
 }
 log( dk.timeCheck() );

 i = leng;
 dk.timeCheck();
 while( i-- ){
 var t0 = [ 'MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP' ], j = t0.length;
 }
 log( dk.timeCheck() );
 })*/