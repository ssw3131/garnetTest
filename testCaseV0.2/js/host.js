/**
 * Created by sewon on 2015-03-05.
 */
;
dk( function(){
	// css
	dk.Style( 'body' ).S( 'margin', 0, 'padding', 0, 'bgColor', '#eceef4', 'color', '#808081', 'font', '12px/18px Helvetica, Arial, Nanum Gothic, AppleGothic, Dotum, Sans-Serif' ),
		dk.Style( 'a:link, a:visited, a:active' ).S( 'color', '#808081', 'textDecoration', 'none' ),
		dk.Style( 'a:hover' ).S( 'color', '#222', 'textDecoration', 'underline' ),
		dk.Style( '.hr2' ).S( 'margin', '30px 0', 'borderTop', '1px solid #aaa' ),
		dk.Style( '.hr3' ).S( 'margin', '10px 0', 'borderTop', '1px dashed #bbb' ),

		dk.Style( '#container' ).S( 'margin', 30, 'padding', 30, 'maxWidth', 1200, 'bgColor', '#fff', 'border', '1px solid #c9c9c9', 'boxShadow', '0px 0px 10px #62615f inset', 'borderRadius', 20 ),
		dk.Style( '#container h1' ).S( 'color', '#1a99aa' ),
		SyntaxHighlighter.all();
} )