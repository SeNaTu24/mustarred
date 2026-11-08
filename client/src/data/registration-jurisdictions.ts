import type { Country } from "@/components/cac/types";

export interface RegistrationJurisdiction {
  id: Country;
  code: string;
  label: string;
  tagline: string;
}

/** Display copy shared with the CAC registration country chooser. */
export const registrationJurisdictions: readonly RegistrationJurisdiction[] = [
  {
    id: "nigeria",
    code: "NG",
    label: "Nigeria",
    tagline: "Register via CAC e-portal · Private Limited, Business Name & more",
  },
  {
    id: "ghana",
    code: "GH",
    label: "Ghana",
    tagline: "Register via ORC · Companies Act, 2019 (Act 992)",
  },
  {
    id: "kenya",
    code: "KE",
    label: "Kenya",
    tagline: "Register via BRS eCitizen · Business Registration Service",
  },
  {
    id: "uk",
    code: "GB",
    label: "United Kingdom",
    tagline: "Register via Companies House · England & Wales, Scotland, N. Ireland",
  },
];
