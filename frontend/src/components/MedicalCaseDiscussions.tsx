import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const medicalCases = [
  {
    id: 1,
    title: "Point-of-Care Ultrasound (POCUS): A Game-Changer in Critical Care",
    doctor: "Dr. Aklesh Tandekar",
    specialty: "Critical Care Specialist, Apollo Hospitals, Mumbai",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    flag: null,
  },
  {
    id: 2,
    title: "Recurrent IVF Failure: Diagnostic and Management Approach",
    doctor: "Dr. Richika Sahay",
    specialty: "Head Fertility Specialist, Fortis Hospital, New Delhi",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    flag: null,
  },
  {
    id: 3,
    title: "High-Risk CABG: Managing Patients with Multi-Vessel Disease",
    doctor: "Dr. Md. Abir Tazim Chowdhury",
    specialty:
      "Senior Specialist, Cardiothoracic Surgery, Evercare, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
    flag: "🇧🇩",
  },
  {
    id: 4,
    title: "Rethinking Obesity: A Hormonal Brain Disorder?",
    doctor: "Dr. Hecham Harb",
    specialty: "Medical Director, Endocare, Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
    flag: "🇦🇪",
  },
  {
    id: 5,
    title: "Advanced Cardiac Imaging in Pediatric Patients",
    doctor: "Dr. Sarah Johnson",
    specialty: "Pediatric Cardiologist, Children's Hospital, London",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
    flag: "🇬🇧",
  },
  {
    id: 6,
    title: "Minimally Invasive Spine Surgery: Latest Techniques",
    doctor: "Dr. Michael Chen",
    specialty: "Orthopedic Surgeon, Singapore General Hospital",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    flag: "🇸🇬",
  },
];

const successStories = [
  {
    id: 1,
    name: "Ms. Yumna Saqib",
    message:
      "I am thoroughly satisfied with the 'Fellowship in Clinical Nutrition' offered by Medvarsity. The support staff was consistently helpful, ready to clear any doubts. It's the perfect platform for non-medicos to enter the healthcare field.",
    course: "Fellowship in Clinical Nutrition",
    rating: 5,
  },
  {
    id: 2,
    name: "Dr. Kiran Kantanavar",
    message:
      "Grateful for the timely and supportive assistance from Medvarsity employees. Their help was crucial in resolving queries and addressing issues, allowing me to complete my 'Fellowship in Diabetes Mellitus'.",
    course: "Fellowship in Diabetes Mellitus",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Kunthu Jain",
    message:
      "I had an excellent experience with Medvarsity during my 'Fellowship in Critical Care Medicine'. Special thanks to Dr. Nikhil Modi and Dr. Ishan for their guidance in the ICU.",
    course: "Fellowship in Critical Care Medicine",
    rating: 5,
  },
  {
    id: 4,
    name: "Dr. Priya Sharma",
    message:
      "The Emergency Medicine fellowship exceeded my expectations. The practical approach and real-world case studies made learning engaging and applicable to my daily practice.",
    course: "Fellowship in Emergency Medicine",
    rating: 4,
  },
  {
    id: 5,
    name: "Dr. Rajesh Kumar",
    message:
      "Outstanding curriculum and faculty support throughout my Cardiology fellowship. The online format was flexible and allowed me to continue my practice while studying.",
    course: "Fellowship in Cardiology",
    rating: 5,
  },
  {
    id: 6,
    name: "Ms. Anita Patel",
    message:
      "As a non-medical professional, the Clinical Research fellowship opened new career opportunities. The comprehensive modules and mentorship were invaluable.",
    course: "Fellowship in Clinical Research",
    rating: 5,
  },
];

