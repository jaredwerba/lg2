/*jshint browser: true*/
/*global google, WOW, jQuery*/

// Form messages after submit
(function($) {
  "use strict";

  $.fn.formAlert = function (resp) {
    if (resp && resp.msg) {
      this.html(resp.msg);
    }

    if (resp && resp.status) {
      if (resp.status === 'OK') {
        this.attr('class', 'alert alert-success');
      } else {
        this.attr('class', 'alert alert-danger');
      }
    } else {
      this.attr('class', 'hidden');
    }
  };

  $(window).load(function() {
    // Loader
    $('.loader').fadeOut(1000);
    $('.loader-bg').fadeOut(1000);
  });

  $(function() {
    var magnificPopupConfig = {
        mainClass: 'animated fadeIn', // edit the main class animation with your desired effect, check http://daneden.github.io/animate.css/
        type: 'ajax',
        callbacks: {
          ajaxContentAdded: function() {
            $("#portfolio-slides").owlCarousel({
              navigation : false,
              pagination:true,
              singleItem:true,
              autoPlay:true,
              theme: "portfolio-theme",
            });
          }
        }
      }; 

    //Init WOW for Animations
    new WOW().init();  
    
    // Close the menu when clicked
    $(".navbar-nav a").click(function () {
      $(".navbar").toggleClass("closed open");  
      if($(".nav-btn > i").hasClass("fa-times")){
         $(".nav-btn > i").removeClass("fa-times");
         $(".nav-btn > i").addClass("fa-bars");
       }else{
         $(".nav-btn > i").removeClass("fa-bars");
         $(".nav-btn > i").addClass("fa-times");
        }
      return true;
    });
    
    // Toggle menu (slide-in/slide-out)
    $(".nav-btn").click(function () {
      $(".navbar").toggleClass('closed open');
      return true;
    });
    
     // Toggle nav button icon
    $(".nav-btn").click(function () {
      $(".nav-btn > i").toggleClass('fa-bars fa-times');
      return true;
    });
    
  
    // Smooth Scrolling
    $('body').on('click', 'a.scroll', function(e) {
      var h = this.hash;
      if (h) { //if the link has a hash
        // prevent default anchor click behavior
        e.preventDefault();
        // animate
        $('html, body').animate({
          scrollTop: $(h).offset().top
        }, 1000, function(){
          // when done, add hash to url
          // (default click behaviour)
          window.location.hash = h;
        });
      }
    });
    
    // To top button
    $(window).scroll(function () {
          if ($(this).scrollTop() > 100) {
              $('.to-top-btn').fadeIn(600);
          } else {
              $('.to-top-btn').fadeOut(200);
          }
      });

      $('.to-top-btn').click(function () {
          $("html, body").animate({
              scrollTop: 0
          }, 1000);
          return false;
      });

    // Magnific Popup
    $('.ajax-popup-link').magnificPopup(magnificPopupConfig);
  
    $('.po-more').click(function () {
      var $this = $(this),
        target = $this.data('show'),
        source = $this.data('load-from'),
        $t = target ? $(target) : $('<div/>').afterTo($this);
  
      $t.hide()
        .removeClass('hidden')
        .addClass('row works-hover')
        .fadeIn(1000);
      $this.hide();
  
      //If we define a loadsource data attribute we try to get the content
      //with an ajax request:
      if (source) {
        $t.html('<div class="loader"></div>');
        $t.load(source, function () {
          //activate the magnific popup to the newly loaded content
          $t.find('.ajax-popup-link').magnificPopup(magnificPopupConfig);
        });
      }
    });

    //Ovveride the browser's submit with an ajax post:
    $('#contact-form').submit(function (e) {
      var $this = $(this),
        url = $this.attr('action');

      e.preventDefault();

      $.ajax({
        url: url,
        data: $this.serialize(),
        type: 'post',
        dataType: 'json',
        success: function (resp) {
          //console.log(resp);
          $('#contact-form-msg').formAlert(resp);
        }
      });

      //disable any further form interaction
      $this.hide(600); //hide it

      return false;
    });


    $("#service-slides").owlCarousel({
      navigation : false,
      pagination:true,
      singleItem:true,
      stopOnHover:true,
      autoPlay:true,
      theme: "service-theme",
    });

    $("#quote-slides").owlCarousel({
      navigation : false,
      pagination:true,
      singleItem:true,
      stopOnHover:true,
      autoPlay:true,
      theme: "quote-theme",
    });

    $("#blog-slides").owlCarousel({
      navigation : false,
      pagination:true,
      singleItem:true,
      stopOnHover:true,
      autoPlay:true,
      theme: "blog-theme",
    });

    $("#about-slides").owlCarousel({
      navigation : false,
      pagination:true,
      singleItem:true,
      stopOnHover:true,
      autoPlay:true,
      theme: "about-theme",
    });
  });


  // Google Maps
  google.maps.event.addDomListener(window, 'load', function () {
    var mapOptions = {
      center: new google.maps.LatLng(47.368650,8.539183),
      zoom: 11,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
      },
      disableDoubleClickZoom: true,
      panControl: false,
      mapTypeControl: false,
      scaleControl: false,
      scrollwheel: false,
      streetViewControl: false,
      draggable : true,
      overviewMapControl: true,
      overviewMapControlOptions: {
        opened: false,
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          stylers:[{hue:'#3498db'},{saturation:250}]
        },
        {
          featureType:'road',
          elementType:'geometry',
          stylers:[{lightness:50},{visibility:'simplified'}]
        },
        {
          featureType:'road',
          elementType:'labels',
          stylers:[{visibility:'off'}]
        }
      ]
    },
    mapElement = document.getElementById('map'),
    map = new google.maps.Map(mapElement, mapOptions),
    locations = [
      ['Zurich', 47.368650, 8.539183, 11]
    ];
  
    var marker = [];
    for (var i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        icon: 'img/marker.png',
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
    }
  });

}(jQuery));

/**
 * Parallax Scrolling  
 * Author: Mohiuddin Parekh
 *	http://www.mohi.me
 * 	@mohiuddinparekh   
 */


$( window ).resize(function() {
$window = $(window);
if( $window .width() > 800){

 $('section[data-type="background"]').each(function(){
 var $bgobj = $(this); // assigning the object

  $(window).scroll(function() {

    // Scroll the background at var speed
    // the yPos is a negative value because we're scrolling it UP!                              
    var yPos = -( ($window.scrollTop() - $bgobj.offset().top) / $bgobj.data('speed'));

    // Put together our final background position
    var coords = '50% '+ yPos + 'px';

    // Move the background
    $bgobj.css({ backgroundPosition: coords });

 }); // window scroll Ends

 });    
}
});

$(document).ready(function(){
$window = $(window);
if( $window.width() > 800){
// Cache the Window object

 $('section[data-type="background"]').each(function(){
 var $bgobj = $(this); // assigning the object

  $(window).scroll(function() {

    // Scroll the background at var speed
    // the yPos is a negative value because we're scrolling it UP!                              
    var yPos = -( ($window.scrollTop() - $bgobj.offset().top) / $bgobj.data('speed'));

    // Put together our final background position
    var coords = '50% '+ yPos + 'px';

    // Move the background
    $bgobj.css({ backgroundPosition: coords });

 }); // window scroll Ends

 });    
}
}); 
/* 
 * Create HTML5 elements for IE's sake
 */

document.createElement("article");
document.createElement("section");
