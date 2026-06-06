export type Country = 'nigeria' | 'ghana' | 'kenya' | 'uk';

export interface PersonEntry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth?: string;
  gender?: string;
  idType?: string;
  occupation?: string;
  nationality?: string;
  taxPin?: string; // KRA PIN (Kenya) or TIN (Ghana)
  serviceAddress?: string; // UK only – public record address
  numberOfShares?: string;
  shareholdingPercentage?: string;
  qualification?: string; // Company Secretary
}

export interface PSCEntry {
  id: string;
  fullName: string;
  address: string;
  percentageHeld: string;
  natureOfControl: string;
}

export interface CACFormData {
  // ─── Applicant contact ────────────────────────────────
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;

  // ─── Company identity ─────────────────────────────────
  companyName1: string;
  companyName2: string;
  companyName3: string; // Kenya: 3rd option
  companyType: string;
  companyObjects: string; // objectives / constitution / memorandum
  companyEmail: string;
  companyPhone: string;

  // ─── Registered address ───────────────────────────────
  registeredAddress: string;
  digitalAddress?: string; // Ghana Post GPS
  postalAddress?: string; // Kenya postal
  registeredEmail?: string; // UK mandatory
  jurisdiction?: string; // UK: England & Wales | Scotland | Northern Ireland

  // ─── Capital ──────────────────────────────────────────
  shareCapital: string;
  totalShares?: string;
  ownershipType: string; // 'local' | 'foreign'
  shareClasses?: string;
  nominalValuePerShare?: string;

  // ─── Articles (UK) ────────────────────────────────────
  articlesType?: string; // 'model' | 'custom'
  customArticlesDescription?: string;

  // ─── SIC code (Kenya / UK) ────────────────────────────
  sicCode?: string;

  // ─── Persons ──────────────────────────────────────────
  directors: PersonEntry[];
  shareholders: PersonEntry[];
  secretary: PersonEntry;

  // ─── Beneficial ownership (Ghana / Kenya / UK PSC) ────
  beneficialOwnership?: string;
  pscEntries?: PSCEntry[];

  // ─── GIPC (Ghana foreign companies) ──────────────────
  requiresGIPC?: string; // 'yes' | 'no'

  // ─── Company Secretary ──────────────────────────────
  secretaryOption?: 'mustarred' | 'own';
  secretaryType?: 'individual' | 'corporate';
  corporateSecretaryName?: string;
  corporateSecretaryRcNumber?: string;
  corporateSecretaryAddress?: string;
  corporateSecretaryEmail?: string;
  corporateSecretaryPhone?: string;

  // ─── Miscellaneous ────────────────────────────────────
  additionalNotes?: string;
}

export const EMPTY_PERSON = (): PersonEntry => ({
  id: crypto.randomUUID(),
  fullName: '',
  email: '',
  phone: '',
  address: '',
  dateOfBirth: '',
  gender: '',
  idType: '',
  occupation: '',
  nationality: '',
  taxPin: '',
  serviceAddress: '',
  numberOfShares: '',
  shareholdingPercentage: '',
  qualification: '',
});

export const EMPTY_PSC = (): PSCEntry => ({
  id: crypto.randomUUID(),
  fullName: '',
  address: '',
  percentageHeld: '',
  natureOfControl: '',
});

export const EMPTY_FORM_DATA = (): CACFormData => ({
  applicantName: '',
  applicantEmail: '',
  applicantPhone: '',
  companyName1: '',
  companyName2: '',
  companyName3: '',
  companyType: '',
  companyObjects: '',
  companyEmail: '',
  companyPhone: '',
  registeredAddress: '',
  digitalAddress: '',
  postalAddress: '',
  registeredEmail: '',
  jurisdiction: '',
  shareCapital: '',
  totalShares: '',
  ownershipType: 'local',
  shareClasses: '',
  nominalValuePerShare: '',
  articlesType: '',
  customArticlesDescription: '',
  sicCode: '',
  directors: [EMPTY_PERSON()],
  shareholders: [EMPTY_PERSON()],
  secretary: EMPTY_PERSON(),
  beneficialOwnership: '',
  pscEntries: [EMPTY_PSC()],
  requiresGIPC: '',
  secretaryOption: undefined,
  secretaryType: undefined,
  corporateSecretaryName: '',
  corporateSecretaryRcNumber: '',
  corporateSecretaryAddress: '',
  corporateSecretaryEmail: '',
  corporateSecretaryPhone: '',
  additionalNotes: '',
});
