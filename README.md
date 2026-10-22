# Christmas Eve Mouse: product page concept

An unsolicited product page concept for Proudchapter's **Christmas Eve Mouse**, built by Jerome R. with Claude Code, Next.js and Vercel. It keeps the live page's story, brand, layout and US prices, and adds the changes listed below. Not affiliated with Proudchapter. No orders or photos are taken.

Open the page and press **"What I changed and why"** (bottom left) to see each change marked where it sits.

## What changed

1. **Christmas order-by date and arrival window.** Calculated from today: last safe order day is Tuesday, Dec 15 (7 business days to Thursday, Dec 24).
2. **Softcover and hardcover priced up front.** $19.95 (was $39.95) and $29.95. Suggested test: hardcover vs. softcover preselected.
3. **Add-ons:** dedication page $4.95, matching poster $14.95, gift wrap $5.95.
4. **Second book 25% off,** same flat $6.95 shipping.
5. **Free gift note** with prices left off the packing slip.
6. **Live order total** including shipping before the preview.
7. **Market switcher:** US, UK (£17.95 / £26.95) and EU (€19.95 / €29.95). Delivery promises hide for markets not yet shipping.
8. **Photo-to-character slider** on the product page.
9. **Product structured data** (price, shipping, return policy, rating) for Google results.

Hardcover, add-on, UK and EU prices are proposals, not Proudchapter's numbers.

## Run it

```bash
npm install
npm run dev
```

## Structure

- `app/page.tsx` renders the page and the JSON-LD
- `components/BuyBox.tsx` format, add-ons, bundle, gift note, totals
- `lib/catalog.ts` market prices and business-day date math
- `lib/order.ts` order lines, totals and savings
- `components/Notes.tsx` the reviewer notes

Illustrations and the example child are AI-generated for this mockup (Higgsfield, GPT Image 2.5). The child does not exist.
