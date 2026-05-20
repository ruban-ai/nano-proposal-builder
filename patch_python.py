from pathlib import Path
path = Path('proposal-builder.html')
text = path.read_text(encoding='utf-8')
replacements = [
    ('<!-- Investment summary -->\n      <div class="p-section-title">Investment summary</div>\n      <table class="p-table" id="pTable">\n',
     '<div id="pInvestmentSection">\n      <!-- Investment summary -->\n      <div class="p-section-title">Investment summary</div>\n      <table class="p-table" id="pTable">\n'),
    ('</table>\n\n      <!-- Contract details -->\n      <div class="p-section-title" style="margin-top:24px;">Contract details</div>\n',
     '</table>\n      </div>\n\n      <div id="pContractDetailsSection">\n      <!-- Contract details -->\n      <div class="p-section-title" style="margin-top:24px;">Contract details</div>\n'),
    ('      </div>\n\n      <!-- Notes -->\n      <div class="p-notes" id="pSpecialTerms">—</div>\n',
     '      </div>\n      </div>\n\n      <div id="pTermsSection">\n      <!-- Notes -->\n      <div class="p-notes" id="pSpecialTerms">—</div>\n'),
    ('      <div class="p-footer">\n        <div>This proposal is confidential and prepared exclusively for the named recipient. Pricing is valid through the date listed above.</div>\n        <div style="margin-top:6px;">Nano LMS · animaker.com/nano · © 2026 Animaker, Inc.</div>\n      </div>\n    </div>\n  </div>\n</div>\n',
     '      <div class="p-footer">\n        <div>This proposal is confidential and prepared exclusively for the named recipient. Pricing is valid through the date listed above.</div>\n        <div style="margin-top:6px;">Nano LMS · animaker.com/nano · © 2026 Animaker, Inc.</div>\n      </div>\n      </div>\n    </div>\n  </div>\n</div>\n')
]
for old, new in replacements:
    if old not in text:
        print('missing old pattern:', repr(old[:80]))
    text = text.replace(old, new)
pattern = re.compile(r'// -- PDF download --\nasync function downloadPDF\(\) \{[\s\S]*?\n  \}\n', re.MULTILINE)
new_block = '''// -- PDF helper --
async function renderSectionCanvas(elements) {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'absolute';
  wrapper.style.top = '0';
  wrapper.style.left = '-9999px';
  wrapper.style.width = '816px';
  wrapper.style.padding = '56px 64px';
  wrapper.style.backgroundColor = '#ffffff';
  wrapper.style.color = '#111827';
  wrapper.style.fontFamily = 'Inter, sans-serif';
  wrapper.style.lineHeight = '1.5';
  wrapper.style.boxSizing = 'border-box';
  wrapper.style.display = 'inline-block';
  elements.forEach(el => wrapper.appendChild(el.cloneNode(true)));
  document.body.appendChild(wrapper);
  const canvas = await html2canvas(wrapper, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
  document.body.removeChild(wrapper);
  return canvas;
}

// -- PDF download --
async function downloadPDF() {
  const btn = document.getElementById('pdfBtn');
  const orig = btn.innerHTML;
  btn.innerHTML = '? Generating…';
  btn.disabled = true;
  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'pt', format: 'letter' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;

    const sectionSets = [
      [document.querySelector('.p-header'), document.querySelector('.p-parties'), document.getElementById('pIntro'), document.getElementById('pContractDetailsSection')],
      [document.getElementById('pInvestmentSection')],
      [document.getElementById('pTermsSection')]
    ].map(set => set.filter(Boolean));

    for (let i = 0; i < sectionSets.length; i++) {
      const elements = sectionSets[i];
      if (!elements.length) continue;
      if (i > 0) pdf.addPage();
      const canvas = await renderSectionCanvas(elements);
      const imgData = canvas.toDataURL('image/png');
      let scale = Math.min(maxWidth / canvas.width, (pageHeight - margin * 2) / canvas.height);
      if (scale > 1) scale = 1;
      const imgWidth = canvas.width * scale;
      const imgHeight = canvas.height * scale;
      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = margin;
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
    }

    const filename = `${val('propNum') || 'proposal'}-${val('custCompany').replace(/\s+/g,'-').toLowerCase()}.pdf`;
    pdf.save(filename);
  } catch (err) {
    alert('PDF generation failed: ' + err.message);
  } finally {
    btn.innerHTML = orig;
    btn.disabled = false;
  }
}
'''
text, count = pattern.subn(new_block, text)
print('pdf replacements', count)
p.write_text(text, encoding='utf-8')
print('done')
