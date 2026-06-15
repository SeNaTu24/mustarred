import React from 'react';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';
import type { PersonEntry, PSCEntry } from './types';

// ─── Field Components ───────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, hint, error, required, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
      {children}
      {error && (
        <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

const baseInput =
  'w-full px-4 py-3 border-2 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 outline-none focus:ring-2 focus:ring-[#a49fe7]/40 bg-white';
const inputClass = (hasError?: boolean) =>
  `${baseInput} ${hasError ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-[#a49fe7]/60 focus:border-[#4b4ba3]'}`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}
export function TextInput({ error, ...props }: InputProps) {
  return <input className={inputClass(error)} {...props} />;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}
export function TextArea({ error, rows = 3, ...props }: TextareaProps) {
  return <textarea className={`${inputClass(error)} resize-none`} rows={rows} {...props} />;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}
export function SelectInput({ error, options, placeholder, ...props }: SelectProps) {
  return (
    <select className={`${inputClass(error)} cursor-pointer`} {...props}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ─── Question Header ─────────────────────────────────────────────────────────

interface QuestionHeaderProps {
  question: string;
  description?: string;
  badge?: string;
}
export function QuestionHeader({ question, description, badge }: QuestionHeaderProps) {
  return (
    <div className="mb-6">
      {badge && (
        <span className="inline-block text-xs font-semibold text-[#4b4ba3] bg-[#4b4ba3]/10 px-3 py-1 rounded-full mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-2">
        {question}
      </h2>
      {description && <p className="text-sm text-gray-500 leading-relaxed">{description}</p>}
    </div>
  );
}

// ─── Person Card (director / shareholder / secretary) ────────────────────────

interface PersonCardProps {
  role: string;
  index: number;
  person: PersonEntry;
  onChange: (updated: PersonEntry) => void;
  onRemove?: () => void;
  canRemove: boolean;
  showDob?: boolean;
  showGender?: boolean;
  showOccupation?: boolean;
  showNationality?: boolean;
  showTaxPin?: boolean;
  showServiceAddress?: boolean;
  showShares?: boolean;
  showQualification?: boolean;
  showSharesPercentage?: boolean;
  idOptions: { value: string; label: string }[];
  errors?: Record<string, string>;
}

export function PersonCard({
  role,
  index,
  person,
  onChange,
  onRemove,
  canRemove,
  showDob,
  showGender,
  showOccupation,
  showNationality,
  showTaxPin,
  showServiceAddress,
  showShares,
  showSharesPercentage,
  showQualification,
  idOptions,
  errors = {},
}: PersonCardProps) {
  const set = (key: keyof PersonEntry, value: string) =>
    onChange({ ...person, [key]: value });

  const prefix = `${role.toLowerCase()}_${index}`;

  return (
    <div className="border-2 border-gray-100 rounded-2xl p-5 bg-gray-50/50 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-800 text-sm">
          {role} {index + 1}
        </h4>
        {canRemove && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50"
            aria-label={`Remove ${role} ${index + 1}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Full Name" required error={errors[`${prefix}_name`]}>
          <TextInput
            placeholder="e.g. Jane Adebayo"
            value={person.fullName}
            onChange={(e) => set('fullName', e.target.value)}
            error={!!errors[`${prefix}_name`]}
          />
        </FormField>

        <FormField label="Email Address" required error={errors[`${prefix}_email`]}>
          <TextInput
            type="email"
            placeholder="jane@example.com"
            value={person.email}
            onChange={(e) => set('email', e.target.value)}
            error={!!errors[`${prefix}_email`]}
          />
        </FormField>

        <FormField label="Phone Number" required error={errors[`${prefix}_phone`]}>
          <TextInput
            type="tel"
            placeholder="e.g. 0800 000 0000"
            value={person.phone}
            onChange={(e) => set('phone', e.target.value)}
            error={!!errors[`${prefix}_phone`]}
          />
        </FormField>

        {showDob && (
          <FormField label="Date of Birth" required error={errors[`${prefix}_dob`]}>
            <TextInput
              type="date"
              value={person.dateOfBirth}
              onChange={(e) => set('dateOfBirth', e.target.value)}
              error={!!errors[`${prefix}_dob`]}
            />
          </FormField>
        )}

        {showGender && (
          <FormField label="Gender" required error={errors[`${prefix}_gender`]}>
            <SelectInput
              value={person.gender}
              onChange={(e) => set('gender', e.target.value)}
              error={!!errors[`${prefix}_gender`]}
              placeholder="Select gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'prefer_not_to_say', label: 'Prefer not to say' },
              ]}
            />
          </FormField>
        )}

        {showOccupation && (
          <FormField label="Occupation" error={errors[`${prefix}_occupation`]}>
            <TextInput
              placeholder="e.g. Software Engineer"
              value={person.occupation}
              onChange={(e) => set('occupation', e.target.value)}
            />
          </FormField>
        )}

        {showNationality && (
          <FormField label="Nationality" required error={errors[`${prefix}_nationality`]}>
            <TextInput
              placeholder="e.g. Nigerian"
              value={person.nationality}
              onChange={(e) => set('nationality', e.target.value)}
              error={!!errors[`${prefix}_nationality`]}
            />
          </FormField>
        )}

        {showTaxPin && (
          <FormField
            label="Tax PIN / TIN"
            hint="KRA PIN (Kenya) or Taxpayer Identification Number"
            error={errors[`${prefix}_taxpin`]}
          >
            <TextInput
              placeholder="e.g. A000000000Z"
              value={person.taxPin}
              onChange={(e) => set('taxPin', e.target.value)}
            />
          </FormField>
        )}

        {showShares && (
          <FormField label="Number of Shares" required error={errors[`${prefix}_shares`]}>
            <TextInput
              type="number"
              placeholder="e.g. 1000"
              value={person.numberOfShares}
              onChange={(e) => set('numberOfShares', e.target.value)}
              error={!!errors[`${prefix}_shares`]}
            />
          </FormField>
        )}

        {showSharesPercentage && (
          <FormField label="Shareholding %" error={errors[`${prefix}_pct`]}>
            <TextInput
              type="number"
              placeholder="e.g. 50"
              min={1}
              max={100}
              value={person.shareholdingPercentage}
              onChange={(e) => set('shareholdingPercentage', e.target.value)}
            />
          </FormField>
        )}

        {showQualification && (
          <FormField label="Professional Qualification" hint="e.g. ICSA, LLB (optional)">
            <TextInput
              placeholder="Enter qualification"
              value={person.qualification}
              onChange={(e) => set('qualification', e.target.value)}
            />
          </FormField>
        )}

        <FormField
          label="Government-Issued ID Type"
          required
          error={errors[`${prefix}_id`]}
        >
          <SelectInput
            value={person.idType}
            onChange={(e) => set('idType', e.target.value)}
            error={!!errors[`${prefix}_id`]}
            placeholder="Select ID type"
            options={idOptions}
          />
        </FormField>
      </div>

      <FormField label="Residential Address" required error={errors[`${prefix}_address`]}>
        <TextArea
          placeholder="Full residential address"
          value={person.address}
          onChange={(e) => set('address', e.target.value)}
          error={!!errors[`${prefix}_address`]}
          rows={2}
        />
      </FormField>

      {showServiceAddress && (
        <FormField
          label="Service Address (Public Record)"
          hint="This address appears on public Companies House records"
          required
          error={errors[`${prefix}_service`]}
        >
          <TextArea
            placeholder="Service address (can be different from residential)"
            value={person.serviceAddress}
            onChange={(e) => set('serviceAddress', e.target.value)}
            error={!!errors[`${prefix}_service`]}
            rows={2}
          />
        </FormField>
      )}
    </div>
  );
}

// ─── Add Person Button ────────────────────────────────────────────────────────

interface AddPersonButtonProps {
  label: string;
  onClick: () => void;
}
export function AddPersonButton({ label, onClick }: AddPersonButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#4b4ba3]/30 text-[#4b4ba3] rounded-xl py-3 text-sm font-medium hover:border-[#4b4ba3]/60 hover:bg-[#4b4ba3]/5 transition-all duration-200"
    >
      <Plus className="w-4 h-4" />
      {label}
    </button>
  );
}

// ─── PSC Card (UK only) ───────────────────────────────────────────────────────

interface PSCCardProps {
  index: number;
  psc: PSCEntry;
  onChange: (updated: PSCEntry) => void;
  onRemove?: () => void;
  canRemove: boolean;
  errors?: Record<string, string>;
}

export function PSCCard({ index, psc, onChange, onRemove, canRemove, errors = {} }: PSCCardProps) {
  const set = (key: keyof PSCEntry, value: string) => onChange({ ...psc, [key]: value });
  const p = `psc_${index}`;

  return (
    <div className="border-2 border-gray-100 rounded-2xl p-5 bg-gray-50/50 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-800 text-sm">PSC {index + 1}</h4>
        {canRemove && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Full Name" required error={errors[`${p}_name`]}>
          <TextInput
            placeholder="Full legal name"
            value={psc.fullName}
            onChange={(e) => set('fullName', e.target.value)}
            error={!!errors[`${p}_name`]}
          />
        </FormField>

        <FormField label="% Shares / Voting Rights Held" required error={errors[`${p}_pct`]}>
          <TextInput
            type="number"
            placeholder="e.g. 30"
            min={25}
            max={100}
            value={psc.percentageHeld}
            onChange={(e) => set('percentageHeld', e.target.value)}
            error={!!errors[`${p}_pct`]}
          />
        </FormField>

        <FormField
          label="Nature of Control"
          required
          hint="How this person exercises control"
          error={errors[`${p}_nature`]}
        >
          <SelectInput
            value={psc.natureOfControl}
            onChange={(e) => set('natureOfControl', e.target.value)}
            error={!!errors[`${p}_nature`]}
            placeholder="Select nature"
            options={[
              { value: 'shares', label: 'Ownership of shares (>25%)' },
              { value: 'voting', label: 'Voting rights (>25%)' },
              { value: 'appointment', label: 'Right to appoint/remove majority of directors' },
              { value: 'significant_influence', label: 'Significant influence or control' },
            ]}
          />
        </FormField>
      </div>

      <FormField label="Address" required error={errors[`${p}_address`]}>
        <TextArea
          placeholder="Full address"
          value={psc.address}
          onChange={(e) => set('address', e.target.value)}
          rows={2}
          error={!!errors[`${p}_address`]}
        />
      </FormField>
    </div>
  );
}

// ─── Document Upload Notice ───────────────────────────────────────────────────

export function DocumentsNotice() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-[#4b4ba3]/20 bg-[#4b4ba3]/5 p-5">
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-[#4b4ba3]/10 flex items-center justify-center flex-shrink-0">
          <span className="text-lg">📎</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm mb-1">Supporting Documents</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            After submitting this form, our team will reach out to collect the required supporting
            documents — including passport photographs, government-issued IDs, and signatures for
            each director and shareholder.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            You can also send documents in advance to{' '}
            <a href="mailto:info@mustarred.com" className="text-[#4b4ba3] underline">
              info@mustarred.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Step Progress Bar ────────────────────────────────────────────────────────

interface StepProgressProps {
  current: number;
  total: number;
  stepLabel: string;
}
export function StepProgress({ current, total, stepLabel }: StepProgressProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-[#4b4ba3]">{stepLabel}</span>
        <span className="text-xs text-gray-400">
          {current} / {total}
        </span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #a49fe7, #4b4ba3)',
          }}
        />
      </div>
    </div>
  );
}
