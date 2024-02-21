document.addEventListener('DOMContentLoaded', function() {
    const tripForm = document.getElementById('tripForm');
    const generatePinBtn = document.getElementById('generatePinBtn');
    const enterPinForm = document.getElementById('enterPinForm');
    const message = document.getElementById('message');
    let tripDetails;
    let generatedPin;

    // Event listener for trip form submission
    tripForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const source = tripForm.elements['source'].value;
        const destination = tripForm.elements['destination'].value;
        tripDetails = `Source: ${source}, Destination: ${destination}`;
        document.getElementById('tripDetails').textContent = tripDetails;
        tripForm.classList.add('hidden');
        generatePinBtn.parentElement.classList.remove('hidden');
    });


    
    generatePinBtn.addEventListener('click', function() {
        // Simulate backend call to generate PIN
        generatedPin = Math.floor(1000 + Math.random() * 9000);
        console.log('Generated PIN:', generatedPin);
        message.textContent = `Your PIN: ${generatedPin}`;
        message.classList.remove('hidden');
        generatePinBtn.parentElement.classList.add('hidden');
        enterPinForm.parentElement.classList.remove('hidden');
    });


enterPinForm.addEventListener('submit', async function(event) {
    
    event.preventDefault();

    // Get the entered PIN from the form input field
    const enteredPin = enterPinForm.elements['pin'].value;
    console.log('Entered PIN:', enteredPin);

    // Compare the entered PIN with the generated PIN
    if (enteredPin === generatedPin.toString()) {
        // If the PINs match, redirect to another page
        window.location.href = 'index2.html'; // Replace 'another_page.html' with the desired URL
    } else {
        // If the PINs do not match, display an error message
        message.textContent = 'Invalid PIN. Please try again.';
        message.classList.remove('hidden'); // Show the error message
    }
});
}
)
