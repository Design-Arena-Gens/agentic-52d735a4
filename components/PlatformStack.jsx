const platformOptions = [
  {
    name: "Shopify",
    badge: "Recommended",
    description:
      "Fast setup, Moroccan payment gateways (Payzone, CMI), automated shipping rates, and deep app marketplace.",
    highlights: [
      "Install Zakeke / Customily for live product design",
      "Connect to Atlas Print API for order ingestion",
      "Automated Amana & Aramex labels with Easyship or Shippo",
    ],
  },
  {
    name: "WordPress + WooCommerce",
    badge: "Budget-friendly",
    description:
      "Control your stack with open-source flexibility. Use Fancy Product Designer or Lumise to power customization.",
    highlights: [
      "Accept local payments with Payzone, CMI, Stripe, PayPal",
      "Sync orders with Make.com or Zapier into production",
      "Host on Elementor/Breakdance for dynamic landing pages",
    ],
  },
];

const integrations = [
  "Zakeke 3D Configurator",
  "Customily Designer",
  "Teeinblue POD",
  "Fancy Product Designer",
  "Lumise Designer",
  "Make.com",
  "Zapier",
  "Shopify Flow",
];

export default function PlatformStack() {
  return (
    <section id="stack" className="section stack">
      <div className="section-header">
        <span className="eyebrow">Launch Toolkit</span>
        <h2>Pick the platform that fits your brand and budget</h2>
        <p>
          Connect the designer, payments, and fulfillment automation in a single
          weekend. We provide onboarding, workflows, and local vendor
          connections so you go live without friction.
        </p>
      </div>

      <div className="stack-grid">
        {platformOptions.map((platform) => (
          <article key={platform.name} className="stack-card">
            <header>
              <h3>{platform.name}</h3>
              {platform.badge && <span className="badge">{platform.badge}</span>}
            </header>
            <p>{platform.description}</p>
            <ul>
              {platform.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}

        <aside className="stack-card secondary">
          <h3>Designer integrations</h3>
          <p>
            Plug and play product customization widgets that render 3D previews,
            layered text, and print-ready files in CMYK or PNG.
          </p>
          <div className="integrations-grid">
            {integrations.map((integration) => (
              <span key={integration}>{integration}</span>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
