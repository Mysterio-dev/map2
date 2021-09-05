

  /**
   * change floor
   */
  $(document).on('click', '.shcemeFloor__button', function() {
      $('.schemePopup').fadeOut();
      var floor = $(this).attr('data-id');
      $('.shcemeFloor__button').removeClass('active');
      $(".floor").attr("class", "floor");
      $(this).addClass('active');
      $('.floor[data-floor="' + floor + '"]').attr("class", "floor active");
  })

  var i = 1;

  /**
   * change scale
   */
  $(".shcemeScale__button_plus").click(function(){
      i = i + 0.5;
      if (i > 2.5) {
          i = 2.5;
      }
      $(".schemeFloors").css({ transform: 'scale('+ i + ')' });
  });
  $(".shcemeScale__button_minus").click(function(){
      i = i - 0.5;
      if (i < 1) {
          i = 1;
      }
      $(".schemeFloors").css({ transform: 'scale('+ i + ')' });
  });

  /**
   * init draggable map
   */

  var angleScale = {
      angle: 0,
      scale: 1
  }

  const position = { x: 0, y: 0 }


  var scaleElement = document.getElementById('schemeFloors_svg')
  var resetTimeout
    
  interact('.draggable_scheme')
      .draggable({
          // enable inertial throwing
          inertia: true,
          // keep the element within the area of it's parent
          modifiers: [
              interact.modifiers.restrictRect({
                  restriction: 'parent',
                  endOnly: true
              })
          ],
          // enable autoScroll
          autoScroll: true,

          listeners: {
              // call this function on every dragmove event
              move: dragMoveListener,

              // call this function on every dragend event
              end (event) {
                  var textEl = event.target.querySelector('p')

                  textEl && (textEl.textContent =
                      'moved a distance of ' +
                      (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                          Math.pow(event.pageY - event.y0, 2) | 0))
                          .toFixed(2) + 'px')
              }
          }
      })

      function dragMoveListener (event) {
          var target = event.target
          // keep the dragged position in the data-x/data-y attributes
          var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
          if(x>1205) {
              x=1205;
          } else if (x<-1255) {
              x=-1255;
          }
  
          if(y>1250) {
              y=1250;
          } else if (y<-1200) {
              y=-1200;
          }
  
  
          // translate the element
          target.style.webkitTransform =
              target.style.transform =
                  'translate(' + x + 'px, ' + y + 'px)'
  
          // update the posiion attributes
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
      }
  
      // this function is used later in the resizing and gesture demos
      window.dragMoveListener = dragMoveListener
    
    function reset () {
      scaleElement.style.webkitTransform =
        scaleElement.style.transform =
        'scale(1)'
    
      angleScale.angle = 0
      angleScale.scale = 1
    }
  




