import "./WhyChooseUsCarousel.css";
import { useState } from "react";

const clients = [
  { name: "Cleva", desc: "Cross-border banking for Africans.", src: "/assets/icons/cleva-logo2.svg" },
  { name: "Fincra", desc: "Payment infrastructure for Africa.", src: "/assets/icons/fincra.png" },
  { name: "Heala", desc: "Digital healthcare access platform.", src: "/assets/icons/heala_logo.svg" },
  { name: "Renmoney", desc: "Personal finance and lending.", src: "/assets/icons/renmoney.jpeg" },
  { name: "Enta Afrika", desc: "Pan-African fintech solutions.", src: "/assets/icons/enta_afrika.jpg" },
  { name: "Radease", desc: "Simplifying business operations.", src: "/assets/icons/radease.png" },
  { name: "Roqqu", desc: "Crypto trading for Africans.", src: "/assets/icons/roqqu.png" },
  { name: "OA", desc: "Legal and compliance advisory.", src: "/assets/icons/oa_logo.png" },
];

export default function WhyChooseUsCarousel() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="client-logo-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our client logos. Hover or focus to pause rotation."
      tabIndex={0}
    >
      <ol className="client-logo-carousel__ring" aria-label="Mustarred clients">
        {clients.map((client, index) => (
          <li
            className="client-logo-carousel__card"
            key={client.name}
            style={{ transform: `rotateY(${index * 45}deg) translateZ(var(--client-carousel-radius))` }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={client.src}
              alt={`${client.name} client logo`}
              loading="lazy"
              decoding="async"
              style={{ transition: 'opacity 0.2s', opacity: hovered === index ? 0.15 : 1 }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              opacity: hovered === index ? 1 : 0,
              transition: 'opacity 0.2s',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '12px', fontWeight: 800, color: '#0d0520', marginBottom: '6px' }}>{client.name}</p>
              <p style={{ fontSize: '11px', fontWeight: 500, color: '#1e1038', lineHeight: 1.4 }}>{client.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
