// debouncing function from John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
function debounce (func, threshold, execAsap) {
  var timeout;

  return function debounced () {
    var obj = this, args = arguments;
    function delayed () {
      if (!execAsap) {
        func.apply(obj, args);
      }
      timeout = null;
    }

    if (timeout) {
      clearTimeout(timeout);
    } else if (execAsap) {
      func.apply(obj, args);
    }
    timeout = setTimeout(delayed, threshold || 100);
  };
}
function smartResize (fn) {
  window.addEventListener('resize', debounce(fn, null, false), false);
}

// copied from http://stackoverflow.com/a/1045012
function getOffset(elem) {
  if(!elem) {
    elem = this;
  }

  var x = elem.offsetLeft,
      y = elem.offsetTop;

  while ((elem = elem.offsetParent) !== null) {
    x += elem.offsetLeft;
    y += elem.offsetTop;
  }

  return {left: x, top: y};
}

function verticalScrollPos () {
  return window.pageYOffset || document.body.scrollTop;
}
function viewportHeight () {
  return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
}
function maxVerticalScroll () {
  return Math.max(0, document.body.scrollHeight - viewportHeight());
}

// animated scrolling
var scrollInterval = null,
    fps            = 60,
    frameTime      = 1000 / fps,
    scrollFilter   = 0.07;

function stopAnimatedScroll () {
  clearInterval(scrollInterval);
  //document.removeEventListener('scroll', stopAnimatedScroll, false);
}

function scrollAnimatedTo (targetY) {
  targetY = Math.round(targetY);
  var targetInc = targetY * scrollFilter;

  // stop previous animation
  stopAnimatedScroll();
  //document.addEventListener('scroll', stopAnimatedScroll, false);

  // begin animation
  scrollInterval = window.setInterval(function () {
    var curY = verticalScrollPos(),
        diff = curY - targetY;

    if (Math.abs(diff) <= 7) {
      stopAnimatedScroll();
      window.scroll(0, targetY);
    } else {
      window.scroll(0, Math.round((curY * (1 - scrollFilter)) + targetInc));
    }
  }, frameTime);
}

function getCenteredScrollPos (elm) {
  var rect       = elm.getBoundingClientRect(),
      elmHeight  = elm.offsetHeight,
      curY       = verticalScrollPos(),
      offset     = parseInt(elm.getAttribute("data-scroll-offset"), 10) || 0;
  return Math.min(maxVerticalScroll(),
                  Math.round(curY + rect.top - ((window.innerHeight - elmHeight) / 2) + offset));
}

function scrollToElm (elm) {
  scrollAnimatedTo(getCenteredScrollPos(elm));
}
function scrollToElmID (elmID) {
  scrollToElm(document.getElementById(elmID));
}


