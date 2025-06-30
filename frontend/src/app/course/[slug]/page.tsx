"use client";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { getCourseBySlug } from "@/hooks/courseApi";

const CourseDetailPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const { slug } = useParams()
   type CourseData = {
     id: number;
     title: string;
     subtitle: string;
     duration: string;
     level: string;
     rating: number;
     price: number;
     batchStartDate: string;
     nextReviewDate: string;
     outcomes: string[];
     about: string;
     curriculum: { module: string; topics: string[] }[];
     targetAudience: string;
     knowledgePartner: string;
     faculty: {
       name: string;
       title: string;
       department: string;
       bio: string;
     }[];
     faqs: {
       question: string;
       answer: string;
     }[];
     relatedCourses: {
       title: string;
       description: string;
       level: string;
       duration: string;
       rating: number;
       price: number;
     }[];
   };
   const [courseData, setCourseData] = useState<CourseData | null>(null)

  const handleToggle = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index))
  }
  useEffect(() => {
  const fetchCourse = async () => {
    if (!slug) return;

    try {
      const res = await getCourseBySlug(slug as string);
      // const course = res?.course?.find(
      //   (course: { slug: string }) => course.slug === slug
      // );

      if (res.course) {
        setCourseData(res.course);
      } else {
        console.warn("Course not found for slug:", slug);
      }
    } catch (err) {
      console.error("Failed to load course data", err);
    }
  };

  fetchCourse();
}, [slug]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
  });

  // Course data - matches the AI Healthcare course from the images
//   const courseData = {
//     id: 1,
//     title: "Artificial Intelligence in Healthcare: Theory to Practice",
//     subtitle: "Integrate AI in Healthcare for a Smarter Future",
//     duration: "3 Months",
//     level: "Advanced",
//     rating: 4.5,
//     price: 125000,
//     batchStartDate: "Coming Soon",
//     nextReviewDate: "28th Jan, 2025",

//     outcomes: [
//       "Tailored experiential practical-oriented curriculum designed for healthcare professionals",
//       "More than 50% curriculum dedicated to the practical application of artificial intelligence in solving healthcare challenges",
//       "Live weekend sessions by top Artificial Intelligence faculty of Indian Institute of Science",
//       "Dedicated mentorship by Artificial Intelligence expert faculty",
//       "Exclusive mathematics/computing bridge module designed for healthcare professionals",
//       "Certificate from Indian Institute of Science and Aster Health Academy",
//     ],

//     about: `This comprehensive program is designed to equip healthcare professionals with the knowledge and skills required to harness the power of Artificial Intelligence (AI) in the field of healthcare. Throughout this program, you will delve into the theoretical as well as practical aspects of Artificial Intelligence in solving complex healthcare problems. By the end of this program, you will not only understand the fundamental principles of Artificial Intelligence but also be adept at applying AI methods to address real-world healthcare challenges.

// This all-inclusive program is taught by expert Artificial Intelligence faculty members of the Indian Institute of Science (IISc) and will also have an exclusive Mathematics/Computing bridge module designed for healthcare professionals, ensuring you have the essential foundation required to excel in this program. Get ready to embark on an exciting journey, led by the esteemed faculty of IISc that bridges the gap between theory and practice, empowering you to make a significant impact in the dynamic realm of Artificial Intelligence-driven healthcare.`,

//     curriculum: [
//       {
//         module: "Module 1: Foundations of AI in Healthcare",
//         topics: [
//           "Digital Data and Representation",
//           "Mathematical Foundations",
//           "Healthcare Data and Systems",
//         ],
//       },
//       {
//         module: "Module 2: AI Techniques and Applications",
//         topics: [
//           "Machine Learning in Healthcare",
//           "Deep Learning for Medical Imaging",
//           "Natural Language Processing for Medical Records",
//           "Predictive Analytics in Patient Care",
//         ],
//       },
//       {
//         module: "Module 3: Practical Applications and Challenges",
//         topics: [
//           "Ethics and Bias in Healthcare AI",
//           "Regulatory Compliance and Standards",
//           "Implementation Strategies",
//           "Case Studies and Real-world Projects",
//         ],
//       },
//     ],

//     targetAudience: `This course is tailored for healthcare professionals, data scientists, researchers, academics, health IT professionals, policy makers, administrators, and aspiring entrepreneurs who are passionate about leveraging Artificial Intelligence to transform healthcare. This comprehensive program equips participants with the knowledge and skills to apply Artificial Intelligence techniques in areas such as diagnostics, treatment planning, predictive modeling, medical research, and health informatics. Whether you are seeking to enhance patient care, drive innovation, or navigate the ethical and regulatory aspects of Artificial Intelligence in healthcare, this course provides a valuable platform for individuals from diverse backgrounds to explore and excel at the intersection of Artificial Intelligence and healthcare.`,

//     knowledgePartner: `The Indian Institute of Science (IISc) is our knowledge partner for the Artificial Intelligence in Healthcare: Theory to Practice course. As a prestigious institution renowned for its academic excellence and ground-breaking research, IISc brings unparalleled expertise and resources to our program. Collaborating with IISc ensures that our course benefits from their vast knowledge in areas such as Artificial Intelligence, healthcare, and interdisciplinary studies. Through this partnership, we are able to provide learners with a unique opportunity to learn from distinguished faculty members, access cutting-edge facilities, and engage in innovative research at the forefront of Artificial Intelligence in healthcare. This collaboration with IISc reinforces our commitment to delivering a top-tier educational experience and advancing the field of Artificial Intelligence in healthcare.`,

//     faculty: [
//       {
//         name: "Prof. Phaneendra Yalavarthy",
//         title: "Professor",
//         department:
//           "Department of Computational and Data Sciences, IISc, Bangalore, India",
//         bio: "Prof. Yalavarthy is a renowned artificial intelligence expert in the area of medical imaging. He has published more than 70 international journal articles in the area of medical imaging and leads successful collaborations labs with industries like GE Healthcare. He was instrumental in establishing Aster AI Lab, which is one of the first AI labs in India in a healthcare facility. He has active engagements with the medical imaging industry stake holders including GE Healthcare, Siemens Healthineers, Samsung Healthcare, and Telemedicine Solutions, fostering impactful collaborations. His research interests include artificial intelligence in medical imaging, digital health, and biomedical signal processing.",
//       },
//       {
//         name: "Dr. Lokesh B",
//         title: "Neurologist",
//         department: "Aster CMI Hospital, Bangalore",
//         bio: "Dr. Lokesh is the head of Neurosciences at Aster CMI Hospital, has trained in cerebrovascular Sonography from National University Hospital, Singapore and the University of Alabama, Birmingham, USA. He completed his super specialty training in neurology from the Institute of Neurology, B&Y & Netherlands. He leads the Aster AI lab and collaborates actively with Indian Institute of Science. He is passionate about application of artificial intelligence in healthcare and improving the patient care. He completed his MBBS, MD in General medicine and DM Neurology from Kasturba medical college, Manipal, India.",
//       },
//       {
//         name: "Prof. Ambedkar Dukkipati",
//         title: "Professor of Artificial Intelligence",
//         department: "Computer Science and Automation, IISc, Bangalore, India",
//         bio: "Prof. Dukkipati is an expert faculty member of artificial intelligence at IISc and teaches machine learning/deep learning courses regularly. He leads Statistics and Machine Learning group at IISc. He has active collaborations with GE Healthcare, Novartis, and Shell Technology Centre in the area of artificial intelligence. His research interests include machine learning, network representation learning, sequential decision-making under uncertainty, and deep reinforcement learning.",
//       },
//       {
//         name: "Dr. Vasanthi Sundaresan",
//         title:
//           "Assistant Professor of Department of Computational and Data Sciences",
//         department: "IISc, Bangalore",
//         bio: "Dr. Vasanthi Sundaresan is an assistant professor at IISc, where she leads the Biomedical Image Analysis (BioMedIA) laboratory. Her academic journey includes postdoctoral work at Harvard Medical School, a doctorate from the University of Oxford, and an M.S. from IIITM. She specializes in diverse research areas, including machine learning, artificial intelligence, and machine learning, medical imaging neuroimaging and tool development.",
//       },
//     ],

//     faqs: [
//       {
//         question: "What is the duration of this course?",
//         answer:
//           "This course is designed to be completed in 3 months with live weekend sessions.",
//       },
//       {
//         question: "How long can I access the learning content?",
//         answer:
//           "You will have access to the learning content for 6 months from the course start date.",
//       },
//       {
//         question: "How much time do I need to invest in this course?",
//         answer:
//           "The course requires approximately 6-8 hours per week including live sessions and self-study.",
//       },
//       {
//         question: "What is the duration of the synchronous weekend session?",
//         answer:
//           "The live weekend sessions are typically 3-4 hours long, conducted on Saturdays or Sundays.",
//       },
//       {
//         question: "Will I be awarded a certificate upon course completion?",
//         answer:
//           "Yes, you will receive a joint certificate from Indian Institute of Science and Aster Health Academy upon successful completion.",
//       },
//       {
//         question: "Is financial aid available for participants?",
//         answer:
//           "We offer various payment plans and scholarships for eligible candidates. Please contact our support team for more details.",
//       },
//       {
//         question: "Is there a refund policy?",
//         answer:
//           "Yes, we have a 7-day refund policy from the course start date. Please refer to our terms and conditions for complete details.",
//       },
//     ],

