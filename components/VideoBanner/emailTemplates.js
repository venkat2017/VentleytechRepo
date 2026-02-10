// utils/emailTemplates.js
// Email templates for VentleyTech contact form

export const getContactConfirmationEmail = (formData) => {
  const { fullName, inquiryType } = formData;
  
  const inquiryTypeLabels = {
    staffing: 'IT Staffing & Recruitment',
    project: 'Software Development & Project Services',
    both: 'Both Services',
    partnership: 'Partnership Opportunities',
    other: 'Other Inquiry'
  };

  const inquiryLabel = inquiryTypeLabels[inquiryType] || 'General Inquiry';

  return {
    subject: 'Thank you for contacting VentleyTech',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - VentleyTech</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2196F3 0%, #1565C0 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">VentleyTech</h1>
                    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Empowering Businesses Through Technology</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">Thank You, ${fullName}!</h2>
                    
                    <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                      We've received your inquiry regarding <strong>${inquiryLabel}</strong> and appreciate you taking the time to reach out to us.
                    </p>

                    <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                      Our team of experts will review your message and get back to you within <strong>24 hours</strong> during business days.
                    </p>

                    <!-- What to Expect Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-left: 4px solid #2196F3; margin: 30px 0;">
                      <tr>
                        <td style="padding: 20px;">
                          <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">What Happens Next?</h3>
                          <ul style="color: #666666; margin: 0; padding-left: 20px; line-height: 1.8;">
                            <li>Our specialists will review your requirements</li>
                            <li>We'll prepare a customized solution proposal</li>
                            <li>You'll receive a detailed response via email</li>
                            <li>We'll schedule a consultation call if needed</li>
                          </ul>
                        </td>
                      </tr>
                    </table>

                    <!-- Services Overview -->
                    <h3 style="color: #333333; margin: 30px 0 20px 0; font-size: 18px;">Our Core Services:</h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 15px; background-color: #f8f9fa; border-radius: 4px; margin-bottom: 10px;">
                          <h4 style="color: #2196F3; margin: 0 0 8px 0; font-size: 16px;">💼 IT Staffing & Recruitment</h4>
                          <p style="color: #666666; margin: 0; font-size: 14px; line-height: 1.5;">
                            Connecting businesses with top-tier IT professionals across domains and technologies.
                          </p>
                        </td>
                      </tr>
                      <tr><td style="height: 10px;"></td></tr>
                      <tr>
                        <td style="padding: 15px; background-color: #f8f9fa; border-radius: 4px;">
                          <h4 style="color: #2196F3; margin: 0 0 8px 0; font-size: 16px;">💻 Software Development</h4>
                          <p style="color: #666666; margin: 0; font-size: 14px; line-height: 1.5;">
                            Custom technology solutions across Java, Cloud, DevOps, Data Engineering, and QA.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Contact Information -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
                      <tr>
                        <td>
                          <p style="color: #666666; margin: 0 0 10px 0; font-size: 14px;">
                            <strong>Need immediate assistance?</strong>
                          </p>
                          <p style="color: #666666; margin: 0; font-size: 14px; line-height: 1.6;">
                            📧 Email: <a href="mailto:info@ventleytech.com" style="color: #2196F3; text-decoration: none;">info@ventleytech.com</a><br>
                            📞 Phone: +1 (XXX) XXX-XXXX<br>
                            🌐 Website: <a href="https://ventleytech.com" style="color: #2196F3; text-decoration: none;">www.ventleytech.com</a>
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #333333; padding: 30px; text-align: center;">
                    <p style="color: #ffffff; margin: 0 0 15px 0; font-size: 14px;">
                      Follow us on social media:
                    </p>
                    <table width="200" cellpadding="0" cellspacing="0" align="center">
                      <tr>
                        <td align="center" style="padding: 0 10px;">
                          <a href="#" style="color: #ffffff; text-decoration: none; font-size: 12px;">LinkedIn</a>
                        </td>
                        <td align="center" style="padding: 0 10px;">
                          <a href="#" style="color: #ffffff; text-decoration: none; font-size: 12px;">Twitter</a>
                        </td>
                        <td align="center" style="padding: 0 10px;">
                          <a href="#" style="color: #ffffff; text-decoration: none; font-size: 12px;">Facebook</a>
                        </td>
                      </tr>
                    </table>
                    <p style="color: #999999; margin: 20px 0 0 0; font-size: 12px;">
                      © ${new Date().getFullYear()} VentleyTech. All rights reserved.<br>
                      This email was sent because you submitted a contact form on our website.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  };
};

