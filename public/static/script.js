(function () {
    function Timeline(element) {
      var selectors = {
        id: element,
        item: element.querySelectorAll(".timeline-item"),
        activeClass: "timeline-item--active",
        img: ".timeline__img"
      };
  
      // Set the first item as active
      selectors.item[0].classList.add(selectors.activeClass);
  
      // Set the background image of the timeline container
      selectors.id.style.backgroundImage = "url(" + selectors.item[0].querySelector(selectors.img).src + ")";
  
      var itemLength = selectors.item.length;
  
      // Add scroll event listener
      window.addEventListener("scroll", function () {
        var pos = window.scrollY;
  
        selectors.item.forEach(function (item, i) {
          var min = item.offsetTop;
          var max = item.offsetHeight + item.offsetTop;
  
          if (i === itemLength - 2 && pos > min + item.offsetHeight / 2) {
            selectors.item.forEach(function (itm) {
              itm.classList.remove(selectors.activeClass);
            });
  
            selectors.id.style.backgroundImage = "url(" + selectors.item[itemLength - 1].querySelector(selectors.img).src + ")";
            selectors.item[itemLength - 1].classList.add(selectors.activeClass);
          } else if (pos <= max - 40 && pos >= min) {
            selectors.id.style.backgroundImage = "url(" + item.querySelector(selectors.img).src + ")";
            selectors.item.forEach(function (itm) {
              itm.classList.remove(selectors.activeClass);
            });
            item.classList.add(selectors.activeClass);
          }
        });
      });
    }
  
    // Initialize the timeline
    var timeline = document.getElementById("timeline-1");
    if (timeline) {
      Timeline(timeline);
    }
  })();


  