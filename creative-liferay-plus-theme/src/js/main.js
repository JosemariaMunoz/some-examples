(function($) {
    // Activate scrollspy to add active class to navbar items on scroll
    // If body height is > than total content height
	if (parseInt($(window).height()) < parseInt($('#wrapper').height()) ) {
		$('body').scrollspy({
			target: '#mainNav',
			offset: 57
		});
	
		// Collapse Navbar
		var navbarCollapse = function() {
			if ($("#mainNav").offset().top > 100) {
				$("#mainNav").addClass("navbar-shrink");
			} else {
				$("#mainNav").removeClass("navbar-shrink");
			}
		};
		// Collapse now if page is not at top
		navbarCollapse();

		// Collapse the navbar when page is scrolled
		$(window).scroll(navbarCollapse);
	} else {
		$("#mainNav").addClass("navbar-shrink");
	}

})(jQuery);