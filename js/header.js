$(function() {
    if ($(window).scrollTop() !== 0){
        $("#header").addClass('fixed')
    }

    const windowInnerHeight = window.innerHeight
    const spaceHeight = document.getElementById("space").offsetHeight
    const contactsHeight = document.getElementById("contacts").offsetHeight

    const header = $("#header")
    

    // Плавный скролл
    $("[data-scroll]").on("click", function(event){
        event.preventDefault()
        
        const $this = $(this),
              blockId = $this.data("scroll")
              blockOffSet = $(blockId).offset().top - header.height() + 1

        $("#nav a").removeClass("active")
        // $this.addClass("active")

        $("html, body").animate({
            scrollTop: blockOffSet
        }, 500)

        // $("#nav_toggle").removeClass("active")
        // $("#nav").removeClass("active")
    })

    // Отслеживание элементов
    $(window).scroll(function() {
        var height = $(window).scrollTop()
        if (height === 0){
            $("#nav a").removeClass('active')
            $("#header").removeClass('fixed')
        } else {
            $("#header").addClass('fixed')
            ifScroll("#scroll__news", "#news", height)
            ifScroll("#scroll__about", "#about", height)
            ifScroll("#scroll__vend", "#venders", height)
            ifScroll("#scroll__work", "#work", height)
            scrollToContacts("#scroll__cont", "#contacts", height)

        }
    });

    function ifScroll(navItem, content, height) {
        if(height >= ($(content).offset().top - header.height() - 50)){
            $("#nav a").removeClass('active')
            $(navItem).addClass('active');
        } else {
            $(navItem).removeClass('active');
        }
    }

    function scrollToContacts(navItem, content, height) {
        if ((spaceHeight + contactsHeight) > windowInnerHeight) {
            ifScroll(navItem, content, height)
        } else {
            if(height >= ($('body').height() - windowInnerHeight - header.height())){
                $("#nav a").removeClass('active')
                $(navItem).addClass('active');
            } else {
                $(navItem).removeClass('active');
            }
        }

    }
})