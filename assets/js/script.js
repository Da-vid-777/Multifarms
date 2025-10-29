(function () {
  // Menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');

  function showMenu(e) {
    e?.preventDefault();
    document.body.classList.add('is-menu-visible');
  }

  function hideMenu(e) {
    e?.preventDefault();
    document.body.classList.remove('is-menu-visible');
  }

  if (menuToggle) menuToggle.addEventListener('click', showMenu);
  if (menuClose) menuClose.addEventListener('click', hideMenu);

  document.querySelectorAll('#menu .links a').forEach(a => {
    a.addEventListener('click', hideMenu);
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          hideMenu();
        }
      }
    });
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animated').forEach(el => {
    observer.observe(el);
  });

  // Contact form stub
  // const form = document.getElementById('contact-form');
  // if (form) {
  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     alert('Thanks! Message captured (this is a demo). Replace with your backend or email handler.');
  //     form.reset();
  //   });
  // }

  // Theme toggle with memory (class-based, supports multiple buttons)
  const lightThemeLink = document.querySelector('link[href="assets/css/light.css"]');

  // Load saved theme on page load
  if (localStorage.getItem("theme") === "light") {
    lightThemeLink.disabled = false;
  } else {
    lightThemeLink.disabled = true;
  }

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (lightThemeLink.disabled) {
        lightThemeLink.disabled = false;
        localStorage.setItem("theme", "light");
      } else {
        lightThemeLink.disabled = true;
        localStorage.setItem("theme", "dark");
      }
    });
  });
})();


const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    const oldMsg = document.querySelector(".form-message");
    if (oldMsg) oldMsg.remove();

    const messageBox = document.createElement('p');
    messageBox.classList.add("form-message");
    messageBox.style.marginTop = "1rem";
    messageBox.style.color = "#fff";
    messageBox.style.fontWeight = "bold";

    if (response.ok) {
      messageBox.textContent = "✅ Message sent successfully!";
      form.reset();
    } else {
      messageBox.textContent = "❌ Something went wrong. Please try again.";
    }

    form.appendChild(messageBox);

    setTimeout(() => {
      messageBox.style.transition = "opacity 1s";
      messageBox.style.opacity = "0";
      setTimeout(() => messageBox.remove(), 1000);
    }, 5000);
  });
}
