"use strict";
const menu = document.querySelector(".menu");
let subMenu;

function menuMain() {
    $(".menu-main").click(function (e) {
        if (e.target.closest(".menu-item-has-children")) {
            const hasChildren = e.target.closest(".menu-item-has-children");
            showSubMenu(hasChildren); // need discussion
        }
    })
}



function goBack() {
    $(".go-back").on('click', function (e) {
        e.stopPropagation();
        hideSubMenu();
        $('.header .menu>ul>li> a').removeAttr('tabindex')
    })
}

function menuTrigger() {
    $(".mobile-menu-trigger").click(function () {
        toggleMenu();
    })
}

function closeMenu() {
    $(".mobile-menu-close").click(function () {
        toggleMenu();
    })
}

function menuOverlay() {
    $(".menu-overlay").click(function () {
        toggleMenu();
    })
}
function toggleMenu() {
    $(".menu").toggleClass("active");
    $(".menu-overlay").toggleClass("active");
}

function showSubMenu(hasChildren) {
    subMenu = hasChildren.querySelector(".sub-menu");
    subMenu.classList.add("active");
    subMenu.style.animation = "slideLeft 0.5s ease forwards";
    const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
    $(".menu .mobile-menu-head").addClass("active");
    $(".menu .current-menu-title").text(menuTitle);
    $('.header .menu>ul>li> a').attr('tabindex', '-1')
    // $(".menu .mobile-menu-head").addClass("active");
}

function hideSubMenu() {

    subMenu.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() => {
        subMenu.classList.remove("active");
    }, 300);
    $(".mobile-menu-head").removeClass("active");
    $(".menu .current-menu-title").text("");
    $(".menu .mobile-menu-head").removeClass("active");
}

window.onresize = function () {
    if (this.innerWidth > 991) {
        if ($(".menu").hasClass("active")) {
            toggleMenu();
        }
    }
}

function searchIcon() {
    $('#search-icon').click(function () {
        $('#search-icon i').toggleClass("fa-times");
        $('.search-form').toggleClass("active");
        $(".menu").removeClass("fa-times");
    })
    $('.search-icons').keypress(function (event) {
        var id = event.keyCode;
        if (id == 13) {
            $('#search-icon').trigger('click');
        }
    });
}

window.onscroll = () => {
    $(".menu").removeClass("fa-times");

}

