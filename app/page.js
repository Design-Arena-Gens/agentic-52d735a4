import ProductCustomizer from "../components/ProductCustomizer";
import Workflow from "../components/Workflow";
import PlatformStack from "../components/PlatformStack";
import Fulfillment from "../components/Fulfillment";
import FAQ from "../components/FAQ";

const heroHighlights = [
  {
    title: "Design-to-print automation",
    description:
      "Capture custom garments directly in Shopify or WooCommerce. Artwork files sync to the Atlas production dashboard instantly.",
  },
  {
    title: "Morocco-ready payments",
    description:
      "Accept MAD payments with CMI, Payzone, and cash-on-delivery. Offer Apple Pay, PayPal, or Stripe for international buyers.",
  },
  {
    title: "White label logistics",
    description:
      "Ship under your brand via Amana, Aramex, or your local courier partner. Tracking and notifications handled automatically.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">Atlas Print Studio · Casablanca</span>
          <h1>
            Launch a print-on-demand clothing brand built for the Moroccan
            market
          </h1>
          <p>
            Let shoppers customize T-shirts, hoodies, and caps. We print every
            order on demand, pack it with your branding, and deliver across
            Morocco with Amana or Aramex. No inventory, no guesswork.
          </p>
          <div className="cta-group">
            <a className="primary" href="#customizer">
              Start customizing
            </a>
            <a className="ghost" href="#workflow">
              See the workflow
            </a>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-stat">
            <strong>48h</strong>
            <span>Average production window</span>
          </div>
          <div className="hero-stat">
            <strong>+27</strong>
            <span>Brands powered in Morocco</span>
          </div>
          <div className="hero-footer">
            <p>
              “Atlas Print Studio built our Shopify POD stack in a weekend. Now
              every fan order prints and ships automatically.” —{" "}
              <strong>Casa Streetball</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="highlights">
        {heroHighlights.map((highlight) => (
          <article key={highlight.title}>
            <h3>{highlight.title}</h3>
            <p>{highlight.description}</p>
          </article>
        ))}
      </section>

      <ProductCustomizer />
      <Workflow />
      <PlatformStack />
      <Fulfillment />
      <FAQ />

      <footer className="footer">
        <div>
          <strong>Atlas Print Studio</strong>
          <p>
            Custom apparel production, packaging, and fulfillment for Moroccan
            creators and retail brands.
          </p>
        </div>
        <div className="footer-actions">
          <a className="primary" href="#customizer">
            Build my POD line
          </a>
          <a className="ghost" href="mailto:hello@atlasprint.ma">
            hello@atlasprint.ma
          </a>
        </div>
      </footer>
    </main>
  );
}
