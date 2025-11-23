const fulfillmentPerks = [
  {
    title: "Guaranteed color accuracy",
    detail:
      "Pantone matching with pre-production strike-offs. DTG runs calibrated weekly for vibrant prints.",
  },
  {
    title: "Print methods for every drop",
    detail:
      "Screen printing for bulk, DTG for micro batches, DTF transfers for caps & special placements.",
  },
  {
    title: "Packaging & tagging",
    detail:
      "Neck labels, size stickers, folded & bagged items ready for retail shelves or drop-offs.",
  },
  {
    title: "Nationwide delivery tracking",
    detail:
      "Generate Amana/Aramex labels instantly. Automated tracking codes synced to your storefront.",
  },
];

export default function Fulfillment() {
  return (
    <section id="fulfillment" className="section fulfillment">
      <div className="section-header">
        <span className="eyebrow">Production & Logistics</span>
        <h2>Morocco-based workshop with end-to-end fulfillment</h2>
        <p>
          Atlas Print Studio runs every drop from our Casablanca facility. The
          same team prints merch for local creators, startups, and export
          brands. You focus on marketing—we handle the rest.
        </p>
      </div>

      <div className="fulfillment-grid">
        {fulfillmentPerks.map((perk) => (
          <article key={perk.title} className="fulfillment-card">
            <h3>{perk.title}</h3>
            <p>{perk.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