$(document).ready(function () {
    //Переносим попап окна с обинаковыми data-id в 1е остальные удаляем
    let arr = [];
    let arr2 = [];
    $('.schemePopup').each(function(){
        arr.push($(this).attr('data-id'))
    })
    arr2 = arr;
    $.unique(arr)
    arr = arr_diff(arr2, arr);
    for(let i = 0; i<=arr.length; i++)
    {
        if(arr[i])
        {
            let target = false;
            $('.schemePopup[data-id="' + arr[i] + '"]').each(function (index, elem)
            {
                if(index == 0)
                {
                    target = $(elem);
                }
                else
                {
                    if(target)
                    {
                        //console.log($(elem).html());
                        target.append('<div class="schemePopup__row">' + $(elem).find('.schemePopup__row').html() + '</div>');
                        $(elem).remove();
                    }
                }


            })
        }

    }
    function arr_diff (a1, a2) {

        var a = [], diff = [];

        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }

        for (var k in a) {
            diff.push(k);
        }

        return diff;
    };

    $(document).on('click', function (e) {
        let target = $(e.target);
        if (
            !target.hasClass('schemePopup') &&
            !target.parents('.schemePopup').is('div') &&
            !target.parents('.schemePopup').is('div') &&
            !target.parents('.schemeDropdownList__hiddenItem').is('li') &&
            !target.attr('data-id') &&
            !target.parents('.floor_shop').is('g')
        ) {
            console.log('first');
            $('.schemePopup').fadeOut();
        }

        if(
            !target.hasClass('shcemeFloor__button') &&
            !target.parents('.shcemeFloor__button').is('div') &&
            !target.hasClass('schemeDropdownList__scheme') &&
            !target.parents('.schemeDropdownList__scheme').is('div') &&
            !target.hasClass('schemeDropdownList__hiddenItem') &&
            !target.parents('.schemeDropdownList__hiddenItem').is('li')
        ) {
            console.log('second');
            $('.floor_shop').attr("class", "floor_shop");
            $('.shcemeFloor__button').removeClass('have_shops');
        }

        if(
            !target.hasClass('schemeSearch') &&
            !target.parents('.schemeSearch').is('div')

        ) {
            $('.schemeSidebarList li').fadeOut();
        }
        })

    $(document).on('focus', '.schemeSearch', function() {
        if($('.schemeSidebarList li').css('display') == 'none') {
            $('.schemeSidebarList li').fadeIn();
        }
    })
/*
    $(document).on('focusout', '.schemeSearch', function() {
        let text = $(this).val()
        if(text.length > 0) {
            if($('.schemeSidebarList li').css('display') == 'none') {
                $('.schemeSidebarList li').fadeIn();
            }
        }
        else
        {
            if($('.schemeSidebarList li').css('display') != 'none') {
                $('.schemeSidebarList li').fadeOut();
            }
        }
    })
*/
    /**
     * search
     */

    $(document).on('keyup', '.schemeSearchInput input', function () {
        var text = $(this).val();
        if (text.length >= 3) {
            findItem(text);
        } else {
            $('.schemeSidebarList__item').each(function () {
                let count = $(this).find('.schemeDropdownList__hiddenItem').length;
                $(this).find('.schemeDropdown__numb').html(count);
                if ($(this).hasClass('disabled')) {
                    $(this).removeClass('disabled');
                }
            });
            $('.schemeDropdownList__item').removeClass('disabled');
            $('.schemeDropdownList__hiddenItem').removeClass('disabled');
        }
    })

    function findItem(text) {

        $('.schemeSidebarList__item').each(function () {
            let count = 0;
            $(this).find('.schemeDropdownList__hiddenItem').each(function () {
                let re = new RegExp(text, 'i'),
                    name = $(this).find('.schemeDropdownLink__name').html();
                if (re.exec(name)) {
                    count++;
                    if ($(this).hasClass('disabled')) {
                        $(this).removeClass('disabled');
                    }
                } else {
                    if (!$(this).hasClass('disabled')) {
                        $(this).addClass('disabled');
                    }
                }
            })
            $(this).find('.schemeDropdownList__item').each(function () {
                let active = $(this).find('.schemeDropdownList__hiddenItem').length,
                    disabled = $(this).find('.schemeDropdownList__hiddenItem.disabled').length;
                if (active <= disabled) {
                    if (!$(this).hasClass('disabled')) {
                        $(this).addClass('disabled');
                    }
                } else {
                    if ($(this).hasClass('disabled')) {
                        $(this).removeClass('disabled');
                    }
                }

            })
            let active = $(this).find('.schemeDropdownList__item').length,
                disabled = $(this).find('.schemeDropdownList__item.disabled').length;
            if (active <= disabled) {
                if (!$(this).hasClass('disabled')) {
                    $(this).addClass('disabled');
                }
            } else {
                if ($(this).hasClass('disabled')) {
                    $(this).removeClass('disabled');
                }
            }

            $(this).find('.schemeDropdown__numb').html(count);
        })


    }

    /**
     * search dropdown menu
     */
    $(".schemeDropdown").click(function () {
        $(this).parent().toggleClass("active");
    });
    $(".schemeDropdownList__btn").click(function (e) {
        e.preventDefault();
        let target = $(e.target);
        if (target.hasClass('schemeDropdownList__scheme')) {

        } else {
            $(this).parent().find(".schemeDropdownList__hidden").addClass("active");
        }

    });
    $(".schemeDropdownList__backBtn").click(function () {
        $(this).parent().parent().removeClass("active");
    });

    /**
     * popups
     */

    $(".floor_shop").click(function (e) {
        let id = $(this).attr('data-id');
        showPopup(id)
    });
    $(document).on('click', '.schemeDropdownList__hiddenItem', function () {
        let id = $(this).attr('data-id'),
            floor = $(this).attr('data-floor');
        showPopup(id, floor);
		$('.schemeSidebarList li').css('display', 'none');
    })
    $(".schemePopup__close").click(function () {
        $(this).parents(".schemePopup").fadeOut();
    });

    $(document).on('click', '.schemeDropdownList__scheme', function () {
        $('.shcemeFloor__button').removeClass('have_shops');
        $('.floor_shop').attr("class", "floor_shop");
        let parent = $(this).parents('.schemeDropdownList__item'),
            elements = parent.find('.schemeDropdownList__hiddenItem'),
            arID = [],
            arFloor = [];
        elements.each(function () {
            if (!$(this).hasClass('disabled')) {
                let floor = $(this).attr('data-floor'),
                    id = $(this).attr('data-id');
                let floorCrutch = [],
                    idCrutch = [];

                if(floor)
                {
                    floorCrutch = floor.split(',', 1000);
                }

                if(id)
                {
                    idCrutch = id.split(',', 1000);
                }
                for(let i = 0; i < floorCrutch.length; i++)
                {
                    if (floorCrutch[i]) {
                        if (!$.inArray(floorCrutch[i], arFloor) != '-1') {
                            arFloor.push(floorCrutch[i]);
                        }

                    }
                }
                arID = arID.concat(idCrutch);


            }
        });
        for (let i = 0; i <= arFloor.length; i++) {
            $('.shcemeFloor__button[data-id="' + arFloor[i] + '"]').addClass('have_shops');
        }
        for (let i = 0; i <= arID.length; i++) {
            $('.floor_shop[data-id="' + arID[i] + '"]').attr("class", "floor_shop active");
        }
    })


    /**
     * $_GET handler for show map item
     */

    if(typeof mapData == 'object') {
        showPopup(mapData.id, mapData.floor);
    }

    function showPopup(id, floor = false) {
        if (!id) {
            return false;
        }
        let arrId = id.split(',', 1000);
        if(floor)
        {
            var arrFloor = floor.split(',', 1000);
        }

        if(arrId.length > 1)
        {
            console.log(arrId);
            arrId.sort();
            arrFloor.sort();
            let floor = arrFloor[0];
            let id = arrId[0];
            if (floor)
            {
                $('.shcemeFloor__button').removeClass('active');
                $('.shcemeFloor__button[data-id="' + floor + '"]').addClass('active');
                $(".floor").attr("class", "floor");
                $('.floor[data-floor="' + floor + '"]').attr("class", "floor active");
            }

            $(".path-shop .floor_shop").attr("class", "path-shop");
            $('.floor_shop[data-id!="' + id + '"]').attr("class", "floor_shop");
            $('.floor_shop[data-id*="' + id + '"]').attr("class", "floor_shop active");

            if (id)
            {
                let target = $('.floor_shop[data-id*="' + id + '"]');
                var xy = target[0].getBoundingClientRect();
                $('.schemePopup[data-id!="' + id + '"]').fadeOut();
                $('.schemePopup[data-id*="' + id + '"]').fadeIn();

                let blockHeight = $('.schemePopup[data-id*="' + id + '"]').height();
                $('.schemePopup[data-id*="' + id + '"]').css({'left': xy.left - 10 + 'px', 'top': xy.top - (blockHeight + 8) + 'px'});
            }

            for(let i = 0; i <= arr.length; i++)
            {
                if(id != arrId[i])
                {
                    $('.floor_shop[data-id*="' +  arrId[i] + '"]').attr("class", "floor_shop active");
                }
            }
            for(let i = 0; i <= arrFloor.length; i++)
            {
                console.log(arrFloor[i]);
                $('.shcemeFloor__button[data-id="'+ arrFloor[i] +'"]').addClass('have_shops');
            }
            /*
            let coor_x = $('.floor_shop[data-id="' + id + '"]').attr('data-cx'),
                coor_y =  $('.floor_shop[data-id="' + id + '"]').attr('data-cy');
            var width_wind = $( window ).width();
            if(width_wind < 900) {

                $(".draggable_scheme").css("transform", "translate("+coor_x+"px,"+coor_y+"px)");
                $(".draggable_scheme").attr("data-x", coor_x);
                $(".draggable_scheme").attr("data-y", coor_y);

                setTimeout(function(){
                    $(".draggable_scheme").css("transition", "none");
                }, 1000);

            }
            */
        }
        else
        {
            let target = $('.floor_shop[data-id*="' + id + '"]');

            var xy = target[0].getBoundingClientRect();
            if (floor) {
                $('.shcemeFloor__button').removeClass('active');
                $('.shcemeFloor__button[data-id="' + floor + '"]').addClass('active');
                $(".floor").attr("class", "floor");
                $('.floor[data-floor="' + floor + '"]').attr("class", "floor active");
            }

            $(".path-shop .floor_shop").attr("class", "path-shop");
            $('.floor_shop[data-id!="' + id + '"]').attr("class", "floor_shop");
            $('.floor_shop[data-id*="' + id + '"]').attr("class", "floor_shop active");
            if (id) {
                $('.schemePopup[data-id!="' + id + '"]').fadeOut();
                $('.schemePopup[data-id*="' + id + '"]').fadeIn();
                let blockHeight = $('.schemePopup[data-id*="' + id + '"]').height();
                $('.schemePopup[data-id*="' + id + '"]').css({'left': xy.left - 10 + 'px', 'top': xy.top - (blockHeight + 8) + 'px'});
            }
            /*
            let coor_x = $('.floor_shop[data-id="' + id + '"]').attr('data-cx'),
                coor_y =  $('.floor_shop[data-id="' + id + '"]').attr('data-cy');
            var width_wind = $( window ).width();

            if(width_wind < 900) {

                $(".draggable_scheme").css("transform", "translate("+coor_x+"px,"+coor_y+"px)");
                $(".draggable_scheme").attr("data-x", coor_x);
                $(".draggable_scheme").attr("data-y", coor_y);

                setTimeout(function(){
                    $(".draggable_scheme").css("transition", "none");
                }, 1000);

            }

             */
        }

        return false;
    }

    function showPopupOld(id, floor = false) {
        if (!id) {
            return false;
        }
        let target = $('.floor_shop[data-id="' + id + '"]');
        var xy = target[0].getBoundingClientRect();
        if (floor) {
            $('.shcemeFloor__button').removeClass('active');
            $('.shcemeFloor__button[data-id="' + floor + '"]').addClass('active');
            $(".floor").attr("class", "floor");
            $('.floor[data-floor="' + floor + '"]').attr("class", "floor active");
        }
        $(".path-shop .floor_shop").attr("class", "path-shop");
        $('.floor_shop[data-id!="' + id + '"]').attr("class", "floor_shop");
        $('.floor_shop[data-id="' + id + '"]').attr("class", "floor_shop active");
        if (id) {
            $('.schemePopup[data-id!="' + id + '"]').fadeOut();
            $('.schemePopup[data-id="' + id + '"]').fadeIn();
            $('.schemePopup[data-id="' + id + '"]').css({'left': xy.left - 10 + 'px', 'top': xy.top - 110 + 'px'});
        }

        return false;
    }
})