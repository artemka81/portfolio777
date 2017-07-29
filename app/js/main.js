/* Mobile menu for guest */
$('.menu-toggle').on('click', function(){
	$('#wrapper-nav').toggleClass('wrapper-nav--open');
})

$('.nav-mobile').on('click', function(){
	$('#wrapper-nav.wrapper-nav--open').removeClass('wrapper-nav--open');
})

