const lockPadding = document.querySelectorAll('.lock-padding')
const body = document.querySelector('body')




let unlock = true

const timeout = 800



const popupLinks = document.querySelectorAll('.popup-link')
if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++){
        popupLink = popupLinks[index]
        popupLink.addEventListener("click", function(e) {
            const popupName = popupLink.getAttribute('href').replace("#", '')
            const currentPopup = document.getElementById(popupName)
            popupOpen(currentPopup)
            e.preventDefault()
        })
    }
}

const popupCloseIcon = document.querySelector('.close-popup')
popupCloseIcon.addEventListener('click', function(e){
    popupClose(popupCloseIcon.closest('.popup'))
    e.preventDefault()
})

function popupOpen(currentPopup) {
    if (currentPopup && unlock){
        const popupActive = document.querySelector('.popup.open')
        if (popupActive){
            popupClose(popupActive, false)
        } else {
            bodyLock()
        }
        currentPopup.classList.add('open')
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')){
                popupClose(e.target.closest('.popup'))
            }
        })
    }
}

function popupClose (popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open')
        if (doUnlock) {
            bodyUnLock()
        }
    }
}


function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector(".page").offsetWidth + 'px'

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++){
            const el = lockPadding[index]
            el.style.paddingLeft = lockPaddingValue
        }
    }
    
    body.style.paddingRight = lockPaddingValue
    body.classList.add('lock')

    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

function bodyUnLock() {
    setTimeout(function() {
        if (lockPadding.length> 0){
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index]
                el.style.paddingRight = '0px'
            }
        }

        body.style.paddingRight = '0px'
        body.classList.remove('lock')
    }, timeout)

    unlock = false
    setTimeout(function() {
        unlock = true
    }, timeout)
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open')
        popupClose(popupActive)
    }
})




