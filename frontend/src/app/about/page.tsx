'use client'
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
// import leaders from '@/data/leaders.json';

const AboutPage = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);
    const [loading, setLoading] = useState(true);

  // const leaders = [
  //   {
  //     id: 1,
  //     name: "Dr. Azad Moopen",
  //     position: "Chairman and Director",
  //     company: "Aster DM Healthcare",
  //     image: "https://f9e9317a.delivery.rocketcdn.me/wp-content/uploads/2022/12/imgam400x400px.png",
  //     introduction: "Dr. Azad Moopen is the Founder Chairman and Managing Director of Aster DM Healthcare, one of the largest private healthcare networks in the GCC and India. With over three decades of experience in healthcare, he has been instrumental in transforming healthcare delivery across multiple countries. Under his visionary leadership, Aster has grown from a single clinic to a multinational healthcare conglomerate. Dr. Moopen is also actively involved in various philanthropic activities and has received numerous awards for his contributions to healthcare and business excellence."
  //   },
  //   {
  //     id: 2,
  //     name: "Alisha Moopen",
  //     position: "Managing Director and Group CEO",
  //     company: "Aster DM Healthcare",
  //     image: "https://f9e9317a.delivery.rocketcdn.me/wp-content/uploads/2022/12/imgamaam400x400px.jpg",
  //     introduction: "Alisha Moopen serves as the Managing Director and Group CEO of Aster DM Healthcare. She brings a fresh perspective to healthcare management with her innovative approach to digital transformation and patient care. With an MBA from a prestigious institution, she has been driving the organization's strategic initiatives, focusing on technology integration, quality improvement, and expansion into new markets. Her leadership has been crucial in positioning Aster as a forward-thinking healthcare provider in the digital age."
  //   },
  //   {
  //     id: 3,
  //     name: "Kannan Srinivas",
  //     position: "Director",
  //     company: "Aster Health Academy",
  //     image: "https://f9e9317a.delivery.rocketcdn.me/wp-content/uploads/2022/12/imgks400x400px.jpg",
  //     introduction: "Kannan Srinivas serves as the Director of Aster Health Academy, bringing extensive experience in healthcare education and training. With a deep understanding of the healthcare industry's evolving needs, he has been instrumental in developing comprehensive training programs that bridge the gap between academic learning and practical healthcare delivery. His expertise in curriculum development and industry partnerships has helped establish Aster Health Academy as a leading institution for healthcare professional development."
  //   }
  // ];

const [data, setData] = useState({
  leaders:[]
});
  useEffect(() => {
      const fetchLeaders = async () => {
        try {
          const res = await fetch('/data/leaders.json'); // or replace with API URL
          
          const result = await res.json();
          
          setData(result);
        } catch (err) {
          console.error('Error fetching course data:', err);
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Turning talent into greatness,
                <span className="text-blue-600 block">the Asterian Way</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Aster Health Academy (Unit of DM Med City Hospitals (India) Private 
                Limited) is a modern day healthcare ed-tech company focused on 
                professional education for both clinical and non-clinical functions. Against 
                the backdrop of a global healthcare brand, the Academy draws from the 
                Aster resource pool for industry veterans and healthcare specialist to 
                contribute to the learning and development of the next in line Aster Health 
                Academy aspires to be an industry disruptor that fundamentally aims to 
                ensure an industry-first experience in the domains of online and blended 
                learning. The Academy aims for a transformation that changes lives, 
                businesses, and nations through digital upskilling and collaboration to 
                nurture a dynamic skillset capable of facing the challenges of tomorrow.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://f9e9317a.delivery.rocketcdn.me/wp-content/uploads/2022/12/turningtalentinto615x320px.png" 
                alt="Handshake representing partnership" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://f9e9317a.delivery.rocketcdn.me/wp-content/uploads/2022/12/turningtalentinto615x320px.png" 
                alt="Handshake representing partnership" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-6">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To establish a globally recognized corporate academic institution, 
                focused on meeting internal and external talent demands in 
                Healthcare, leveraging in-house capabilities and external resource for 
                developing future generation of leaders and be the preferred education 
                provider for healthcare focused professionals across world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Academy Section */}
      <div className="bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Aster Health Academy</h2>
              <p className="text-blue-300 text-sm mb-6 uppercase tracking-wide">Preparing for the Future</p>
              
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  Healthcare systems today are more integrated and interdependent than 
                  ever before. As a result, professionals in healthcare industry require a 
                  diverse set of abilities, from self-leadership and business acumen expertise 
                  to operational and functional excellence. They need to engage frequently 
                  with a variety of stakeholders, make crucial decisions speedily, and guide 
                  institutions through rapid cycles and acute situations. The growing interest 
                  in these areas serves as another assurance of how crucial training and 
                  guidance are to healthcare management.
                </p>
                
                <p className="text-gray-300 leading-relaxed">
                  At Aster Health Academy, elevate your expertise with immersive Healthcare 
                  courses. Our clinical online courses, curated by top-tier instructors and 
                  strategic collaborations with global leaders in healthcare and business 
                  management, ensure unparalleled learning opportunities. For doctors 
                  seeking career advancement, explore our transformative programs today.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://f9e9317a.delivery.rocketcdn.me/wp-content/uploads/2022/12/1ahanew615x320px.jpg" 
                alt="Healthcare professional" 
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leaders Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-12 text-center">Our Leaders</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.leaders?.map((leader) => (
              <div 
                key={leader.id}
                onClick={() => openLeaderModal(leader)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">{leader.position}</p>
                  <p className="text-blue-600 text-sm font-medium">{leader.company}</p>
                  <button className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leader Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeLeaderModal}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <div>
                  <img 
                    src={selectedLeader.image} 
                    alt={selectedLeader.name}
                    className="w-full h-96 object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedLeader.name}</h3>
                  <p className="text-blue-600 text-lg font-medium mb-2">{selectedLeader.position}</p>
                  <p className="text-gray-600 mb-6">{selectedLeader.company}</p>
                  
                  <div className="prose prose-gray">
                    <p className="text-gray-700 leading-relaxed">
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