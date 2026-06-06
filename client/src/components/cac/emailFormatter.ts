import type { CACFormData, Country, PersonEntry, PSCEntry } from './types';

const line = (label: string, value?: string) =>
  value ? `${label}: ${value}\n` : '';

const section = (title: string, body: string) =>
  `\n━━━ ${title.toUpperCase()} ━━━\n${body}`;

const formatPerson = (p: PersonEntry, index: number, role: string): string => {
  let out = `\n  ${role} ${index + 1}: ${p.fullName}\n`;
  if (p.email) out += `    Email: ${p.email}\n`;
  if (p.phone) out += `    Phone: ${p.phone}\n`;
  if (p.address) out += `    Address: ${p.address}\n`;
  if (p.dateOfBirth) out += `    Date of Birth: ${p.dateOfBirth}\n`;
  if (p.gender) out += `    Gender: ${p.gender}\n`;
  if (p.occupation) out += `    Occupation: ${p.occupation}\n`;
  if (p.nationality) out += `    Nationality: ${p.nationality}\n`;
  if (p.taxPin) out += `    Tax PIN / TIN: ${p.taxPin}\n`;
  if (p.idType) out += `    ID Type: ${p.idType}\n`;
  if (p.serviceAddress) out += `    Service Address (public): ${p.serviceAddress}\n`;
  if (p.numberOfShares) out += `    Number of Shares: ${p.numberOfShares}\n`;
  if (p.shareholdingPercentage) out += `    Shareholding %: ${p.shareholdingPercentage}%\n`;
  if (p.qualification) out += `    Professional Qualification: ${p.qualification}\n`;
  return out;
};

const formatPSC = (psc: PSCEntry, index: number): string =>
  `\n  PSC ${index + 1}: ${psc.fullName}\n` +
  `    Address: ${psc.address}\n` +
  `    % Held: ${psc.percentageHeld}%\n` +
  `    Nature of Control: ${psc.natureOfControl}\n`;

export function formatEmailMessage(country: Country, data: CACFormData): string {
  const countryLabel: Record<Country, string> = {
    nigeria: '🇳🇬 Nigeria',
    ghana: '🇬🇭 Ghana',
    kenya: '🇰🇪 Kenya',
    uk: '🇬🇧 United Kingdom',
  };

  let msg = `CAC REGISTRATION APPLICATION\n`;
  msg += `Country: ${countryLabel[country]}\n`;
  msg += `Submitted: ${new Date().toLocaleString()}\n`;

  // Applicant
  msg += section(
    'Applicant Contact',
    line('Full Name', data.applicantName) +
      line('Email', data.applicantEmail) +
      line('Phone', data.applicantPhone),
  );

  // Company identity
  msg += section(
    'Company Identity',
    line('Preferred Name 1', data.companyName1) +
      (data.companyName2 ? line('Preferred Name 2', data.companyName2) : '') +
      (data.companyName3 ? line('Preferred Name 3', data.companyName3) : '') +
      line('Company Type', data.companyType) +
      line('Company Email', data.companyEmail) +
      line('Company Phone', data.companyPhone) +
      (data.companyObjects
        ? `Nature of Business / Objectives:\n${data.companyObjects}\n`
        : ''),
  );

  // Registered address
  let addrBody = line('Physical Address', data.registeredAddress);
  if (data.digitalAddress) addrBody += line('Ghana Post GPS', data.digitalAddress);
  if (data.postalAddress) addrBody += line('Postal Address', data.postalAddress);
  if (data.registeredEmail) addrBody += line('Registered Email', data.registeredEmail);
  if (data.jurisdiction) addrBody += line('Jurisdiction', data.jurisdiction);
  msg += section('Registered Address', addrBody);

  // Capital
  let capitalBody = line('Share Capital', data.shareCapital) + line('Ownership Type', data.ownershipType);
  if (data.shareClasses) capitalBody += line('Share Classes', data.shareClasses);
  if (data.nominalValuePerShare) capitalBody += line('Nominal Value Per Share', data.nominalValuePerShare);
  msg += section('Share Capital', capitalBody);

  // Articles / SIC (UK / Kenya)
  if (country === 'uk' && data.articlesType) {
    let artBody = line('Articles Type', data.articlesType === 'model' ? 'Model Articles' : 'Custom Articles');
    if (data.customArticlesDescription) artBody += `Custom Articles Details:\n${data.customArticlesDescription}\n`;
    msg += section('Articles of Association', artBody);
  }
  if ((country === 'kenya' || country === 'uk') && data.sicCode) {
    msg += section('SIC Code', line('SIC Code', data.sicCode));
  }

  // Directors
  if (data.directors.length > 0) {
    const dirBody = data.directors.map((d, i) => formatPerson(d, i, 'Director')).join('');
    msg += section('Directors', dirBody);
  }

  // Shareholders
  if (data.shareholders.length > 0) {
    const shBody = data.shareholders.map((s, i) => formatPerson(s, i, 'Shareholder')).join('');
    msg += section('Shareholders', shBody);
  }

  // Company Secretary (Nigeria, Ghana, Kenya)
  if (country !== 'uk') {
    if (data.secretaryOption === 'mustarred') {
      msg += section('Company Secretary', '  Option: Mustarred to act as Company Secretary\n');
    } else if (data.secretaryOption === 'own') {
      if (data.secretaryType === 'corporate') {
        let body = line('Company Name', data.corporateSecretaryName);
        if (data.corporateSecretaryRcNumber) body += line('RC Number', data.corporateSecretaryRcNumber);
        if (data.corporateSecretaryEmail) body += line('Email', data.corporateSecretaryEmail);
        if (data.corporateSecretaryPhone) body += line('Phone', data.corporateSecretaryPhone);
        if (data.corporateSecretaryAddress) body += line('Registered Address', data.corporateSecretaryAddress);
        msg += section('Company Secretary (Corporate)', body);
      } else if (data.secretary.fullName) {
        msg += section('Company Secretary (Individual)', formatPerson(data.secretary, 0, 'Secretary'));
      }
    }
  }

  // Beneficial Ownership
  if (data.beneficialOwnership) {
    msg += section('Beneficial Ownership', `${data.beneficialOwnership}\n`);
  }

  // PSC (UK)
  if (country === 'uk' && data.pscEntries && data.pscEntries.length > 0) {
    const pscBody = data.pscEntries.map((p, i) => formatPSC(p, i)).join('');
    msg += section('People with Significant Control (PSC)', pscBody);
  }

  // GIPC (Ghana)
  if (country === 'ghana' && data.requiresGIPC) {
    msg += section('GIPC Registration', line('Requires GIPC Registration', data.requiresGIPC));
  }

  // Additional notes
  if (data.additionalNotes) {
    msg += section('Additional Notes', data.additionalNotes);
  }

  msg += `\n\n━━━ NOTE ━━━\n`;
  msg += `Supporting documents (passport photos, government IDs, signatures) are to be requested separately by the Mustarred team.\n`;

  return msg;
}
