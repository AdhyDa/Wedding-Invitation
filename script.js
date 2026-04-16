// AOS Initialization
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
});

// Script to Handle Opening Invitation
function openInvitation() {
    const cover = document.getElementById('intro-cover');
    
    // Execute slide up animation (-translate-y-full pushes it above screen)
    cover.classList.add('-translate-y-full');
    
    // Allow page scroll again
    document.body.classList.remove('overflow-hidden');
    document.body.classList.add('overflow-x-hidden');
    
    // Hide element from DOM permanently after animation completes
    setTimeout(() => {
        cover.style.display = 'none';
        
        // Refresh AOS to trigger animations securely on the home section content
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 1000);
}

// Script to handle Modal Interactions
function openGiftModal() {
    const modal = document.getElementById('gift-modal');
    const content = document.getElementById('gift-modal-content');
    
    // Allow display block first
    modal.classList.remove('invisible');
    
    // Small delay for CSS animation to trigger properly
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
    }, 10);
    
    // Prevent body scroll (optional)
    document.body.style.overflow = 'hidden';
}

function closeGiftModal() {
    const modal = document.getElementById('gift-modal');
    const content = document.getElementById('gift-modal-content');
    
    // Start fading out
    modal.classList.add('opacity-0');
    content.classList.add('scale-95');
    
    // Wait for transition to finish then hide via invisible
    setTimeout(() => {
        modal.classList.add('invisible');
    }, 300);
    
    // Restore body scroll
    document.body.style.overflow = '';
}
