'use client'
import React, { useState } from 'react';
import { X, ExternalLink, MapPin, Phone, Mail, Globe } from 'lucide-react';

const PartnersPage = () => {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [formData, setFormData] = useState({
    hospitalName: '',
    contactName: '',
    email: '',
    phone: '',
    designation: '',
    hospitalBedCount: '',
    purposeForCollaboration: ''
  });

  // Sample partner data - replace with your actual data
  const partnersData = {
    knowledge: [
      {
        id: 1,
        name: "NSDC",
        logo: "https://via.placeholder.com/120x80/4A90E2/FFFFFF?text=NSDC",
        description: "National Skill Development Corporation (NSDC) is a premier institution working towards skill development and vocational training across India.",
        established: "2009",
        location: "New Delhi, India",
        website: "https://nsdcindia.org",
        email: "info@nsdcindia.org",
        phone: "+91-11-4141-4141",
        specialties: ["Skill Development", "Vocational Training", "Certification Programs", "Industry Partnerships"]
      },
      {
        id: 2,
        name: "XLRI",
        logo: "https://via.placeholder.com/120x80/E74C3C/FFFFFF?text=XLRI",
        description: "Xavier Labour Relations Institute is a premier management institute in India, known for its excellence in management education and research.",
        established: "1949",
        location: "Jamshedpur, India",
        website: "https://xlri.ac.in",
        email: "info@xlri.ac.in",
        phone: "+91-657-398-3000",
        specialties: ["Management Education", "HR Programs", "Executive Education", "Research"]
      },
      {
        id: 3,
        name: "NEMI",
        logo: "https://via.placeholder.com/120x80/9B59B6/FFFFFF?text=NEMI",
        description: "National Education Management Institute focuses on educational excellence and innovative learning methodologies.",
        established: "2005",
        location: "Mumbai, India",
        website: "https://nemi.edu.in",
        email: "contact@nemi.edu.in",
        phone: "+91-22-2020-3000",
        specialties: ["Educational Management", "Training Programs", "Certification", "Consulting"]
      },
      {
        id: 4,
        name: "IIT Indore",
        logo: "https://via.placeholder.com/120x80/F39C12/FFFFFF?text=IIT+Indore",
        description: "Indian Institute of Technology Indore is a premier engineering and technology institute known for innovation and research excellence.",
        established: "2009",
        location: "Indore, India",
        website: "https://iiti.ac.in",
        email: "info@iiti.ac.in",
        phone: "+91-731-660-3000",
        specialties: ["Engineering", "Technology", "Research", "Innovation"]
      }
    ],
    hospital: [
      {
        id: 5,
        name: "Apollo Hospitals",
        logo: "https://via.placeholder.com/120x80/27AE60/FFFFFF?text=Apollo",
        description: "Apollo Hospitals is one of India's leading healthcare providers, offering comprehensive medical services and advanced treatments.",
        established: "1983",
        location: "Chennai, India",
        website: "https://apollohospitals.com",
        email: "info@apollohospitals.com",
        phone: "+91-44-2829-3333",
        specialties: ["Cardiology", "Oncology", "Neurology", "Organ Transplant", "Emergency Care"]
      },
      {
        id: 6,
        name: "KIMS Hospital",
        logo: "https://via.placeholder.com/120x80/E67E22/FFFFFF?text=KIMS",
        description: "KIMS Hospital is a multi-specialty healthcare institution providing quality medical care with state-of-the-art facilities.",
        established: "2000",
        location: "Hyderabad, India",
        website: "https://kimshospitals.com",
        email: "info@kimshospitals.com",
        phone: "+91-40-4020-2020",
        specialties: ["Multi-specialty Care", "Critical Care", "Surgical Excellence", "Diagnostic Services"]
      },
      {
        id: 7,
        name: "Fortis Healthcare",
        logo: "https://via.placeholder.com/120x80/8E44AD/FFFFFF?text=Fortis",
        description: "Fortis Healthcare is a leading integrated healthcare delivery service provider in India with a network of hospitals across the country.",
        established: "2001",
        location: "Gurugram, India",
        website: "https://fortishealthcare.com",
        email: "info@fortishealthcare.com",
        phone: "+91-124-492-2222",
        specialties: ["Cardiac Sciences", "Neurosciences", "Orthopedics", "Oncology", "Renal Sciences"]
      },
      {
        id: 8,
        name: "Max Healthcare",
        logo: "https://via.placeholder.com/120x80/3498DB/FFFFFF?text=Max",
        description: "Max Healthcare is one of India's leading private healthcare providers known for clinical excellence and patient care.",
        established: "2000",
        location: "New Delhi, India",
        website: "https://maxhealthcare.in",
        email: "info@maxhealthcare.in",
        phone: "+91-11-2651-5050",
        specialties: ["Heart & Vascular", "Cancer Care", "Neurosciences", "Orthopedics", "Mother & Child Care"]
      }
    ],
    finance: [
      {
        id: 9,
        name: "EduVanz",
        logo: "https://via.placeholder.com/120x80/16A085/FFFFFF?text=EduVanz",
        description: "EduVanz is a leading education financing platform that provides customized financial solutions for students pursuing higher education.",
        established: "2016",
        location: "Bangalore, India",
        website: "https://eduvanz.com",
        email: "support@eduvanz.com",
        phone: "+91-80-4718-2000",
        specialties: ["Education Loans", "Skill Development Financing", "Digital Lending", "Financial Technology"]
      },
      {
        id: 10,
        name: "FeeMonk",
        logo: "https://via.placeholder.com/120x80/E74C3C/FFFFFF?text=FeeMonk",
        description: "FeeMonk is a fintech platform that simplifies fee management and provides flexible payment solutions for educational institutions.",
        established: "2018",
        location: "Mumbai, India",
        website: "https://feemonk.com",
        email: "hello@feemonk.com",
        phone: "+91-22-4040-5000",
        specialties: ["Fee Management", "Payment Solutions", "Financial Planning", "Educational Fintech"]
      },
      {
        id: 11,
        name: "TGPL",
        logo: "https://via.placeholder.com/120x80/34495E/FFFFFF?text=TGPL",
        description: "TGPL (Technology Group Private Limited) provides comprehensive financial and technology solutions for various industries.",
        established: "2012",
        location: "Pune, India",
        website: "https://tgpl.in",
        email: "info@tgpl.in",
        phone: "+91-20-2020-3000",
        specialties: ["Financial Solutions", "Technology Services", "Business Consulting", "Digital Transformation"]
      }
    ]
  };

  const handlePartnerClick = (partner) => {
    setSelectedPartner(partner);
  };

  const handleClosePopup = () => {
    setSelectedPartner(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Partnership inquiry submitted successfully!');
  };

  const PartnerSection = ({ title, partners, bgColor = "bg-gray-50" }) => (
    <div className={`py-12 ${bgColor}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              onClick={() => handlePartnerClick(partner)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 flex items-center justify-center min-h-[120px]"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Partners</h1>
          <p className="text-lg leading-relaxed">
            Our programs are strategically crafted to address and empower the unique needs within
            healthcare. Our hands-on approach empowers learners and hospitals to nurture a culture of
            continuous learning and professional growth to achieve medical excellence.
          </p>
        </div>
      </div>

      {/* Knowledge Partners */}
      <PartnerSection 
        title="Knowledge Partners" 
        partners={partnersData.knowledge}
        bgColor="bg-white"
      />

      {/* Hospital Partners */}
      <PartnerSection 
        title="Hospital Partners" 
        partners={partnersData.hospital}
        bgColor="bg-gray-50"
      />

      {/* Finance Partners */}
      <PartnerSection 
        title="Finance Partners" 
        partners={partnersData.finance}
        bgColor="bg-white"
      />

      {/* Become Our Partner Form */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Become Our Partner</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="hospitalName"
                placeholder="Hospital Name"
                value={formData.hospitalName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
                required
              />
              <input
                type="text"
                name="contactName"
                placeholder="Contact Name"
                value={formData.contactName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
                required
              />
            </div>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
              required
            />
            <div className="grid md:grid-cols-2 gap-6">
              <select
                name="hospitalBedCount"
                value={formData.hospitalBedCount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
                required
              >
                <option value="">Hospital Bed Count</option>
                <option value="1-50">1-50 beds</option>
                <option value="51-100">51-100 beds</option>
                <option value="101-250">101-250 beds</option>
                <option value="251-500">251-500 beds</option>
                <option value="500+">500+ beds</option>
              </select>
              <select
                name="purposeForCollaboration"
                value={formData.purposeForCollaboration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
                required
              >
                <option value="">Purpose for Collaboration</option>
                <option value="training">Staff Training Programs</option>
                <option value="technology">Technology Integration</option>
                <option value="research">Research Partnership</option>
                <option value="consulting">Healthcare Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      {/* Partner Details Popup */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedPartner.logo}
                    alt={selectedPartner.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedPartner.name}</h3>
                    <p className="text-gray-600">Established: {selectedPartner.established}</p>
                  </div>
                </div>
                <button
                  onClick={handleClosePopup}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">About</h4>
                <p className="text-gray-600 leading-relaxed">{selectedPartner.description}</p>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-gray-600">{selectedPartner.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-gray-600">{selectedPartner.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-gray-600">{selectedPartner.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe size={16} className="text-gray-500" />
                    <a
                      href={selectedPartner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <span>{selectedPartner.website}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <a
                  href={selectedPartner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Visit Website
                </a>
                <a
                  href={`mailto:${selectedPartner.email}`}
                  className="flex-1 bg-gray-600 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Contact Partner
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersPage;