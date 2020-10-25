//header
$(document).ready(function() {
   $('.btn-mobile').on('click', function() {
       $('.btn-mobile').toggleClass('open');
       $('.nav__bar').toggleClass('active');
   });
});

//Backtotop
// let backToTop = document.querySelector('.arrow__top');
// backToTop.addEventListener('click', function() {
//     window.scroll({
//         top: 0,
//         left: 0,
//         behavior: 'smooth'
//     });
// });
let backToTop = document.querySelector('.arrow__top');
backToTop.addEventListener('click', function() {
    scroll.scrollTo(0);

});
//Tabs

$(document).ready(function() {
    $('.tabs__list li a').on('click', function(e) {
        e.preventDefault();
        $('.tabs__list li a').removeClass('active');
        $(this).addClass('active');
        let tabCurent = $(this).attr('data-tab');
        $('.tabs .tab').hide();
        $('.' +tabCurent).show();
    });
});
//photoswiper
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
      
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
        
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 
  
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        console.log(pswpElement)
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
  };
$(window).on('load',function(){
    initPhotoSwipeFromDOM('.carousel-img');
});
//slidercoffee
let $carousel = $('.gallery__carousel');
$carousel.flickity ({
    cellAlign:'left',
    contain:true,
    prevNextButtons:false,
    wrapAround:true,
    lazyLoad:true,
    autoPlay: true,
});

$('.btn .prev').on('click', function() {
    $carousel.flickity('previous');
});
$('.btn .next').on('click', function() {
    $carousel.flickity('next');
});
//slidestudio-detial
let $carouselDetail = $('.wrap__image');
$carouselDetail.flickity({
    cellAlign:'left',
    contain:true,
    prevNextButtons:false,
    wrapAround:true,
    lazyLoad:true,
    // autoPlay: true,
});
setInterval(trigger,5000);
    function trigger(){
        let event = new Event("click");
            document.querySelector(".btn-detail .prev").dispatchEvent(event);
            //$('.slider .arrow-prev').css('transition','all 0.7s');
    }
$('.btn-detail .prev').on('click', function() {
    $carouselDetail.flickity('previous');
});
$('.btn-detail .next').on('click', function() {
    $carouselDetail.flickity('next');
});
//boxnumber
$('.studio-list .box .item').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
});

// //scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 0.8
});
//loader page
$(window).on('load', function() {
    $('.loader-container').fadeOut(2000);
});

//form

 function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function validateForm(){
    let name = $.trim($('#name').val()),
        phone = $.trim($('#phone').val()),
        email = $.trim($('#email').val()),
        sub = $.trim($('#subject').val()),
        mes = $.trim($('#messenge').val());
    let flag = false; 
    //check name
    if (name == '' || name.length < 4){
        $('#err-name').text('Vui lòng nhập tên của bạn!');
        $('#name').addClass('error');
    } else{
        $('#err-name').text('');
        $('#name').removeClass('error');
        flag = true;
    }

    // check phone
    if (phone == ''){
        $('#err-phone').text('Vui lòng nhập số điện thoại của bạn!');
        $('#phone').addClass('error');
    } else if (phone.length !== 10) {
        $('#err-phone').text('Vui lòng nhập đúng số điện thoại!'); 
        $('#phone').addClass('error');
        flag = true;
    } else {
        $('#err-phone').text('');
        $('#phone').removeClass('error');
    }
    

    //check email
    if (email == ''){
        $('#err-email').text('Vui lòng nhập email');
        $('#email').addClass('error');
    } else if(!isEmail(email)){
        $('#err-email').text('Email không đúng, vui lòng nhập email');
        $('#email').addClass('error');
    } else {
        $('#err-email').text('');
        $('#email').removeClass('error');
        flag = true;
    }

    //check subject
    if (sub == '' ){
        $('#err-sub').text('Vui lòng nhập nội dung');
        $('#subject').addClass('error');
    } else{
        $('#err-sub').text('');
        $('#subject').removeClass('error');
        flag = true;
    }

    //check message
    if (mes == ''){
        $('#err-mes').text('Vui lòng nhập nội dung tin nhắn');
        $('#messenge').addClass('error');
    } else{
        $('#err-mes').text('');
        $('#messenge').removeClass('error');
        flag = true;
    }   
}

let btnSend = $('.footer__bottom .btn-submid');
btnSend.on('click', function(){
    validateForm();
});

//fixmenu
var positionTop = $('.header__bottom').position().top; // 70
// console.log(positionTop);
// var prevScrollpos = window.pageYOffset; // 0
// console.log(prevScrollpos)
var prev =  0;
console.log(prev)

scroll.on('scroll', (position) => {
    // console.log(position.delta.y);
    // var prev = position.delta.y;
    
    var offsetY = position.delta.y;//0
    // console.log(offsetY)
    if(window.innerWidth > 768) {
        if(offsetY > positionTop) {
            $('.header__bottom')[0].classList.add('menu-fixed'); 
            if(prev > offsetY) {
                $('.menu-fixed')[0].style.top='0px'; 
            }else {
                $('.menu-fixed')[0].style.top='-70px';
            }
            prev = offsetY;
        }else {
            $('.header__bottom')[0].classList.remove('menu-fixed');
        }
    }

    // if(offsetY > prev){
    //     console.log(111);
    //     $('.header').addClass('menu-fixed');
    // }else{
    //     console.log(222);
    //     $('.header').removeClass('menu-fixed');
    // }
    // var currentScrollPos = window.pageYOffset;
    // console.log(currentScrollPos);
    // if(window.innerWidth > 768) {
    //     if(currentScrollPos > positionTop) {
    //         $('.header__bottom')[0].classList.add('menu-fixed');
    //         if(prevScrollpos > currentScrollPos) {
    //             $('.menu-fixed')[0].style.top='0';
    //         }else {
    //             $('.menu-fixed')[0].style.top='-70px';
    //         }
    //         prevScrollpos = currentScrollPos;
    //     } else {
    //         $('.header__bottom')[0].classList.remove('menu-fixed');
    //     }
    // }
});

// fullcreen 
// var fullBtn = document.querySelector('.fullcreen');
// fullBtn.addEventListener('click', function() {
//     var elem = document.querySelector(".banner__img-item");
// function openFullscreen() {
//   if (elem.requestFullscreen) {
//     elem.requestFullscreen();
//   } else if (elem.webkitRequestFullscreen) { /* Safari */
//     elem.webkitRequestFullscreen();
//   } else if (elem.msRequestFullscreen) { /* IE11 */
//     elem.msRequestFullscreen();
//   }
// }
// });