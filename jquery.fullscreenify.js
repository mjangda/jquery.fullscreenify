/*
 * jQuery.fullscreenify - jQuery plugin to easily make elements fullscreen!
 *
 * Copyright (c) 2010 Mohammad Jangda (http://digitalize.ca)
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 */
;(function($) {

	// TODO: Move everything under one namespace

    $.fn.makeFullscreen = function(options) {
        var defaults = {
            fullscreenClass: 'fullscreenify'
            , closeBtnClass: 'close-button'
			, closeBtnText: 'Close'
			, resizeEvent: 'resize,orientationchange'
        }
        var settings = $.extend({}, defaults, options);
        
        return this.each(function(){
            var $el = $(this);
            $el.data('fullscreen-settings', settings);
            
            // Set up events to resize the element when it changes
            jQuery(window).bind(settings.resizeEvent, function() {
                $el.resizeFullscreen();
            });

            $close = $el.find(settings.closeBtnClass);
            if($close.length == 0) {
                $close = $('<span/>')
                    .addClass(settings.closeBtnClass)
                    .text(settings.closeBtnText)
                    .appendTo($el)
					.hide()
                    ;
            }
            $el.data('fullscreen-close', $close);
            $close.bind('click', function() {
                $el.hideFullscreen();
            });
        });
    }

    $.fn.toggleFullscreen = function(){
        return this.each(function(){
            var $el = $(this);
            var settings = $el.data('fullscreen-settings');

            if( $el.hasClass(settings.fullscreenClass) ) {
                $el.hideFullscreen();
            } else {
                $el.showFullscreen();
            }
        });
    }

    $.fn.showFullscreen = function(){
        return this.each(function(){
            var $el = $(this);
            var $close = $el.data('fullscreen-close');
            var settings = $el.data('fullscreen-settings');
            
            // Cache the parent
            $el.data('fullscreen-parent', $el.parent());
            
            $close.show();
            //$el.appendTo( $('body') );
            $el.addClass(settings.fullscreenClass);
            
            if(typeof(settings.showCallback) === 'function')
                settings.showCallback($el);
        });
    }
    
    $.fn.hideFullscreen = function(){
        return this.each(function(){
            var $el = $(this);         
            var $close = $el.data('fullscreen-close');
            var $parent = $el.data('fullscreen-parent');
            var settings = $el.data('fullscreen-settings');
            
            $close.hide();
            $el.removeClass(settings.fullscreenClass);
            //$el.appendTo( $parent );
            
            if(typeof(settings.hideCallback) === 'function')
                settings.hideCallback($el);
        });
    }
    $.fn.resizeFullscreen = function(){
        return this.each(function(){
            var $el = $(this);         
            var settings = $el.data('fullscreen-settings');
            
            // Resize the map to the size of the page
            var width = $(window).width();
            var height = $(window).height();
            
            $el.css({height: height, width: width});
            
            if(typeof(settings.resizeCallback) === 'function')
                settings.resizeCallback($el);
        });
    }
})(jQuery);