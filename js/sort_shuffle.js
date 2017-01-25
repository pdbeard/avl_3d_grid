'use strict';

var Shuffle = window.shuffle;

// ES7 will have Array.prototype.includes.
function arrayIncludes(array, value) {
  return array.indexOf(value) !== -1;
}

// Convert an array-like object to a real array.
function toArray(thing) {
  return Array.prototype.slice.call(thing);
}

var Demo = function (element) {
  this.all      = toArray(document.querySelectorAll('.js-all li a'));
  this.display  = toArray(document.querySelectorAll('.js-display li a'));
  this.location = toArray(document.querySelectorAll('.js-location li a'));
  this.material = toArray(document.querySelectorAll('.js-material li a'));
  this.service  = toArray(document.querySelectorAll('.js-service li a'));

  this.shuffle = new Shuffle (element, {
    itemSelector: '[class*="col-"]',
    easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
    sizer: '.shuffle_sizer',
  });

  this.filters = {
    all: [],
    display:  [],
    location: [],
    material: [],
    service:  [],
  };

  this._bindEventListeners();
};

/**
 * Bind event listeners for when the filters change.
*/
Demo.prototype._bindEventListeners = function () {
  this._onAllChange      = this._handleAllChange.bind(this);
  this._onDisplayChange  = this._handleDisplayChange.bind(this);
  this._onLocationChange = this._handleLocationChange.bind(this);
  this._onMaterialChange = this._handleMaterialChange.bind(this);
  this._onServiceChange  = this._handleServiceChange.bind(this);

  this.display.forEach(function (a) {
    a.addEventListener('click', this._onDisplayChange);
  }, this);
  this.location.forEach(function (a) {
    a.addEventListener('click', this._onLocationChange);
  }, this);
  this.material.forEach(function (a) {
    a.addEventListener('click', this._onMaterialChange);
  }, this);
  this.service.forEach(function (a) {
    a.addEventListener('click', this._onServiceChange);
  }, this);
};


/**
 * Get the values of each `active` button.
 * @return {Array.<string>}
 */
Demo.prototype._getCurrentAllFilters = function () {
  return this.all.filter(function (a) {
    return a.classList.contains('active');
  }).map(function (a) {
    return a.getAttribute('data-group');
  });
};
Demo.prototype._getCurrentDisplayFilters = function () {
  return this.display.filter(function (a) {
    return a.classList.contains('active');
  }).map(function (a) {
    return a.getAttribute('data-group');
  });
};
Demo.prototype._getCurrentLocationFilters = function () {
  return this.location.filter(function (a) {
    return a.classList.contains('active');
  }).map(function (a) {
    return a.getAttribute('data-group');
  });
};
Demo.prototype._getCurrentMaterialFilters = function () {
  return this.material.filter(function (a) {
    return a.classList.contains('active');
  }).map(function (a) {
    return a.getAttribute('data-group');
  });
};
Demo.prototype._getCurrentServiceFilters = function () {
  return this.service.filter(function (a) {
    return a.classList.contains('active');
  }).map(function (a) {
    return a.getAttribute('data-group');
  });
};


/**
 * A button was clicked. Update filters and display.
 * @param {Event} evt Click event object.
 */



