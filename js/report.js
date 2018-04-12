function genPDF() {
  // Primero llamas a HTML2Canvas:
  html2canvas(document.body).then(function(canvas) {
      var img = canvas.toDataURL('image/png');
      var doc = new jsPDF();
      doc.addImage(img, 'JPEG', 20, 20);
      doc.save('DemoInicial.pdf');
    });
}