'use strict'

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form')
    form.addEventListener('submit', formSend)

    async function formSend(e) {
        e.preventDefault()
        let error = formValidate(form)
        let formData = new FormData(form)
        if (error === 0){
            const popupContent = document.querySelector('.popup__content')
            popupContent.classList.add('_sending')

            // TODO Отправка на почту тут
            // let response = await fetch('sendmail.php', {
            //     method: 'POST',
            //     body: formData
            // })
            // 
            // console.log(response)
            // 
            // if (response.ok){
            //     let result = await response.json()
            //     alert(result.message)
            // } else {
            //     alert("Ошибка!")
            // }
            
            
            
            setTimeout(() => {
                // TODO Когда отправка на почту будет готова, нужно сделать проверку if(response.ok)
                const mail = createObject("._form")
                formAlert(mail) 
                
                form.reset()
                popupContent.classList.remove('_sending')
            }, 1000)

        } else {
            alert('Заполните обязательные поля!')
        }
    }

    function createObject(className) {
        let data = document.querySelectorAll(className)
        const mail = {}
        for (let i = 0; i < data.length; i+=2) {
            mail[data[i].textContent] = data[i + 1].value
        }
        return mail
    }

    function formAlert(mail) {
        let ans = 'ЗАПРОС ОТПРАВЛЕН\n\n' 
        for (var key in mail) {
            ans += `${key}:   ${mail[key]}\n`
        }
        alert(ans)
    }

    function formValidate(form) {
        let error = 0
        let formReq = document.querySelectorAll('._req')

        for (let index = 0; index < formReq.length; index++){
            const input = formReq[index]
            formRemoveError(input)

            if(input.classList.contains('_email')){
                if (emailTest(input)){
                    formAddError(input)
                    error++
                }
            } else {
                if (input.value === '') {
                    formAddError(input)
                    error++
                }
            }
        }
        return error
    }

    function formAddError(input){
        input.parentElement.classList.add('_error')
        input.classList.add('_error')
    }

    function formRemoveError(input){
        input.parentElement.classList.remove('_error')
        input.classList.remove('_error')
    }

    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }
})