const MedicalCaseDiscussions = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentPage, setCurrentPage] = useState("main");
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);

  const itemsPerPage = 4;
  const totalCasePages = Math.ceil(medicalCases.length / itemsPerPage);

  const handleNextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const handlePrevStory = () => {
    setCurrentStory(
      (prev) => (prev - 1 + successStories.length) % successStories.length
    );
  };

  const handleNextCasePage = () => {
    setCurrentCaseIndex((prev) => (prev + 1) % totalCasePages);
  };

  const handlePrevCasePage = () => {
    setCurrentCaseIndex((prev) => (prev - 1 + totalCasePages) % totalCasePages);
  };

  const getCurrentCases = () => {
    const start = currentCaseIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return medicalCases.slice(start, end);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  if (currentPage === "all-cases") {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-blue-900">
              All Medical Cases
            </h1>
            <button
              onClick={() => setCurrentPage("main")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {medicalCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white cursor-pointer transform hover:scale-105"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover"
                  />
                  {caseItem.flag && (
                    <div className="absolute top-2 right-2 text-2xl">
                      {caseItem.flag}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                    {caseItem.title}
                  </h3>
                  <p className="text-sm text-blue-700 font-semibold">
                    {caseItem.doctor}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {caseItem.specialty}
                  </p>
                  <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    View Case
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === "all-stories") {
    return (
      <div className="min-h-screen bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              All Success Stories
            </h1>
            <button
              onClick={() => setCurrentPage("main")}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Home
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.map((story) => (
              <div
                key={story.id}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {story.name}
                  </h3>
                  <div className="flex">{renderStars(story.rating)}</div>
                </div>
                <p className="text-sm text-blue-600 font-medium mb-3">
                  {story.course}
                </p>
                <p className="text-gray-700 leading-relaxed">{story.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Medical Case Discussions Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-blue-900">
              Medical Case Discussions
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevCasePage}
                  className="p-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                  disabled={totalCasePages <= 1}
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-gray-600">
                  {currentCaseIndex + 1} / {totalCasePages}
                </span>
                <button
                  onClick={handleNextCasePage}
                  className="p-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                  disabled={totalCasePages <= 1}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <button
                onClick={() => setCurrentPage("all-cases")}
                className="border border-blue-800 text-blue-800 px-6 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                View All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getCurrentCases().map((caseItem) => (
              <div
                key={caseItem.id}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white cursor-pointer transform hover:scale-105"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover"
                  />
                  {caseItem.flag && (
                    <div className="absolute top-2 right-2 text-2xl">
                      {caseItem.flag}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                    {caseItem.title}
                  </h3>
                  <p className="text-sm text-blue-700 font-semibold">
                    {caseItem.doctor}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {caseItem.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Success Stories
            </h2>
            <button
              onClick={() => setCurrentPage("all-stories")}
              className="border border-gray-700 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              View All
            </button>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Mobile View - Single Story */}
            <div className="block lg:hidden w-full">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {successStories[currentStory].name}
                  </h3>
                  <div className="flex">
                    {renderStars(successStories[currentStory].rating)}
                  </div>
                </div>
                <p className="text-sm text-blue-600 font-medium mb-3">
                  {successStories[currentStory].course}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {successStories[currentStory].message}
                </p>
              </div>
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={handlePrevStory}
                  className="p-3 bg-white border border-gray-300 rounded-full shadow hover:shadow-md transition-shadow"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-gray-600">
                  {currentStory + 1} / {successStories.length}
                </span>
                <button
                  onClick={handleNextStory}
                  className="p-3 bg-white border border-gray-300 rounded-full shadow hover:shadow-md transition-shadow"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Desktop View - Grid with Navigation */}
            <div className="hidden lg:flex flex-1 items-start gap-6">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {successStories
                  .slice(currentStory, currentStory + 3)
                  .map((story) => (
                    <div
                      key={story.id}
                      className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {story.name}
                        </h3>
                        <div className="flex">{renderStars(story.rating)}</div>
                      </div>
                      <p className="text-sm text-blue-600 font-medium mb-3">
                        {story.course}
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                        {story.message}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handlePrevStory}
                  className="p-3 bg-white border border-gray-300 rounded-full shadow hover:shadow-md transition-shadow"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-gray-600 writing-mode-vertical">
                  {currentStory + 1} / {successStories.length}
                </span>
                <button
                  onClick={handleNextStory}
                  className="p-3 bg-white border border-gray-300 rounded-full shadow hover:shadow-md transition-shadow"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MedicalCaseDiscussions;
