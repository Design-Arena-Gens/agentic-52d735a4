const workflowSteps = [
  {
    title: "Create your product",
    description:
      "Choose the garment, dial in the colors, upload artwork, and generate a proof instantly.",
    metric: "Under 3 minutes",
  },
  {
    title: "Instant payment & routing",
    description:
      "Process payments in MAD through Shopify or WooCommerce (Payzone, CMI, PayPal). Orders sync instantly to production.",
    metric: "Secured checkout",
  },
  {
    title: "Print & quality check",
    description:
      "Your job tickets appear in the Atlas production dashboard. We prep screens/DTG files, print, cure, and fold.",
    metric: "48-72h production",
  },
  {
    title: "Nationwide delivery",
    description:
      "Packed orders are dispatched with Amana or Aramex. Tracking codes sync back to your shop automatically.",
    metric: "1-3 day transit",
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="section workflow">
      <div className="section-header">
        <span className="eyebrow">Operations Pipeline</span>
        <h2>From customer idea to doorstep across Morocco</h2>
        <p>
          A lightweight print-on-demand stack tailored to Moroccan logistics and
          payment rails. No minimum inventory, no manual file chasing, no
          spreadsheet chaos.
        </p>
      </div>

      <ol className="workflow-steps">
        {workflowSteps.map((step, index) => (
          <li key={step.title} className="workflow-step">
            <span className="workflow-index">{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <strong>{step.metric}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
