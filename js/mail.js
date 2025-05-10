document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.querySelector('.name').value;
    const email = document.querySelector('.email').value;
    const message = document.querySelector('.message').value;

    // Send the email using the EmailJS SDK
    emailjs.send("service_4u0a12j", "template_dddxvjc", {
        from_name: name,
        from_email: email,
        message: message,
        to_email: "alohahealingmassage808@gmail.com"
    }).then(function(response) {
        console.log("SUCCESS", response);
    }, function(error) {
        console.log("FAILED", error);
    });
});
