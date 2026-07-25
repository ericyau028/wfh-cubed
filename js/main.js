document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // --- Active nav link ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // --- Back to top button ---
  var backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backBtn.classList.add('show');
      } else {
        backBtn.classList.remove('show');
      }
    });
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Article TOC generation ---
  var articleBody = document.querySelector('.article-body');
  var tocNav = document.querySelector('.toc-sidebar nav');
  if (articleBody && tocNav) {
    var headings = articleBody.querySelectorAll('h2, h3');
    var tocHtml = '';
    headings.forEach(function (h, i) {
      var id = 'heading-' + i;
      h.setAttribute('id', id);
      var text = h.textContent;
      var tag = h.tagName.toLowerCase();
      tocHtml += '<a href="#' + id + '" class="' + tag + '">' + text + '</a>';
    });
    tocNav.innerHTML = tocHtml;

    // Scroll-based TOC active highlighting
    var tocLinks = tocNav.querySelectorAll('a');
    if (tocLinks.length) {
      window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY + 100;
        var activeId = null;
        headings.forEach(function (h) {
          if (h.offsetTop <= scrollPos) {
            activeId = h.getAttribute('id');
          }
        });
        tocLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + activeId) {
            link.classList.add('active');
          }
        });
      });
    }
  }

  // --- Smooth scroll for TOC links ---
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a[href^="#"]');
    if (target) {
      var id = target.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        // Update URL hash without jump
        history.pushState(null, null, '#' + id);
      }
    }
  });

});
