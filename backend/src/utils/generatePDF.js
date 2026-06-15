const PDFDocument = require('pdfkit');

const generateCertificatePDF = (volunteerName, eventName, hours, issueDate, uniqueId) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                layout: 'landscape',
                size: 'A4'
            });

            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            // Draw border
            doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke('#4f46e5');
            doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50).stroke('#4f46e5');

            // Add Header
            doc.font('Helvetica-Bold')
               .fontSize(40)
               .fillColor('#1f2937')
               .text('Certificate of Appreciation', 0, 150, { align: 'center' });

            doc.font('Helvetica')
               .fontSize(16)
               .fillColor('#6b7280')
               .text('This certificate is proudly presented to', 0, 220, { align: 'center' });

            // Name
            doc.font('Helvetica-Bold')
               .fontSize(30)
               .fillColor('#4f46e5')
               .text(volunteerName, 0, 260, { align: 'center' });

            // Reason
            doc.font('Helvetica')
               .fontSize(16)
               .fillColor('#6b7280')
               .text(`For dedicating ${hours} hours of volunteer service at the`, 0, 320, { align: 'center' });

            // Event
            doc.font('Helvetica-Bold')
               .fontSize(20)
               .fillColor('#1f2937')
               .text(eventName, 0, 350, { align: 'center' });

            // Details
            doc.font('Helvetica')
               .fontSize(12)
               .fillColor('#9ca3af')
               .text(`Issued on: ${new Date(issueDate).toLocaleDateString()}`, 100, 480);
               
            doc.font('Helvetica')
               .fontSize(12)
               .fillColor('#9ca3af')
               .text(`Certificate ID: ${uniqueId}`, 0, 480, { align: 'right' });

            // Signatures
            doc.moveTo(100, 460).lineTo(300, 460).stroke('#1f2937');
            doc.font('Helvetica-Bold').fontSize(12).fillColor('#1f2937').text('Organization President', 130, 465);

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = generateCertificatePDF;
