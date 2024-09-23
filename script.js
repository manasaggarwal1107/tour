let slideIndex = 0;
showSlides();
// Ensure the modals are initially hidden
document.getElementById('modal').style.display = 'none'; 
document.getElementById('image-modal').style.display = 'none'; 

function showAllSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'block';
    });
}

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 3000); 
}

function changeSlide(n) {
    slideIndex += n - 1;
    showSlides();
}

 // Function to Open Modal
 function openModel(packageName, packageDescription) {
    document.getElementById('model-title').innerText = packageName; // Set title
    document.getElementById('model-description').innerHTML = packageDescription; // Set description
    document.getElementById('model').style.display = 'block'; // Show the modal
}


function closeModel() {
    document.getElementById('model').style.display = 'none';
}

function openBookingModal(packageName, packagePrice) {
    document.getElementById('package').value = packageName;
    document.getElementById('original-price').textContent = "₹" + parseFloat(packagePrice).toFixed(2);
    document.getElementById('booking-modal').style.display = 'block';
    document.getElementById('original-price').style.textDecoration = 'none';
    document.getElementById('discounted-price').style.display = 'none'; 
    document.getElementById('offer-id').value = '';  // Reset offer ID
    document.getElementById('offer-message').textContent = '';  // Clear any messages


}

document.querySelectorAll('.package-card').forEach(card => {
    card.style.display = 'block'; // Show all package cards
});

const offerCodes = {
    "OFFER123": { discount: 0.20 },
    "OFFER456": { discount: 0.50 },
    "OFFER789": { discount: 0.10 },
};

document.getElementById('offer-id').addEventListener('input', function() {
    const offerId = this.value.trim();
    const messageBox = document.getElementById('offer-message');
    const originalPrice = parseFloat(document.getElementById('original-price').textContent.replace('₹', '').trim());
    const discountedPriceContainer = document.getElementById('discounted-price');
    const discountedAmount = document.getElementById('discounted-amount');
    const paymentMethods = document.getElementById('payment');

    if (offerId === "OFFER123") {
        // Calculate and display the discounted price
        const discount = 0.20; // 20% discount for OFFER123
        const discountedPrice = (originalPrice * (1 - discount)).toFixed(2);

        messageBox.textContent = `Offer Applied! 20% off!`;
        messageBox.style.display = 'block';
        discountedAmount.textContent = "₹" + discountedPrice;
        discountedPriceContainer.style.display = 'inline';
        document.getElementById('original-price').style.textDecoration = 'line-through';

        // Show only credit card option
        paymentMethods.value = 'credit-card';
        paymentMethods.innerHTML = `
            <option value="credit-card">Credit Card</option>
        `;
    } else if (offerCodes[offerId]) {
        const discount = offerCodes[offerId].discount;
        const discountedPrice = (originalPrice * (1 - discount)).toFixed(2);

        messageBox.textContent = `Offer Applied! ${discount * 100}% off!`;
        messageBox.style.display = 'block';

        discountedAmount.textContent = "₹" + discountedPrice;
        discountedPriceContainer.style.display = 'inline';
        document.getElementById('original-price').style.textDecoration = 'line-through';

        // Restore payment options
        paymentMethods.innerHTML = `
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="upi">UPI</option>
        `;
    } else {
        // Reset if the offer code is not valid
        messageBox.textContent = '';
        messageBox.style.display = 'none';
        discountedPriceContainer.style.display = 'none';
        document.getElementById('original-price').style.textDecoration = 'none';

        // Restore payment options
        paymentMethods.innerHTML = `
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="upi">UPI</option>
        `;
    }
});

function closeBookingModal() {
    document.getElementById('booking-modal').style.display = 'none';

    // Reset the input fields and displayed prices
    document.getElementById('package').value = '';
    document.getElementById('original-price').textContent = '';
    document.getElementById('discounted-price').style.display = 'none';
    document.getElementById('offer-id').value = '';
    document.getElementById('offer-message').textContent = '';
    document.getElementById('original-price').style.textDecoration = 'none';
}

