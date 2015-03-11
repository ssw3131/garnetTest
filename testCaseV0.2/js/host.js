/**
 * Created by sewon on 2015-03-05.
 */
;
dk( function(){
	// css
	dk.Css( 'body' ).S( 'margin', 0, 'padding', 0, 'bgColor', '#eceef4', 'color', '#808081', 'font', '12px/18px Helvetica, Arial, Nanum Gothic, AppleGothic, Dotum, Sans-Serif' ),
		dk.Css( 'a:link, a:visited, a:active' ).S( 'color', '#808081', 'textDecoration', 'none' ),
		dk.Css( 'a:hover' ).S( 'color', '#222', 'textDecoration', 'underline' ),
		dk.Css( '.hr2' ).S( 'margin', '30px 0', 'borderTop', '1px solid #aaa' ),
		dk.Css( '.hr3' ).S( 'margin', '10px 0', 'borderTop', '1px dashed #bbb' ),

		dk.Css( '#container' ).S( 'margin', 30, 'padding', 30, 'maxWidth', 1200, 'minWidth', 300, 'bgColor', '#fff', 'border', '1px solid #c9c9c9', 'boxShadow', '0px 0px 8px #62615f inset', 'borderRadius', 16 ),
		dk.Css( '#container h1' ).S( 'color', '#444' );
		dk.Css( '#container h2' ).S( 'color', '#1a99aa' );
} )