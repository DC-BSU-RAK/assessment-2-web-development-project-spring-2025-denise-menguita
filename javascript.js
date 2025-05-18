// Circular Cursor
$(document).ready(function() {
  $(document).on('mousemove', function(e) {
    $('#circularcursor').css({
      left: e.pageX,
      top: e.pageY
    });
  })
});

// Animate #role text
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('hero');
    const roleText = document.getElementById('designer-developer');
    
    // ENTRANCE ANIMATION (page load)
    function animateEntrance() {
        // Start with element off-screen to the left
        gsap.set(roleText, {
            x: -500,
            opacity: 0
        });
        
        // Animate in from left
        gsap.to(roleText, {
            x: 0,
            opacity: 1,
            duration: 1.5, // how fast it slides in
            ease: "power3.out"
        });
    }
    
    // EXIT ANIMATION (on scroll)
    function handleScroll() {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        const maxScroll = heroHeight * 0.9;
        const progress = Math.min(scrollPosition / maxScroll, 1);
        
        // Exit to right
        const translateX = 600 * progress;
        
        gsap.to(roleText, {
            x: translateX,
            opacity: 1 - (progress * 0.8),
            duration: 0.1 // update on scroll
        });
    }
    
    // Run entrance animation after short delay
    setTimeout(animateEntrance, 500);
    
    // Set up scroll listener
    window.addEventListener('scroll', handleScroll);
});

// Back to Top
let debounceTimeout;
let body = document.querySelector('body');
let scrollingElement = document.scrollingElement;

setScrollClass();

window.addEventListener('scroll', setScrollClass);
window.addEventListener('resize', setScrollClass);

function setScrollClass() {
  if (debounceTimeout) {
    window.cancelAnimationFrame(debounceTimeout);
  }

  debounceTimeout = window.requestAnimationFrame(function () {
    let scrollTop = scrollingElement.scrollTop;
    let scrollHeight = scrollingElement.scrollHeight;
    let innerHeight = window.innerHeight;
    let scrollBottom = scrollHeight - innerHeight - scrollTop;

    body.classList.toggle('at-top', scrollTop < 48);
    body.classList.toggle('at-bottom', scrollBottom < 48);
  });
}