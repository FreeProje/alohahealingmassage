 
// GETTING VALUES
const services = {
    massage: localStorage.getItem('massage'),
    beauty: localStorage.getItem('beauty'),
    pregnancy: localStorage.getItem('pregnancy'),
    osteopathy: localStorage.getItem('osteopathy'),
    physiotherapy: localStorage.getItem('physiotherapy'),
};

const amountStored = localStorage.getItem('selecting-amount');

// Reusable UI Updaters
const updateMassageType = (text) => {
    document.querySelectorAll('.js-massage-type').forEach(el => el.innerHTML = text);
};

const updateSpecific = (text) => {
    document.querySelectorAll('.js-specific').forEach(el => el.innerHTML = `<i>${text}</i>`);
};

const updateAmount = (text) => {
    document.querySelectorAll('.js-amount').forEach(el => el.innerHTML = `<i>${text}</i>`);
};

const updateImage = (src) => {
    document.querySelector('.js-img').innerHTML = `<img src="${src}" width="100%">`;
};

const updateDescription = (text) => {
    document.querySelector('.description').innerHTML = `<b>Description:</b> <span>${text}</span>`;
};

// CATEGORY LOGIC
if (services.massage) {
    updateMassageType('MASSAGE');

    const massageOptions = {
        'deep-tissue-massage': {
            name: 'Deep tissue massage',
            img: 'img/deep.jpeg',
            desc: `A strong massage to ease tension like lower back and shoulder pain.<br>Strong pressure`
        },
        'sports-massage': {
            name: 'Sports massage',
            img: 'img/sport.jpeg',
            desc: `Not just for athletes – great for all-round injury prevention and recovery.<br>Medium pressure`
        },
        'urban-classic-massage': {
            name: 'Urban classic massage',
            img: 'img/classic.jpeg',
            desc: `Inspired by Swedish massage, a great all-rounder.<br>Medium pressure`
        },
        'relaxing-massage': {
            name: 'Relaxing massage',
            img: 'img/relax.jpeg',
            desc: `A gentle, nurturing massage to combat stress and aid restful sleep.<br>Light pressure`
        },
        'yoga-massage': {
            name: 'Yoga massage',
            img: 'img/yoga.jpeg',
            desc: `A gentle, nurturing massage to combat stress and aid restful sleep.<br>Medium pressure`
        }
    };

    for (let key in massageOptions) {
        if (localStorage.getItem(key)) {
            const option = massageOptions[key];
            updateSpecific(option.name);
            updateAmount(amountStored);
            updateImage(option.img);
            updateDescription(option.desc);
            break;
        }
    }

} else if (services.pregnancy) {
    updateMassageType('PREGNANCY');

    const pregnancyOptions = {
        'prenatal': {
            name: 'Prenatal massage',
            img: 'img/pre-natal.jpeg',
            desc: `A soothing pregnancy massage at home for tired mums-to-be – only suitable in your second or third trimester.`
        },
        'postnatal': {
            name: 'Postnatal massage',
            img: 'img/post-natal.jpeg',
            desc: `A post-pregnancy massage at home tailored to your recovery needs, suitable from five weeks after birth.`
        },
        'pregnancy-glow': {
            name: 'Pregnancy glow facial',
            img: 'img/Pregnancy glow facial.jpeg',
            desc: `A tailored facial to combat the skin’s hormonal changes using pregnancy-approved products, suitable at any stage of pregnancy.`
        },
        'pregnancy-safe': {
            name: 'Pregnancy-safe osteopathy',
            img: 'img/Pregnancy-safe osteopathy.jpeg',
            desc: `Expert support through pregnancy and beyond – safe at any stage of pregnancy, including postpartum.`
        }
    };

    for (let key in pregnancyOptions) {
        if (localStorage.getItem(key)) {
            const option = pregnancyOptions[key];
            updateSpecific(option.name);
            updateAmount(amountStored);
            updateImage(option.img);
            updateDescription(option.desc);
            break;
        }
    }

} else if (services.beauty) {
    updateMassageType('BEAUTY');

    const beautyOptions = {
        'gel-manicure': 'img/gel manicure.jpeg',
        'deep-facial': 'img/clease.jpeg',
        'underarm': 'img/under.jpeg',
        'gel-pedicure': 'img/pedicure.jpeg'
    };

    for (let key in beautyOptions) {
        if (localStorage.getItem(key)) {
            updateSpecific(key.replace(/-/g, ' '));
            updateAmount(amountStored);
            updateImage(beautyOptions[key]);
            break;
        }
    }

} else if (services.osteopathy) {
    updateMassageType('OSTEOPATHY');
    if (services.osteopathy) {
        updateSpecific('Osteopathy consultation and treatment');
        updateAmount(amountStored);
        updateImage('img/child.jpeg');
        updateDescription(`An assessment of your pain, mobility and joint function, followed by treatment to address your specific symptoms.`);
    }

} else if (services.physiotherapy) {
    updateMassageType('PHYSIOTHERAPY');
    if (services.physiotherapy) {
        updateSpecific('Physiotherapy consultation and treatment');
        updateAmount(amountStored);
        updateImage('img/Physiotherapy.jpeg');
        updateDescription(`An assessment of your strength and range of motion, followed by hands-on treatment to ease your symptoms.`);
    }
}

// FORM SUBMISSION
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formFields = ['date', 'time', 'name', 'homeAddress', 'number', 'email', 'city', 'state', 'massageAddress'];
    formFields.forEach(field => {
        const value = document.querySelector(`.${field.replace(/([A-Z])/g, "-$1").toLowerCase()}`).value;
        localStorage.setItem(field, value);
        const displayEl = document.querySelector(`.js-${field.replace(/([A-Z])/g, "-$1").toLowerCase()}`);
        if (displayEl) displayEl.innerHTML = field === 'date' || field === 'time'
            ? `${localStorage.getItem('date')}, ${localStorage.getItem('time')}`
            : value;
    });

    document.querySelector('.confirm-section').style.display = 'block';
});

// CHECKOUT BUTTON
const storedAppointment = JSON.parse(localStorage.getItem('bookedAppointment')) || [];

document.querySelector('.checkout-btn').addEventListener('click', function (e) {
    e.preventDefault();

    const selectedService = Object.keys(services).find(key => services[key]) || 'Not Specified';
    const specific = document.querySelector('.js-specific')?.textContent || 'N/A';
    const amount = amountStored || '0.00';
    const img = document.querySelector('.js-img img')?.getAttribute('src') || 'https://via.placeholder.com/150';
    const desc = document.querySelector('.description span')?.innerHTML || 'No description provided.';

    const formFields = ['date', 'time', 'name', 'homeAddress', 'number', 'email', 'city', 'state', 'massageAddress'];
    const formData = {};
    formFields.forEach(field => {
        formData[field] = localStorage.getItem(field) || 'Not Provided';
    });

    const serviceCategory = selectedService.toUpperCase();

    const sendAppointment = {
        serviceCategory,
        specific,
        amount,
        image: img,
        description: desc,
        formData,
        timestamp: new Date().toISOString()
    };

    storedAppointment.unshift(sendAppointment);
    localStorage.setItem('bookedAppointment', JSON.stringify(storedAppointment));

    const bookingTime = `${formData.date}, ${formData.time}`;

    // Email parameters for the user
    const userTemplateParams = {
        to_name: formData.name,
        to_email: formData.email,
        service_category: serviceCategory,
        specific,
        amount,
        description: desc,
        booking_time: bookingTime,
        name: formData.name,
        phone: formData.number,
        email: formData.email,
        home_address: formData.homeAddress,
        massage_address: formData.massageAddress,
        city: formData.city,
        state: formData.state,
        image_url: img
    };

    // Email parameters for the admin
    const adminTemplateParams = {
        to_name: 'Admin',
        to_email: 'alohahealingmassage808@gmail.com',
        customer_name: formData.name,
        customer_email: formData.email,
        service_category: serviceCategory,
        specific,
        amount,
        description: desc,
        booking_time: bookingTime,
        phone: formData.number,
        home_address: formData.homeAddress,
        massage_address: formData.massageAddress,
        city: formData.city,
        state: formData.state,
        image_url: img
    };

    // Debug log to confirm data before sending
    console.log('User Params:', userTemplateParams);
    console.log('Admin Params:', adminTemplateParams);

    // Send email to user then admin
    emailjs.send('service_4u0a12j', 'template_hbydb1m', userTemplateParams)
    .then(() => {
        return emailjs.send('service_4u0a12j', 'template_hbydb1m', adminTemplateParams);
    })
    .then(() => {
        // Show SweetAlert and wait for user to click OK
        return Swal.fire({
            title: "Booking Confirmed!",
            text: "Your appointment has been booked successfully.",
            icon: "success",
            confirmButtonText: "OK"
        });
    })
    .then(() => {
        // After user clicks OK
        window.location.href = 'checkout.html';
    })
    .catch((error) => {
        console.error('EmailJS Error:', error);
        Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again later.",
            icon: "error",
            confirmButtonText: "OK"
        }).then(() => {
            
        });
    });

});




// EDIT BUTTON
document.querySelector('.edit').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.confirm-section').style.display = 'none';
});