Demo.prototype._handleAllChange = function (evt) {
  var button = evt.currentTarget;
  // Treat these buttons like radio buttons where only 1 can be selected.
  if (button.classList.contains('active')) {
    button.classList.remove('active');
  } else {
    this.display.forEach(function (btn) {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  }
  this.filters.all = this._getCurrentAllFilters();
  this.filter();
};
Demo.prototype._handleDisplayChange = function (evt) {

  var all_buttons = toArray(document.querySelectorAll('.js-all li a'));
  console.log(all_buttons);

  var button = evt.currentTarget;

  for (var i = 0; i < all_buttons.length; i++){
    //Treat these buttons like radio buttons where only 1 can be selected.
    if (all_buttons[i].classList.contains('active')) {
      all_buttons[i].classList.remove('active');
    }
  }
      this.all.forEach(function (btn) {
        btn.classList.remove('active');
      });
      button.classList.add('active');

  this.filters.all = this._getCurrentAllFilters();
  this.filter();
};
Demo.prototype._handleLocationChange = function (evt) {
  var button = evt.currentTarget;
  // Treat these buttons like radio buttons where only 1 can be selected.
  if (button.classList.contains('active')) {
    button.classList.remove('active');
  } else {
    this.location.forEach(function (btn) {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  }
  this.filters.location = this._getCurrentLocationFilters();
  this.filter();
};
Demo.prototype._handleMaterialChange = function (evt) {
  var all_buttons = toArray(document.querySelectorAll('.js-all li a'));
  var display_buttons = toArray(document.querySelectorAll('.js-display li a'));
  console.log(all_buttons);

  for (var i = 0; i < display_buttons.length; i++){
    //Treat these buttons like radio buttons where only 1 can be selected.
    if (display_buttons[i].classList.contains('active')) {
      display_buttons[i].classList.remove('active');
    }
  }


  var button = evt.currentTarget;
  // Treat these buttons like radio buttons where only 1 can be selected.
  if (button.classList.contains('active')) {
    button.classList.remove('active');
  } else {
    this.material.forEach(function (btn) {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  }

  this.filters.material = this._getCurrentMaterialFilters();
  this.filter();
};
Demo.prototype._handleServiceChange = function (evt) {
  var button = evt.currentTarget;
  // Treat these buttons like radio buttons where only 1 can be selected.
  if (button.classList.contains('active')) {
    button.classList.remove('active');
  } else {
    this.service.forEach(function (btn) {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  }
  this.filters.service = this._getCurrentServiceFilters();
  this.filter();
};

/**
 * Filter shuffle based on the current state of filters.
 */
Demo.prototype.filter = function () {

  console.log(this.itemPassesFilters.bind(this));

  if (this.hasActiveFilters()) {
    this.shuffle.filter(this.itemPassesFilters.bind(this));
  } else {
    this.shuffle.filter(Shuffle.ALL_ITEMS);
  }
};
/**
 * If any of the arrays in the `filters` property have a length of more than zero,
 * that means there is an active filter.
 * @return {boolean}
 */
Demo.prototype.hasActiveFilters = function () {
  return Object.keys(this.filters).some(function (key) {console.log("filter key: "+key);
    return this.filters[key].length > 0;
  }, this);
};

/**
 * Determine whether an element passes the current filters.
 * @param {Element} element Element to test.
 * @return {boolean} Whether it satisfies all current filters.
 */
Demo.prototype.itemPassesFilters = function (element) {
  var alls = this.filters.all;
  var displays = this.filters.display;
  var locations = this.filters.location;
  var materials = this.filters.material;
  var services = this.filters.service;
  var all = element.getAttribute('data-display');
  var display = element.getAttribute('data-display');
  var location = element.getAttribute('data-location');
  var material = element.getAttribute('data-material');
  var service = element.getAttribute('data-service');


//  console.log(alls.length > 0 && !arrayIncludes(alls, all));
  // If there are active shape filters and this shape is not in that array.
  if (alls.length > 0 && !arrayIncludes(alls, all)) {
    return false;
  }
  if (locations.length > 0 && !arrayIncludes(locations, location)) {
    return false;
  }
  if (materials.length > 0 && !arrayIncludes(materials, material)) {
    return false;
  }
  if (services.length > 0 && !arrayIncludes(services, service)) {
    return false;
  }
  if (displays.length > 0 && !arrayIncludes(displays, display)) {
    return false;
  }
  return true;
};

document.addEventListener('DOMContentLoaded', function () {
  window.demo = new Demo(document.querySelector('#grid'));
  listen();
});

//Reloads Img's location when page loads. Using old jquery library :(
var $grid = $('#grid');
var listen = function() {
  var debouncedLayout = $.throttle( 300, function() {
    $grid.shuffle('update');
  });

  // Get all images inside shuffle
  $grid.find('img').each(function() {
    var proxyImage;

    // Image already loaded
    if ( this.complete && this.naturalWidth !== undefined ) {
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    proxyImage = new Image();
    $( proxyImage ).on('load', function() {
      $(this).off('load');
      debouncedLayout();
    });

    proxyImage.src = this.src;
  });

  // Because this method doesn't seem to be perfect.
  setTimeout(function() {
    debouncedLayout();
  }, 500);
};










//  var $grid = $('#grid'), //locate what we want to sort
//      $filterOptions = $('.portfolio-sorting li'),  //locate the filter categories
//      $sizer = $grid.find('.shuffle_sizer'),    //sizer stores the size of the items
//
//  init = function() {
//
//    // None of these need to be executed synchronously
//    setTimeout(function() {
//      listen();
//      setupFilters();
//    }, 100);
//
//    // instantiate the plugin
//    $grid.shuffle({
//      itemSelector: '[class*="col-"]',
//      sizer: $sizer
//    });
//  },
//
//
//
//  // Set up button clicks
//  setupFilters = function() {
//    var $btns = $filterOptions.children();
//    $btns.on('click', function(e) {
//      e.preventDefault();
//      var $this = $(this),
//          isActive = $this.hasClass( 'active' ),
//          group = isActive ? 'all' : $this.data('group');
//
//      // Hide current label, show current label in title
//      if ( !isActive ) {
//        $('.portfolio-sorting li a').removeClass('active');
//      }
//
//      $this.toggleClass('active');
//
//      // Filter elements
//      $grid.shuffle( 'shuffle', group );
//    });
//
//    $btns = null;
//  },
//
//  // Re layout shuffle when images load. This is only needed
//  // below 768 pixels because the .picture-item height is auto and therefore
//  // the height of the picture-item is dependent on the image
//  // I recommend using imagesloaded to determine when an image is loaded
//  // but that doesn't support IE7
//  listen = function() {
//    var debouncedLayout = $.throttle( 300, function() {
//      $grid.shuffle('update');
//    });
//
//    // Get all images inside shuffle
//    $grid.find('img').each(function() {
//      var proxyImage;
//
//      // Image already loaded
//      if ( this.complete && this.naturalWidth !== undefined ) {
//        return;
//      }
//
//      // If none of the checks above matched, simulate loading on detached element.
//      proxyImage = new Image();
//      $( proxyImage ).on('load', function() {
//        $(this).off('load');
//        debouncedLayout();
//      });
//
//      proxyImage.src = this.src;
//    });
//
//    // Because this method doesn't seem to be perfect.
//    setTimeout(function() {
//      debouncedLayout();
//    }, 500);
//  };
//
//  return {
//    init: init
//  };
//}( jQuery ));
//
//$(document).ready(function()
//{
//  shuffleme.init(); //filter portfolio
//});
