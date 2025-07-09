"use client";
import React, { useEffect, useState } from "react";
import { X, ArrowRight, Users, Target, BookOpen, Award } from "lucide-react";

const AboutPage = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await fetch("/data/leaders.json");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching course data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  const openLeaderModal = (leader) => {
    setSelectedLeader(leader);
  };

  const closeLeaderModal = () => {
    setSelectedLeader(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-teal-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        
        {/* Animated Medical Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-teal-300/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-300/15 rounded-full animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Turning talent into
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300 block">
                  greatness
                </span>
                <span className="text-3xl lg:text-4xl text-blue-200 block mt-2">
                  the Asterian Way
                </span>
              </h1>
              <p className="text-blue-100 text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
                Aster Health Academy transforms healthcare education through innovative digital learning, 
                expert-led programs, and industry-focused training that prepares the next generation of healthcare leaders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  Explore Programs <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Healthcare professionals collaborating"
                  className="rounded-3xl shadow-2xl w-full h-96 object-cover border-4 border-white/20"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-teal-400/30 to-blue-400/30 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">10,000+</h3>
              <p className="text-gray-600">Students Trained</p>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-teal-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-600">Expert Courses</p>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-teal-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">20+</h3>
              <p className="text-gray-600">Countries</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Medical education and technology"
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-6 shadow-xl">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Aster Health Academy</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Aster Health Academy (Unit of DM Med City Hospitals (India) Private Limited) is a modern healthcare ed-tech company focused on professional education for both clinical and non-clinical functions. Against the backdrop of a global healthcare brand, the Academy draws from the Aster resource pool for industry veterans and healthcare specialists.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                We aspire to be an industry disruptor that fundamentally aims to ensure an industry-first experience in online and blended learning. The Academy aims for transformation that changes lives, businesses, and nations through digital upskilling and collaboration.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700 font-medium">Industry Expertise</span>
                </div>
                <div className="flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-teal-700 font-medium">Global Recognition</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700 font-medium">Digital Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Vision</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                To establish a globally recognized corporate academic institution, focused on meeting internal and external talent demands in Healthcare, leveraging in-house capabilities and external resources for developing the future generation of leaders.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-2xl border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-700">
                  To be the preferred education provider for healthcare-focused professionals across the world, combining cutting-edge technology with expert knowledge.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Healthcare vision and innovation"
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Academy Features */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Preparing for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300">Future</span>
              </h2>
              <p className="text-blue-200 text-sm mb-8 uppercase tracking-wide font-semibold">
                Advanced Healthcare Education
              </p>

              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Healthcare systems today are more integrated and interdependent than ever before. Professionals require diverse abilities, from self-leadership and business acumen to operational excellence.
                </p>

                <p className="text-gray-300 text-lg leading-relaxed">
                  At Aster Health Academy, elevate your expertise with immersive healthcare courses curated by top-tier instructors and strategic collaborations with global leaders in healthcare and business management.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Expert Faculty</h4>
                    <p className="text-gray-300 text-sm">Industry veterans and healthcare specialists</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Global Partnerships</h4>
                    <p className="text-gray-300 text-sm">Collaborations with international leaders</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Digital Learning</h4>
                    <p className="text-gray-300 text-sm">Cutting-edge online and blended programs</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Career Advancement</h4>
                    <p className="text-gray-300 text-sm">Transformative programs for professionals</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Modern healthcare facility"
                className="rounded-3xl shadow-2xl w-full h-96 object-cover border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leaders Section */}
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Leaders</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Meet the visionary leaders who are transforming healthcare education and shaping the future of medical professionals worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.leaders?.map((leader) => (
              <div
                key={leader.id}
                onClick={() => openLeaderModal(leader)}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-blue-100"
              >
                <div className="relative">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1 font-medium">
                    {leader.position}
                  </p>
                  <p className="text-blue-600 text-sm font-medium mb-4">
                    {leader.company}
                  </p>
                  <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-800 transition-colors">
                    Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Join Aster Health Academy in revolutionizing professional transformation
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Take the next step in your healthcare career with our industry-leading programs and expert guidance.
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Explore Programs
          </button>
        </div>
      </div>

      {/* Leader Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              <button
                onClick={closeLeaderModal}
                className="absolute top-6 right-6 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <div>
                  <img
                    src={selectedLeader.image}
                    alt={selectedLeader.name}
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    {selectedLeader.name}
                  </h3>
                  <p className="text-blue-600 text-lg font-semibold mb-2">
                    {selectedLeader.position}
                  </p>
                  <p className="text-gray-600 mb-6 font-medium">{selectedLeader.company}</p>

                  <div className="prose prose-gray">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedLeader.introduction}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;