//Main menu 
$(document).ready(function () {
    var timeVal = $("#ToastTime").val();
    setTimeout(function () {
        if ($('.toast-notification').length > 0) {
            $('.toast-notification').remove();
        }
    }, parseInt(timeVal) * 1000);

    if ($('.toast-notification').length > 0) {
        $(".toast-notification .close-toast").click(function (e) {
            e.preventDefault();
            $(".toast-notification").remove();
        });
    }

    //Filter and Sorting
    $("#btnsubmit").on("click", function () {
        var topicarr = [];
        for (var i = 0; i < $(".modal-topic-list li[select='true']").length; i++) {
            var x = document.querySelectorAll(".modal-topic-list li[select='true']")[i].getAttribute("data-value");
            topicarr.push(x);
        }
        var statusarr = [];
        for (var i = 0; i < $(".modal-status-list li[select='true']").length; i++) {
            var x = document.querySelectorAll(".modal-status-list li[select='true']")[i].getAttribute("data-value");
            statusarr.push(x);
        }
        var timearr = [];
        for (var i = 0; i < $(".modal-time-list li[select='true']").length; i++) {
            var x = document.querySelectorAll(".modal-time-list li[select='true']")[i].getAttribute("data-value");
            timearr.push(x);
        }
        var contentarr = [];
        for (var i = 0; i < $(".modal-content-list li[select='true']").length; i++) {
            var x = document.querySelectorAll(".modal-content-list li[select='true']")[i].getAttribute("data-value");
            contentarr.push(x);
        }

        if ($("#contentTypeForm").length > 0) {
            $("#SelectedTopicFilter").val(topicarr.toString());
            $("#SelectedStatusFilter").val(statusarr.toString());
            $("#SelectedTimeFilter").val(timearr.toString());
            $("#contentTypeForm").trigger("submit");
        }
        if ($("#newsCentreForm").length > 0) {
            $("#SelectedTopicFilter").val(topicarr.toString());
            $("#SelectedContentFilter").val(contentarr.toString());
            $("#SelectedTimeFilter").val(timearr.toString());
            $("#newsCentreForm").trigger("submit");
        }
        if ($("#subTopicForm").length > 0) {
            $("#SelectedContentFilter").val(contentarr.toString());
            $("#subTopicForm").trigger("submit");
        }
        if ($("#searchForm").length > 0) {
            $("#SelectedTopicFilter").val(topicarr.toString());
            $("#SelectedContentFilter").val(contentarr.toString());
            $("#SelectedTimeFilter").val(timearr.toString());
            $("#searchForm").trigger("submit");
        }
        if ($("#collectionForm").length > 0) {
            if ($('.collection-focus')[0] !== undefined) {
                localStorage["ScrollPositionX"] = $('.collection-focus').offset().top;
            }
            $("#SelectedContentFilter").val(contentarr.toString());
            $("#SelectedTimeFilter").val(timearr.toString());
            $("#collectionForm").trigger("submit");
        }
    });

    $('ul.dropdown-menu li').on("click", function () {
        $("#SelectedSortType").val($(this).attr("data-value"));

        if ($("#contentTypeForm").length > 0) {
            $("#contentTypeForm").trigger("submit");
        }
        if ($("#newsCentreForm").length > 0) {
            $("#newsCentreForm").trigger("submit");
        }
        if ($("#subTopicForm").length > 0) {
            $("#subTopicForm").trigger("submit");
        }
        if ($("#searchForm").length > 0) {
            $("#searchForm").trigger("submit");
        }
        if ($("#collectionForm").length > 0) {
            $("#collectionForm").trigger("submit");
        }
    });

    if ($(".show-modal-filter").length > 0) {
        showModalFilter()
    }

    if ($(".clear-filter-btn").length > 0) {
        clearModalFilter()
    }

    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('PageNo') || urlParams.has('SelectedSortType') || urlParams.has('SelectedContentFilter') || urlParams.has('SelectedTopicFilter') || urlParams.has('SelectedTimeFilter')) {
        let resultsTop = $('.results-top')[0];
        if (resultsTop !== undefined) {
            $('html, body').animate({
                scrollTop: $('.results-top').offset().top
            }, 10);
        }
    }

    $(".menu-item-has-children").click(function () {
        if ($(this).children(".sub-menu").hasClass("sub-menu-show")) {
            $(this).children(".sub-menu").removeClass("sub-menu-show");
            $(this).find(".fa-angle-down").removeClass("rotate-arrow");
        }
        else {
            $(".menu-item-has-children .sub-menu").removeClass("sub-menu-show");
            $(this).children(".sub-menu").addClass("sub-menu-show");
            $(".menu-item-has-children .fa-angle-down").removeClass("rotate-arrow");
            $(this).find(".fa-angle-down").addClass("rotate-arrow");
        }
    });
    $("#search-icon").click(function () {
        $(".menu-item-has-children .sub-menu").removeClass("sub-menu-show");
        $(".menu-item-has-children .fa-angle-down").removeClass("rotate-arrow");
    })

    $(".mobile-menu-trigger").click(function () {
        $(".mobile-nav-toggle").toggleClass("btn-close close-bars");
        $("body").toggleClass("overflow-hidden");
    });

    $(".filters-content").click(function () {
        $("body").addClass("overflow-x-hidden")
    });

    if ($('.carousel-count').length > 0) {
        carouselCount()
    }

    if ($(".menu-main").length > 0) {
        menuMain()
    }

    if ($(".go-back").length > 0) {
        goBack()
    }

    if ($(".mobile-menu-trigger").length > 0) {
        menuTrigger()
    }

    if ($(".mobile-menu-close").length > 0) {
        closeMenu()
    }

    if ($(".menu-overlay").length > 0) {
        menuOverlay()
    }

    if ($('#search-icon').length > 0) {
        searchIcon()
    }

    if ($('.searchInput').length > 0) {
        lookupTable()
    }

    if ($('#video-player').length > 0) {
        videoPlayer()
    }

    if ($('.counter').length > 0) {
        counterNumber()
    }

    //Swiper
    if ($('.homepage-carousel-cls').length > 0) {
        teaserSwiper()
    }

    if ($('.news-container-area').length > 0) {
        teaserSwiper()
    }

    //Vimeo player
    if ($('.video-playlist-cls').length > 0) {
        vimeoVideoPlayer()
    }

    //Auto complete
    if ($('#globalquery').length > 0) {
        autoCompleteSearch(document.getElementById("globalquery"), document.getElementById("searchLink"), "#globalSearch")
    }

    if ($('#contentTypeForm').length > 0) {
        autoCompleteSearch(document.getElementById("query"), document.getElementById("pageLink"), "#contentTypeForm")
    }

    if ($('#searchForm').length > 0) {
        autoCompleteSearch(document.getElementById("query"), document.getElementById("pageLink"), "#searchForm")
    }

    if ($('#newsCentreForm').length > 0) {
        autoCompleteSearch(document.getElementById("query"), document.getElementById("pageLink"), "#newsCentreForm")
    }

    var initialFilterListCount = $(".filter-list li[select='true']").length;
    //Filter and Sorting
    $(".filter-list li").click(function () {
        if ($(".filter-list li[select='true']").length > 0 || $(".filter-list li[select='true']").length != initialFilterListCount) {
            $(".btnfilterclose").addClass("d-none");
            $(".btnfilterapply").removeClass("d-none");
        }
        else {
            $(".btnfilterapply").addClass("d-none");
            $(".btnfilterclose").removeClass("d-none");
        }
    })

    $("#ddsort li").click(function () {
        if ($(this).attr("select")) {
            $(this).removeAttr("select");
        } else {
            $(this).attr("select", "true");
        }
    })

    // escape to hide submenu
    $(document).on('keydown', function (e) {
        if (e.keyCode === 27 && $('.menu').hasClass('active')) { // ESC
            $('.menu').removeClass('active');
            $(".mobile-nav-toggle").toggleClass("btn-close close-bars");
        }
    });
});

