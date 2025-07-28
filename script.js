function toggleTheme() {
  document.body.classList.toggle('dark');
}

function downloadCV() {
  // Create a link to download the CV
  const link = document.createElement('a');
  link.href = 'assets/CV.pdf'; // You'll need to add your CV PDF to the assets folder
  link.download = 'CV.pdf';
  link.target = '_blank';
  
  // Check if the file exists before triggering download
  fetch(link.href)
    .then(response => {
      if (response.ok) {
        link.click();
      } else {
        alert('CV is not available at the moment. Please contact me directly via email.');
      }
    })
    .catch(() => {
      alert('CV is not available at the moment. Please contact me directly via email.');
    });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = entry.target.style.animation || 'fadeInUp 0.6s ease forwards';
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Contact form handling
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoading = document.getElementById('btnLoading');
  const formStatus = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    formStatus.style.display = 'none';

    // Get form data
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject') || 'Message from website',
      message: formData.get('message')
    };

    try {
      // Simulate form submission (replace with actual endpoint)
      await simulateFormSubmission(data);
      
      // Show success message
      showFormStatus('success', 'Message sent successfully! I will reply soon.');
      form.reset();
      
    } catch (error) {
      // Show error message
      showFormStatus('error', 'There was an error sending the message. Please try contacting me directly via email.');
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  });
}

function simulateFormSubmission(data) {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // For now, we'll create a mailto link as fallback
      const mailtoLink = `mailto:agustinottaviano@outlook.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      resolve();
    }, 1500);
  });
}

function showFormStatus(type, message) {
  const formStatus = document.getElementById('formStatus');
  formStatus.className = `form-status ${type}`;
  formStatus.textContent = message;
  formStatus.style.display = 'block';
  
  // Hide status after 5 seconds
  setTimeout(() => {
    formStatus.style.display = 'none';
  }, 5000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initContactForm();
});

// Add smooth scrolling for internal links
document.addEventListener('click', (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});