var emailRegex = /^([a-zA-Z0-9_+\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
function isValidEmail (v) {
  return emailRegex.test(v);
}

/* eval odd and even integers */
//function isNumber(n) { return n == parseFloat(n); }
//function isEven(n)   { return isNumber(n) && (Math.abs(n) % 2 == 0); }
//function isOdd(n)    { return !isEven(n); }
function isEven(n) {
  return n % 2 === 0;
}

//returning a (namespaced) svg object to jquery
function createSVG(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

// returns computed css-property
function getCSSProp (elm, prop) {
  return elm.ownerDocument.defaultView.getComputedStyle(elm)[prop];
}


// no need to wait until the document is loaded since the script is already at the bottom of the page
(function() {
  var html = document.body.parentElement;
  html.classList.add("js");

  //init skrollr
  var count  = new countUp("counter-1", 0, 93, 0, 2, null),
      count2 = new countUp("counter-2", 0, 15, 0, 1, null),
      s = window.skrollr.init({
            smoothScrolling: true,
            smoothScrollingDuration: 200,
            forceHeight: false,
            keyframe: function(slide3, datacenter) {
              count.reset(null);
              count2.reset(null);
              count.start(null);
              count2.start(null);
            }
          });

  //vars
  var wHeight   = window.innerHeight,
      wWidth    = window.innerWidth,
      wordsList = ['people','place','time'],
      curWord   = wordsList.length - 1;

  //jquery vars
  var topOpening   = document.querySelector("#top-opening"),
      logo         = document.querySelector("#top-opening #logo"),
      spacedItems  = document.querySelectorAll(".space-relative"),
      slides       = document.querySelectorAll(".slide"),
      scrollFadeIn = document.querySelectorAll(".scroll-fadein"),
      words        = document.querySelector("#slogan #words");

  var resizeElements = function () {
    topOpening.style.height = (wHeight*1.1) + "px";

    for (var i = 0, elm; elm = spacedItems[i]; i++) {
      elm.style.margin = wWidth < 960 ? 0 : (topOpening.offsetHeight * 0.04) + "px";
    }

    for (var i = 0, elm; elm = slides[i]; i++) {
      elm.style.minHeight = ((wHeight / 2) > 600 ? 500 : wHeight / 2) + "px";
    }

    //add scrolling fade in to elements with class .scroll-fadein
    for (var i = 0, elm; elm = scrollFadeIn[i]; i++) {
      var pos = getOffset(elm).top - wHeight,
          delay = parseInt(elm.getAttribute("data-delay"), 10);

      elm.setAttribute("data-" + (pos + 200 + delay), "opacity:0;top:50px");
      elm.setAttribute("data-" + (pos + 350 + delay), "opacity:1;top:0");
    }
  };

  resizeElements();

  //resize events
  smartResize(function(){
    wHeight = window.innerHeight;
    wWidth = window.innerWidth;
    resizeElements();

    //skrollr refresh datapoints
    s.refresh();
  });


  //
  // HOME
  //

  if (document.body.classList.contains("home")) {
    //
    // rotate highlighted words
    //
    var slidesLength = slides.length - 1,
        wrapper      = document.createElement('div'); // used to create innerHTML elements to append to other elements

    for (var i = 0, elm; elm = slides[i]; i++) {
      elm.setAttribute("data-400-center",       "opacity:0.1");
      elm.setAttribute("data-center-center",    "opacity:1");
      elm.setAttribute("data-200-center",       "opacity:1");
      elm.setAttribute("data--100-top-bottom",  "opacity:0.1");
      elm.setAttribute("data-smooth-scrolling", "off");

      if (i === slidesLength) {
        elm.setAttribute("data--200-center",    "opacity:1");
        elm.setAttribute("data--200-top",       "opacity:1");
      }
    }

    //
    // add slogan stuff to DOM
    //
    var wordElms = [];
    for (var i = 0; i < wordsList.length; i++) {
      wrapper.innerHTML = '<span id="word-'+i+'" class="rotate">'+wordsList[i]+'</span>';
      wordElms.push(wrapper.firstChild);
      words.appendChild(wrapper.firstChild);
    }

    var switchWord = function () {
      wordElms[curWord].classList.remove("active");
      if (++curWord === wordsList.length) {
        curWord = 0;
      }
      wordElms[curWord].classList.add("active");
    };
    setInterval(switchWord, 2400);

    //
    // remove image placeholder
    //
    //wrapper.innerHTML = '<svg id="top-plx-container" viewBox = "0 0 '+wWidth+' 300" xmlns="http://www.w3.org/2000/svg" version = "1.1"><linearGradient id="gradient-black" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="black" stop-opacity="0" /><stop offset="0.3" stop-color="black" stop-opacity="1" /><stop offset="1" stop-color="black" stop-opacity="1" /></linearGradient><linearGradient id="gradient-blue" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#95d3db" stop-opacity="1" /><stop offset="0.7" stop-color="#95d3db" stop-opacity="1" /><stop offset="1" stop-color="#95d3db" stop-opacity="0" /></linearGradient></svg>';
    var svgContainer = document.getElementById("top-plx-container"); //wrapper.firstChild;
    svgContainer.setAttribute('viewBox', '0 0 '+wWidth+' 300');
    topOpening.appendChild(svgContainer);
    topOpening.classList.add("js");

    var objW    = 500,
        objH    = 80,
        rot     = -15,
        borderR = "100px",
        offset  = 273;

    for (var i = 0, l = Math.ceil(wWidth / (objW / 3)); i <= l; i++) {
      var line = createSVG("path");

      if (isEven(i)) {
        line.setAttribute('data-0',    '@d:M' + (-200 + (offset * i)) + ',200 L' + (-200 + (offset * i)) + ',200');
        line.setAttribute('data-100',  '@d:M' + (-200 + (offset * i)) + ',200 L' + (150  + (offset * i)) + ',100');
        line.setAttribute('data-700',  '@d:M' + (-200 + (offset * i)) + ',200 L' + (350  + (offset * i)) + ',42');
        line.setAttribute('stroke', "url(#gradientBlue)");
      } else {
        line.setAttribute('data-0',    '@d:M' + (150 + (offset * i)) + ',100 L' + (150   + (offset * i)) + ',100');
        line.setAttribute('data-100',  '@d:M' + (150 + (offset * i)) + ',100 L' + (-200  + (offset * i)) + ',200');
        line.setAttribute('data-1000', '@d:M' + (150 + (offset * i)) + ',100 L' + (-400  + (offset * i)) + ',250');
        line.setAttribute('stroke', "url(#gradientBlack)");
      }

      line.setAttribute('d', 'M' + (-200 + (offset * i)) + ',200 L' + (150 + (offset * i)) + ',100');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('stroke-width', 75);
      line.setAttribute('class', 'plx-piece');
      line.setAttribute('mask', 'url(#mask'+i+')');
      svgContainer.appendChild(line);
    }



    //
    // create navigation dots (if not mobile version)
    //

    if (!html.classList.contains("skrollr-mobile")) {
      var fixedNav  = document.querySelector("#fixed-nav .nav-item-list");

      var addNavItem = function (targetID, disableOnPos, enableOnPos) {
        wrapper.innerHTML = '<li class="nav-item"><a href="#'+targetID+'" class="nav-item-link"'
                              + (disableOnPos !== null ? 'data-'+disableOnPos+'="background:transparent"' : '')
                              + (enableOnPos  !== null ? 'data-'+enableOnPos+'="background:#fff"></a></li>' : '');
        fixedNav.appendChild(wrapper.firstChild);
      };

      //top-opening
      addNavItem('top-opening', null, -1);

      for (var i = 0, elm; elm = slides[i]; i++) {
        addNavItem(elm.id, 0, getCenteredScrollPos(elm) - 200);
      }

      fixedNav.style.height = (23 * fixedNav.childNodes.length) + "px";
    }
  }

  //fading scroll animation
  var faders = document.querySelectorAll('.fader'),
    faderStart = 200,
    faderOffset = -30;

  for (var i = 0, elm; elm = faders[i]; i++) {
    var data = faderStart + (faderOffset * (i + 1));
    elm.setAttribute('data-' + data + '-center',         '@opacity:0;transform:translateY(0px);');
    elm.setAttribute('data-' + (data - 150) + '-center', '@opacity:1;transform:translateY(-30px);');
    elm.setAttribute('data-' + (data - 300) + '-center', '@opacity:0;transform:translateY(-60px)');
  }

  //bubbles scroll animation UNUSED?
  /*var bubbles = document.querySelectorAll('.bubble'),
    bubbleStart = 200,
    bubbleOffset = 30,
    bubbleLength = bubbles.length;

  for (var i = 0, elm; elm = bubbles[i]; i++) {
    var data = faderStart + (faderOffset * (bubbleLength - i)); // reversed!
    elm.setAttribute('data-' + data + '-center',         '@opacity:0;transform:translateY(0px);');
    elm.setAttribute('data-' + (data - 150) + '-center', '@opacity:1;transform:translateY(-30px);');
    elm.setAttribute('data-' + (data - 300) + '-center', '@opacity:0;transform:translateY(-60px)');
  }*/

  //all done, refresh skrollr
  s.refresh();

  //
  // email validation
  //

  var form = document.getElementById("download-press"),
      errorTimer = null;
  var validateForm = function (evt) {
    console.log('validate form',document.getElementById("EMAIL").value, isValidEmail(document.getElementById("EMAIL").value));
    evt.preventDefault();

    if (isValidEmail(document.getElementById("EMAIL").value)) {
      form.removeEventListener('submit', validateForm, false);
      form.submit();
      form.addEventListener('submit', validateForm, false);
    } else {
      var subscribe = document.getElementById("subscribe"),
          error     = document.getElementById("email-error");

      error.classList.remove("hidden");
      subscribe.classList.add("hidden");

      clearTimeout(errorTimer);
      errorTimer = setTimeout(function () {
        subscribe.classList.remove("hidden");
        error.classList.add("hidden");
      }, 3000);
    }
    return false;
  };
  if (form) {
    form.addEventListener('submit', validateForm, false);
  }


  if (!html.classList.contains("skrollr-mobile")) {
    var btns = document.querySelectorAll('.nav-item-link, #learn-more .arrow-down, .scrollto');
    for (var i = 0, elm; elm = btns[i]; i++) {
      (function (elm) {
        elm.addEventListener('click', function (evt) { evt.preventDefault(); scrollToElmID(elm.getAttribute('href').substr(1)); }, false);
      })(elm);
    }
  }

  //
  // initialize accordeon
  //

  var accordeonContent = function (radioBtn) {
    return radioBtn.parentNode.querySelector(".content");
  };

  var accordeons = document.querySelectorAll(".accordeon");
  for (var i = 0, elm; elm = accordeons[i]; i++) {
    (function (accordeon) {
      var btns = accordeon.querySelectorAll(".accordeon-btn"),
          prev = null;
      for (var i = 0, elm; elm = btns[i]; i++) {
        (function (radioBtn) {
          //measure content-height
          var content = accordeonContent(radioBtn);
          content.style.height = "auto";
          var height = content.offsetHeight;
          content.style.height = 0;

          radioBtn.openAccordeon = function () {
            console.log("change", radioBtn);
            if (prev) {
              accordeonContent(prev).style.height = 0;
            }

            content.style.height = height + "px";
            setTimeout(function () {
              scrollToElm(radioBtn.parentNode);
            }, 1000);
            prev = radioBtn;
          };

          radioBtn.addEventListener("change", radioBtn.openAccordeon, false);
        })(elm);
      }
    })(elm);
  }

  if (document.body.classList.contains("vacancies")) {
    var hash = window.location.hash.toLowerCase();
    if (hash !== "") {
      setTimeout(function() {
        var radioBtn = document.querySelector(hash + " .accordeon-btn");
        if (radioBtn) {
          radioBtn.checked = true;
          radioBtn.openAccordeon();
        }
      }, 500);
    }
  }
})();