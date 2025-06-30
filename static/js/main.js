// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Initialize Swiper
new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    loop: true,
    autoplay: {
        delay: 5000
    }
});

// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Google Maps
function initMap() {
    // Coordinates for Utsav apartments, Lewis Rd, Bangalore
    const location = { lat: 13.000437, lng: 77.623794 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: location,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#6c6c6c"}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#e9e9e9"}]
            },
            {
                "featureType": "poi",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "transit",
                "stylers": [{"visibility": "off"}]
            }
        ]
    });

    // Add marker for Utsav apartments
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Elegant Interiors'
    });

    // Update info window with correct address
    const infowindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 5px; font-weight: bold;">Elegant Interiors</h3>
                <p style="margin: 0;">18, Lewis Rd, Bangalore</p>
            </div>
        `
    });

    marker.addListener('click', () => {
        infowindow.open(map, marker);
    });
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent default form submission
    
    try {
        const formData = new FormData(this);
        const response = await fetch('', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
                'X-Requested-With': 'XMLHttpRequest' // Add this to identify AJAX requests
            }
        });
        
        if (response.ok) {
            showAlert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            showAlert('Oops! Something went wrong. Please try again.');
        }
    } catch (error) {
        showAlert('Oops! Something went wrong. Please try again.');
    }
});

// Scroll to Top
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.querySelector('.scroll-to-top').classList.remove('hidden');
    } else {
        document.querySelector('.scroll-to-top').classList.add('hidden');
    }
};

// Initialize Google Maps
window.onload = function() {
    initMap();
};

// Add this to your existing scripts
function duplicateTestimonials() {
    const track = document.querySelector('.testimonials-track');
    const originalCards = track.innerHTML;
    track.innerHTML = originalCards + originalCards; // Duplicate for seamless loop
}

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    duplicateTestimonials();
});

// Add to your existing scripts
function initImageSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }
    
    // Preload images for smooth transitions
    slides.forEach(slide => {
        const bgImg = slide.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/)[1];
        const img = new Image();
        img.src = bgImg;
    });
    
    // Set initial slide
    slides[0].classList.add('active');
    
    // Change slide every 6 seconds
    setInterval(nextSlide, 6000);
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initImageSlider();
});

// Add to your existing scripts
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.bi-plus');
        
        question.addEventListener('click', () => {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.bi-plus');
                    otherAnswer.style.maxHeight = '0';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ
            const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
            answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(45deg)';
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const estimateBtns = document.querySelectorAll('.estimate-btn');
    
    estimateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const calculator = this.parentElement.querySelector('.estimate-calculator');
            if (calculator.classList.contains('hidden')) {
                // Close all other calculators first
                document.querySelectorAll('.estimate-calculator').forEach(calc => {
                    calc.classList.add('hidden');
                });
                // Open this calculator
                calculator.classList.remove('hidden');
                // Change button text
                this.textContent = 'Continue';
            } else {
                // Handle form submission or next step
                window.location.href = '/get-estimate'; // Replace with your estimate page URL
            }
        });
    });

    // Handle button selections
    const optionBtns = document.querySelectorAll('.estimate-calculator button');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from siblings
            this.parentElement.querySelectorAll('button').forEach(b => {
                b.classList.remove('bg-yellow-50', 'ring-2');
            });
            // Add active class to clicked button
            this.classList.add('bg-yellow-50', 'ring-2');
        });
    });
});

// Add to your existing scripts
function setEstimateType(type) {
    // Add a hidden field to the contact form if it doesn't exist
    let estimateField = document.getElementById('estimateType');
    if (!estimateField) {
        estimateField = document.createElement('input');
        estimateField.type = 'hidden';
        estimateField.id = 'estimateType';
        document.getElementById('contactForm').appendChild(estimateField);
    }
    
    // Set the estimate type
    estimateField.value = type;
    
    // Update the contact form title based on selection
    const contactTitle = document.querySelector('#contact h2');
    const contactSubtitle = document.querySelector('#contact p');
    
    if (type === 'full-home') {
        contactTitle.textContent = 'Get Full Home Interior Estimate';
        contactSubtitle.textContent = 'Tell us about your home interior requirements';
    } else if (type === 'kitchen') {
        contactTitle.textContent = 'Get Modular Kitchen Estimate';
        contactSubtitle.textContent = 'Tell us about your kitchen requirements';
    }
    
    // Add a message to the textarea placeholder
    const messageArea = document.querySelector('#contactForm textarea');
    if (messageArea) {
        messageArea.placeholder = type === 'full-home' 
            ? 'Please tell us about your home interior requirements (number of rooms, preferences, etc.)'
            : 'Please tell us about your kitchen requirements (size, layout preferences, etc.)';
    }
}

function showAlert(message) {
    const alert = document.getElementById('custom-alert');
    const messageEl = document.getElementById('alert-message');
    const alertBox = alert.querySelector('.bg-white');
    
    messageEl.textContent = message;
    alert.classList.remove('hidden');
    
    // Trigger animation
    setTimeout(() => {
        alertBox.classList.add('scale-100');
        alertBox.classList.remove('scale-0');
    }, 10);
}

function closeAlert() {
    const alert = document.getElementById('custom-alert');
    const alertBox = alert.querySelector('.bg-white');
    
    // Trigger reverse animation
    alertBox.classList.remove('scale-100');
    alertBox.classList.add('scale-0');
    
    // Hide after animation
    setTimeout(() => {
        alert.classList.add('hidden');
    }, 300);
}

// Typewriter text arrays
const mainTitles = [
    "Transform Your Space",
    "Elevate Your Living",
    "Design Your Dreams",
    "Create Perfect Interiors"
];

const subTitles = [
    "Luxury Interior Design Solutions",
    "Where Vision Meets Reality",
    "Crafting Beautiful Spaces",
    "Making Dreams Come True"
];

// Initialize typewriter effect
document.addEventListener('DOMContentLoaded', function() {
    const mainTitle = document.getElementById('main-title');
    const subTitle = document.getElementById('sub-title');
    
    if (mainTitle && subTitle) {
        let mainTitleIndex = 0;
        let subTitleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        function type() {
            const currentMainTitle = mainTitles[mainTitleIndex];
            const currentSubTitle = subTitles[subTitleIndex];

            if (!isDeleting) {
                currentText = currentMainTitle.substring(0, charIndex + 1);
                charIndex++;
            } else {
                currentText = currentMainTitle.substring(0, charIndex - 1);
                charIndex--;
            }

            mainTitle.textContent = currentText;
            subTitle.textContent = currentSubTitle;

            let typeSpeed = 150;

            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && charIndex === currentMainTitle.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                mainTitleIndex++;
                subTitleIndex++;
                
                // Reset to beginning of arrays if at end
                if (mainTitleIndex === mainTitles.length) {
                    mainTitleIndex = 0;
                    subTitleIndex = 0;
                }
                
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // Start the typewriter effect
        type();
    }
});