export const getInternalNotificationEmail = (formData) => {
  const { fullName, email, phone, company, inquiryType, message } = formData;
  
  const inquiryTypeLabels = {
    staffing: 'IT Staffing & Recruitment',
    project: 'Software Development & Project Services',
    both: 'Both Services',
    partnership: 'Partnership Opportunities',
    other: 'Other Inquiry'
  };

  const inquiryLabel = inquiryTypeLabels[inquiryType] || inquiryType;
  
  // Priority based on inquiry type
  const priority = inquiryType === 'both' || inquiryType === 'partnership' ? 'HIGH' : 'NORMAL';
  const priorityColor = priority === 'HIGH' ? '#f44336' : '#4caf50';

  return {
    subject: `🔔 New ${priority === 'HIGH' ? 'High Priority ' : ''}Contact Form: ${inquiryLabel}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
          <tr>
            <td align="center">
              <table width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2196F3 0%, #1565C0 100%); padding: 30px; position: relative;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                    <div style="position: absolute; top: 20px; right: 20px; background-color: ${priorityColor}; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                      ${priority} PRIORITY
                    </div>
                  </td>
                </tr>

                <!-- Contact Information -->
                <tr>
                  <td style="padding: 30px;">
                    <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #2196F3; padding-bottom: 10px;">
                      Contact Details
                    </h2>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                      <tr style="background-color: #f8f9fa;">
                        <td style="padding: 12px; font-weight: bold; width: 180px; color: #555;">Full Name:</td>
                        <td style="padding: 12px; color: #333;">${fullName}</td>
                      </tr>
                      <tr style="background-color: #ffffff;">
                        <td style="padding: 12px; font-weight: bold; color: #555;">Email:</td>
                        <td style="padding: 12px;">
                          <a href="mailto:${email}" style="color: #2196F3; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr style="background-color: #f8f9fa;">
                        <td style="padding: 12px; font-weight: bold; color: #555;">Phone:</td>
                        <td style="padding: 12px; color: #333;">
                          ${phone ? `<a href="tel:${phone}" style="color: #2196F3; text-decoration: none;">${phone}</a>` : '<em>Not provided</em>'}
                        </td>
                      </tr>
                      <tr style="background-color: #ffffff;">
                        <td style="padding: 12px; font-weight: bold; color: #555;">Company:</td>
                        <td style="padding: 12px; color: #333;">${company || '<em>Not provided</em>'}</td>
                      </tr>
                      <tr style="background-color: #f8f9fa;">
                        <td style="padding: 12px; font-weight: bold; color: #555;">Inquiry Type:</td>
                        <td style="padding: 12px;">
                          <span style="background-color: #2196F3; color: white; padding: 4px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">
                            ${inquiryLabel}
                          </span>
                        </td>
                      </tr>
                      <tr style="background-color: #ffffff;">
                        <td style="padding: 12px; font-weight: bold; color: #555;">Submitted:</td>
                        <td style="padding: 12px; color: #333;">${new Date().toLocaleString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <h3 style="color: #333333; margin: 30px 0 15px 0; font-size: 18px; border-bottom: 2px solid #2196F3; padding-bottom: 10px;">
                      Message
                    </h3>
                    <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #2196F3; border-radius: 4px; color: #333; line-height: 1.6; font-size: 15px;">
                      ${message.replace(/\n/g, '<br>')}
                    </div>

                    <!-- Quick Actions -->
                    <div style="margin-top: 30px; padding: 20px; background-color: #e3f2fd; border-radius: 8px;">
                      <h4 style="margin: 0 0 15px 0; color: #1565C0;">Quick Actions:</h4>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 8px;">
                            <a href="mailto:${email}?subject=Re: Your inquiry to VentleyTech" 
                               style="display: inline-block; background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 600;">
                              📧 Reply to ${fullName}
                            </a>
                          </td>
                          <td style="padding: 8px;" align="right">
                            ${phone ? `
                            <a href="tel:${phone}" 
                               style="display: inline-block; background-color: #4caf50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 600;">
                              📞 Call ${fullName}
                            </a>
                            ` : ''}
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Assignment Section -->
                    <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ff9800; border-radius: 4px;">
                      <p style="margin: 0; color: #856404; font-weight: 600;">
                        ⚠️ Action Required: Please assign this inquiry to the appropriate team member
                      </p>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
                    <p style="color: #666666; margin: 0; font-size: 12px;">
                      This is an automated notification from VentleyTech Contact Form System<br>
                      Please respond to inquiries within 24 hours
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  };
};

// Plain text versions for email clients that don't support HTML
export const getPlainTextConfirmation = (formData) => {
  const { fullName, inquiryType } = formData;
  
  const inquiryTypeLabels = {
    staffing: 'IT Staffing & Recruitment',
    project: 'Software Development & Project Services',
    both: 'Both Services',
    partnership: 'Partnership Opportunities',
    other: 'Other Inquiry'
  };

  const inquiryLabel = inquiryTypeLabels[inquiryType] || 'General Inquiry';

  return `
Thank You, ${fullName}!

We've received your inquiry regarding ${inquiryLabel} and appreciate you taking the time to reach out to us.

Our team of experts will review your message and get back to you within 24 hours during business days.

What Happens Next?
- Our specialists will review your requirements
- We'll prepare a customized solution proposal
- You'll receive a detailed response via email
- We'll schedule a consultation call if needed

Our Core Services:
💼 IT Staffing & Recruitment
   Connecting businesses with top-tier IT professionals across domains and technologies.

💻 Software Development
   Custom technology solutions across Java, Cloud, DevOps, Data Engineering, and QA.

Need immediate assistance?
Email: info@ventleytech.com
Phone: +1 (XXX) XXX-XXXX
Website: www.ventleytech.com

---
© ${new Date().getFullYear()} VentleyTech. All rights reserved.
This email was sent because you submitted a contact form on our website.
  `.trim();
};
