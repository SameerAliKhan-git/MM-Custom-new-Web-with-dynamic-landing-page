// Partner logos data
const partners = [
  { name: "Verity Knowledge Solutions", logo: "https://verity.co.in/wp-content/uploads/2023/08/Verity-Logo-2.png" },
  { name: "Dell Technologies", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/450px-Dell_Logo.svg.png" },
  { name: "Franklin Templeton Investments", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Logo_Ben_Head.jpg/500px-Logo_Ben_Head.jpg" },
];

export function Partners() {

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="h-0.5 md:h-1 w-8 md:w-12 bg-primary rounded-full"></span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Our Partners
            </h2>
            <span className="h-0.5 md:h-1 w-8 md:w-12 bg-primary rounded-full"></span>
          </div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Together with our partners, we're creating lasting change in children's lives
          </p>
        </div>

        {/* Scrolling Logos Container */}
        <div className="logos-container">
          <style>{`
            @keyframes slides {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-100%);
              }
            }

            .logos-container {
              overflow: hidden;
              padding: 30px 0px;
              white-space: nowrap;
              position: relative;
            }

            .logos-container:before,
            .logos-container:after {
              position: absolute;
              top: 0;
              content: '';
              width: 250px;
              height: 100%;
              z-index: 2;
            }

            .logos-container:before {
              left: 0;
              background: linear-gradient(to left, rgba(255,255,255,0), rgb(255, 255, 255));
            }

            .logos-container:after {
              right: 0;
              background: linear-gradient(to right, rgba(255,255,255,0), rgb(255, 255, 255));
            }

            .logo-items {
              display: inline-block;
              animation: 25s slides infinite linear;
            }

            .logos-container:hover .logo-items {
              animation-play-state: paused;
            }

            .logo-items img {
              height: 100px;
              display: inline-block;
              margin: 0 40px;
            }

            @media (max-width: 768px) {
              .logo-items img {
                height: 60px;
                margin: 0 20px;
              }

              .logos-container:before,
              .logos-container:after {
                width: 50px;
              }

              .logos-container {
                padding: 20px 0px;
              }
            }

            @media (max-width: 480px) {
              .logo-items img {
                height: 50px;
                margin: 0 15px;
              }

              .logos-container:before,
              .logos-container:after {
                width: 30px;
              }
            }
          `}</style>
          
          <div className="logo-items">
            {partners.map((partner, index) => (
              <img
                key={`partner-1-${index}`}
                src={partner.logo}
                alt={partner.name}
              />
            ))}
          </div>
          
          <div className="logo-items">
            {partners.map((partner, index) => (
              <img
                key={`partner-2-${index}`}
                src={partner.logo}
                alt={partner.name}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 px-4">
            Interested in partnering with us?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold text-sm md:text-base"
          >
            Become a Partner
          </a>
        </div>
      </div>
    </section>
  );
}
