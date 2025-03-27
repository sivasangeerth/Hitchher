document.getElementById('offerRideForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Ride Offered Successfully!");
});

document.getElementById('findRideForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('rideResults').innerHTML = <p>Searching for available rides...</p>;
});