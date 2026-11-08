import { useModal } from "@/contexts/ModalContext";
import "./ContactSection.css";

export default function ContactSection() {
    const { openModal } = useModal();

    return (
        <section id="contact" className="home-contact-cta" aria-labelledby="home-contact-heading">
            <svg
                className="home-contact-cta__decor home-contact-cta__decor--left"
                viewBox="0 0 320 220"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    d="M0,0 C120,20 180,100 130,220 L0,220 Z"
                    fill="rgba(255, 255, 255, 0.55)"
                />
                <path
                    d="M0,25 C85,45 130,115 85,220 L0,220 Z"
                    fill="rgba(255, 255, 255, 0.3)"
                />
            </svg>
            <svg
                className="home-contact-cta__decor home-contact-cta__decor--right"
                viewBox="0 0 320 220"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    d="M320,0 C200,20 140,100 190,220 L320,220 Z"
                    fill="rgba(255, 255, 255, 0.55)"
                />
                <path
                    d="M320,25 C235,45 190,115 235,220 L320,220 Z"
                    fill="rgba(255, 255, 255, 0.3)"
                />
            </svg>

            <div className="home-contact-cta__container">
                <div className="home-contact-cta__content">
                    <h2 id="home-contact-heading" className="home-contact-cta__heading">
                        Let's solve your next challenge.
                    </h2>
                    <p className="home-contact-cta__text">
                        Tell us what your business is working through. We'll help you identify the right next step.
                    </p>
                </div>
                <button
                    type="button"
                    className="home-contact-cta__button"
                    onClick={() => openModal("Contact Us", "Get in touch with our team")}
                >
                    Talk to Our Team <span aria-hidden="true">→</span>
                </button>
            </div>
        </section>
    );
}