$(".carousel-count .carousel-inner .carousel-item img").click(function () {
    var myModal = new bootstrap.Modal(document.querySelector('.carousel-count-fullsize-img-class'))
    myModal.show();
    $(".carousel-count-fullsize-img-class img").attr({ src: $(this).attr("src"), alt: $(this).attr("alt") });
});

$(".carousel-count-fullsize-img-class .btn-close").click(function () {
    var myModal = new bootstrap.Modal(document.querySelector('.carousel-count-fullsize-img-class'))
    myModal.hide();
});

$(".carousel-count .carousel-inner .carousel-item").on("keydown", function (event) {
    var id = event.keyCode;
    if (id == 13) {
        $("#carousel-count .carousel-inner .carousel-item img").trigger('click');
        $(".carousel-count-fullsize-img-class img").attr({ src: $(this).attr("src"), alt: $(this).attr("alt") });
    }
});

function carouselCount() {
    var totalItems = $('.carousel-count .carousel-item').length;

    var currentIndex = $('.carousel-count div.active').index() + 1;
    $('.carouselnumber').html('' + currentIndex + '/' + totalItems + '');
    var myCarousel = document.getElementById('carousel-count');
}

//********************Filter and Sorting**********************

function globalSearch() {
    $("#globalSearch").trigger('submit');
}

function searchForm() {
    $("#searchForm").trigger('submit');
}

function showModalFilter() {
    $(".modal-topic-list li").click(function () {
        $(this).find("i").toggleClass("close-li-icon");
        if ($(this).attr("select")) {
            $(this).removeAttr("select");
        } else {
            $(this).attr("select", "true");
        }
    })
    $(".modal-status-list li").click(function () {
        $(this).find("i").toggleClass("close-li-icon");
        if ($(this).attr("select")) {
            $(this).removeAttr("select");
        } else {
            $(this).attr("select", "true");
        }
    })
    $(".modal-time-list li").click(function () {
        $(this).find("i").toggleClass("close-li-icon");
        if ($(this).attr("select")) {
            $(this).removeAttr("select");
        } else {
            $(this).attr("select", "true");
        }
    })
    $(".modal-content-list li").click(function () {
        $(this).find("i").toggleClass("close-li-icon");
        if ($(this).attr("select")) {
            $(this).removeAttr("select");
        } else {
            $(this).attr("select", "true");
        }
    })
    $(".filter-list li").click(function () {
        if ($(".filter-list li[select='true']").length > 0) {
            $(".btnfilterclose").addClass("d-none");
            $(".btnfilterapply").removeClass("d-none");
        }
        else {
            $(".btnfilterapply").addClass("d-none");
            $(".btnfilterclose").removeClass("d-none");
        }
    })
}

