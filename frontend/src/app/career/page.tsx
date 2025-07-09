'use client'
import React, { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Users, Heart, Award, Star, ChevronRight, Filter, X, Briefcase, TrendingUp, Globe, Zap, Target, Shield } from 'lucide-react';

const CareerPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobListings = [
    {
      id: 1,
      title: 'Senior Medical Instructor',
      department: 'Education',
      location: 'Dubai, UAE',
      type: 'Full-time',
      salary: '$75,000 - $95,000',
      experience: '5+ years',
      posted: '2 days ago',
      featured: true,
      urgent: false,
      description: 'Lead medical education programs and mentor aspiring healthcare professionals. Develop curriculum and ensure high-quality training standards.',
      requirements: ['MD or equivalent medical degree', 'Teaching experience in medical field', 'Strong communication skills', 'Curriculum development experience'],
      benefits: ['Health insurance', 'Professional development', 'Flexible schedule', 'Research opportunities']
    },
    {
      id: 2,
      title: 'Clinical Skills Coordinator',
      department: 'Training',
      location: 'Mumbai, India',
      type: 'Full-time',
      salary: '$45,000 - $60,000',
      experience: '3+ years',
      posted: '1 week ago',
      featured: false,
      urgent: true,
      description: 'Coordinate clinical training programs and ensure students receive hands-on experience in real healthcare settings.',
      requirements: ['Healthcare background', 'Training coordination experience', 'Organizational skills', 'Medical knowledge'],
      benefits: ['Health insurance', 'Training allowance', 'Career growth', 'International exposure']
    },
    {
      id: 3,
      title: 'Student Affairs Manager',
      department: 'Administration',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      salary: '$55,000 - $70,000',
      experience: '4+ years',
      posted: '3 days ago',
      featured: true,
      urgent: false,
      description: 'Manage student services, support student success, and coordinate academic advising programs.',
      requirements: ['Education administration background', 'Student services experience', 'Leadership skills', 'Multilingual preferred'],
      benefits: ['Health insurance', 'Housing allowance', 'Professional development', 'Visa sponsorship']
    },
    {
      id: 4,
      title: 'Research Associate',
      department: 'Research',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '$40,000 - $55,000',
      experience: '2+ years',
      posted: '5 days ago',
      featured: false,
      urgent: false,
      description: 'Conduct medical research, analyze data, and contribute to evidence-based healthcare education improvements.',
      requirements: ['Research methodology knowledge', 'Data analysis skills', 'Publication experience', 'Statistical software proficiency'],
      benefits: ['Health insurance', 'Research funding', 'Conference attendance', 'Publication support']
    },
    {
      id: 5,
      title: 'Digital Learning Specialist',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time',
      salary: '$50,000 - $65,000',
      experience: '3+ years',
      posted: '1 day ago',
      featured: false,
      urgent: true,
      description: 'Develop and implement digital learning solutions, manage LMS platforms, and create interactive medical education content.',
      requirements: ['Educational technology experience', 'LMS administration', 'Content creation skills', 'Healthcare knowledge preferred'],
      benefits: ['Health insurance', 'Remote work', 'Tech allowance', 'Professional development']
    },
    {
      id: 6,
      title: 'International Admissions Counselor',
      department: 'Admissions',
      location: 'Dubai, UAE',
      type: 'Full-time',
      salary: '$45,000 - $60,000',
      experience: '2+ years',
      posted: '4 days ago',
      featured: true,
      urgent: false,
      description: 'Guide international students through the admissions process and provide counseling on academic programs.',
      requirements: ['Admissions counseling experience', 'International education knowledge', 'Communication skills', 'Multilingual abilities'],
      benefits: ['Health insurance', 'Travel opportunities', 'Commission structure', 'Cultural diversity']
    }
  ];

  const departments = ['All', 'Education', 'Training', 'Administration', 'Research', 'Technology', 'Admissions'];
  const locations = ['All', 'Dubai, UAE', 'Mumbai, India', 'Riyadh, Saudi Arabia', 'Bangalore, India', 'Remote'];

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || locationFilter === 'All' || job.location === locationFilter;
    const matchesDepartment = !departmentFilter || departmentFilter === 'All' || job.department === departmentFilter;
    
    return matchesSearch && matchesLocation && matchesDepartment;
  });

  const benefits = [
    { icon: Heart, title: 'Comprehensive Health Insurance', desc: 'Full medical, dental, and vision coverage for you and your family', color: 'from-pink-500 to-rose-500' },
    { icon: Award, title: 'Professional Development', desc: 'Continuous learning opportunities and certification programs', color: 'from-purple-500 to-indigo-500' },
    { icon: Users, title: 'Collaborative Environment', desc: 'Work with passionate healthcare professionals worldwide', color: 'from-blue-500 to-cyan-500' },
    { icon: TrendingUp, title: 'Career Growth', desc: 'Clear advancement paths and leadership opportunities', color: 'from-green-500 to-emerald-500' },
    { icon: Globe, title: 'Global Impact', desc: 'Make a difference in healthcare education worldwide', color: 'from-orange-500 to-red-500' },
    { icon: Shield, title: 'Job Security', desc: 'Stable employment with competitive benefits package', color: 'from-teal-500 to-blue-500' }
  ];

  const stats = [
    { number: '500+', label: 'Healthcare Professionals', icon: Users },
    { number: '15+', label: 'Countries', icon: Globe },
    { number: '50k+', label: 'Students Graduated', icon: Award },
    { number: '25+', label: 'Years Experience', icon: Star }
  ];

  const values = [
    { title: 'Excellence', desc: 'We strive for the highest standards in medical education', icon: Target, color: 'text-blue-600' },
    { title: 'Innovation', desc: 'Embracing new technologies and teaching methodologies', icon: Zap, color: 'text-purple-600' },
    { title: 'Compassion', desc: 'Caring for our students, staff, and communities', icon: Heart, color: 'text-pink-600' },
    { title: 'Integrity', desc: 'Maintaining ethical standards in all our practices', icon: Shield, color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Briefcase className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Join Our Mission</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Shape the Future of
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block">
                Healthcare Education
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join our mission to train the next generation of healthcare professionals. 
              Build a rewarding career while making a meaningful impact on global health.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <span className="flex items-center gap-2">
                  Explore Opportunities
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="group border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Our Culture
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-6 py-3 mb-6">
              <Star className="w-5 h-5" />
              <span className="font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Exceptional Benefits &
              <span className="text-blue-600"> Growth Opportunities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to creating an environment where talented professionals can thrive and make a difference.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 rounded-full px-6 py-3 mb-6">
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Our Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Drives Us
              <span className="text-purple-600"> Forward</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and shape our workplace culture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group text-center p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <value.icon className={`w-8 h-8 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 rounded-full px-6 py-3 mb-6">
              <Briefcase className="w-5 h-5" />
              <span className="font-semibold">Open Positions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Next Career
              <span className="text-green-600"> Adventure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exciting opportunities to advance your career in healthcare education.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your dream job..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg bg-white/80 backdrop-blur-sm"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-6 py-4 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all bg-white/80 backdrop-blur-sm"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-4 justify-center">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm"
              >
                <option value="">All Locations</option>
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm"
              >
                <option value="">All Departments</option>
                {departments.slice(1).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-gray-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg">Filters</h4>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    >
                      <option value="">All Locations</option>
                      {locations.slice(1).map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    >
                      <option value="">All Departments</option>
                      {departments.slice(1).map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Job Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <div key={job.id} className="group relative bg-white/90 backdrop-blur-sm border-2 border-gray-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                   onClick={() => setSelectedJob(job)}>
                
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Featured/Urgent Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {job.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Featured
                    </span>
                  )}
                  {job.urgent && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      Urgent
                    </span>
                  )}
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-6 text-gray-600 mb-4">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-green-500" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-2xl text-sm font-bold">
                      {job.department}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{job.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6 text-gray-600">
                      <span className="flex items-center gap-2 font-semibold">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        {job.salary}
                      </span>
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{job.experience}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Posted {job.posted}</span>
                    <button className="group/btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      <span className="flex items-center gap-2">
                        View Details
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Jobs Found</h3>
              <p className="text-gray-500 text-lg">Try adjusting your search or filters to find more opportunities.</p>
            </div>
          )}
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {selectedJob.featured && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </span>
                    )}
                    {selectedJob.urgent && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedJob.title}</h2>
                  <div className="flex items-center gap-6 text-gray-600">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-500" />
                      {selectedJob.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-500" />
                      {selectedJob.type}
                    </span>
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-2xl text-sm font-bold">
                      {selectedJob.department}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-4 bg-gray-50 rounded-lg px-4">
                <div>
                  <span className="text-sm text-gray-500">Salary Range</span>
                  <p className="font-semibold text-gray-900">{selectedJob.salary}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Experience</span>
                  <p className="font-semibold text-gray-900">{selectedJob.experience}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Apply Now
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Save Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the next step in your career and help us shape the future of healthcare education.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Submit Your Application
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold">Aster Health Academy</span>
              </div>
              <p className="text-gray-400">
                Leading healthcare education institution committed to excellence and innovation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Programs</a></li>
                <li><a href="#" className="hover:text-white">Admissions</a></li>
                <li><a href="#" className="hover:text-white">Research</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Student Portal</a></li>
                <li><a href="#" className="hover:text-white">Alumni</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Aster Health Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareerPage;