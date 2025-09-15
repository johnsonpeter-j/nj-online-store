const nodemailer = require("nodemailer");
const templates = require("../templates/emailTemplates.json");

// Simple template parser
const parseTemplate = (template, variables) => {
  let output = template;
  for (const key in variables) {
    const regex = new RegExp(`{{${key}}}`, "g");
    output = output.replace(regex, variables[key]);
  }
  return output;
};

const sendEmail = async ({ templateName, to, variables }) => {
  try {
    const template = templates[templateName];
    if (!template) throw new Error("Template not found");

    // Replace placeholders with real values
    const subject = parseTemplate(template.subject, variables);
    const text = parseTemplate(template.text, variables);
    const html = parseTemplate(template.html, variables);

    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"NJ Online Store" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
