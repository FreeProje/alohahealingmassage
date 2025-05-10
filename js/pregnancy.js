
function choosenType(button, select) {
    localStorage.removeItem('prenatal');
    localStorage.removeItem('postnatal');
    localStorage.removeItem('pregnancy-glow');
    localStorage.removeItem('pregnancy-safe');

    // Find the select element relative to the clicked button
    const container = button.closest('.type-container1, .type-container2, .type-container3, .type-container4');
    const selectAmount = container.querySelector('.selecting-amount').value;

    localStorage.setItem(select, select);
    localStorage.setItem('selecting-amount', selectAmount);

    window.location.href = 'booking.html';
}
