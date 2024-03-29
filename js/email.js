'use strict'
const token = "6161204777:AAGQMlkmMAS8gECJAbXDNXBlIGOfJtZ2Uno";

const forma = document.getElementById('form')
forma.addEventListener('submit', formSend)

async function formSend(e) {
    e.preventDefault()
    let error = formValidate(forma)
    let formData = new FormData(forma)
    if (error === 0){
        const popupContent = document.querySelector('.popup__content')
        popupContent.classList.add('_sending')

        let data = {
            'Название организации': $('[name="comp"]', forma).val(),
            'Имя': $('[name="name"]', forma).val(),
            'E-mail': $('[name="email"]', forma).val(),
            'Телефон': $('[name="number"]', forma).val(),
            'Технические характеристики': $('[name="techharact"]', forma).val(),
            'Наименование оборудования': $('[name="id"]', forma).val(),
            'Артикул': $('[name="articl"]', forma).val(),
            'Количество': $('[name="count"]', forma).val(),
            'Комментарии': $('[name="coments"]', forma).val(),
        };
      
        try {
            const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
              chat_id: "-888721777",
              text: createMessage(data),
            });

            if (response.data.ok) {
                console.log("Запрос отправлен!", response.data)
                popupContent.classList.remove('_sending')
                forma.reset()
            }
        } catch (error) {
            console.error("Ошибка отправки!", error);
            popupContent.classList.remove('_sending')
            forma.reset()
        }
    }
    // else {
    //     alert('Заполните обязательные поля!')
    // }
}

function getCurrentDateTime() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  
    const formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;
    return formattedDateTime;
}  

function createMessage(data) {
    let message = 'ПОЛУЧЕН ЗАПРОС\n\n';
    for (let key in data) {
      message += `${key}: ${data[key]}\n`;
    }
    message += `\n${getCurrentDateTime()}`;
    return message;
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

function formAddError(input) {
    input.parentElement.classList.add('_error')
    input.classList.add('_error')
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error')
    input.classList.remove('_error')
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
}