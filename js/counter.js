document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");
  const footer = document.querySelector("footer");
  const duration = 2000; // 2 sec total
  const frameRate = 30;
  const totalFrames = Math.round(duration / (1000 / frameRate));
  let interval;

  function animateCounters() {
    let frame = 0;

    clearInterval(interval); // prevent multiple intervals

    interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const current = Math.round(target * progress);
        counter.innerText = current;
      });

      if (frame === totalFrames) {
        clearInterval(interval);
        counters.forEach(counter => {
          counter.innerText = counter.getAttribute("data-target");
        });
      }
    }, 1000 / frameRate);
  }

  function resetCounters() {
    clearInterval(interval);
    counters.forEach(counter => {
      counter.innerText = "0";
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();  // start when footer enters view
        } else {
          resetCounters();    // reset when footer leaves
        }
      });
    },
    { threshold: 0 } // trigger when 1px of footer is visible
  );

  if (footer) observer.observe(footer);
});
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop(); // get current file name
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});