function clearModalFilter() {
    $(".clear-filter-btn").click(function () {
        if ($(".modal-topic-list").length > 0) {
            $(".modal-topic-list li i").addClass("close-li-icon");
            $(".modal-topic-list li").removeAttr("select");
        }

        if ($(".modal-status-list").length > 0) {
            $(".modal-status-list li i").addClass("close-li-icon");
            $(".modal-status-list li").removeAttr("select");
        }

        if ($(".modal-time-list").length > 0) {
            $(".modal-time-list li i").addClass("close-li-icon");
            $(".modal-time-list li").removeAttr("select");
        }

        if ($(".modal-content-list").length > 0) {
            $(".modal-content-list li i").addClass("close-li-icon");
            $(".modal-content-list li").removeAttr("select");
        }

        $("#SelectedSortType").val('');
        $(".btnfilterclose").addClass("d-none");
        $(".btnfilterapply").removeClass("d-none");
    });
}

//********************Pagination**********************

function updatePageQuery(value) {
    if (value == 'undefined' || value == null)
        return;

    var url = window.location.href;
    var key = 'PageNo';
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"), hash;

    if ($('.collection-focus')[0] !== undefined) {
        localStorage["ScrollPositionX"] = $('.collection-focus').offset().top;
    }

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null) {
            url = url.replace(re, '$1' + key + "=" + value + '$2$3');
            window.location = url;
            return;
        }
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
                url += '#' + hash[1];
            }
            window.location = url;
            return;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
                url += '#' + hash[1];
            }
            window.location = url;
            return;
        }
        else {
            return;
        }
    }
}

//********************Auto Complete**********************

function autoCompleteSearch(inp, pagelink, formid) {
    var currentFocus;
    if (inp != null) {
        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;
            closeAllLists();

            if (val.length < 3) { return; }
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            var contentId = "";
            if ($('#contentTypeId').val() != undefined)
                contentId = $('#contentTypeId').val();
            var strval = val.trim().toLowerCase().replace(/[^a-z0-9\u00A3\s]/gi, '');
            $.ajax({
                type: "POST",
                url: pagelink.value + 'GetAutocomplete?term=' + strval + '&id=' + contentId,
                data: strval,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response.isSucceed) {
                        if (response.result == null) {
                            return;
                        }

                        var inpval = val.toLowerCase()
                        for (i = 0; i < response.result.length; i++) {
                            if (response.result[i] != null) {
                                b = document.createElement("DIV");
                                var suggval = response.result[i].toLowerCase().replace(/[^a-z0-9\u00A3\s]/gi, '');
                                b.innerHTML = suggval.replace(inpval, "<strong>" + inpval + "</strong>");
                                b.innerHTML += "<input type='hidden' value='" + suggval + "'>";
                                b.addEventListener("click", function (e) {
                                    inp.value = this.getElementsByTagName("input")[0].value;
                                    closeAllLists();
                                    $(formid).trigger('submit');
                                });
                                a.appendChild(b);
                            }
                        }
                    }
                }
            });
        });

        inp.addEventListener("keyup", function (e) {
            if ($('#' + inp.id).is(":focus") && (e.keyCode == 13)) {
                $(formid).trigger('submit');
            }
        });

        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });
    }
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

//********************Lookup Table**********************

function lookupTable() {
    $(document).ready(function () {
        $('.searchInput').keyup(function () {
            var blockId = $(this).attr('id');
            var searchText = $(this).val().toLowerCase();
            var pattern = /^[A-Za-z0-9]*$/;
            var table = $('#allsearch-table' + blockId);
            var rows = table.find('tr').slice(1);
            if (!pattern.test(searchText)) {
                searchText = searchText.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
                $(this).val(searchText);
                return;
            }
            var count = 0;
            rows.each(function () {
                var row = $(this);
                var found = false;

                row.find('td, th').each(function () {
                    var cellText = $(this).text().toLowerCase();
                    if (cellText.includes(searchText)) {
                        found = true;
                        return false;
                    }
                });

                if (found) {
                    row.show();
                    count++;
                } else {
                    row.hide();
                }
            });

            if (searchText.length == 0) {
                table.show();
                $('#searchResults' + blockId).hide();
                $('#LookUpTableTitle' + blockId).show();
            }
            else if (count === 0) {
                table.hide();
                $('#searchResults' + blockId).show();
                $('#searchResults' + blockId).text($("#hiddenNotFoundTextValue" + blockId).val());
                $('#LookUpTableTitle' + blockId).hide();
            } else {
                table.show();
                $('#searchResults' + blockId).show();
                $('#LookUpTableTitle' + blockId).show();
                $('#searchResults' + blockId).text(count + " " + $("#hiddenFoundTextValue" + blockId).val());
            }
        });
    });
}

