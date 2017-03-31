"use strict";

$(document).ready(function() {

	// smooth scroll plugin init
	$('body').easeScroll({
		frameRate: 60,
		animationTime: 1000,
		stepSize: 120,
		pulseAlgorithm: !0,
		pulseScale: 8,
		pulseNormalize: 1,
		accelerationDelta: 20,
		accelerationMax: 1,
		keyboardSupport: !0,
		arrowScroll: 50
	});	

	if (Modernizr.touch) {
		// better hover on mobile devices
		// run the forEach on each figure element
		[].slice.call(document.querySelectorAll('a, button')).forEach(function(el, i) {
			// check if the user moves a finger
			var fingerMove = false;
			el.addEventListener('touchmove', function(e) {
				e.stopPropagation();
				fingerMove = true;
			});
			// always reset fingerMove to false on touch start
			el.addEventListener('touchstart', function(e) {
				e.stopPropagation();
				fingerMove = false;
			});
		});
		// - better hover on mobile devices

	};

	// animated counters
	$('.js-counterup').counterUp({
		delay: 10,
		time: 3000,
		formatter: function (n) {
			return n.replace(/,/g, '.');
		}
	});

	// animated skillbars
	function animateSkillbars(skillbar, duration, easing)
	{
		$(skillbar).waypoint(function(direction) {
			var percentLabel = $(skillbar).find('.skillbar__percentage');
			var percentValue = parseInt(percentLabel.data('skillbar-percent'), 10);
			var progressBar = $(skillbar).find('.skillbar__progress-bar');

			$({countNum: 0}).stop().animate({countNum: percentValue}, {
				duration: duration,
				easing: easing,
				step: function() {
					percentLabel.text(parseInt(this.countNum, 10)+1 + '%');
					$(progressBar).find('.skillbar__progress-bar-active').css({
							'transform':'translateX(' + this.countNum + '%)'
							}
						);
				},
				complete: function() {
					stop();
					percentValue = 0;
				}
			});
			this.destroy()
		}, {
			offset: '150%'
		});
	}

	// skillbars animations on scroll
	$('.js-skillbar').each(function() {
		animateSkillbars(this, 3000, 'easeInOutCubic');
	});

	// video player
	$('.js-video-link').on('click', function(e) {
		e.preventDefault();
		var videoContainer = $(this).attr('data-video-target');
		$(videoContainer).html('<iframe id="video-container" width="100%" height="100%" src="https://www.youtube.com/embed/3ET1wM5qUpM?&autoplay=1&loop=1&controls=0&rel=0&wmode=transparent" allowfullscreen></iframe>');
	});	

	// equal heights for pricing tables
	$('.js-pricing-group-1-features-equalheight').equalHeights();
	$('.js-pricing-group-2-features-equalheight').equalHeights();

	// contact form handling
    $('.js-form-contact').on('submit', function(e) {
    	e.preventDefault();
    	var mailerURL = $(this).attr('action');
    	var mailerMethod = $(this).attr('method');
    	// validity polyfill for Safari browser
        if (e.target.checkValidity()) {
	        $.ajax({
	            type: mailerMethod,
	            url: mailerURL,
	            data: $(this).serialize()
	        }).done(function() {
	            alert('Thanks for your message! We will reply you as soon as possible.');
	        }).fail(function() {
	            alert('Something went wrong :( Please contact us directly by email.');
	        });
        } else {
            alert('Please fill out the required fields.'); // error message
	    }
    });	

});