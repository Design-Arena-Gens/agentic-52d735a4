import "./globals.css";

export const metadata = {
  title: "Atlas Print Studio | Custom Moroccan Apparel",
  description:
    "Launch your on-demand clothing line in Morocco. Customize T-shirts, hoodies, and caps with live previews and seamless fulfillment workflow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
