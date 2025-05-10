
window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.items');
    const appointments = JSON.parse(localStorage.getItem('bookedAppointment')) || [];

    if (!appointments.length) {
        container.innerHTML = `<center><b>No bookings yet.</b></center>`;
        return;
    }

    container.innerHTML = ''; // Clear initial template

    appointments.forEach((appt, index) => {
        const {
            serviceCategory,
            specific,
            amount,
            image,
            description,
            formData,
            satisfaction // New!
        } = appt;

        const bookingDateTime = `${formData.date}, ${formData.time}`;

        const isSatisfied = satisfaction === 'satisfied';
        const isNotSatisfied = satisfaction === 'not-satisfied';

        const itemHTML = `
            <div class="appointment-card" data-index="${index}" style="margin-bottom: 20px;">
                <div>
                    <i class="bi bi-trash" style="cursor:pointer;" data-index="${index}"></i>
                </div>
                <center>
                    <b class="js-massage-type">${serviceCategory}</b>
                </center>

                <div class="appointment-flex">
                    <div>
                        <div>
                            <img src="${image}" width="100%">
                        </div>

                        <b>
                            <i class="text-book2 js-specific">${specific}</i>
                        </b>
        
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

                <div class="app-btn-flex" style="${isSatisfied || isNotSatisfied ? 'display: none;' : ''}">
                    <div><button class="sat-btn">Satisfied</button></div>
                    <div><button class="not-btn">Not Satisfied</button></div>
                </div>

                <center class="status" style="margin-top:10px; color: ${isSatisfied ? 'green' : isNotSatisfied ? 'red' : ''}">
                    ${
                        isSatisfied
                            ? 'You marked this appointment as <b>satisfied</b> 😊'
                            : isNotSatisfied
                            ? 'You marked this appointment as <b>not satisfied</b> 😞'
                            : ''
                    }
                </center>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', itemHTML);
    });

    // Delete appointment
    container.addEventListener('click', function (e) {
        if (e.target.classList.contains('bi-trash')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            if (!isNaN(index)) {
                appointments.splice(index, 1);
                localStorage.setItem('bookedAppointment', JSON.stringify(appointments));
                location.reload();
            }
        }
    });

    // Handle satisfaction buttons
    container.addEventListener('click', function (e) {
        const satBtn = e.target.closest('.sat-btn');
        const notBtn = e.target.closest('.not-btn');

        if (satBtn || notBtn) {
            const card = e.target.closest('.appointment-card');
            const index = card.getAttribute('data-index');

            const storedAppointments = JSON.parse(localStorage.getItem('bookedAppointment')) || [];

            storedAppointments[index].satisfaction = satBtn ? 'satisfied' : 'not-satisfied';
            localStorage.setItem('bookedAppointment', JSON.stringify(storedAppointments));

            const buttonGroup = card.querySelector('.app-btn-flex');
            if (buttonGroup) buttonGroup.style.display = 'none';

            const statusEl = card.querySelector('.status');
            if (statusEl) {
                statusEl.style.color = satBtn ? 'green' : 'red';
                statusEl.innerHTML = satBtn
                    ? 'You marked this appointment as <b>satisfied</b> 😊'
                    : 'You marked this appointment as <b>not satisfied</b> 😞';
            }
        }
    });
});
