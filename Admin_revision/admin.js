const tv = document.querySelector('.tv');
const phone = document.querySelector('.phone');

tv.addEventListener('click', () => {
    location.assign('adminTv.html')
})

phone.addEventListener('click', () => {
    location.assign('adminPhone.html')
})

