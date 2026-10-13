import CatchTheRedFlags from "@/components/sections/CatchTheRedFlags";
import { useModal } from "@/contexts/ModalContext";
import { trackEvent } from '@/lib/analytics';

export default function HeroSection() {
    const { openModal } = useModal();

    return (
        <section
            id="home"
            className="relative overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at 30% 40%, #2a1a4a 0%, #1a0d33 60%, #0d0520 100%)',
                paddingTop: '140px',
                paddingBottom: '110px',
            }}
        >
            {/* Subtle circle decoration like demo */}
            <div style={{
                position: 'absolute',
                width: '580px',
                height: '580px',
                border: '1px solid rgba(164,159,231,0.15)',
                borderRadius: '50%',
                right: '-190px',
                top: '0',
                boxShadow: '0 0 0 80px rgba(164,159,231,0.04), 0 0 0 170px rgba(164,159,231,0.02)',
                pointerEvents: 'none',
            }} />

            <div className="wrap grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,1fr)] xl:items-center" style={{ width: 'min(1200px, 90%)', margin: 'auto', position: 'relative' }}>
                <div style={{ maxWidth: '820px' }}>
                    <h1 style={{
                        fontFamily: 'Georgia, serif',
                        fontWeight: 400,
                        fontSize: 'clamp(48px, 5.3vw, 72px)',
                        lineHeight: 1.03,
                        letterSpacing: '-0.045em',
                        color: 'white',
                        margin: '24px 0',
                    }}>
                        Solving high-stakes<br />
                        <em style={{ color: '#a49fe7', fontStyle: 'italic', fontWeight: 400 }}>
                            challenges with precision.
                        </em>
                    </h1>

                    <p style={{
                        maxWidth: '560px',
                        color: '#c5c0e8',
                        fontSize: '17px',
                        lineHeight: 1.7,
                        marginBottom: '40px',
                        fontFamily: 'Satoshi, sans-serif',
                    }}>
                        We combine robust intelligence and problem-solving capacity to help organisations develop excellent regulatory, compliance, and security frameworks.
                    </p>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '15px 24px',
                                background: '#4b4ba3',
                                color: 'white',
                                border: 0,
                                borderRadius: '3px',
                                fontWeight: 700,
                                fontSize: '13px',
                                cursor: 'pointer',
                                fontFamily: 'Satoshi, sans-serif',
                            }}
                            onClick={() => {
                                trackEvent('cta_click', { event_category: 'engagement', event_label: 'Talk to Expert - Hero' });
                                openModal("Talk to an Expert", "Get expert guidance for your compliance needs");
                            }}
                        >
                            Talk to an Expert ↗
                        </button>

                        <button
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '15px 24px',
                                background: 'transparent',
                                color: 'white',
                                border: '1px solid rgba(164,159,231,0.5)',
                                borderRadius: '3px',
                                fontWeight: 700,
                                fontSize: '13px',
                                cursor: 'pointer',
                                fontFamily: 'Satoshi, sans-serif',
                            }}
                            onClick={() => {
                                trackEvent('cta_click', { event_category: 'engagement', event_label: 'Register as a DCMI - Hero' });
                                window.location.href = '/dcmi-compliance';
                            }}
                        >
                            Register as a DCMI ↗
                        </button>
                    </div>
                </div>
                <CatchTheRedFlags />
            </div>
        </section>
    );
}
