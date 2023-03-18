var ScrollPage = {   
  /**
   * Pixels where the anchor is hidden
   */
  pxHidded: -100,
   
  /**
   * Pixels for showing the anchor
   */
  pxShowed: 20,
   
  /**
   * Flag que indica si el mouse esta en movimiento
   */
  isMovement: false,

  /**
   * Flag que indica si se esta haciendo scrolling
   */
  scrolling: false,
    
  /**
   *
   */
  inTop: true,
    
  /**
   * Initializes the navigation system
   */
  init: function(){        
    var _this = this;

    if (typeof window.onhashchange === 'undefined') {
      throw new Exception("hashchange not available.");
    }

    // Handle hash change
    $(window).bind('hashchange', function(e){
      _this.navigateTo(window.location.hash);
    });

    var btnTop = $('<a>').addClass('navigation-top')
      .css({right: this.pxHidded})
      .html('<i>Up</i>')
      .click(function(){
        _this.navigateTo('#page-top');
      });

    // Add top pointer
    $('body').prepend(btnTop);

    // Scroll handling
    $(window).scroll(function(event) {
      var currScroll = $(window).scrollTop();
      var height = $('.nav-header').outerHeight();
      
      if (currScroll >= height) {
        _this.showNavigatingTop(_this.pxShowed);
      } else {
        _this.showNavigatingTop(_this.pxHidded);
      }
      
       if (currScroll > height) { 
        _this.inTop = true;
      } else {
        _this.inTop = false;
      }

        _this.fixedHeader();
      //_this.scrolling = true;
    });
        
    if (true) {
        this.automaticHidden();
    }
  },
  
  fixedHeader: function(){    
    if (this.inTop) {
      $('.nav-header').addClass('fixed');
    } else {
      $('.nav-header').removeClass('fixed');
    }    
  },
    
  showNavigatingTop: function(value){
    var _this = this;
    this.animUp = true;

    $('.navigation-top').stop().animate({
      right: value }, 100, function(){ 
      _this.animUp = false 
    });            
  },
            
  automaticHidden: function(){
    var _this = this;
    this.isMovement = false;

    $(document).mousemove(function(event){
      _this.isMovement = true;
    });

    setTimeout(function(){
      if (!_this.isMovement) {                
        // Hide
        _this.showNavigatingTop(_this.pxHidded);

      } else {                
        if (_this.inTop) {                    
          _this.showNavigatingTop(_this.pxShowed);
          _this.isMovement = false;
        }
      }

    }, 8000);
 },
            
  /**
   * Navigates to specified element
   * 
   * @param {string} selector
   * @returns {unresolved}
   */
  navigateTo: function(selector) {
    if (this.scrolling === true) return false;

    var target = $(selector + '-nav');
    var _this = this;
    var top = 0;

    var header = parseInt($('.nav-header').outerHeight(), 10);

    if ($(window).width() < 568) {
        header = 0;
    }
    
    if (selector != '#page-top') {
        top = target.offset().top - header;
    }

    this.scrolling = true;

    $('body, html').animate({
      scrollTop: top
    }, 500, function(){ _this.scrolling = false; });

  }
    
};


$(ScrollPage.init());