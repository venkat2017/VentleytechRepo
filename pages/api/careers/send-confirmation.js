import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method Not Allowed'
        });
    }

    try {
        const { email, jobTitle, fullName } = req.body;

        // Here you would integrate with your email service
        // Examples: SendGrid, AWS SES, Nodemailer, Resend, etc.





        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'vseemakurthi.ai@gmail.com',
            pass: 'sdei ckni udvw oqjm'.replace(/ /g, "")
          }
        });


        await transporter.sendMail({
          from: '"Ventley Tech" <info@ventleytech.com>',
          to: email,
          subject: `Application Received - ${jobTitle}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Application Received!</h1>
                </div>
                <div class="content">
                  <p>Dear ${fullName},</p>
                  <p>Thank you for applying for the position of <strong>${jobTitle}</strong> at Ventley Tech.</p>
                  <p>We have successfully received your application and our recruitment team will review it carefully. If your qualifications match our requirements, we will contact you to schedule an interview.</p>
                  <p><strong>Here's what happens next:</strong></p>
                  <ul>
                    <li>Our team will review your application within 3-5 business days</li>
                    <li>Qualified candidates will be contacted for an initial screening</li>
                    <li>Selected candidates will proceed to technical/behavioral interviews</li>
                  </ul>
                  <p>If you have any questions, please don't hesitate to reach out to us at info@ventleytech.com</p>
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}careers" class="button">View More Opportunities</a>
                </div>
                <div class="footer">
                  <p>© 2025 Ventley Tech. All rights reserved.</p>
                  <p>801 Springdale Drive, Suite 100i, Exton, PA 19341</p>
                </div>
              </div>
            </body>
            </html>
          `
        });


        // For now, just log the email (replace with actual email sending)
        console.log(`Confirmation email would be sent to: ${email} for job: ${jobTitle}`);

        // Also send notification to admin
        console.log(`Admin notification: New application from ${fullName} for ${jobTitle}`);

        return res.status(200).json({
            success: true,
            message: 'Confirmation email sent successfully'
        });

    } catch (error) {
        console.error('Error sending confirmation email:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to send confirmation email',
            message: error.message
        });
    }
}