//********************Back to top**********************

$(document).ready(function () {
    var scrollTrigger = 4 * $(window).height(); // Calculate the scroll trigger based on four screen lengths

    $(window).scroll(function () {
        if ($(this).scrollTop() > scrollTrigger) {
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').removeClass('show');
        }
    });

    $('.back-to-top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
});

//********************Video Player**********************
function videoPlayer() {
    $("#video-player .nav .nav-link").click(function () {
        if ($(".blue-bg div[id^='video']:not('.active')").length > 0) {
            $(".blue-bg div[id^='video']:not('.active')").each(function () {
                if ($(this).find("iframe").length > 0) {
                    var x = $(this).find("iframe").attr("src");
                    if (x.indexOf("youtube") != -1) {
                        var y = "?autoplay=0&mute=0";
                        $(this).find("iframe").attr("src", x + y);
                    }

                    if (x.indexOf("vimeo") != -1) {
                        var iframe = $(this).find("#vimeo-player")[0];
                        var player = $f(iframe);
                        player.api("pause");
                    }
                }
                if ($(this).find("video").length > 0) {
                    $(this).find("video")[0].pause();
                }
            });
        }
    });
}

$(function () {
    $(window).on('load', function () {
        $('[data-src]').each(function () {
            var $this = $(this),
                src = $(this).data('src');
            $this.attr('src', src);
        });
    });
});

//********************Counter Number**********************
function counterNumber() {
    $('.counter').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-target');
        $({
            countNum: $this.text()
        }).animate({
            countNum: countTo
        },
            {
                duration: 5000,
                easing: 'linear',
                step: function () {
                    $this.text(commaSeparateNumber(Math.floor(this.countNum)));
                },
                complete: function () {
                    $this.text(commaSeparateNumber(this.countNum));
                }
            }
        );
    });
}
function commaSeparateNumber(val) {
    val = val.toString().replace(/,/g, '');
    var valSplit = val.split('.');
    while (/(\d+)(\d{3})/.test(valSplit[0].toString())) {
        valSplit[0] = valSplit[0].toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    if (valSplit.length == 2) {
        val = valSplit[0] + "." + valSplit[1];
    } else {
        val = valSplit[0];
    }
    return val;
}

$(document).ready(function () {
    $('.breadcrumb li').each(function () {
        var content = $(this).text();
        var maxLength = 10;
        if (content.length > maxLength) {
            $(this).addClass('ellipsis');
        }
    });

    $('.news-tag').each(function () {
        var content = $(this).text();
        var maxLength = 5;
        if (content.length > maxLength) {
            $(this).addClass('ellipsis');
        }
    });
});

//TOAST BLOCK COOKIES
$(document).ready(function () {
    if (document.cookie.indexOf("ToastPopupBlocked") < 0) {
        $("#exampleModal").show();
        $(".modal-backbg").show();
        $("#exampleModal").addClass("show");
    }
    else {
        $("#exampleModal").hide();
        $(".modal-backbg").hide();
    }
});

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [k, v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name];
}

$("#AllowToastPopup").click(function () {
    document.cookie = "ToastPopupBlocked=false; path=/; expires=Wed, 05 Aug 2028 23:00:00 UTC";
    $("#exampleModal").hide();
    $(".modal-backbg").hide();
});

$("#BlockToastPopup").click(function () {
    document.cookie = "ToastPopupBlocked=true; path=/; expires=Wed, 05 Aug 2028 23:00:00 UTC";
    $("#exampleModal").hide();
    $(".modal-backbg").hide();
});

$("#CloseToast").click(function () {
    $("#exampleModal").hide();
    $(".modal-backbg").hide();
});

$(document).ready(function () {
    CheckCookieSiteWideAlertBanner("SiteWideAlertBanner", "SiteWideAlertBanner");
});

function CheckCookieSiteWideAlertBanner(cookieName, blockToHide) {
    if (document.cookie.indexOf(cookieName) > -1) {
        $("#" + blockToHide).hide();
        return;
    }
    else {
        $("#" + blockToHide).show();
    }
}

function createCookie(days, cookieName, hideBlockId) {
    if (document.cookie.indexOf(cookieName) > -1) {
        $("#" + hideBlockId).hide();
        return;
    }
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = cookieName + "=false; path=/; expires=" + date.toUTCString();
    }
}


