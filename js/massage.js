
function choosenType(button, select) {
    localStorage.removeItem('deep-tissue-massage');
    localStorage.removeItem('sports-massage');
    localStorage.removeItem('urban-classic-massage');
    localStorage.removeItem('relaxing-massage');
    localStorage.removeItem('yoga-massage');
    localStorage.removeItem('selecting-amount');

    // Find the select element relative to the clicked button
    const container = button.closest('.type-container1, .type-container2, .type-container3, .type-container4, .type-container5');
    const selectAmount = container.querySelector('.selecting-amount').value;

    localStorage.setItem(select, select);
    localStorage.setItem('selecting-amount', selectAmount);

    window.location.href = 'booking.html';
}
