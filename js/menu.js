document.querySelector('.bi-list').addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector('.menu').style.display = 'block';
});

document.querySelector('.bi-x-lg').addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector('.menu').style.display = 'none';
});

function homeRedirect() {
    window.location.href = 'index.html';
};

//REDIRECT SECTION

function selectedMenu(select) {

    localStorage.removeItem('massage');
    localStorage.removeItem('beauty');
    localStorage.removeItem('pregnancy');
    localStorage.removeItem('osteopathy');
    localStorage.removeItem('physiotherapy');


    if (select === 'massage') {
        localStorage.setItem('massage', 'massage');
        window.location.href = 'massage.html';

    } else if(select === 'beauty') {
        localStorage.setItem('beauty', 'beauty');
        window.location.href = 'beauty.html';
        
    }  else if(select === 'pregnancy') {
        localStorage.setItem('pregnancy', 'pregnancy');
        window.location.href = 'pregnancy.html';

    } else if(select === 'osteopathy') {
        localStorage.setItem('osteopathy', 'osteopathy');
        window.location.href = 'osteopathy.html';
        
    } else if(select === 'physiotherapy') {
        localStorage.setItem('physiotherapy', 'physiotherapy');
        window.location.href = 'physiotherapy.html';
        
    } else if(select === 'appointment') {
        window.location.href = 'appointment.html';
        document.querySelector('.menu').style.display = 'none';
        
    } else if(select === 'service') {
        window.location.href = '#service';
        document.querySelector('.menu').style.display = 'none';
        
    } else if(select === 'about-us') {
        window.location.href = '#service';
        document.querySelector('.menu').style.display = 'none';
        
    } else if(select === 'contact-us') {
        window.location.href = '#contact-us';
        document.querySelector('.menu').style.display = 'none';
        
    } else if(select === 'booking') {
        window.location.href = 'index2.html';
        
    } 
};
