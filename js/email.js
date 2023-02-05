'use strict'

const forma = document.getElementById('form')
forma.addEventListener('submit', formSend)

async function formSend(e) {
    e.preventDefault()
    let error = formValidate(forma)
    let formData = new FormData(forma)
    if (error === 0){
        const popupContent = document.querySelector('.popup__content')
        popupContent.classList.add('_sending')


        event.preventDefault();
    
        let form = $('.form__body'),
            submit = $('.submit', form),
            data = new FormData()
    
        
        $('.submit', form).val('Отправка...');
    
        data.append( 'Название организации', 	    $('[name="comp"]', form).val() );
        data.append( 'Имя', 		                $('[name="name"]', form).val() );
        data.append( 'E-mail', 		                $('[name="email"]', form).val() );
        data.append( 'Телефон', 		            $('[name="number"]', form).val() );
        data.append( 'Технические характеристики',  $('[name="techharact"]', form).val() );
        data.append( 'Наименование оборудования',   $('[name="id"]', form).val() );
        data.append( 'Артикул',                     $('[name="articl"]', form).val() );
        data.append( 'Количество',                  $('[name="count"]', form).val() );
        data.append( 'Коментарии',                  $('[name="coments"]', form).val() );
        
        $.ajax({
            url: 'ajax.php',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            xhr: function() {
                let myXhr = $.ajaxSettings.xhr();
    
                if ( myXhr.upload ) {
                    myXhr.upload.addEventListener( 'progress', function(e) {
                        if ( e.lengthComputable ) {
                            let percentage = ( e.loaded / e.total ) * 100;
                                percentage = percentage.toFixed(0);
                            $('.submit', form)
                                .html( percentage + '%' );
                        }
                    }, false );
                }
    
                return myXhr;
            }
        });
        
        setTimeout(() => {
            popupContent.classList.remove('_sending')

            setTimeout(() => {
                const mail = createObject()
                formAlert(mail)
                forma.reset()
            }, 100)
        }, 500)

    } else {
        alert('Заполните обязательные поля!')
    }
}

function createObject() {
    let data = document.querySelectorAll("._form")
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