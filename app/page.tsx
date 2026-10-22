import ProductPage from "@/components/ProductPage";
import { MARKETS } from "@/lib/catalog";

const LIVE_URL = "https://proudchapter.com/mistletoe-mouse-christmas-eve-rescue";

function siteUrl() {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return host ? `https://${host}` : "http://localhost:3000";
}

export default function Page() {
  const us = MARKETS.us;
  const base = siteUrl();

  // Product structured data so Google can show price, stars and shipping.
  // On the live store the rating should come from per-title reviews.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Christmas Eve Mouse, personalized picture book",
    description:
      "On Christmas Eve, a sneeze shrinks your child to mouse size, and Mistletoe the mouse needs help to make the magic dust that lets Santa in. Your child is drawn from one photo into every page.",
    image: [`${base}/img/cover.webp`, `${base}/img/spread-tree.webp`, `${base}/img/spread-mousehole.webp`],
    brand: { "@type": "Brand", name: "Proudchapter" },
    sku: "PC-XMAS-MOUSE",
    url: LIVE_URL,
    audience: { "@type": "PeopleAudience", suggestedMinAge: 2, suggestedMaxAge: 8 },
    aggregateRating: { "@type": "AggregateRating", ratingValue: 4.8, reviewCount: 13837, bestRating: 5 },
    offers: [
      { format: "Softcover", sku: "PC-XMAS-MOUSE-SC", price: us.soft },
      { format: "Hardcover", sku: "PC-XMAS-MOUSE-HC", price: us.hard },
    ].map((o) => ({
      "@type": "Offer",
      name: o.format,
      sku: o.sku,
      price: o.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/MadeToOrder",
      url: LIVE_URL,
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: us.shipping.toFixed(2), currency: "USD" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 3, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 3, maxValue: 4, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductPage />
    </>
  );
}
