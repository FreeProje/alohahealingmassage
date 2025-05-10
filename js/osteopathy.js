
function choosenType(button, select) {
    localStorage.removeItem('osteopathy');

    // Find the select element relative to the clicked button
    const container = button.closest('.type-container1');
    const selectAmount = container.querySelector('.selecting-amount').value;

    localStorage.setItem(select, select);
    localStorage.setItem('selecting-amount', selectAmount);

    window.location.href = 'booking.html';
}
