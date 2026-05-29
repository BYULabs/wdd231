// Populate timestamp when form is submitted
document.querySelector('form').addEventListener('submit', function() {
    document.querySelector('#timestamp').value = new Date().toLocaleString();
});