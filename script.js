document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const cards = document.querySelectorAll('.advert-card');
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Search Functionality
    const searchInput = document.getElementById('product-search');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const desc = card.querySelector('.description').textContent.toLowerCase();
            const tag = card.querySelector('.tag').textContent.toLowerCase();
            
            if (title.includes(term) || desc.includes(term) || tag.includes(term)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // WhatsApp Ordering
    const buyBtns = document.querySelectorAll('.buy-btn');
    const phoneNumber = '254797753845'; // Standard Kenyan format

    buyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemName = btn.getAttribute('data-item');
            const message = `Hello Felix Ochieng, I am interested in purchasing the ${itemName} from your adverts. Could you provide more details?`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });
});
