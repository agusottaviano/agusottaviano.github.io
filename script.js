function toggleTheme() {
  document.body.classList.toggle('dark');
}

function downloadCV() {
  // Create a link to download the CV
  const link = document.createElement('a');
  link.href = 'assets/CV.pdf'; // You'll need to add your CV PDF to the assets folder
  link.download = 'CV_Agustin_Ottaviano.pdf';
  link.target = '_blank';
  
  // Check if the file exists before triggering download
  fetch(link.href)
    .then(response => {
      if (response.ok) {
        link.click();
      } else {
        alert('El CV no está disponible en este momento. Por favor, contacta directamente por email.');
      }
    })
    .catch(() => {
      alert('El CV no está disponible en este momento. Por favor, contacta directamente por email.');
    });
}