//     relatedCourses: [
//       {
//         title: "Fellowship Level Program in Cardiology",
//         description:
//           "Gain expertise in pediatric cardiology, preventive care and di...",
//         level: "Advanced",
//         duration: "16 Months",
//         rating: 4.8,
//         price: 850000,
//       },
//       {
//         title: "MEM - GMU",
//         description:
//           "Earn an advanced international degree in Emergency Medicine",
//         level: "Advanced",
//         duration: "15 Months",
//         rating: 4.6,
//         price: 650000,
//       },
//       {
//         title: "Fellowship Level Program in Diabetes Mellitus",
//         description:
//           "Understand and identify types of diseases, address complications...",
//         level: "Advanced",
//         duration: "15 Months",
//         rating: 4.7,
//         price: 950000,
//       },
//     ],
//   };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Application submitted successfully! We will contact you soon.");
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
if (!courseData) return <p>Loading...</p>
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
            {/* Left Column - Course Info */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center mb-4">
                <StarRating rating={courseData.rating} />
                <span className="ml-2 text-sm">{courseData.rating}</span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{courseData.title}</h1>
              <p className="text-xl mb-8">{courseData.subtitle}</p>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Course Outcomes:</h3>
                <ul className="space-y-3">
                  {courseData.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex items-center space-x-6">
                <div className="flex space-x-2">
                  <span className="bg-blue-600 p-2 rounded">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </span>
                  <span className="bg-green-600 p-2 rounded">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                  </span>
                  <span className="bg-blue-700 p-2 rounded">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-12">
                {/* About the Course */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    About the course:
                  </h2>
                  <div className="prose max-w-none text-gray-700">
                    {courseData.about.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>

                {/* Curriculum */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Curriculum:
                  </h2>
                  <div className="space-y-4">
                    {courseData?.curriculum?.map((module, index) => (
                      <div key={index}>
                        <button
                          onClick={() => handleToggle(index)}
                          className="flex items-center w-full text-left font-medium text-gray-800 hover:text-blue-700 transition-all"
                        >
                          {activeIndex === index ? (
                            <ChevronDown className="w-4 h-4 mr-2 text-blue-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                          )}
                          {module.module}
                        </button>

                        {activeIndex === index && module.topics.length > 0 && (
                          <ul className="ml-6 mt-2 space-y-1 text-sm text-gray-700">
                            {module.topics.map((topic, topicIndex) => (
                              <li
                                key={topicIndex}
                                className="pl-4 border-l border-gray-200"
                              >
                                {topic}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Who this course is for */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Who this course is for:
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {courseData.targetAudience}
                  </p>
                </section>

                {/* Knowledge Partner */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Knowledge Partner:
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {courseData.knowledgePartner}
                  </p>
                </section>

                {/* Sample Certificate */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Sample Certificate:
                  </h2>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-lg border-2 border-green-200">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                      <div className="flex justify-center space-x-8 mb-6">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-lg">
                            ASTER
                          </span>
                        </div>
                        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-bold text-lg">
                            IISc
                          </span>
                        </div>
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold text-lg">
                            ★
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        This is to certify that
                      </p>
                      <h3 className="text-2xl font-bold text-green-600 mb-4">
                        Name Surname
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        has successfully completed
                      </p>
                      <h4 className="text-lg font-semibold text-gray-900 mb-6">
                        Artificial Intelligence in Healthcare - Theory to
                        Practice
                      </h4>
                      <p className="text-xs text-gray-500">
                        Completion of Certificate Programme from 01st October -
                        25th December 2024
                      </p>
                      <div className="flex justify-between items-end mt-8">
                        <div className="text-left">
                          <p className="text-xs text-gray-600">
                            Prof. Programme Director
                          </p>
                          <p className="text-xs text-gray-600">
                            Indian Institute of Science
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">
                            Dr. Chief Executive
                          </p>
                          <p className="text-xs text-gray-600">
                            Aster Health Academy
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Faculty Team */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Faculty Team
                  </h2>
                  <div className="space-y-8">
                    {courseData.faculty.map((faculty, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200"
                      >
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-12 h-12 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-blue-600 mb-1">
                            {faculty.name}
                          </h3>
                          <p className="text-gray-900 font-medium mb-1">
                            {faculty.title}
                          </p>
                          <p className="text-gray-600 text-sm mb-3">
                            {faculty.department}
                          </p>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {faculty.bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* FAQ */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {courseData.faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg"
                      >
                        <button
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={() =>
                            setExpandedFaq(expandedFaq === index ? null : index)
                          }
                        >
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>
                          <svg
                            className={`w-5 h-5 text-gray-500 transform transition-transform ${
                              expandedFaq === index ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {expandedFaq === index && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Right Column - Application Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 relative sticky top-6">
                <div className="absolute -top-2 -right-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded transform rotate-12">
                    50% OFF
                  </span>
                </div>

                <div className="mb-4">
                  <div className="w-full h-40 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg
                        className="w-16 h-16 mx-auto mb-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V11H15C13.9 11 13 10.1 13 9V3H5V21H19V11H21V9ZM15 3V9H21L15 3Z" />
                      </svg>
                      <p className="text-lg font-semibold">
                        AI Healthcare Course
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-sm text-gray-600 mb-2">
                    Duration: {courseData.duration} • Level: {courseData.level}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatPrice(courseData.price)}
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 mb-4">
                    BUY NOW
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Batch Start Date
                  </h4>
                  <p className="text-gray-600">{courseData.batchStartDate}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-blue-600 mb-2">
                    Next Application Review Date
                  </h4>
                  <p className="text-gray-900 font-medium">
                    {courseData.nextReviewDate}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-600 mb-4">
                    Application Form
                  </h4>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <select
                      value={formData.qualification}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          qualification: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Qualification</option>
                      <option value="mbbs">MBBS</option>
                      <option value="md">MD</option>
                      <option value="ms">MS</option>
                      <option value="bds">BDS</option>
                      <option value="other">Other</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700"
                    >
                      Enquire Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          {/* <div className="lg:col-span-2 space-y-12">
           
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About the course:
              </h2>
              <div className="prose max-w-none text-gray-700">
                {courseData.about.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>


            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Curriculum:
              </h2>
              <div className="space-y-4">
                {courseData.curriculum.map((module, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {module.module}
                    </h4>
                    {module.topics.length > 0 && (
                      <ul className="ml-6 space-y-1">
                        {module.topics.map((topic, topicIndex) => (
                          <li
                            key={topicIndex}
                            className="text-gray-700 list-disc"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Who this course is for:
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {courseData.targetAudience}
              </p>
            </section>

            
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Knowledge Partner:
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {courseData.knowledgePartner}
              </p>
            </section>

            
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Sample Certificate:
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-lg border-2 border-green-200">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center space-x-8 mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">
                        ASTER
                      </span>
                    </div>
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-lg">
                        IISc
                      </span>
                    </div>
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">★</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    This is to certify that
                  </p>
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Name Surname
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    has successfully completed
                  </p>
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">
                    Artificial Intelligence in Healthcare - Theory to Practice
                  </h4>
                  <p className="text-xs text-gray-500">
                    Completion of Certificate Programme from 01st October - 25th
                    December 2024
                  </p>
                  <div className="flex justify-between items-end mt-8">
                    <div className="text-left">
                      <p className="text-xs text-gray-600">
                        Prof. Programme Director
                      </p>
                      <p className="text-xs text-gray-600">
                        Indian Institute of Science
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">
                        Dr. Chief Executive
                      </p>
                      <p className="text-xs text-gray-600">
                        Aster Health Academy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Faculty Team
              </h2>
              <div className="space-y-8">
                {courseData.faculty.map((faculty, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-600 mb-1">
                        {faculty.name}
                      </h3>
                      <p className="text-gray-900 font-medium mb-1">
                        {faculty.title}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        {faculty.department}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {faculty.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {courseData.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg"
                  >
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                    >
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                          expandedFaq === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div> */}

          {/* Right Column - Course Info Sidebar */}
          {/* <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Course Information
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Duration</h4>
                  <p className="text-gray-900">{courseData.duration}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Level</h4>
                  <p className="text-gray-900">{courseData.level}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Price</h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatPrice(courseData.price)}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Rating</h4>
                  <div className="flex items-center">
                    <StarRating rating={courseData.rating} />
                    <span className="ml-2 text-sm text-gray-600">
                      ({courseData.rating})
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">
                    Next Review Date
                  </h4>
                  <p className="text-gray-900 font-medium">
                    {courseData.nextReviewDate}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Enroll Now
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors">
                  Download Brochure
                </button>
              </div>
            </div>
          </div> */}
        </div>

        {/* Related Courses Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.relatedCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <p className="text-sm font-medium">Featured Course</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {course.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      Level: {course.level}
                    </span>
                    <span className="text-sm text-gray-500">
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <StarRating rating={course.rating} />
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(course.price)}
                    </span>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetailPage;
