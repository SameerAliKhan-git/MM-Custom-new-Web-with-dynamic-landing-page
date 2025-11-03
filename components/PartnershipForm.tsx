import React from 'react';

export interface PartnershipFormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  whatsapp: string;
  company: string;
  address: string;
}

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

interface PartnershipFormProps {
  formData: PartnershipFormData;
  setFormData: (data: PartnershipFormData) => void;
  phoneError: string;
  setPhoneError: (error: string) => void;
  whatsappError: string;
  setWhatsappError: (error: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  countries: Country[];
}

export function PartnershipForm({
  formData,
  setFormData,
  phoneError,
  setPhoneError,
  whatsappError,
  setWhatsappError,
  isSubmitting,
  onSubmit,
  countries
}: PartnershipFormProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 md:p-8 lg:p-10 shadow-sm border border-gray-200">
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Your Name */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Your Email */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Country Code & Phone */}
          <div>
            <div className="flex gap-2">
              <select
                value={formData.countryCode}
                onChange={(e) => {
                  setFormData({...formData, countryCode: e.target.value});
                  setPhoneError('');
                }}
                className="w-32 px-2 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                required
                disabled={isSubmitting}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.dialCode}>
                    {country.flag} {country.dialCode} {country.name}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({...formData, phone: value});
                  setPhoneError('');
                }}
                className={`flex-1 px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all ${
                  phoneError ? 'border-red-500' : 'border-gray-300'
                }`}
                required
                disabled={isSubmitting}
              />
            </div>
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
          </div>

          {/* WhatsApp Number (Optional) */}
          <div>
            <div className="flex gap-2">
              <div className="w-32 flex items-center justify-center px-2 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 text-sm font-medium">
                {countries.find(c => c.dialCode === formData.countryCode)?.flag} {formData.countryCode}
              </div>
              <input
                type="tel"
                placeholder="WhatsApp (Optional)"
                value={formData.whatsapp}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({...formData, whatsapp: value});
                  setWhatsappError('');
                }}
                className={`flex-1 px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all ${
                  whatsappError ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
            </div>
            {whatsappError && (
              <p className="text-red-500 text-sm mt-1">{whatsappError}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <input
              type="text"
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Empty space for layout */}
          <div></div>
        </div>

        {/* Address */}
        <div>
          <textarea
            placeholder="Address"
            rows={5}
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
            required
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-orange-600 text-white px-12 py-3 rounded-full font-semibold text-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
