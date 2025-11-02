import { Users, Heart, HandHeart, Sparkles } from "lucide-react";

export function PhilanthropyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-secondary-solid text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Philanthropy at Mahima Ministries</h1>
            <p className="mt-2 text-base sm:text-lg opacity-90">Empowering communities through compassionate giving</p>
          </div>
          {/* Donation Icon - larger size to fit green bar */}
          <div className="flex items-center justify-center flex-shrink-0">
            <img 
              src="/components/donation.png"
              alt="Donation Icon"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Introduction Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-1.5 w-16 bg-primary rounded-full"></span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">The Spirit of Giving</h2>
            </div>
            
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-700">
              <p>
                Philanthropy in India has deep roots in our culture and traditions, embodying the timeless values 
                of compassion, generosity, and service to humanity. At Mahima Ministries, we honor this heritage 
                by creating meaningful opportunities for individuals, families, and foundations to make a lasting 
                difference in the lives of those who need it most.
              </p>
              
              <p>
                For over 20 years, we have witnessed the transformative power of thoughtful giving. Whether through 
                supporting a child's education, providing healthcare to the elderly, or empowering youth with 
                livelihood skills, every act of philanthropy creates ripples of positive change that extend far 
                beyond the initial gift. We work with philanthropists who seek to invest not just their resources, 
                but their hearts and vision in building a more equitable and compassionate society.
              </p>

              <p>
                Our approach to philanthropy is rooted in transparency, accountability, and impact. We ensure that 
                every contribution is utilized efficiently and effectively, with 98% of donations directly funding 
                our programs. Through regular updates and impact reports, we keep our donors connected to the 
                lives they touch and the communities they help transform.
              </p>
            </div>
          </section>

          {/* Philanthropic Values Section */}
          <section className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-1.5 w-16 bg-primary rounded-full"></span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Philanthropic Principles</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Compassionate Impact</h3>
                  <p className="text-gray-600">
                    Every donation is channeled into programs that directly improve lives—from child welfare 
                    and education to elderly care and youth empowerment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community-Centered</h3>
                  <p className="text-gray-600">
                    We work directly with communities to understand their needs and design interventions 
                    that create sustainable, long-lasting change from within.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Transparent Operations</h3>
                  <p className="text-gray-600">
                    We maintain complete transparency with detailed impact reports, financial accountability, 
                    and open communication with all our donors.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <HandHeart className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Holistic Approach</h3>
                  <p className="text-gray-600">
                    We address root causes, not just symptoms, by providing comprehensive support that 
                    helps families and individuals achieve true self-reliance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Ways to Give Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-1.5 w-16 bg-primary rounded-full"></span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Ways You Can Give</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="text-xl font-semibold mb-3 text-primary">Individual Giving</h3>
                <p className="text-gray-600 mb-4">
                  Make a direct impact through personal donations that support our comprehensive programs 
                  across child welfare, education, healthcare, and community development.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• One-time donations</li>
                  <li>• Monthly giving programs</li>
                  <li>• Legacy gifts</li>
                  <li>• In-kind contributions</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="text-xl font-semibold mb-3 text-primary">Family Foundations</h3>
                <p className="text-gray-600 mb-4">
                  High-net-worth families can create lasting legacies through structured philanthropic 
                  initiatives aligned with their values and vision for social change.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Customized programs</li>
                  <li>• Multi-year commitments</li>
                  <li>• Impact measurement</li>
                  <li>• Family engagement</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="text-xl font-semibold mb-3 text-primary">Program Sponsorship</h3>
                <p className="text-gray-600 mb-4">
                  Fund specific initiatives that resonate with your passion—from sponsoring a child's 
                  education to supporting an entire community development project.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Child sponsorship</li>
                  <li>• Education programs</li>
                  <li>• Healthcare camps</li>
                  <li>• Skill training centers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative overflow-hidden bg-white border-2 border-gray-200 rounded-2xl shadow-lg mt-16">
            {/* Decorative gradient bar at top */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-orange-500 to-primary"></div>
            
            <div className="relative pt-12 md:pt-16 lg:pt-20 px-8 md:px-12 lg:px-16 pb-8 md:pb-12 lg:pb-16">
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                  Begin Your Philanthropic Journey
                </h2>
                <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Your generosity has the power to transform lives. Whether you're an individual donor or 
                  represent a family foundation, we invite you to join us in creating lasting change and 
                  building hope for vulnerable communities across India.
                </p>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a
                  href="/donate"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 font-semibold text-base md:text-lg shadow-md hover:shadow-xl hover:-translate-y-1 transform w-full sm:w-auto justify-center"
                >
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Make a Donation
                </a>
                <a
                  href="mailto:contact@mahimaministries.org"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-full hover:border-primary hover:bg-gray-50 transition-all duration-300 font-semibold text-base md:text-lg hover:-translate-y-1 transform w-full sm:w-auto justify-center"
                >
                  <Users className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  Contact Us
                </a>
              </div>
              
              {/* Contact Info */}
              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  Have questions about giving?
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full">
                  <span className="text-sm text-gray-700">Email us at:</span>
                  <a 
                    href="mailto:mahimaministriesindia@gmail.com" 
                    className="text-sm md:text-base font-semibold text-primary hover:underline transition-all"
                  >
                    mahimaministriesindia@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
