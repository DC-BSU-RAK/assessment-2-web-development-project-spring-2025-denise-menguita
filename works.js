// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    // Make Works Fade In Using GSAP ScrollTrigger
    const containers = document.querySelectorAll('.container');
    
    gsap.utils.toArray(containers).forEach((container, i) => {
        gsap.set(container, { opacity: 0, y: 20 });
        
        ScrollTrigger.create({
            trigger: container,
            start: "top 80%",
            onEnter: () => {
                gsap.to(container, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "power2.out"
                });
            }
        });
    });

    // Show image when hovering over text
    gsap.set('.container img.swipeimage', { yPercent: -50, xPercent: -50 });

    let activeImage;
    gsap.utils.toArray(".container").forEach((el) => {
    let image = el.querySelector('img.swipeimage'),
        setX, setY,
        align = e => {
            setX(e.clientX);
            setY(e.clientY);
        },
        startFollow = () => document.addEventListener("mousemove", align),
        stopFollow = () => document.removeEventListener("mousemove", align),
        fade = gsap.to(image, {autoAlpha: 1, ease: "none", paused: true, onReverseComplete: stopFollow});
    
    el.addEventListener('mouseenter', (e) => {
        fade.play();
        startFollow();
        if (activeImage) { // if there's an actively-animating one, we should match its position here
        gsap.set(image, {x: gsap.getProperty(activeImage, "x"), y: gsap.getProperty(activeImage, "y")});
        }
        activeImage = image;
        setX = gsap.quickTo(image, "x", {duration: 0.6, ease: "power3"}),
        setY = gsap.quickTo(image, "y", {duration: 0.6, ease: "power3"})
        align(e);
    });
    
    el.addEventListener('mouseleave', () => fade.reverse());
    
    });
});