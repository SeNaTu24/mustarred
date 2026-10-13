import "./WhyChooseUsCarousel.css";

const clients = [
  { name: "Cleva", src: "/assets/icons/cleva-logo2.svg" },
  { name: "Fincra", src: "/assets/icons/fincra.png" },
  { name: "Heala", src: "/assets/icons/heala_logo.svg" },
  { name: "Renmoney", src: "/assets/icons/renmoney.jpeg" },
  { name: "Enta Afrika", src: "/assets/icons/enta_afrika.jpg" },
  { name: "Radease", src: "/assets/icons/radease.png" },
  { name: "Roqqu", src: "/assets/icons/roqqu.png" },
  { name: "OA", src: "/assets/icons/oa_logo.png" },
];

export default function WhyChooseUsCarousel() {
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
            style={{
              transform: `rotateY(${index * 45}deg) translateZ(var(--client-carousel-radius))`,
            }}
          >
            <img
              src={client.src}
              alt={`${client.name} client logo`}
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
