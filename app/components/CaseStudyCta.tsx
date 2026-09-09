import { ArrowIcon } from "./UiIcons";

export default function CaseStudyCta() {
  return (
    <section className="case-study-cta" aria-labelledby="case-study-cta-title">
      <div>
        <p>Have a project in mind?</p>
        <h2 id="case-study-cta-title">Let’s make it <span>memorable.</span></h2>
      </div>
      <a href="/contact">
        Start a conversation
        <ArrowIcon size={18} />
      </a>
    </section>
  );
}