$(".show-hide-text").click(function () {
    var toggleIcon = $(".toggle-icon");
    toggleIcon.toggleClass("fa-angle-down fa-angle-up");

    if (toggleIcon.hasClass("fa-angle-down")) {
        $(".toggle-text").text($('#showAllText').val());
        $('.step-accordion .collapse').each(function () {
            $(this).removeClass('show');
        });
        $('.step-accordion .accordion-button').each(function () {
            $(this).attr('aria-expanded', 'false');
            $(this).addClass('collapsed');
        });
    }
    else {
        $(".toggle-text").text($('#hideAllText').val());
        $('.step-accordion .collapse').each(function () {
            $(this).addClass('show');
        });
        $('.step-accordion .accordion-button').each(function () {
            $(this).attr('aria-expanded', 'true');
            $(this).removeClass('collapsed');
        });
    }
});

$('.show-hide-text').keyup(function (event) {
    var id = event.keyCode;
    if (id == 13) {
        $('.toggle-text').trigger('click');
    }
});

//SiteWideAlert BANNER
$("#alert-close").click(function () {
    createCookie(30, "SiteWideAlertBanner", "SiteWideAlertBanner");
});

// $(document).ready(function () {
//     $('h1:first').attr('id', 'skipToContent');
// });

$(document).ready(function () {
    if ($("#CTAShowInRightId").val()) {
        $("#CTABlockId").addClass('ms-auto');

    }
    else {
        $("#CTABlockId").removeClass('ms-auto');
    }
});

// Decision tree
$(".tree-question").click(function () {
    var elementId = $(this).attr('id');
    var strItems = elementId.split("-");
    var ansItem = "answer-" + strItems[1];

    $('.tree-answer').hide();

    var isNested = $(this).parent().attr('class');
    if (isNested.indexOf('nested') > -1) {
        $('.tree-answer-section').hide();
        for (var i = strItems[1].length; i > 1; i--) {
            var temp = strItems[1].substring(0, i - 1);
            $('#answer-' + temp).show();
        }
    }

    $('#' + ansItem).show();
    $('#' + ansItem + ' .form-check-input').prop('checked', false);
    return;
});

$(".tree-reset").click(function () {
    $('.tree-answer').hide();
    $('.tree-answer-section').hide();
    $('.form-check-input').prop('checked', false);
});

$(document).ready(function () {
    CheckCookie_Hide("LanguageBanner", "lang-banner");
});

function CheckCookie_Hide(cookieName, blockToHide) {
    if (document.cookie.indexOf(cookieName) > -1) {
        if (getCookie(cookieName) == Langbannerpath) {
            $("#" + blockToHide).hide();
            return;
        }
        else {
            $("#" + blockToHide).show();
        }
    }
    else {
        $("#" + blockToHide).show();
    }
}
var Langbannerpath = (window.location.pathname);
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function CreatePageCookie(days, cookieName, hideBlockId, path) {
    if (document.cookie.indexOf(cookieName) > -1) {
        $("#lang-banner").hide();
        $("#" + hideBlockId).hide();
        return;
    }
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = cookieName + "=" + path + "; expires=" + date.toUTCString();
    }
}
function LanguageBanner() {
    $("#lang-banner").hide();
    CreatePageCookie(30, "LanguageBanner", "lang-banner", Langbannerpath);
}
/* PostCode Checker Block */
$(document).ready(function () {
    if (localStorage['ScrollPositionX'] !== "null") {
        $(document).scrollTop(localStorage['ScrollPositionX']);
        localStorage['ScrollPositionX'] = "null";
        $(".back-drop-bg").hide();
        $(".loader").hide();
    }

    if ($("#ListAddressVal").val() != null && $("#ListAddressVal").val() != "") {
        $("#divChangeLocation").show();
        $("#PostCodeSubmit").hide();
        $("#postcode-form").hide();
    }
    else if ($("#divNoResultFoudPostCode").is(':visible')) {
        $("#PostCodeSubmit").hide();
        $("#postcode-form").hide();
    }
    else {
        $("#PostCodeSubmit").show();
        $("#postcode-form").show();
    }
    $(".info-card").each(function () {
        var closestRow = $(this).closest(".row");
        closestRow.addClass("extra-margin");
    });
    $(".info-card.news-center").each(function () {
        var closestRow = $(this).closest(".row");
        closestRow.addClass("news-center-spacing");
    });
});

var postcodeRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;
$("#PostCodeSubmit").click(function () {
    if ($("#PostCode").val() != "") {
        if (postcodeRegex.test($("#PostCode").val())) {
            $(".back-drop-bg").show();
            $(".loader").show();
            $("#postcode-form").removeClass("form-error");
            $("#divChangeLocation").show();
            localStorage["ScrollPositionX"] = $(this).parents('section:first').offset().top;
            $("#divInvalidPostCodeMessage").hide();
            $("#PostCodeSubmit").hide();
            $("#postcode-form").hide();
            if ($("#ListAddressVal").val() != null && $("#ListAddressVal").val() != "") {
                $('#SelectAddressDrpDn').show();
            }
        }
        else {
            $("#divInvalidPostCodeMessage").show();
            $("#postcode-form").addClass("form-error");
            $("#divInvalidPostCodeMessage").text($("#hdnInvalidPostCodeMessage").val());
            return false;
        }
    }
});

$("#ChangeLocation").click(function () {
    $("#PostCodeSubmit").show();
    $("#postcode-form").show();
    $("#divChangeLocation").hide();
    $("#PostCodeLabel").text('');
    $('#SelectAddressDrpDn').empty();
    $('#SelectAddressDrpDn').hide();
    $("#divInitialContent").hide();
    $("#PostCodeTableResult").hide();
    $("#divClosingContent").hide();
    $("#divNoResultFoudPostCode").hide();
    var uri = window.location.href.toString();
    if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    }
});

$("#SelectAddressDrpDn").change(function () {
    var selectUrn = $('#SelectAddressDrpDn :selected').val();
    var ListAddressVal = JSON.parse($("#ListAddressVal").val());
    if (selectUrn == "0") {
        $("#divInitialContent").hide();
        $("#PostCodeTableResult").hide();
        $("#divClosingContent").hide();
    }

    $(ListAddressVal).each(function (r, k) {
        if (selectUrn == ListAddressVal[r].UPRN) {
            $("#divInitialContent").show();
            $("#PostCodeTableResult").show();
            $("#divClosingContent").show();
            SetPostCodeTableValues(ListAddressVal[r]);
            return;
        }
    });

});

function SetPostCodeTableValues(ListAddressVal) {
    let netSpeedUnit = $("#hdnInternetSpeedUnit").val();
    $("#StandardDownloadVal").text(ListAddressVal.MaxBbPredictedDown > -1 ? ListAddressVal.MaxBbPredictedDown + " " + netSpeedUnit : '- -');
    $("#StandardUploadVal").text(ListAddressVal.MaxBbPredictedUp > -1 ? ListAddressVal.MaxBbPredictedUp + " " + netSpeedUnit : '- -');
    SetValuesForAvailability(ListAddressVal.MaxBbPredictedUp, ListAddressVal.MaxBbPredictedDown, "StandardAvailableVal");
    $("#SuperfastDownloadVal").text(ListAddressVal.MaxSfbbPredictedDown > -1 ? ListAddressVal.MaxSfbbPredictedDown + " " + netSpeedUnit : '- -');
    $("#SuperfastUploadVal").text(ListAddressVal.MaxSfbbPredictedUp > -1 ? ListAddressVal.MaxSfbbPredictedUp + " " + netSpeedUnit : '- -');
    SetValuesForAvailability(ListAddressVal.MaxSfbbPredictedUp, ListAddressVal.MaxSfbbPredictedDown, "SuperfastAvailableVal");
    console.log(ListAddressVal.MaxUfbbPredictedDown)
    $("#UltrafastDownloadVal").text(ListAddressVal.MaxUfbbPredictedDown > -1 ? ListAddressVal.MaxUfbbPredictedDown + " " + netSpeedUnit : '- -');
    $("#UltrafastUploadVal").text(ListAddressVal.MaxUfbbPredictedUp > -1 ? ListAddressVal.MaxUfbbPredictedUp + " " + netSpeedUnit : '- -');
    SetValuesForAvailability(ListAddressVal.MaxUfbbPredictedUp, ListAddressVal.MaxUfbbPredictedDown, "UltrafastAvailableVal");
}

function SetValuesForAvailability(upload, download, id) {
    if (parseFloat(upload) > -1 || parseFloat(download) > -1) {
        $("#" + id).text($("#hdnAvailableText").val());
    }
    else {
        $("#" + id).text($("#hdnUnAvailableText").val());
    }
}

/* End Of Post Code Checker */

