window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.items');
    const appointments = JSON.parse(localStorage.getItem('bookedAppointment')) || [];

    if (!appointments.length) {
        container.innerHTML = `<center><b>No checkout yet.</b></center>`;
        return;
    }

    container.innerHTML = ''; // Clear any template

    // Only use the latest appointment (index 0)
    const appt = appointments[0];
    const {
        serviceCategory,
        specific,
        amount,
        image,
        description,
        formData,
        satisfaction
    } = appt;

    const bookingDateTime = `${formData.date}, ${formData.time}`;

    const itemHTML = `
        <div class="appointment-card" data-index="0" style="margin-bottom: 20px;">
            <center>
                <b class="js-massage-type">${serviceCategory}</b>
            </center>

            <div class="appointment-flex">
                <div>
                    <div>
                        <img src="${image}" width="100%">
                    </div>

                    <b><i class="text-book2 js-specific">${specific}</i></b>
                    <div class="price js-amount">${amount}</div>
                    <div><b>Description:</b> <span>${description}</span></div>
                </div>

                <div>
                    <div class="description">
                        <div class="app-top">Your information</div>
                        <div class="ensure-part">
                            <div class="label">Name: <span class="js-name">${formData.name}</span></div>
                            <div class="label">Phone number: <span class="js-number">${formData.number}</span></div>
                            <div class="label">Email: <span class="js-email">${formData.email}</span></div>
                            <div class="label">Address: <span class="js-home-address">${formData.homeAddress}</span></div>
                            <div class="label">Massage Address: <span class="js-massage-address">${formData.massageAddress}</span></div>
                            <div class="label">City: <span class="js-city">${formData.city}</span></div>
                            <div class="label">State: <span class="js-state">${formData.state}</span></div>
                            <div class="label">Booking date and time: <span class="js-date-time">${bookingDateTime}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="app-btn-flex">
                <div><button class="sat-btn" onclick="payWithPaystack(0)">Checkout</button></div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', itemHTML);
});


//HANDLING PAYMENT

function payWithPaystack(index) {
    const appointments = JSON.parse(localStorage.getItem('bookedAppointment')) || [];
    const appt = appointments[index];

    if (!appt) {
        alert("Appointment not found!");
        return;
    }

    const rawAmount = appt.amount.replace(/[^\d]/g, '');
    const amountInKobo = parseInt(rawAmount, 10) * 100;

    if (isNaN(amountInKobo) || amountInKobo <= 0) {
        alert("Invalid amount for payment.");
        return;
    }

    var handler = PaystackPop.setup({
        key: 'pk_test_1b6b6541ce53c71d6fb36f1642529c8d8989c63f', // Use your real public key
        email: appt.formData.email,
        amount: amountInKobo,
        currency: "NGN",
        ref: '' + Math.floor((Math.random() * 1000000000) + 1),
        callback: function(response) {
            alert('Payment complete! Reference: ' + response.reference);
            appointments[index].satisfaction = 'satisfied';
            localStorage.setItem('bookedAppointment', JSON.stringify(appointments));
        },
        onClose: function() {
            alert('Transaction was not completed, window closed.');
        }
    });
    handler.openIframe();
}