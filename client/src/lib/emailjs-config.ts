// EmailJS Configuration
// Follow these steps to set up EmailJS:

// 1. Go to https://www.emailjs.com/
// 2. Sign up with your Gmail account (solusesi03@gmail.com)
// 3. Create a new service and connect your Gmail
// 4. Create two email templates
// 5. Replace the values below with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  // Your EmailJS public key
  PUBLIC_KEY: 'sTmhLIpzjZZoM56Wn',
  
  // Replace with your actual service ID
  SERVICE_ID: 'service_mustarred',
  
  // Template IDs (create these in EmailJS dashboard)
  TEMPLATES: {
    BIG_TABLE: 'template_bigtable',
    PAYMENT: 'template_payment'
  }
};

// Template Variables to use in EmailJS dashboard:
// For both templates, use these variables:
// - {{to_email}} - Recipient email
// - {{subject}} - Email subject
// - {{message}} - Email body content

/* 
SETUP INSTRUCTIONS:

1. Go to https://www.emailjs.com/ and sign up
2. Connect your Gmail account (solusesi03@gmail.com)
3. Create a service called "service_mustarred"
4. Create two templates:
   - "template_bigtable" for Big Table leads
   - "template_payment" for payment confirmations
5. In each template, use:
   - Subject: {{subject}}
   - Body: {{message}}
6. Get your Public Key from Account > API Keys
7. Replace the values in this file with your actual credentials
8. Update the imports in DCMICompliance.tsx to use these values
*/