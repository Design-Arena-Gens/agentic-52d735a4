const faqs = [
  {
    question: "How fast can I launch a Shopify store with customization?",
    answer:
      "You can launch in 48 hours. We provision a Shopify storefront, install Zakeke, configure Moroccan payment gateways (Payzone, CMI), and map products to the Atlas Print catalog.",
  },
  {
    question: "Do you provide the product mockups and print files?",
    answer:
      "Yes. Every order includes web-ready mockups, printable PNG/SVG files, and production checklists. Our team reviews the artwork before printing.",
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "DTG and DTF orders start at 10 pieces per design. Screen printing minimum is 30 pieces per color. You can mix sizes in one job ticket.",
  },
  {
    question: "How do deliveries work with Amana or Aramex?",
    answer:
      "Once the batch passes QA, we create shipping labels through our logistics dashboard. Deliveries within Casablanca arrive next-day. Other cities take 1-3 days. Tracking codes sync to your storefront automatically.",
  },
  {
    question: "Can I sell beyond Morocco?",
    answer:
      "Absolutely. Enable cross-border payments (Stripe/PayPal) and connect DHL Express for international delivery. We handle export-ready packaging and customs paperwork.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section faq">
      <div className="section-header">
        <span className="eyebrow">Questions</span>
        <h2>Everything you need to run a Moroccan POD brand</h2>
        <p>
          Below are the most common points we cover with creators and fashion
          founders. Need a custom workflow? Book a discovery call and we will
          architect it with you.
        </p>
      </div>

      <div className="faq-grid">
        {faqs.map((faq) => (
          <article key={faq.question} className="faq-card">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
