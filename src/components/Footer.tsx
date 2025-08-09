import logo from "../assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="h-[198px] bg-[#074369] text-white text-xs">
      <div className="w-full max-w-[1200px] mx-auto px-4 pt-10">
        <div className="flex justify-between items-start mb-[32px]">
          <div className="flex items-center">
            <img src={logo} alt="DBHDS Logo" className="w-[136.87px] h-[40px] mr-[80px]" />
          </div>
          <div className="flex flex-wrap flex-grow gap-x-[40px]">
            <div className="w-[152px]">
              <p className="font-bold text-[#E8B900] mb-0.5">Central Office</p>
              <p>1220 Bank Street</p>
              <p>Richmond, Virginia 23219</p>
            </div>
            <div className="w-[152px]">
              <p className="font-bold text-[#E8B900] mb-0.5">Mailing Address</p>
              <p>P.O. Box 1797</p>
              <p>Richmond, VA</p>
              <p>23219-1797</p>
            </div>
            <div className="flex flex-wrap flex-col w-[152px]">
              <div className="leading-4 mb-0.5">
                <span className="font-bold">Phone: </span>
                <span>(804) 786-3921</span>
              </div>
              <div className="leading-4 mb-0.5">
                <span className="font-bold">Voice TDD: </span>
                <span>(804) 371-8977</span>
              </div>
              <div className="leading-4">
                <span className="font-bold">Fax: </span>
                <span>(804) 371-6638</span>
              </div>
            </div>
            <div className="w-[152px]">
              <p className="font-bold text-[#E8B900] mb-0.5">Policies</p>
              <p className="text-white">FOIA Policy</p>
              <p className="text-white">HIPAA Policy</p>
              <p className="text-white">Web-Policy</p>
            </div>
          </div>
        </div>
        <div className="text-center text-xs mb-10">
          <p>© {new Date().getFullYear()} Virginia Department of Behavioral Health and Developmental Services</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