document.getElementById('booking-form').onsubmit = function(e) {
    e.preventDefault();
    alert("Booking confirmed for " + document.getElementById('package').value);
    closeBookingModal();
};

window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const slider = document.getElementById('home');
        if (slider) {
            slider.style.display = 'none';
        }
        const sections = document.querySelectorAll('section');
        sections.forEach(section => section.style.display = 'none');
        target.style.display = 'block';
        if (this.getAttribute('href') === '#home') {
            showAllSections();
            if (slider) {
                slider.style.display = 'block';
            }
        }
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelector('.newsletter button').onclick = function() {
    alert("You have subscribed to our community!");
};

function openImageModal(title, imageUrl, description) {
    const modal = document.getElementById('image-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');

    modalTitle.textContent = title; // Set the title
    modalImage.src = imageUrl; // Set the image source
    modalDescription.textContent = description; // Set the description

    modal.style.display = 'block'; // Show the modal
}

// Function to close the modal
function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none'; // Hide the modal
    document.getElementById('modal-image').src = ''; // Clear the image when closed
}


showAllSections();

// Function to scroll to the top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll effect
    });
}

// Show or hide the "Back to Top" button
window.onscroll = function() {
    const button = document.getElementById('backToTop');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        button.style.display = 'block'; // Show button
    } else {
        button.style.display = 'none'; // Hide button
    }
};

// Ensure there's no inadvertent call to openBookingModal
window.onload = function() {
    // This will only run once when the page loads
};

// Ensure booking modal is initially hidden (this is typically done in your CSS with display: none)
// Ensure booking modal is initially hidden 
document.getElementById('booking-modal').style.display = 'none';

// Pop-up for special offers
function showOfferDetails(element) {
    const offerCode = element.getAttribute('data-code');
    const offerTerms = element.getAttribute('data-terms').split(';');

    document.getElementById('offer-code').innerText = offerCode;

    const termsList = document.getElementById('offer-terms');
    termsList.innerHTML = ''; // Clear previous terms
    offerTerms.forEach(term => {
        const listItem = document.createElement('li');
        listItem.innerText = term.trim(); // Trim whitespace
        termsList.appendChild(listItem);
    });

    document.getElementById('offer-modal').style.display = "block";
}

function closeOfferModal() {
    document.getElementById('offer-modal').style.display = "none";
}

// Function to scroll to packages section
function scrollToPackages() {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');

    // Show only the packages section
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
        packagesSection.style.display = 'block';
        packagesSection.scrollIntoView({
            behavior: 'smooth'
        });
    }

    closeOfferModal(); // Close the modal after redirecting
}

// Show all package cards when the packages button is clicked
const packagesButton = document.getElementById('packages-button');
const packageCards = document.querySelectorAll('.package-card');

packagesButton.addEventListener('click', function() {
    // Show all package cards
    packageCards.forEach(card => {
        card.classList.add('active');
    });
});

// Hide the dropdown (if it exists)
const dropdown = document.getElementById('packages-dropdown');
if (dropdown) {
    dropdown.classList.remove('active');
}

// Ensure the dropdown is hidden if clicking outside
window.addEventListener('click', function(event) {
    if (!packagesButton.contains(event.target) && dropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

document.getElementById('feedback').onsubmit = function(e) {
    e.preventDefault(); // Prevent the default form submission
    alert("Your response has been recorded!"); // Show alert
    this.reset(); // Optional: reset the form fields
};

// Show relevant payment details based on selected method
document.getElementById('payment').addEventListener('change', function() {
    const selectedMethod = this.value;
    
    // Hide both details initially
    document.getElementById('card-details').style.display = 'none';
    document.getElementById('upi-details').style.display = 'none';

    if (selectedMethod === 'credit-card' || selectedMethod === 'debit-card') {
        document.getElementById('card-details').style.display = 'block'; // Show card details
    } else if (selectedMethod === 'upi') {
        document.getElementById('upi-details').style.display = 'block'; // Show UPI details
    }
});


