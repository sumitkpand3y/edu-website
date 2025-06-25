"use client";
import React, { useState, useEffect } from 'react';
import { Book, Play, Award, Clock, CheckCircle, Star, CreditCard, Download, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
 const { user, logout } = useAuth();

  // Mock enrolled courses data
  const [enrolledCourses, setEnrolledCourses] = useState([
    {
      id: 1,
      title: 'Complete JavaScript Mastery',
      instructor: 'Sarah Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop',
      progress: 75,
      totalLessons: 45,
      completedLessons: 34,
      enrolledDate: '2024-02-01',
      lastAccessed: '2024-06-20',
      isCompleted: false,
      rating: 4.8,
      duration: '8 hours',
      category: 'Programming'
    },
    {
      id: 2,
      title: 'Advanced React Development',
      instructor: 'Mike Chen',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      progress: 100,
      totalLessons: 32,
      completedLessons: 32,
      enrolledDate: '2024-01-20',
      lastAccessed: '2024-06-15',
      isCompleted: true,
      rating: 4.9,
      duration: '12 hours',
      category: 'Frontend',
      certificateId: 'CERT-2024-001'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Davis',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
      progress: 45,
      totalLessons: 28,
      completedLessons: 13,
      enrolledDate: '2024-03-10',
      lastAccessed: '2024-06-22',
      isCompleted: false,
      rating: 4.7,
      duration: '6 hours',
      category: 'Design'
    }
  ]);

  // Mock available courses for purchase
  const [availableCourses] = useState([
    {
      id: 4,
      title: 'Python for Data Science',
      instructor: 'Dr. Alex Kumar',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop',
      price: 2999,
      originalPrice: 4999,
      rating: 4.6,
      students: 15420,
      duration: '15 hours',
      category: 'Data Science',
      description: 'Master Python programming for data analysis and machine learning'
    },
    {
      id: 5,
      title: 'Digital Marketing Masterclass',
      instructor: 'Lisa Rodriguez',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      price: 1999,
      originalPrice: 3499,
      rating: 4.5,
      students: 8765,
      duration: '10 hours',
      category: 'Marketing',
      description: 'Complete guide to digital marketing strategies and tools'
    }
  ]);

  // Payment processing
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleEnrollment = async (course) => {
    setIsProcessingPayment(true);
    setPaymentStatus(null);

    try {
      // Simulate Razorpay integration
      const options = {
        key: 'rzp_test_1234567890', // Replace with actual Razorpay key
        amount: course.price * 100, // Amount in paise
        currency: 'INR',
        name: 'EduPlatform',
        description: `Enrollment for ${course.title}`,
        image: '/logo.png',
        handler: function (response) {
          // Simulate successful payment
          setTimeout(() => {
            const newEnrollment = {
              ...course,
              progress: 0,
              totalLessons: Math.floor(Math.random() * 40) + 20,
              completedLessons: 0,
              enrolledDate: new Date().toISOString().split('T')[0],
              lastAccessed: new Date().toISOString().split('T')[0],
              isCompleted: false,
              paymentId: response.razorpay_payment_id
            };
            
            setEnrolledCourses(prev => [...prev, newEnrollment]);
            setPaymentStatus('success');
            setIsProcessingPayment(false);
            setActiveTab('courses');
          }, 2000);
        },
        prefill: {
          name: user.firstName,
          email: user.email,
          contact: '9999999999'
        },
        theme: {
          color: '#3B82F6'
        }
      };

      // Simulate opening Razorpay checkout
      setTimeout(() => {
        const mockResponse = {
          razorpay_payment_id: 'pay_' + Math.random().toString(36).substr(2, 9)
        };
        options.handler(mockResponse);
      }, 1000);

    } catch (error) {
      setPaymentStatus('failed');
      setIsProcessingPayment(false);
    }
  };

  const downloadCertificate = (course) => {
    // Simulate certificate download
    const element = document.createElement('a');
    const certificate = `Certificate of Completion\n\nThis certifies that ${user?.firstName} has successfully completed the course:\n"${course.title}"\n\nInstructor: ${course.instructor}\nDate: ${new Date().toLocaleDateString()}\nCertificate ID: ${course.certificateId}`;
    
    const file = new Blob([certificate], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${course.title}_Certificate.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {/* <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              /> */}
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Welcome back, {user?.firstName}!</h1>
                <p className="text-sm text-gray-600">Continue your learning journey</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Member since {formatDate(user?.joinDate)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('courses')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Courses ({enrolledCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'browse'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Browse Courses
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'certificates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Certificates
            </button>
          </nav>
        </div>

        {/* Payment Status Alert */}
        {paymentStatus && (
          <div className={`mb-6 p-4 rounded-lg ${
            paymentStatus === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              {paymentStatus === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <div className="w-5 h-5 bg-red-600 rounded-full mr-2" />
              )}
              <span className={paymentStatus === 'success' ? 'text-green-800' : 'text-red-800'}>
                {paymentStatus === 'success' 
                  ? 'Payment successful! You are now enrolled in the course.' 
                  : 'Payment failed. Please try again.'}
              </span>
            </div>
          </div>
        )}

        {/* My Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">My Courses</h2>
              <p className="text-gray-600">Track your progress and continue learning</p>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="text-center py-12">
                <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
                <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.isCompleted 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {course.isCompleted ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">by {course.instructor}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(course.progress)} transition-all duration-300`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Last accessed: {formatDate(course.lastAccessed)}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <Play className="w-4 h-4 mr-2" />
                          {course.progress === 0 ? 'Start' : 'Continue'}
                        </button>
                        
                        {course.isCompleted && (
                          <button
                            onClick={() => downloadCertificate(course)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                            title="Download Certificate"
                          >
                            <Award className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Browse Courses Tab */}
        {activeTab === 'browse' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Courses</h2>
              <p className="text-gray-600">Discover new courses to expand your skills</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">by {course.instructor}</p>
                    <p className="text-gray-700 text-sm mb-4">{course.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                        <span className="text-sm text-gray-400 ml-2">({course.students.toLocaleString()} students)</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
                        <span className="text-lg text-gray-500 line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                      </span>
                    </div>

                    <button
                      onClick={() => handleEnrollment(course)}
                      disabled={isProcessingPayment}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessingPayment ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Enroll Now
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">My Certificates</h2>
              <p className="text-gray-600">Download and share your achievements</p>
            </div>

            {enrolledCourses.filter(course => course.isCompleted).length === 0 ? (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates earned yet</h3>
                <p className="text-gray-600 mb-4">Complete courses to earn certificates</p>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View My Courses
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses
                  .filter(course => course.isCompleted)
                  .map((course) => (
                    <div key={course.id} className="bg-white rounded-lg shadow-sm border p-6">
                      <div className="text-center mb-4">
                        <Award className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-gray-600 text-sm">by {course.instructor}</p>
                      </div>
                      
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
                        <p className="font-mono text-sm text-gray-700">{course.certificateId}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>Completed: {formatDate(course.lastAccessed)}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => downloadCertificate(course)}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Certificate
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;