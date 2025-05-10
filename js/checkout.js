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
                <div><button class="sat-btn" onclick="payOut(0)">Checkout</button></div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', itemHTML);
});


//HANDLING PAYMENT

function payOut(index) {
    const appointments = JSON.parse(localStorage.getItem('bookedAppointment')) || [];
    const appt = appointments[index];

    if (!appt) {
        alert("Appointment not found!");
        return;
    }

    const { amount } = appt; // <-- Get amount properly from appointment

    document.querySelector('.select-payment-section').style.display = 'block';
    document.querySelector('.checkingAmount').innerHTML = `${amount}`;
};

function contactMerchant(element) {
    if (element === 'cashapp') {
        document.querySelector('.loading').style.display = 'block';
        setTimeout(() => {
           
            document.querySelector('.loading').style.display = 'none';
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Payment failed due to system maintenance. Please contact merchant to proceed with your payment.",
                icon: "error",
                confirmButtonText: "OK"
            }).then(() => {
                
            });
        },5000);

    } else if (element === 'paypal') {
        document.querySelector('.loading').style.display = 'block';
        setTimeout(() => {
           
            document.querySelector('.loading').style.display = 'none';
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Payment failed due to system maintenance. Please contact merchant to proceed with your payment.",
                icon: "error",
                confirmButtonText: "OK"
            }).then(() => {
                
            });
        },5000);

    } else if (element === 'apple') {
        document.querySelector('.loading').style.display = 'block';
        setTimeout(() => {
           
            document.querySelector('.loading').style.display = 'none';
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Payment failed due to system maintenance. Please contact merchant to proceed with your payment.",
                icon: "error",
                confirmButtonText: "OK"
            }).then(() => {
                
            });
        },5000);

    } 
}
