
function choosenType(button, select) {
    localStorage.removeItem('gel-manicure');
    localStorage.removeItem('deep-facial');
    localStorage.removeItem('underarm');
    localStorage.removeItem('gel-pedicure');

    // Find the select element relative to the clicked button
    const container = button.closest('.type-container1, .type-container2, .type-container3, .type-container4');
    const selectAmount = container.querySelector('.selecting-amount').value;

    localStorage.setItem(select, select);
    localStorage.setItem('selecting-amount', selectAmount);

    window.location.href = 'booking.html';
}