//EXTERNAL LINK IN NEW TAB
$(document).ready(function () {
    $(document.links).not(".rich-text-block a").each(function (r, k) {
        if (k.host !== location.host && k.href.indexOf('javascript:void(0)') < 0) {
            k.target = '_blank';
        }
    });
});

//Swiper
function teaserSwiper() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
                slidesPerGroup: 2,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 10,
                slidesPerGroup: 3,
            },
        },
    });
}

//page Specific info banner
$(document).ready(function () {
    CheckCookieAndHidePopup("PageSpecCookie", "page-banner");
});

function CheckCookieAndHidePopup(cookieName, blockToHide) {
    if (document.cookie.indexOf(cookieName) > -1) {
        if (getCookie(cookieName) == pagebannerpath) {
            $("#" + blockToHide).hide();
            return;
        }
        else {
            $("#" + blockToHide).show();
        }
    }
    else {
        $("#" + blockToHide).show();
    }
}
var pagebannerpath = (window.location.pathname);
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function createPageCookie(days, cookieName, hideBlockId, path) {
    if (document.cookie.indexOf(cookieName) > -1) {
        $("#page-banner").hide();
        $("#" + hideBlockId).hide();
        return;
    }
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = cookieName + "=" + path + "; expires=" + date.toUTCString();
    }
}

function pageInfo() {
    $("#page-banner").hide();
    createPageCookie(30, "PageSpecCookie", "page-banner", pagebannerpath);
}
function pageInfoBanner() {
    $("#page-banner").hide();
}

$(document).ready(function () {
    $('blockquote p:has(cite)').contents().unwrap();
});

$(document).ready(function () {

    //1=Refresh,2=backurl,0=firsttimeload
    if (performance.navigation.type != 1) {
        var storedAccordions = JSON.parse(sessionStorage.getItem('openAccordions')) || [];
        storedAccordions.forEach(function (item) {
            $('#' + item).addClass('show');
            $('#' + item).prev('.accordion-header').find('.accordion-button').removeClass('collapsed');
        });
        $('.accordion').on('shown.bs.collapse', function (e) {
            var accordionId = $(e.target).attr('id');
            if ($.inArray(accordionId, storedAccordions) === -1) {
                storedAccordions.push(accordionId);
                sessionStorage.setItem('openAccordions', JSON.stringify(storedAccordions));
            }
        });
        $('.accordion').on('hidden.bs.collapse', function (e) {
            var accordionId = $(e.target).attr('id');
            storedAccordions = $.grep(storedAccordions, function (value) {
                return value !== accordionId;
            });
            sessionStorage.setItem('openAccordions', JSON.stringify(storedAccordions));
        });
    }
});

$(document).ready(function () {
    $(document).on('DOMNodeInserted', '#CookiebotSessionPixel', function () {
        $(this).attr('alt', 'CookiebotSessionImg');
    });
});

// For remove footer top margin
$(document).ready(function () {
    var lastBlock = $("main .block.latestnewsblock:last");
    var allBlocks = $("main .block");

    if (lastBlock.length > 0 && lastBlock.is(":last-child") && lastBlock.hasClass("block")) {
        $("#footer-subscription").removeClass("mtop-5");
    }
});

//This will trim the end 'forward slash' in all hyperlinks
$(document).ready(function () {
    $("a").each(function () {
        var href = $(this).attr("href");
        if (href && href.length > 1 && href.endsWith('/')) {
            $(this).attr("href", href.slice(0, -1));
        }
    });
});

$(document).ready(function () {
    checkTouch();
    $(window).resize(function () {
        checkTouch();
    });
});

function checkTouch() {
    var centeredDiv = $(".filters-content:last");
    var absoluteDiv = $(".filter-btn");
    if (centeredDiv != undefined && centeredDiv[0] != undefined) {
        var centeredDivRect = centeredDiv[0].getBoundingClientRect();
        var absoluteDivRect = absoluteDiv[0].getBoundingClientRect();

        if (
            absoluteDivRect.left < centeredDivRect.right &&
            absoluteDivRect.right > centeredDivRect.left
        ) {
            absoluteDiv.addClass("touched-class");
        }
        else {
            absoluteDiv.removeClass("touched-class");
        }
    }
}


$(document).ready(function () {
    var searchBHeight = $(".news-centre-page #recommendation-block-height").height();
    var containerBPadding = -70;
    $(".news-centre-page #slider-height").css("padding-top", (searchBHeight + containerBPadding) + "px");
});