import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { countries } from './countryData';

interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  whatsapp: string;
  company: string;
  address: string;
}

export function PartnershipsPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activePartnership, setActivePartnership] = useState<'corporate' | 'institutional' | null>(null);
  const [corporateFormData, setCorporateFormData] = useState<FormData>({
    name: '', email: '', phone: '', countryCode: '+91', whatsapp: '', company: '', address: ''
  });
  const [institutionalFormData, setInstitutionalFormData] = useState<FormData>({
    name: '', email: '', phone: '', countryCode: '+91', whatsapp: '', company: '', address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [corporatePhoneError, setCorporatePhoneError] = useState('');
  const [corporateWhatsappError, setCorporateWhatsappError] = useState('');
  const [institutionalPhoneError, setInstitutionalPhoneError] = useState('');
  const [institutionalWhatsappError, setInstitutionalWhatsappError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/session', {
          credentials: 'include'
        });
        if (response.ok) {
          // CSRF token is set in cookie by the server
          // We just need to make this call to ensure the cookie is set
        }
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const validatePhoneNumber = (phone: string, countryCode: string): { valid: boolean; error: string } => {
    if (!phone) {
      return { valid: false, error: 'Phone number is required' };
    }

    try {
      const fullNumber = countryCode + phone;
      const country = countries.find(c => c.dialCode === countryCode);
      
      if (country && isValidPhoneNumber(fullNumber, country.code as any)) {
        return { valid: true, error: '' };
      } else {
        const parsed = parsePhoneNumber(fullNumber);
        if (parsed) {
          return { valid: true, error: '' };
        }
        return { valid: false, error: `Invalid phone number format for ${country?.name || 'selected country'}` };
      }
    } catch (error) {
      return { valid: false, error: 'Invalid phone number format' };
    }
  };

  const validateWhatsAppNumber = (whatsapp: string, countryCode: string): { valid: boolean; error: string } => {
    if (!whatsapp) {
      return { valid: true, error: '' }; // WhatsApp is optional
    }

    try {
      const fullNumber = countryCode + whatsapp;
      const country = countries.find(c => c.dialCode === countryCode);
      
      if (country && isValidPhoneNumber(fullNumber, country.code as any)) {
        return { valid: true, error: '' };
      } else {
        const parsed = parsePhoneNumber(fullNumber);
        if (parsed) {
          return { valid: true, error: '' };
        }
        return { valid: false, error: `Invalid WhatsApp number format for ${country?.name || 'selected country'}` };
      }
    } catch (error) {
      return { valid: false, error: 'Invalid WhatsApp number format' };
    }
  };

  const handlePartnershipClick = (type: 'corporate' | 'institutional') => {
    setActivePartnership(type);
    // Scroll to content after a brief delay to let state update
    setTimeout(() => {
      const contentElement = document.getElementById('partnership-content');
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleFormSubmit = async (e: React.FormEvent, partnerType: 'CORPORATE' | 'INSTITUTIONAL') => {
    e.preventDefault();
    
    const formData = partnerType === 'CORPORATE' ? corporateFormData : institutionalFormData;
    
    // Validate all required fields are filled
    if (!formData.name || !formData.email || !formData.phone || !formData.countryCode || !formData.company || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate phone number
    const phoneValidation = validatePhoneNumber(formData.phone, formData.countryCode);
    if (!phoneValidation.valid) {
      if (partnerType === 'CORPORATE') {
        setCorporatePhoneError(phoneValidation.error);
      } else {
        setInstitutionalPhoneError(phoneValidation.error);
      }
      toast.error(phoneValidation.error);
      return;
    }

    // Validate WhatsApp number if provided
    if (formData.whatsapp) {
      const whatsappValidation = validateWhatsAppNumber(formData.whatsapp, formData.countryCode);
      if (!whatsappValidation.valid) {
        if (partnerType === 'CORPORATE') {
          setCorporateWhatsappError(whatsappValidation.error);
        } else {
          setInstitutionalWhatsappError(whatsappValidation.error);
        }
        toast.error(whatsappValidation.error);
        return;
      }
    }

    // Clear any previous errors
    if (partnerType === 'CORPORATE') {
      setCorporatePhoneError('');
      setCorporateWhatsappError('');
    } else {
      setInstitutionalPhoneError('');
      setInstitutionalWhatsappError('');
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/partnerships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: Include cookies for CSRF token
        body: JSON.stringify({
          ...formData,
          partnerType
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          'Thank you for your interest! We have received your inquiry and will get in touch soon.',
          { duration: 5000 }
        );
        
        // Reset form
        if (partnerType === 'CORPORATE') {
          setCorporateFormData({ name: '', email: '', phone: '', countryCode: '+91', whatsapp: '', company: '', address: '' });
        } else {
          setInstitutionalFormData({ name: '', email: '', phone: '', countryCode: '+91', whatsapp: '', company: '', address: '' });
        }
      } else {
        toast.error(data.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again or contact us directly at mahimaministriesindia@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Children Image */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000"
          alt="Children in partnership programs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>

      {/* Banner Section */}
      <div className="bg-secondary-solid text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Partnerships</h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base opacity-90">
              <span>Home</span>
              <span>/</span>
              <span>Ways to give</span>
              <span>/</span>
              <span>Partnerships</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Introduction */}
          <section className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Increasingly consumers, employees and investors are looking for companies to demonstrate their commitment to 
              Corporate Social Responsibility (CSR) and willingness to make a positive global, economic and social impact.
            </p>
            
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              By partnering with SOS Children's Villages India, your company can help make the world a better place for some 
              of the most vulnerable children and their families.
            </p>
            
            <p className="text-base md:text-lg leading-relaxed text-gray-700 font-semibold">
              Together - with your support, we forge ahead towards bringing a sustainable change at scale, into the lives 
              of children & families that we work with!
            </p>
          </section>

          {/* Partnership Cards */}
          <section className="grid md:grid-cols-2 gap-6 md:gap-8 py-8">
            {/* Corporate Partnerships */}
            <div 
              className={`relative group cursor-pointer transition-all rounded-lg ${activePartnership === 'corporate' ? 'ring-4 ring-primary ring-offset-4 shadow-xl' : ''}`}
              onClick={() => handlePartnershipClick('corporate')}
            >
              <div className={`relative h-[400px] rounded-lg overflow-hidden ${activePartnership === 'corporate' ? 'shadow-2xl' : 'shadow-lg'}`}>
                <img 
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800"
                  alt="Corporate Partnerships"
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Corporate Partnerships</h3>
                  <button className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                    READ MORE
                  </button>
                </div>
              </div>
              {/* Active Indicator Arrow */}
              {activePartnership === 'corporate' && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-primary drop-shadow-lg"></div>
                </div>
              )}
            </div>

            {/* Institutional Partnerships */}
            <div 
              className={`relative group cursor-pointer transition-all rounded-lg ${activePartnership === 'institutional' ? 'ring-4 ring-primary ring-offset-4 shadow-xl' : ''}`}
              onClick={() => handlePartnershipClick('institutional')}
            >
              <div className={`relative h-[400px] rounded-lg overflow-hidden ${activePartnership === 'institutional' ? 'shadow-2xl' : 'shadow-lg'}`}>
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800"
                  alt="Institutional Partnerships"
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Institutional Partnerships</h3>
                  <button className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                    READ MORE
                  </button>
                </div>
              </div>
              {/* Active Indicator Arrow */}
              {activePartnership === 'institutional' && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-primary drop-shadow-lg"></div>
                </div>
              )}
            </div>
          </section>

          {/* Corporate Partnerships Details */}
          {activePartnership === 'corporate' && (
            <div id="partnership-content">
              <section className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Corporate partnerships</h2>
                </div>
                
                <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-700">
                  <p>
                    For over two decades, Mahima Ministries has been dedicated to transforming lives through compassionate 
                    service and holistic development programs. We provide comprehensive support to vulnerable children, youth, 
                    and families across India, offering education, healthcare, livelihood training, and spiritual guidance. 
                    Our programs are designed to break the cycle of poverty and empower individuals to become self-reliant, 
                    contributing members of society. Through child sponsorship, youth empowerment initiatives, elderly care, 
                    and community development projects, we create lasting impact that extends far beyond immediate relief.
                  </p>
                  
                  <p>
                    To sustain and expand our mission of bringing hope and transformation to thousands of lives, we need 
                    committed partners who share our vision. Not just one-time contributions, but sustained partnerships that 
                    enable us to plan long-term interventions and create systemic change. There are countless communities still 
                    waiting for support, and millions of children and families who need access to quality education, healthcare, 
                    and opportunities. We invite you to partner with us at every step of this journey. Together, we can ensure 
                    that every child receives the care and opportunities they deserve, and every family finds hope for a better future.
                  </p>
                </div>
              </section>

              {/* Ways to Partner */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-1.5 w-16 bg-primary rounded-full"></span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Ways to partner with us</h2>
                </div>            <div className="space-y-4">
                {/* Grant Funding */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('grant')}
                    className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors rounded-lg px-2"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">Grant Funding</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary transition-transform ${openSection === 'grant' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSection === 'grant' && (
                    <div className="pb-4 text-gray-700 leading-relaxed">
                      <p>
                        Support Mahima Ministries through financial donations under your CSR objectives to help us deliver 
                        life-changing programs for underprivileged communities across India. With over 20 years of grassroots 
                        experience, we implement holistic interventions in Child Education & Sponsorship, Youth Empowerment & 
                        Skill Development, Healthcare & Nutrition, Elderly Care, Women's Empowerment, Community Development, 
                        Livelihood Training, Emergency Relief, and Spiritual Guidance. Your partnership enables us to reach 
                        more children, families, and communities with sustainable solutions that create lasting transformation.
                      </p>
                    </div>
                  )}
                </div>

                {/* Employee Engagement */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('employee')}
                    className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors rounded-lg px-2"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">Employee Engagement</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary transition-transform ${openSection === 'employee' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSection === 'employee' && (
                    <div className="pb-4 text-gray-700 leading-relaxed">
                      <p>
                        Partner with Mahima Ministries to create meaningful employee engagement and volunteering opportunities. 
                        Your team can participate in field visits, mentorship programs, skill-sharing workshops, or community 
                        service activities. These experiences not only benefit our beneficiaries but also enhance team bonding, 
                        boost employee morale, and create a culture of social responsibility within your organization.
                      </p>
                    </div>
                  )}
                </div>

                {/* Payroll Giving */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('payroll')}
                    className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors rounded-lg px-2"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">Payroll Giving</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary transition-transform ${openSection === 'payroll' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSection === 'payroll' && (
                    <div className="pb-4 text-gray-700 leading-relaxed">
                      <p>
                        Enable your employees to make a difference through convenient payroll deductions. A small, regular 
                        contribution from willing employees can be directed to Mahima Ministries, with or without matching 
                        contributions from your company. This creates a steady stream of support that allows us to plan and 
                        implement long-term programs with confidence.
                      </p>
                    </div>
                  )}
                </div>

                {/* Cause Related Marketing */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('marketing')}
                    className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors rounded-lg px-2"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">Cause Related Marketing</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary transition-transform ${openSection === 'marketing' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSection === 'marketing' && (
                    <div className="pb-4 text-gray-700 leading-relaxed">
                      <p>
                        Align your brand with social impact by donating a portion of your product sales or service revenues to 
                        Mahima Ministries. Whether it's a percentage from specific products, special edition launches, or retail 
                        partnerships where customers can contribute at checkout, this creates a win-win situation that benefits 
                        your brand image while supporting our mission to transform lives.
                      </p>
                    </div>
                  )}
                </div>

                {/* Technology Integrated Partnerships */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('technology')}
                    className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors rounded-lg px-2"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">Technology Integrated Partnerships</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary transition-transform ${openSection === 'technology' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSection === 'technology' && (
                    <div className="pb-4 text-gray-700 leading-relaxed">
                      <p>
                        Leverage your technical expertise to create innovative solutions that amplify our impact. From developing 
                        educational apps and e-learning platforms to implementing management systems, digital literacy programs, 
                        or data analytics tools, your technology can help us serve more beneficiaries more effectively and scale 
                        our programs to reach underserved communities.
                      </p>
                    </div>
                  )}
                </div>

                {/* Events */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('events')}
                    className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors rounded-lg px-2"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">Events</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary transition-transform ${openSection === 'events' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSection === 'events' && (
                    <div className="pb-4 text-gray-700 leading-relaxed">
                      <p>
                        Partner with us to organize fundraising events such as charity runs, cultural programs, auctions, or 
                        corporate galas. Alternatively, donate proceeds from your corporate events, product launches, or 
                        celebrations to support our programs. These events not only raise funds but also create awareness about 
                        our mission and inspire others to join the cause.
                      </p>
                    </div>
                  )}
                </div>

                {/* Emergency Support */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('emergency')}
                    className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors rounded-lg px-2"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">Emergency Support</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary transition-transform ${openSection === 'emergency' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSection === 'emergency' && (
                    <div className="pb-4 text-gray-700 leading-relaxed">
                      <p>
                        Stand with us during times of crisis. Support our emergency response initiatives during natural disasters, 
                        pandemics, floods, earthquakes, or other emergencies affecting vulnerable children and families. Your rapid 
                        response partnership helps us provide immediate relief including food, shelter, medical aid, and psychosocial 
                        support to those in urgent need.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

              {/* Testimonials Section */}
              <section className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="h-1.5 w-16 bg-primary rounded-full"></span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What our partners say about us</h2>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Testimonial 1 */}
                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border-l-4 border-primary">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Corporate Partner</h3>
                        <p className="text-sm text-primary">Partner Company Name</p>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Our partnership with Mahima Ministries has been transformative, not just for the communities they serve, 
                        but for our organization as well. Their transparent operations, measurable impact, and genuine commitment 
                        to empowering the underprivileged align perfectly with our CSR objectives. Together, we are making a real 
                        difference in the lives of children and families across India.
                      </p>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border-l-4 border-primary">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Corporate Partner</h3>
                        <p className="text-sm text-primary">Partner Company Name</p>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Working with Mahima Ministries has shown us the true meaning of sustainable development. Their holistic 
                        approach to community transformation, combined with their grassroots presence and dedicated team, ensures 
                        that every contribution creates lasting impact. We are proud to support their mission of bringing hope and 
                        opportunity to those who need it most.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Form Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-1.5 w-16 bg-primary rounded-full"></span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">For More Information</h2>
                </div>
                
                <p className="text-base md:text-lg text-gray-700 mb-4">
                  Please help us with the below details or contact us:
                </p>
                
                <div className="bg-orange-50 rounded-lg p-4 mb-6 space-y-2">
                  <p className="text-sm md:text-base">
                    📧 <strong>Email:</strong>{' '}
                    <a href="mailto:mahimaministriesindia@gmail.com" className="text-primary hover:text-orange-600 hover:underline font-semibold transition-colors">
                      mahimaministriesindia@gmail.com
                    </a>
                    {' ; '}
                    <a href="mailto:rdmaharaju@gmail.com" className="text-primary hover:text-orange-600 hover:underline font-semibold transition-colors">
                      rdmaharaju@gmail.com
                    </a>
                  </p>
                  <p className="text-sm md:text-base">
                    📞 <strong>Phone:</strong>{' '}
                    <a href="tel:+919246502264" className="text-primary hover:underline">+91 9246502264</a>
                    {' | '}
                    <a href="tel:+919246272675" className="text-primary hover:underline">+91 9246272675</a>
                    {' | '}
                    <a href="tel:04023032675" className="text-primary hover:underline">040-23032675</a>
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 md:p-8 lg:p-10 shadow-sm border border-gray-200">
                  <form className="space-y-6" onSubmit={(e) => handleFormSubmit(e, 'CORPORATE')}>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Your Name */}
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={corporateFormData.name}
                          onChange={(e) => setCorporateFormData({...corporateFormData, name: e.target.value})}
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
                          value={corporateFormData.email}
                          onChange={(e) => setCorporateFormData({...corporateFormData, email: e.target.value})}
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
                            value={corporateFormData.countryCode}
                            onChange={(e) => {
                              setCorporateFormData({...corporateFormData, countryCode: e.target.value});
                              setCorporatePhoneError('');
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
                            value={corporateFormData.phone}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              setCorporateFormData({...corporateFormData, phone: value});
                              setCorporatePhoneError('');
                            }}
                            className={`flex-1 px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all ${
                              corporatePhoneError ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        {corporatePhoneError && (
                          <p className="text-red-500 text-sm mt-1">{corporatePhoneError}</p>
                        )}
                      </div>

                      {/* WhatsApp Number (Optional) */}
                      <div>
                        <div className="flex gap-2">
                          <div className="w-32 flex items-center justify-center px-2 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 text-sm font-medium">
                            {countries.find(c => c.dialCode === corporateFormData.countryCode)?.flag} {corporateFormData.countryCode}
                          </div>
                          <input
                            type="tel"
                            placeholder="WhatsApp (Optional)"
                            value={corporateFormData.whatsapp}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              setCorporateFormData({...corporateFormData, whatsapp: value});
                              setCorporateWhatsappError('');
                            }}
                            className={`flex-1 px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all ${
                              corporateWhatsappError ? 'border-red-500' : 'border-gray-300'
                            }`}
                            disabled={isSubmitting}
                          />
                        </div>
                        {corporateWhatsappError && (
                          <p className="text-red-500 text-sm mt-1">{corporateWhatsappError}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Company Name */}
                      <div>
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={corporateFormData.company}
                          onChange={(e) => setCorporateFormData({...corporateFormData, company: e.target.value})}
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
                        value={corporateFormData.address}
                        onChange={(e) => setCorporateFormData({...corporateFormData, address: e.target.value})}
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
              </section>
            </div>
          )}

          {/* Institutional Partnerships Details */}
          {activePartnership === 'institutional' && (
            <div id="partnership-content">
              <section className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Institutional partnerships</h2>
                </div>
                
                <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-700">
                  <p>
                    India's institutional partnerships help create sustainable, sustainable and large-scale social impacts and catalyze 
                    positive outcomes in children, youth, women and communities. Concurrently at Mahima Ministries at a micro level, 
                    these concerted efforts have resulted in creating <span className="italic font-semibold">a loving Home for every child</span> since 
                    1963. The evidence-backed impacts from our <span className="font-semibold">31 project locations in India across 22 states and UTs</span> provide 
                    key inputs to shape, influence and fuel policy action policy and advocacy efforts focused around children, youth, 
                    mothers & caregivers and other vulnerable sections of our society.
                  </p>
                  
                  <p>
                    Mahima Ministries India seeks to strengthen its Basket of Care Solutions by offering targeted interventions through 
                    its Multilateral, Government, Corporate and Individual partnerships. These partnerships aim to create sustainable 
                    outcomes in our flagship programmes, such as, in <span className="font-semibold">Family Like Care, Family Strengthening, Education 
                    & Youth Skilling, Kinship Care, Foster Care, Special Needs Childcare, Short Stay Home and Emergency Childcare</span>.
                  </p>
                  
                  <p>
                    Since 1963, Mahima Ministries India has proved to be a <span className="font-semibold">trusted and committed partner of institutions</span> that 
                    work in the areas of <span className="font-semibold">childcare, education, skilling and family welfare</span>. It has provided safe 
                    homes and families to orphans and those at risk of abandonment by nurturing, mentoring and skilling them to become 
                    valuable members of our society.
                  </p>
                </div>
              </section>

              {/* Why Partner Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-1.5 w-16 bg-primary rounded-full"></span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why should you partner with us</h2>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  All our initiatives and activities are being supported by our development partners
                </p>
                
                <div className="space-y-3 text-base md:text-lg leading-relaxed text-gray-700">
                  <div className="flex gap-3">
                    <span className="text-gray-400">—</span>
                    <div>
                      <span className="font-semibold">Family Strengthening</span> – Helping vulnerable families to become self-reliant 
                      to afford quality care for their children.
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="text-gray-400">—</span>
                    <div>
                      <span className="font-semibold">Education & Youth Skilling</span> – Facilitating parental care among next of 
                      kin families.
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="text-gray-400">—</span>
                    <div>
                      <span className="font-semibold">Kinship Care</span> – Facilitating parental care among next of kin families.
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="text-gray-400">—</span>
                    <div>
                      <span className="font-semibold">Family Like Care</span> – Committed to provide a caring family to every child 
                      without parental care.
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="text-gray-400">—</span>
                    <div>
                      <span className="font-semibold">Short Stay Home</span> – Creating safe spaces for children in distress.
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="text-gray-400">—</span>
                    <div>
                      <span className="font-semibold">Special Needs Childcare</span> – Focusing on specialized long-term care for 
                      differently abled children without parental care.
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="text-gray-400">—</span>
                    <div>
                      <span className="font-semibold">Foster Care</span> – Making way for quality childcare in certified foster families.
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="text-gray-400">—</span>
                    <div>
                      <span className="font-semibold">Emergency Childcare</span> – Providing relief and rehabilitation to families 
                      affected by calamities/ emergencies.
                    </div>
                  </div>
                </div>
                
                <p className="text-base md:text-lg leading-relaxed text-gray-700 pt-4">
                  Despite the ongoing pandemic, the Indian philanthropy continues to adapt and evolve. Whilst, the challenges and 
                  difficulties faced by the most disadvantaged communities including vulnerable children and youth continue to exacerbate 
                  and multiply. Therefore, all key stakeholders, intermediaries will have to make conscious and collaborative efforts 
                  toward fulfilling Mahima Ministries India's Vision to ensure that every <span className="font-semibold">child belongs to a 
                  Family; every child grows with Love, Respect and Security;</span> and uphold its Mission to <span className="font-semibold italic">equip 
                  children to shape their own futures, build families for children in need and strengthen communities</span>.
                </p>
              </section>

              {/* Key Partners Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-1.5 w-16 bg-primary rounded-full"></span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Key institutional partners include</h2>
                </div>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                  Since 2005, Mahima Ministries India has worked with several international organizations and multilateral agencies 
                  like the United Nations, Government bodies and Embassies, local and international philanthropic organizations, 
                  charities, private foundations, and High-Net-worth Individuals to help find a loving home for every child.
                </p>
              </section>

              {/* Contact Form Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-1.5 w-16 bg-primary rounded-full"></span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">For More Information</h2>
                </div>
                
                <p className="text-base md:text-lg text-gray-700 mb-4">
                  Please help us with the below details or contact us:
                </p>
                
                <div className="bg-orange-50 rounded-lg p-4 mb-6 space-y-2">
                  <p className="text-sm md:text-base">
                    📧 <strong>Email:</strong>{' '}
                    <a href="mailto:mahimaministriesindia@gmail.com" className="text-primary hover:text-orange-600 hover:underline font-semibold transition-colors">
                      mahimaministriesindia@gmail.com
                    </a>
                    {' ; '}
                    <a href="mailto:rdmaharaju@gmail.com" className="text-primary hover:text-orange-600 hover:underline font-semibold transition-colors">
                      rdmaharaju@gmail.com
                    </a>
                  </p>
                  <p className="text-sm md:text-base">
                    📞 <strong>Phone:</strong>{' '}
                    <a href="tel:+919246502264" className="text-primary hover:underline">+91 9246502264</a>
                    {' | '}
                    <a href="tel:+919246272675" className="text-primary hover:underline">+91 9246272675</a>
                    {' | '}
                    <a href="tel:04023032675" className="text-primary hover:underline">040-23032675</a>
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 md:p-8 lg:p-10 shadow-sm border border-gray-200">
                  <form className="space-y-6" onSubmit={(e) => handleFormSubmit(e, 'INSTITUTIONAL')}>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Your Name */}
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={institutionalFormData.name}
                          onChange={(e) => setInstitutionalFormData({...institutionalFormData, name: e.target.value})}
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
                          value={institutionalFormData.email}
                          onChange={(e) => setInstitutionalFormData({...institutionalFormData, email: e.target.value})}
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
                            value={institutionalFormData.countryCode}
                            onChange={(e) => {
                              setInstitutionalFormData({...institutionalFormData, countryCode: e.target.value});
                              setInstitutionalPhoneError('');
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
                            value={institutionalFormData.phone}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              setInstitutionalFormData({...institutionalFormData, phone: value});
                              setInstitutionalPhoneError('');
                            }}
                            className={`flex-1 px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all ${
                              institutionalPhoneError ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        {institutionalPhoneError && (
                          <p className="text-red-500 text-sm mt-1">{institutionalPhoneError}</p>
                        )}
                      </div>

                      {/* WhatsApp Number (Optional) */}
                      <div>
                        <div className="flex gap-2">
                          <div className="w-32 flex items-center justify-center px-2 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 text-sm font-medium">
                            {countries.find(c => c.dialCode === institutionalFormData.countryCode)?.flag} {institutionalFormData.countryCode}
                          </div>
                          <input
                            type="tel"
                            placeholder="WhatsApp (Optional)"
                            value={institutionalFormData.whatsapp}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              setInstitutionalFormData({...institutionalFormData, whatsapp: value});
                              setInstitutionalWhatsappError('');
                            }}
                            className={`flex-1 px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all ${
                              institutionalWhatsappError ? 'border-red-500' : 'border-gray-300'
                            }`}
                            disabled={isSubmitting}
                          />
                        </div>
                        {institutionalWhatsappError && (
                          <p className="text-red-500 text-sm mt-1">{institutionalWhatsappError}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Company Name */}
                      <div>
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={institutionalFormData.company}
                          onChange={(e) => setInstitutionalFormData({...institutionalFormData, company: e.target.value})}
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
                        value={institutionalFormData.address}
                        onChange={(e) => setInstitutionalFormData({...institutionalFormData, address: e.target.value})}
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
              </section>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
