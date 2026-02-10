// pages/api/contact.js
// This is a Next.js API route handler for contact form submissions

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, email, phone, company, inquiryType, message, acceptTerms } = req.body;

    // Validation
    if (!fullName || !email || !inquiryType || !message || !acceptTerms) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        errors: {
          fullName: !fullName ? 'Full name is required' : null,
          email: !email ? 'Email is required' : null,
          inquiryType: !inquiryType ? 'Inquiry type is required' : null,
          message: !message ? 'Message is required' : null,
          acceptTerms: !acceptTerms ? 'You must accept terms' : null,
        }
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format',
        errors: { email: 'Invalid email format' }
      });
    }

    // Get inquiry type label
    const inquiryTypeLabels = {
      staffing: 'IT Staffing & Recruitment',
      project: 'Software Development & Project Services',
      both: 'Both Services',
      partnership: 'Partnership Opportunities',
      other: 'Other Inquiry'
    };

    const inquiryLabel = inquiryTypeLabels[inquiryType] || inquiryType;

    // Prepare email content
    const emailContent = {
      to: 'info@ventleytech.com', // Replace with your actual email
      from: email,
      subject: `New Contact Form Submission - ${inquiryLabel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2196F3 0%, #1565C0 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f5f5f5;">
            <h2 style="color: #333; border-bottom: 2px solid #2196F3; padding-bottom: 10px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; font-weight: bold; width: 150px;">Full Name:</td>
                <td style="padding: 10px;">${fullName}</td>
              </tr>
              <tr style="background-color: white;">
                <td style="padding: 10px; font-weight: bold;">Email:</td>
                <td style="padding: 10px;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Phone:</td>
                <td style="padding: 10px;">${phone || 'Not provided'}</td>
              </tr>
              <tr style="background-color: white;">
                <td style="padding: 10px; font-weight: bold;">Company:</td>
                <td style="padding: 10px;">${company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Inquiry Type:</td>
                <td style="padding: 10px;"><strong>${inquiryLabel}</strong></td>
              </tr>
            </table>

            <h3 style="color: #333; margin-top: 30px;">Message:</h3>
            <div style="background-color: white; padding: 20px; border-left: 4px solid #2196F3; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>

            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0;">VentleyTech - Empowering Businesses Through Technology</p>
          </div>
        </div>
      `
    };

    // Option 1: Using SendGrid (recommended)
    // Uncomment and install @sendgrid/mail
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send(emailContent);
    */

    // Option 2: Using Nodemailer
    // Uncomment and install nodemailer
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html,
    });
    */

    // Option 3: Store in database (Recommended alongside email)
    // Uncomment and setup your database
    /*
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    await prisma.contactSubmission.create({
      data: {
        fullName,
        email,
        phone,
        company,
        inquiryType,
        message,
        status: 'new',
        submittedAt: new Date(),
      },
    });
    */

    // For development/testing: Log the submission
    console.log('Contact Form Submission:', {
      fullName,
      email,
      phone,
      company,
      inquiryType: inquiryLabel,
      message,
      timestamp: new Date().toISOString(),
    });

    // Send success response
    return res.status(200).json({ 
      success: true,
      message: 'Your message has been sent successfully! We will contact you within 24 hours.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'An error occurred while processing your request. Please try again later.' 
    });
  }
}
