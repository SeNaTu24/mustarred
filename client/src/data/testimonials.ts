export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  logo?: string;
  accentColor?: string;
  badgeLabel?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Their team brought a deep understanding of compliance and security to our project. It's been a relief working with professionals who truly get fintech.",
    author: "Fincra",
    position: "Fintech Company",
    logo: "/assets/icons/fincra.png",
    accentColor: "#6C2BF5",
    badgeLabel: "Fintech Compliance",
  },
  {
    quote:
      "From consultation to execution, the process was smooth and collaborative. They helped us meet our goals without unnecessary delays.",
    author: "Heala",
    position: "Healthcare Technology",
    logo: "/assets/icons/heala_logo.svg",
    accentColor: "#3E5EA9",
    badgeLabel: "Data Protection",
  },
  {
    quote:
      "We appreciated how proactive they were. Instead of just checking boxes, they really cared about improving our systems.",
    author: "Paylode",
    position: "Payment Solutions",
    accentColor: "#5145B5",
    badgeLabel: "Payment Strategy",
  },
];
