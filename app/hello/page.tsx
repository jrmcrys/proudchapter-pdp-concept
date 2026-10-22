import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes for the Proudchapter team · Jerome R.",
  robots: { index: false, follow: false },
};

export default function Hello() {
  return (
    <main className="hello">
      <div className="hello__in">
        <a className="hello__back" href="/">
          Back to the Christmas Eve Mouse page
        </a>

        <h1>Notes for the Proudchapter team</h1>
        <p className="hello__by">Jerome R.</p>

        <p>
          I built this Christmas Eve Mouse page for the E-Commerce Operations Manager role. These notes answer the three questions
          from the post. Press &ldquo;What I changed and why&rdquo; on the page to see each change where it sits.
        </p>

        <h2>Proudest project</h2>
        <p>
          A quiz-based segmentation funnel with 25,000+ subscribers, 30%+ open rates and a 7% conversion rate. Each quiz answer sorted
          people into a segment, so the emails that followed matched what they had said they wanted. Your gift buyers answer similar
          questions (who the book is for, how old they are), which is why this is the project I&apos;d bring to Proudchapter.
        </p>

        <h2>AI workflow</h2>
        <p>
          I used Claude Code for this page from research to deploy. I read your live page first: a headless Next.js storefront with no
          hardcover price, no add-ons, no Christmas order-by date and no Product markup for Google. I settled the spec by answering a
          round of questions, then generated nine illustrations from one reference image so the child looks the same on every page. I
          built the page in Next.js, tested it in a headless browser at desktop and phone widths, fixed a phone overflow that test
          caught, pushed to GitHub and deployed on Vercel. Research, spec, build, test and ship is the loop I&apos;d run on your
          product pages.
        </p>

        <h2>First three changes</h2>
        <ol>
          <li>
            <b>Order-by date and arrival window.</b> Your page gives no Christmas deadline. I calculated Tuesday, Dec 15 from your 7
            business day promise. The real cutoff comes from your print partner, so I&apos;d confirm it first.
          </li>
          <li>
            <b>Prices and format up front, with a live total.</b> Softcover, hardcover and shipping show before the preview, so the
            total holds no surprise. The hardcover price is my proposal.
          </li>
          <li>
            <b>Add-ons and a second book at 25% off.</b> Dedication page, poster, gift wrap and a second copy raise order value. Those
            prices are my proposals too.
          </li>
        </ol>

        <h2>Week one</h2>
        <p>
          Days 1 and 2: read analytics, reviews and support tickets to set a baseline for conversion and order value. Days 3 to 5: ship
          the order-by date, run it as a test against the current page, and write down what each outcome would change before the
          numbers arrive.
        </p>

        <h2>Proof</h2>
        <p>
          Email at a store: 12% of total store revenue attributed to email, 23% repeat purchase rate. Content engine: 382,540
          impressions and 8,596 new followers in 12 months. Community: a Circle community scaled to 2,000 members.
        </p>

        <p className="hello__foot">
          Code:{" "}
          <a href="https://github.com/jrmcrys/proudchapter-pdp-concept">github.com/jrmcrys/proudchapter-pdp-concept</a>. The
          illustrations and the example child are AI-generated, and only the $19.95 softcover price and $6.95 shipping are
          Proudchapter&apos;s numbers.
        </p>
      </div>
    </main>
  );
}
