import { Link } from "react-router-dom";
import LegalPage from "@/components/LegalPage";

const Terms = () => {
  return (
    <LegalPage title="Terms of Service" updated="June 13, 2026">
      <p>
        These Terms of Service govern your use of the website, forms, and services operated by Nakanishi Consulting LLC
        operating as Knight Fit ("we," "us," or "our"). By accessing our website or submitting your information through
        any of our forms, you agree to these terms.
      </p>

      <h2>1. Services</h2>
      <p>
        Nakanishi Consulting LLC provides online fitness coaching, nutrition consulting, and related educational
        programs under the Knight Fit brand. The nature, scope, and pricing of services are outlined during the
        consultation process and confirmed in a separate client agreement.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years of age to use our services or submit your information through our forms. By
        submitting your information, you confirm that you meet this requirement.
      </p>

      <h2>3. SMS Communications and Consent</h2>
      <p>
        By providing your phone number and checking the applicable consent boxes on our forms, you agree to receive text
        messages from Nakanishi Consulting LLC. We operate two separate SMS programs:
      </p>
      <p>
        <strong>Non-Marketing SMS:</strong> By opting in to non-marketing communications, you consent to receive
        appointment confirmations, booking reminders, call follow-ups, onboarding messages, and program logistics. These
        messages are transactional and are sent to support your participation in our services.
      </p>
      <p>
        <strong>Marketing SMS:</strong> By opting in to marketing communications, you consent to receive promotional
        messages including new program announcements, limited-time offers, and coaching resources. Consent to receive
        marketing messages is not a condition of purchase or participation in any program. You may opt out at any time
        by replying STOP.
      </p>
      <p>
        Message and data rates may apply. Message frequency varies. Reply HELP for assistance or STOP to unsubscribe at
        any time.
      </p>

      <h2>4. Carrier Liability Disclaimer</h2>
      <p>
        Wireless carriers are not liable for delayed or undelivered messages. Nakanishi Consulting LLC is not
        responsible for any delays in SMS delivery caused by your carrier or device.
      </p>

      <h2>5. No Results Guarantee</h2>
      <p>
        Results from our coaching programs vary based on individual effort, consistency, and starting point. Nothing on
        our website or in our communications constitutes a guarantee of specific outcomes. Testimonials and client
        results shared are representative of individual experiences and are not a promise of similar results.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content on our website, including program materials, copy, images, and methodology, is the property of
        Nakanishi Consulting LLC and may not be reproduced, distributed, or used without written permission.
      </p>

      <h2>7. Payment and Refunds</h2>
      <p>
        Payment terms and refund eligibility are outlined in your individual client agreement. No refunds are issued for
        services already rendered unless otherwise specified in writing.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Nakanishi Consulting LLC shall not be liable for any indirect,
        incidental, or consequential damages arising from your use of our services or website.
      </p>

      <h2>9. Privacy Policy</h2>
      <p>
        Your use of our services is also governed by our Privacy Policy, available at{" "}
        <Link to="/privacy" className="text-primary hover:underline">
          /privacy
        </Link>
        . By using our services, you agree to the terms of our Privacy Policy.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an
        updated effective date. Continued use of our services after any changes constitutes your acceptance of the
        revised terms.
      </p>

      <h2>11. Contact Us</h2>
      <p>If you have any questions about these Terms of Service, please contact us:</p>
      <p>
        Nakanishi Consulting LLC operating as Knight Fit
        <br />
        15963 SW 4th St, Pembroke Pines, FL
        <br />
        Phone: (954) 999-8646
        <br />
        Email: info@knightfit.io
        <br />
        Website:{" "}
        <a href="https://knightfit.io/tos" className="text-primary hover:underline">
          knightfit.io/tos
        </a>
      </p>
      <p className="pt-4">© 2026 Nakanishi Consulting LLC operating as Knight Fit. All rights reserved.</p>
    </LegalPage>
  );
};

export default Terms;
