"use strict";

const menu = document.querySelector(".menu");
let subMenu;

function menuMain() {
    $(".menu-main").on("click", function (e) {
        const closestMenuItem = $(e.target).closest(".menu-item-has-children")[0];
        if (closestMenuItem) {
            showSubMenu(closestMenuItem);
        }
    });
}

function goBack() {
    $(".go-back").on("click", hideSubMenu);
}

function menuTrigger() {
    $(".mobile-menu-trigger").on("click", toggleMenu);
}

function closeMenu() {
    $(".mobile-menu-close").on("click", toggleMenu);
}

function menuOverlay() {
    $(".menu-overlay").on("click", toggleMenu);
}

function toggleMenu() {
    $(".menu, .menu-overlay").toggleClass("active");
}

function showSubMenu(menuItem) {
    subMenu = $(menuItem).find(".sub-menu")[0];
    $(subMenu).addClass("active").css("animation", "slideLeft 0.5s ease forwards");
    const menuTitle = $(menuItem).find("i").parent().children().first().text();
    $(".menu .mobile-menu-head").addClass("active");
    $(".menu .current-menu-title").text(menuTitle);
    $(".menu .mobile-menu-head").addClass("active");
}

function hideSubMenu() {
    $(subMenu).css("animation", "slideRight 0.5s ease forwards");
    setTimeout(() => {
        $(subMenu).removeClass("active");
    }, 300);
    menu.querySelector(".mobile-menu-head").classList.remove("active");
    $(".menu .current-menu-title").text("");
    $(".menu .mobile-menu-head").removeClass("active");
}

window.onresize = function () {
    if (this.innerWidth > 991 && $(".menu").hasClass("active")) {
        toggleMenu();
    }
};

function searchIcon() {
    $('#search-icon').on("click", function () {
        $('#search-icon i').toggleClass("fa-times");
        $('.search-form').toggleClass("active");
        $(".menu").removeClass("fa-times");
    });

    $('.search-icons').on("keypress", function (event) {
        var id = event.keyCode;
        if (id == 13) {
            $('#search-icon').trigger('click');
        }
    });
}

window.onscroll = () => {
    $(".menu").removeClass("fa-times");
};

$(".info-card").each(function () {
    var closestRow = $(this).closest(".row");
    closestRow.addClass("extra-margin");
});
// Rest of the code...


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

    $(".mobile-nav-toggle").click(function () {
        $(this).toggleClass("btn-close close-bars");
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

   

    $("#ddsort li").click(function () {
        if ($(this).attr("select")) {
            $(this).removeAttr("select");
        } else {
            $(this).attr("select", "true");
        }
    })
});

