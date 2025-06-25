'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Save, X, Search, Filter } from 'lucide-react';

const PartnersAdminPage = () => {
  // Initial data - same structure as your original page
  const initialPartnersData = {
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
      }
    ]
  };

  const [partnersData, setPartnersData] = useState(initialPartnersData);
  const [activeTab, setActiveTab] = useState('knowledge');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  type Partner = {
    id: number;
    name: string;
    logo: string;
    description: string;
    established: string;
    location: string;
    website: string;
    email: string;
    phone: string;
    specialties: string[];
  };
  
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextId, setNextId] = useState(20); // Starting from 20 to avoid conflicts

  const [formData, setFormData] = useState<Omit<Partner, 'id'>>({
    name: '',
    logo: '',
    description: '',
    established: '',
    location: '',
    website: '',
    email: '',
    phone: '',
    specialties: []
  });

  const [newSpecialty, setNewSpecialty] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      logo: '',
      description: '',
      established: '',
      location: '',
      website: '',
      email: '',
      phone: '',
      specialties: []
    });
    setNewSpecialty('');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, newSpecialty.trim()]
      });
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (specialty) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter(s => s !== specialty)
    });
  };

  const openModal = (mode: string, partner: Partner | null = null) => {
    setModalMode(mode);
    setSelectedPartner(partner);
    
    if (partner) {
      setFormData({
        name: partner.name,
        logo: partner.logo,
        description: partner.description,
        established: partner.established,
        location: partner.location,
        website: partner.website,
        email: partner.email,
        phone: partner.phone,
        specialties: [...partner.specialties]
      });
    } else {
      resetForm();
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPartner(null);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const partnerData = {
      ...formData,
      id: modalMode === 'add' ? nextId : selectedPartner.id
    };

    if (modalMode === 'add') {
      setPartnersData({
        ...partnersData,
        [activeTab]: [...partnersData[activeTab], partnerData]
      });
      setNextId(nextId + 1);
    } else if (modalMode === 'edit') {
      setPartnersData({
        ...partnersData,
        [activeTab]: partnersData[activeTab].map(partner =>
          partner.id === selectedPartner.id ? partnerData : partner
        )
      });
    }
    
    closeModal();
  };

  const handleDelete = (partnerId) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      setPartnersData({
        ...partnersData,
        [activeTab]: partnersData[activeTab].filter(partner => partner.id !== partnerId)
      });
    }
  };

  const filteredPartners = partnersData[activeTab].filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTabColor = (tab) => {
    const colors = {
      knowledge: 'bg-blue-500',
      hospital: 'bg-green-500',
      finance: 'bg-purple-500'
    };
    return colors[tab] || 'bg-gray-500';
  };

  const getTabLabel = (tab) => {
    const labels = {
      knowledge: 'Knowledge Partners',
      hospital: 'Hospital Partners',
      finance: 'Finance Partners'
    };
    return labels[tab];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Partners Administration</h1>
          <p className="text-gray-600 mt-1">Manage your knowledge, hospital, and finance partners</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {Object.keys(partnersData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? `${getTabColor(tab)} text-white`
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {getTabLabel(tab)} ({partnersData[tab].length})
              </button>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={() => openModal('add')}
            className={`${getTabColor(activeTab)} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2`}
          >
            <Plus className="w-4 h-4" />
            <span>Add {getTabLabel(activeTab).split(' ')[0]} Partner</span>
          </button>
        </div>

        {/* Partners Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Established</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialties</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-10 h-10 rounded-lg object-contain mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{partner.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.established}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{partner.email}</div>
                      <div className="text-sm text-gray-500">{partner.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {partner.specialties.slice(0, 2).map((specialty, index) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                        {partner.specialties.length > 2 && (
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            +{partner.specialties.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openModal('view', partner)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal('edit', partner)}
                          className="text-yellow-600 hover:text-yellow-900 p-1"
                          title="Edit Partner"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(partner.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete Partner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPartners.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No partners found</div>
              <div className="text-gray-400 text-sm">
                {searchTerm ? 'Try adjusting your search terms' : `Add your first ${getTabLabel(activeTab).toLowerCase()}`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalMode === 'add' && `Add New ${getTabLabel(activeTab).split(' ')[0]} Partner`}
                  {modalMode === 'edit' && `Edit ${selectedPartner?.name}`}
                  {modalMode === 'view' && `${selectedPartner?.name} Details`}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalMode === 'view' ? (
                /* View Mode */
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={selectedPartner?.logo}
                      alt={selectedPartner?.name}
                      className="w-16 h-16 rounded-lg object-contain"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{selectedPartner?.name}</h4>
                      <p className="text-gray-600">Established: {selectedPartner?.established}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Description</h5>
                    <p className="text-gray-600">{selectedPartner?.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Location</h5>
                      <p className="text-gray-600">{selectedPartner?.location}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Website</h5>
                      <a href={selectedPartner?.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        {selectedPartner?.website}
                      </a>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Email</h5>
                      <p className="text-gray-600">{selectedPartner?.email}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Phone</h5>
                      <p className="text-gray-600">{selectedPartner?.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Specialties</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner?.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Add/Edit Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                      <input
                        type="text"
                        name="established"
                        value={formData.established}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                    <input
                      type="url"
                      name="logo"
                      value={formData.logo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={newSpecialty}
                        onChange={(e) => setNewSpecialty(e.target.value)}
                        placeholder="Add specialty"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                      />
                      <button
                        type="button"
                        onClick={addSpecialty}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                        >
                          <span>{specialty}</span>
                          <button
                            type="button"
                            onClick={() => removeSpecialty(specialty)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`px-4 py-2 ${getTabColor(activeTab)} text-white rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2`}
                    >
                      <Save className="w-4 h-4" />
                      <span>{modalMode === 'add' ? 'Add Partner' : 'Save Changes'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersAdminPage;