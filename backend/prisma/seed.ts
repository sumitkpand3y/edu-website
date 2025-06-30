import { PrismaClient, Level, PartnerType, CourseStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seedUsers() {
  const hashedPassword = await bcrypt.hash("password@123", 10);
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {}, // No update fields for now; you can add if needed
    create: {
      email: "alice@example.com",
      password: hashedPassword,
      firstName: "Alice",
      lastName: "Johnson",
      role: "ADMIN",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      password: hashedPassword,
      firstName: "Bob",
      lastName: "Smith",
      role: "STUDENT",
    },
  });

  return { alice, bob };
}

async function seedBlogTags() {
  const tags = await Promise.all([
    prisma.blogTag.create({ data: { name: "Healthcare" } }),
    prisma.blogTag.create({ data: { name: "Upskilling" } }),
  ]);
  return tags.map((tag) => tag.id);
}

async function seedBlogPosts(authorId: string, tagIds: number[]) {
  const blogData = [
    {
      title:
        "Advanced Fellowships With Stipend For Doctors: The Smarter Path to Super-Specialization",
      slug: "advanced-fellowships-stipend-doctors",
      excerpt:
        "Here's how you can master your Specialty with an Advanced Fellowship with Aster Health Academy. The healthcare sector is evolving rapidly, and the skill set professionals need to build skill, but significant overlap in existing competencies that come about where general practice is no longer enough. If you are considering making the specialty [...]",
      content: `
      <div class="prose prose-lg max-w-none">
        <p>Here's how you can master your Specialty with an Advanced Fellowship with Aster Health Academy. The healthcare sector is evolving rapidly, and the skill set professionals need to build skill, but significant overlap in existing competencies that come about where general practice is no longer enough. If you are considering making the specialty [...]</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Opportunity in scaling up healthcare business</h2>
        
        <p>The market for healthcare services in India increased by 10% in 2021, reaching $31.6 billion. The Indian healthcare providers market is anticipated to reach $129.8 billion in 2026, up 28.8% from 2021. The healthcare sector has never needed to innovate business models and create new revenue streams more than it does now, especially as it works to enhance lives and standard of living. The movement toward new business models is already under way.</p>
        
        <p>The need for skilled personnel in conventional fields like medicine, nursing, pharmacy, etc. continues to outpace what our education system can provide. Very typically, we only have roughly 5 million of these professionals, or less than half of what we currently require. With such obstacles, the emphasis has also shifted to closing gaps so that care delivery is sophisticated, affordable, and accessible. A workforce that is highly skilled, effective, and always prepared is also required to meet future difficulties including an ageing population and unresolved health concerns.</p>
        
        <p>With the use of efficient online learning tools, medical personnel will need to stay up with best practices from around the world and breakthroughs in medicine, diagnostics, treatment, and patient care. For their employees' holistic development and progression, modern, dynamic healthcare firms are teaching and upgrading the following skills to them:</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">Leveraging New Technologies</h3>
        <p>Encouraging your staff to take advantage of digitally driven innovation in the health field can provide fantastic results. These new technologies can contribute to better health ecosystem management, more powerful research and innovation, and services that are more effective, efficient, and centred on people.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">Design Thinking</h3>
        <p>For people working in the healthcare industry, several soft skills are crucial. Health technology and innovation heavily rely on human connections. Design thinking is a creative process that not only helps with technology implementation but also takes into account patient-centric services that are emotionally and value-based.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">Agile Learning for the Healthcare Workforce</h3>
        <p>The pandemic has placed a premium on meeting a rapidly shifting demand and supply continuing to offer critical services. Instead of being proactive, services had to be responsive and reactive. For healthcare workers to be resilient and proactive in times of crisis, agility needs to be instilled in them. With the use of efficient online learning tools, they will need to stay up with best practices from around the world and breakthroughs in medicine, diagnostics, treatment, and patient care.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">Leadership</h3>
        <p>Healthcare professionals must learn how to lead, manage teams, and present themselves. They ought to be capable of spotting and bridging any gaps between patients' expectations and the actual services offered. Future career advancements, employee engagement, and employee well-being are all taken into account when leaders plan training and development programmes.</p>
        
        <p>To be a successful healthcare worker, you must constantly update your knowledge and look for ways to get better. To make it happen, a successful learning programme must not only address learning-related topics but also be tailored to the different learning preferences of learners.</p>
      </div>
    `,
      category: "Healthcare",
      tags: ["Healthcare", "Upskilling"],
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      date: "2024-01-23",
      readTime: "5 min",
    },
    {
      title: "Fellowship Courses After MBBS in India: A Complete Guide",
      slug: "fellowship-courses-after-mbbs-india",
      excerpt:
        "Fellowship Courses after MBBS in India. So, you've made it through MBBS—endless sleepless nights, endless studying, and now you're that has a medical degree. What's next? Sure, there's the traditional route—NEET PG, MD, MS, or even a diploma—but what if you want something different, something dynamic?",
      content: `
      <div class="prose prose-lg max-w-none">
        <p>Fellowship Courses after MBBS in India. So, you've made it through MBBS—endless sleepless nights, endless studying, and now you're that has a medical degree. What's next? Sure, there's the traditional route—NEET PG, MD, MS, or even a diploma—but what if you want something different, something dynamic?</p>
        
        <p>Medical education doesn't stop at MBBS. In fact, it's just the beginning of a lifelong journey of learning and specialization. Fellowship programs offer an excellent pathway for fresh medical graduates to gain specialized skills and knowledge in specific areas of medicine.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">What are Fellowship Courses?</h2>
        <p>Fellowship courses are specialized training programs that allow medical professionals to gain expertise in specific areas of medicine. These programs are designed to provide hands-on experience and advanced knowledge in various medical specialties.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Benefits of Fellowship Courses</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>Specialized expertise in chosen field</li>
          <li>Better career opportunities</li>
          <li>Higher earning potential</li>
          <li>Practical hands-on experience</li>
          <li>Professional networking opportunities</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Popular Fellowship Courses in India</h2>
        <p>There are numerous fellowship opportunities available across different medical specialties including cardiology, neurology, oncology, emergency medicine, and many more.</p>
      </div>
    `,
      category: "Healthcare",
      tags: ["Healthcare", "Upskilling"],
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      date: "2024-01-20",
      readTime: "4 min",
    },
    {
      title: "Empower your Potential: A Guide to Team Leadership",
      slug: "empower-potential-guide-team-leadership",
      excerpt:
        "We will delve into the importance of leadership and highlight how Aster Health Academy's leadership courses can help individuals excel in their respective fields.",
      content: `
      <div class="prose prose-lg max-w-none">
        <p>We will delve into the importance of leadership and highlight how Aster Health Academy's leadership courses can help individuals excel in their respective fields.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">The Importance of Leadership in Healthcare</h2>
        <p>Leadership in healthcare is crucial for ensuring quality patient care, managing teams effectively, and driving innovation in medical practices. Strong leadership skills help healthcare professionals navigate complex situations and lead their teams to success.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Key Leadership Skills for Healthcare Professionals</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>Communication and interpersonal skills</li>
          <li>Decision-making under pressure</li>
          <li>Team management and collaboration</li>
          <li>Strategic thinking and planning</li>
          <li>Emotional intelligence and empathy</li>
        </ul>
      </div>
    `,
      category: "Healthcare",
      tags: ["Healthcare", "Upskilling"],
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
      date: "2024-01-18",
      readTime: "6 min",
    },
    {
      title:
        "Why should you take the Advanced Cardiac Life Support (ACLS) Training?",
      slug: "advanced-cardiac-life-support-acls-training",
      excerpt:
        "Advanced Cardiac Life Support (ACLS) is a training course that teaches healthcare professionals the skills and knowledge needed to effectively manage cardiac arrest and other life-threatening conditions.",
      content: `
      <div class="prose prose-lg max-w-none">
        <p>Advanced Cardiac Life Support (ACLS) is a training course that teaches healthcare professionals the skills and knowledge needed to effectively manage cardiac arrest and other life-threatening conditions.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">What is ACLS?</h2>
        <p>ACLS is a set of clinical interventions for the urgent treatment of cardiac arrest, stroke, and other life-threatening medical emergencies. It extends beyond basic life support (BLS) to include advanced interventions.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Who Should Take ACLS Training?</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>Emergency medical professionals</li>
          <li>Critical care nurses</li>
          <li>Physicians and residents</li>
          <li>Paramedics and EMTs</li>
          <li>Healthcare team leaders</li>
        </ul>
      </div>
    `,
      category: "Healthcare",
      tags: ["Healthcare", "Upskilling"],
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=400&fit=crop",
      date: "2024-01-15",
      readTime: "3 min",
    },
    {
      title: "Upskilling in the Healthcare Industry",
      slug: "upskilling-healthcare-industry",
      excerpt:
        "The market for healthcare services in India increased by 10% in 2021, reaching $31.6 billion. The Indian healthcare providers market is anticipated to reach $129.8 billion in 2026, up 28.8% from 2021.",
      content: `
      <div class="prose prose-lg max-w-none">
        <p>The healthcare industry is a dynamic environment that is always changing, and technology is significantly responsible for some of the most significant changes. This technically forced disruption has also advanced computerised, smart, on-demand, and seamlessly connected transactions that, absent the virtual world we have grown accustomed to, would not have been either feasible or universally acceptable. Healthcare organisations must therefore continue to invest in their workforce by upskilling them in fields that will also provide the business a competitive edge. Included in this is training on the use of technology and other tools designed to enhance business operations and efficiencies.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Opportunity in scaling up healthcare business</h2>
        
        <p>The market for healthcare services in India increased by 10% in 2021, reaching $31.6 billion. The Indian healthcare providers market is anticipated to reach $129.8 billion in 2026, up 28.8% from 2021. The healthcare sector has never needed to innovate business models and create new revenue streams more than it does now, especially as it works to enhance lives and standard of living. The movement toward new business models is already under way.</p>
        
        <p>The need for skilled personnel in conventional fields like medicine, nursing, pharmacy, etc. continues to outpace what our education system can provide. Very typically, we only have roughly 5 million of these professionals, or less than half of what we currently require. With such obstacles, the emphasis has also shifted to closing gaps so that care delivery is sophisticated, affordable, and accessible. A workforce that is highly skilled, effective, and always prepared is also required to meet future difficulties including an ageing population and unresolved health concerns.</p>
        
        <p>With the use of efficient online learning tools, medical personnel will need to stay up with best practices from around the world and breakthroughs in medicine, diagnostics, treatment, and patient care. For their employees' holistic development and progression, modern, dynamic healthcare firms are teaching and upgrading the following skills to them:</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">Leveraging New Technologies</h3>
        <p>Encouraging your staff to take advantage of digitally driven innovation in the health field can provide fantastic results. These new technologies can contribute to better health ecosystem management, more powerful research and innovation, and services that are more effective, efficient, and centred on people.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">Design Thinking</h3>
        <p>For people working in the healthcare industry, several soft skills are crucial. Health technology and innovation heavily rely on human connections. Design thinking is a creative process that not only helps with technology implementation but also takes into account patient-centric services that are emotionally and value-based.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">Agile Learning for the Healthcare Workforce</h3>
        <p>The pandemic has placed a premium on meeting a rapidly shifting demand and supply continuing to offer critical services. Instead of being proactive, services had to be responsive and reactive. For healthcare workers to be resilient and proactive in times of crisis, agility needs to be instilled in them. With the use of efficient online learning tools, they will need to stay up with best practices from around the world and breakthroughs in medicine, diagnostics, treatment, and patient care.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">Leadership</h3>
        <p>Healthcare professionals must learn how to lead, manage teams, and present themselves. They ought to be capable of spotting and bridging any gaps between patients' expectations and the actual services offered. Future career advancements, employee engagement, and employee well-being are all taken into account when leaders plan training and development programmes.</p>
        
        <p>To be a successful healthcare worker, you must constantly update your knowledge and look for ways to get better. To make it happen, a successful learning programme must not only address learning-related topics but also be tailored to the different learning preferences of learners.</p>
      </div>
    `,
      category: "Healthcare",
      tags: ["Healthcare", "Upskilling"],
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
      date: "2024-01-23",
      readTime: "8 min",
    },
    {
      title: "Importance of Basic Life Support (BLS) Training Course",
      slug: "importance-basic-life-support-bls-training",
      excerpt:
        "BLS is an essential course for anyone who wants to be prepared to save a life in an emergency situation. Whether you are a healthcare professional, a first responder, or simply someone who wants to be prepared for emergencies, BLS training can provide you with the skills and knowledge you need to help save lives.",
      content: `
      <div class="prose prose-lg max-w-none">
        <p>BLS is an essential course for anyone who wants to be prepared to save a life in an emergency situation. Whether you are a healthcare professional, a first responder, or simply someone who wants to be prepared for emergencies, BLS training can provide you with the skills and knowledge you need to help save lives.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">What is Basic Life Support (BLS)?</h2>
        <p>Basic Life Support (BLS) is a level of medical care which is used for victims of life-threatening illnesses or injuries until they can be given full medical care at a hospital. It can be provided by trained medical personnel, including emergency medical technicians, paramedics, and by qualified bystanders.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Key Components of BLS Training</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>Cardiopulmonary Resuscitation (CPR)</li>
          <li>Automated External Defibrillator (AED) use</li>
          <li>Relief of choking in adults, children, and infants</li>
          <li>Recognition of cardiac arrest</li>
          <li>Proper ventilation techniques</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Who Should Get BLS Certified?</h2>
        <p>BLS certification is essential for healthcare professionals, but it's also valuable for teachers, coaches, childcare providers, and anyone who wants to be prepared to help in an emergency situation.</p>
      </div>
    `,
      category: "Healthcare",
      tags: ["Healthcare", "Upskilling"],
      image:
        "https://images.unsplash.com/photo-1559757175-0eb30cd718ec?w=800&h=400&fit=crop",
      date: "2024-01-12",
      readTime: "4 min",
    },
    {
      title: "Opportunity in scaling up healthcare business",
      slug: "opportunity-scaling-healthcare-business",
      excerpt:
        "The market for healthcare services in India increased by 10% in 2021, reaching $31.6 billion. The Indian healthcare providers market is anticipated to reach $129.8 billion in 2026, up 28.8% from 2021. The healthcare sector has never needed to innovate business models and create new revenue streams more than it does now, especially as it works to enhance lives and standard of living.",
      content: `
      <div class="prose prose-lg max-w-none">
        <p>The market for healthcare services in India increased by 10% in 2021, reaching $31.6 billion. The Indian healthcare providers market is anticipated to reach $129.8 billion in 2026, up 28.8% from 2021. The healthcare sector has never needed to innovate business models and create new revenue streams more than it does now, especially as it works to enhance lives and standard of living.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Current Market Landscape</h2>
        <p>The healthcare industry in India is experiencing unprecedented growth, driven by factors such as increasing population, rising awareness about health and wellness, and technological advancements. This growth presents numerous opportunities for healthcare businesses to scale and expand their operations.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Key Growth Drivers</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>Digital transformation in healthcare</li>
          <li>Telemedicine and remote patient monitoring</li>
          <li>Artificial intelligence and machine learning applications</li>
          <li>Personalized medicine and treatment approaches</li>
          <li>Preventive healthcare and wellness programs</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Strategies for Scaling Healthcare Business</h2>
        <p>Healthcare organizations looking to scale their operations should focus on leveraging technology, improving operational efficiency, and investing in workforce development. Building strategic partnerships and exploring new revenue streams are also crucial for sustainable growth.</p>
      </div>
    `,
      category: "Business",
      tags: ["Business", "Healthcare"],
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
      date: "2024-01-10",
      readTime: "7 min",
    },
  ];

  await Promise.all(
    blogData.map((post) =>
      prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: {},
        create: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          date: new Date(post.date),
          image: post.image,
          readTime: post.readTime,
          status: "PUBLISHED",
          isPublished: true,
          authorId,
          tags: {
            connect: tagIds.map((id) => ({ id })),
          },
        },
      })
    )
  );
}

// Seed multiple partners
export async function seedPartners() {
  const partnerData = [
    {
      name: "Aster Hospitals",
      type: "HOSPITAL" as PartnerType, // Assuming HOSPITAL is a valid enum value
      logo: "https://example.com/logo1.png",
      description: "Leading multispeciality hospital chain.",
      established: "2000",
      location: "India & GCC",
      website: "https://asterhospitals.in",
      email: "info@asterhospitals.in",
      phone: "+91-1234567890",
      specialties: ["Cardiology", "Emergency", "Neurology"],
    },
    {
      name: "Apollo Hospitals",
      type: "HOSPITAL" as PartnerType, // Assuming HOSPITAL is a valid enum value
      logo: "https://example.com/logo2.png",
      description: "One of Asia's largest healthcare groups.",
      established: "1983",
      location: "Pan India",
      website: "https://apollohospitals.com",
      email: "contact@apollohospitals.com",
      phone: "+91-9876543210",
      specialties: ["Oncology", "Orthopedics", "Pediatrics"],
    },
    {
      name: "NSDC",
      type: "KNOWLEDGE" as PartnerType,
      logo: "https://via.placeholder.com/120x80/4A90E2/FFFFFF?text=NSDC",
      description:
        "National Skill Development Corporation (NSDC) is a premier institution working towards skill development and vocational training across India.",
      established: "2009",
      location: "New Delhi, India",
      website: "https://nsdcindia.org",
      email: "info@nsdcindia.org",
      phone: "+91-11-4141-4141",
      specialties: [
        "Skill Development",
        "Vocational Training",
        "Certification Programs",
        "Industry Partnerships",
      ],
    },
    {
      name: "XLRI",
      type: "KNOWLEDGE" as PartnerType,
      logo: "https://via.placeholder.com/120x80/E74C3C/FFFFFF?text=XLRI",
      description:
        "Xavier Labour Relations Institute is a premier management institute in India, known for its excellence in management education and research.",
      established: "1949",
      location: "Jamshedpur, India",
      website: "https://xlri.ac.in",
      email: "info@xlri.ac.in",
      phone: "+91-657-398-3000",
      specialties: [
        "Management Education",
        "HR Programs",
        "Executive Education",
        "Research",
      ],
    },
    {
      name: "EduVanz",
      type: "FINANCE" as PartnerType,
      logo: "https://via.placeholder.com/120x80/16A085/FFFFFF?text=EduVanz",
      description:
        "EduVanz is a leading education financing platform that provides customized financial solutions for students pursuing higher education.",
      established: "2016",
      location: "Bangalore, India",
      website: "https://eduvanz.com",
      email: "support@eduvanz.com",
      phone: "+91-80-4718-2000",
      specialties: [
        "Education Loans",
        "Skill Development Financing",
        "Digital Lending",
        "Financial Technology",
      ],
    },
  ];

  await Promise.all(
    partnerData.map((partner) =>
      prisma.partner.create({
        data: partner,
      })
    )
  );

  console.log("✅ Partners seeded successfully");
}
export async function seedCourses() {
  const courseData = [
    {
      id: 1,
      title: "Digital Transformation and Business Models for Healthcare",
      slug: "digital-transformation-healthcare",
      provider: "Executive Education",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.8,
      reviews: 245,
      price: 250000,
      originalPrice: 300000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "popular",
      shortDescription:
        "Master digital transformation strategies in healthcare organizations",
      tags: ["Digital Health", "Strategy", "Innovation"],
      enrolledStudents: 1250,
      featured: true,
      subtitle: "Integrate AI in Healthcare for a Smarter Future",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Tailored experiential practical-oriented curriculum designed for healthcare professionals",
        "More than 50% curriculum dedicated to the practical application of artificial intelligence in solving healthcare challenges",
        "Live weekend sessions by top Artificial Intelligence faculty of Indian Institute of Science",
        "Dedicated mentorship by Artificial Intelligence expert faculty",
        "Exclusive mathematics/computing bridge module designed for healthcare professionals",
        "Certificate from Indian Institute of Science and Aster Health Academy",
      ],

      about:
        "This comprehensive program is designed to equip healthcare professionals with the knowledge and skills required to harness the power of Artificial Intelligence (AI) in the field of healthcare...",

      curriculum: [
        {
          module: "Module 1: Foundations of AI in Healthcare",
          topics: [
            "Digital Data and Representation",
            "Mathematical Foundations",
            "Healthcare Data and Systems",
          ],
        },
        {
          module: "Module 2: AI Techniques and Applications",
          topics: [
            "Machine Learning in Healthcare",
            "Deep Learning for Medical Imaging",
            "Natural Language Processing for Medical Records",
            "Predictive Analytics in Patient Care",
          ],
        },
        {
          module: "Module 3: Practical Applications and Challenges",
          topics: [
            "Ethics and Bias in Healthcare AI",
            "Regulatory Compliance and Standards",
            "Implementation Strategies",
            "Case Studies and Real-world Projects",
          ],
        },
      ],

      targetAudience:
        "This course is tailored for healthcare professionals, data scientists, researchers, academics, health IT professionals, policy makers, administrators, and aspiring entrepreneurs...",

      knowledgePartner:
        "The Indian Institute of Science (IISc) is our knowledge partner...",

      faculty: [
        {
          name: "Prof. Phaneendra Yalavarthy",
          title: "Professor",
          department:
            "Department of Computational and Data Sciences, IISc, Bangalore, India",
          bio: "Prof. Yalavarthy is a renowned artificial intelligence expert in the area of medical imaging...",
        },
        {
          name: "Dr. Lokesh B",
          title: "Neurologist",
          department: "Aster CMI Hospital, Bangalore",
          bio: "Dr. Lokesh is the head of Neurosciences at Aster CMI Hospital...",
        },
        {
          name: "Prof. Ambedkar Dukkipati",
          title: "Professor of Artificial Intelligence",
          department: "Computer Science and Automation, IISc, Bangalore, India",
          bio: "Prof. Dukkipati is an expert faculty member of artificial intelligence at IISc...",
        },
        {
          name: "Dr. Vasanthi Sundaresan",
          title:
            "Assistant Professor of Department of Computational and Data Sciences",
          department: "IISc, Bangalore",
          bio: "Dr. Vasanthi Sundaresan is an assistant professor at IISc...",
        },
      ],

      faqs: [
        {
          question: "What is the duration of this course?",
          answer:
            "This course is designed to be completed in 3 months with live weekend sessions.",
        },
        {
          question: "How long can I access the learning content?",
          answer:
            "You will have access to the learning content for 6 months from the course start date.",
        },
        {
          question: "How much time do I need to invest in this course?",
          answer:
            "The course requires approximately 6-8 hours per week including live sessions and self-study.",
        },
        {
          question: "What is the duration of the synchronous weekend session?",
          answer:
            "The live weekend sessions are typically 3-4 hours long, conducted on Saturdays or Sundays.",
        },
        {
          question: "Will I be awarded a certificate upon course completion?",
          answer:
            "Yes, you will receive a joint certificate from Indian Institute of Science and Aster Health Academy upon successful completion.",
        },
        {
          question: "Is financial aid available for participants?",
          answer:
            "We offer various payment plans and scholarships for eligible candidates. Please contact our support team for more details.",
        },
        {
          question: "Is there a refund policy?",
          answer:
            "Yes, we have a 7-day refund policy from the course start date. Please refer to our terms and conditions for complete details.",
        },
      ],

      relatedCourses: [
        {
          title: "Fellowship Level Program in Cardiology",
          description:
            "Gain expertise in pediatric cardiology, preventive care and di...",
          level: "ADVANCED" as Level,
          duration: "16 Months",
          rating: 4.8,
          price: 850000,
        },
        {
          title: "MEM - GMU",
          description:
            "Earn an advanced international degree in Emergency Medicine",
          level: "ADVANCED" as Level,
          duration: "15 Months",
          rating: 4.6,
          price: 650000,
        },
        {
          title: "Fellowship Level Program in Diabetes Mellitus",
          description:
            "Understand and identify types of diseases, address complications...",
          level: "ADVANCED" as Level,
          duration: "15 Months",
          rating: 4.7,
          price: 950000,
        },
      ],
    },

    {
      id: 2,
      title: "Artificial Intelligence in Healthcare Theory to Practice",
      slug: "ai-healthcare-theory-practice",
      provider: "Tech Institute",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.7,
      reviews: 189,
      price: 125000,
      originalPrice: 150000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "popular",
      shortDescription: "Comprehensive AI applications in healthcare settings",
      tags: ["AI", "Machine Learning", "Healthcare Tech"],
      enrolledStudents: 890,
      featured: true,

      subtitle: "Integrate AI in Healthcare for a Smarter Future",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Tailored experiential practical-oriented curriculum designed for healthcare professionals",
        "More than 50% curriculum dedicated to the practical application of artificial intelligence in solving healthcare challenges",
        "Live weekend sessions by top Artificial Intelligence faculty of Indian Institute of Science",
        "Dedicated mentorship by Artificial Intelligence expert faculty",
        "Exclusive mathematics/computing bridge module designed for healthcare professionals",
        "Certificate from Indian Institute of Science and Aster Health Academy",
      ],

      about:
        "This comprehensive program is designed to equip healthcare professionals with the knowledge and skills required to harness the power of Artificial Intelligence (AI) in the field of healthcare. Throughout this program, you will delve into the theoretical as well as practical aspects of Artificial Intelligence in solving complex healthcare problems. By the end of this program, you will not only understand the fundamental principles of Artificial Intelligence but also be adept at applying AI methods to address real-world healthcare challenges. This all-inclusive program is taught by expert Artificial Intelligence faculty members of the Indian Institute of Science (IISc) and will also have an exclusive Mathematics/Computing bridge module designed for healthcare professionals, ensuring you have the essential foundation required to excel in this program. Get ready to embark on an exciting journey, led by the esteemed faculty of IISc that bridges the gap between theory and practice, empowering you to make a significant impact in the dynamic realm of Artificial Intelligence-driven healthcare.",

      curriculum: [
        {
          module: "Module 1: Foundations of AI in Healthcare",
          topics: [
            "Digital Data and Representation",
            "Mathematical Foundations",
            "Healthcare Data and Systems",
          ],
        },
        {
          module: "Module 2: AI Techniques and Applications",
          topics: [
            "Machine Learning in Healthcare",
            "Deep Learning for Medical Imaging",
            "Natural Language Processing for Medical Records",
            "Predictive Analytics in Patient Care",
          ],
        },
        {
          module: "Module 3: Practical Applications and Challenges",
          topics: [
            "Ethics and Bias in Healthcare AI",
            "Regulatory Compliance and Standards",
            "Implementation Strategies",
            "Case Studies and Real-world Projects",
          ],
        },
      ],

      targetAudience:
        "This course is tailored for healthcare professionals, data scientists, researchers, academics, health IT professionals, policy makers, administrators, and aspiring entrepreneurs who are passionate about leveraging Artificial Intelligence to transform healthcare. This comprehensive program equips participants with the knowledge and skills to apply Artificial Intelligence techniques in areas such as diagnostics, treatment planning, predictive modeling, medical research, and health informatics. Whether you are seeking to enhance patient care, drive innovation, or navigate the ethical and regulatory aspects of Artificial Intelligence in healthcare, this course provides a valuable platform for individuals from diverse backgrounds to explore and excel at the intersection of Artificial Intelligence and healthcare.",

      knowledgePartner:
        "The Indian Institute of Science (IISc) is our knowledge partner for the Artificial Intelligence in Healthcare: Theory to Practice course. As a prestigious institution renowned for its academic excellence and ground-breaking research, IISc brings unparalleled expertise and resources to our program. Collaborating with IISc ensures that our course benefits from their vast knowledge in areas such as Artificial Intelligence, healthcare, and interdisciplinary studies. Through this partnership, we are able to provide learners with a unique opportunity to learn from distinguished faculty members, access cutting-edge facilities, and engage in innovative research at the forefront of Artificial Intelligence in healthcare. This collaboration with IISc reinforces our commitment to delivering a top-tier educational experience and advancing the field of Artificial Intelligence in healthcare.",

      faculty: [
        {
          name: "Prof. Phaneendra Yalavarthy",
          title: "Professor",
          department:
            "Department of Computational and Data Sciences, IISc, Bangalore, India",
          bio: "Prof. Yalavarthy is a renowned artificial intelligence expert in the area of medical imaging. He has published more than 70 international journal articles in the area of medical imaging and leads successful collaborations labs with industries like GE Healthcare. He was instrumental in establishing Aster AI Lab, which is one of the first AI labs in India in a healthcare facility. He has active engagements with the medical imaging industry stake holders including GE Healthcare, Siemens Healthineers, Samsung Healthcare, and Telemedicine Solutions, fostering impactful collaborations. His research interests include artificial intelligence in medical imaging, digital health, and biomedical signal processing.",
        },
        {
          name: "Dr. Lokesh B",
          title: "Neurologist",
          department: "Aster CMI Hospital, Bangalore",
          bio: "Dr. Lokesh is the head of Neurosciences at Aster CMI Hospital, has trained in cerebrovascular Sonography from National University Hospital, Singapore and the University of Alabama, Birmingham, USA. He completed his super specialty training in neurology from the Institute of Neurology, B&Y & Netherlands. He leads the Aster AI lab and collaborates actively with Indian Institute of Science. He is passionate about application of artificial intelligence in healthcare and improving the patient care. He completed his MBBS, MD in General medicine and DM Neurology from Kasturba medical college, Manipal, India.",
        },
        {
          name: "Prof. Ambedkar Dukkipati",
          title: "Professor of Artificial Intelligence",
          department: "Computer Science and Automation, IISc, Bangalore, India",
          bio: "Prof. Dukkipati is an expert faculty member of artificial intelligence at IISc and teaches machine learning/deep learning courses regularly. He leads Statistics and Machine Learning group at IISc. He has active collaborations with GE Healthcare, Novartis, and Shell Technology Centre in the area of artificial intelligence. His research interests include machine learning, network representation learning, sequential decision-making under uncertainty, and deep reinforcement learning.",
        },
        {
          name: "Dr. Vasanthi Sundaresan",
          title:
            "Assistant Professor of Department of Computational and Data Sciences",
          department: "IISc, Bangalore",
          bio: "Dr. Vasanthi Sundaresan is an assistant professor at IISc, where she leads the Biomedical Image Analysis (BioMedIA) laboratory. Her academic journey includes postdoctoral work at Harvard Medical School, a doctorate from the University of Oxford, and an M.S. from IIITM. She specializes in diverse research areas, including machine learning, artificial intelligence, and machine learning, medical imaging neuroimaging and tool development.",
        },
      ],

      faqs: [
        {
          question: "What is the duration of this course?",
          answer:
            "This course is designed to be completed in 3 months with live weekend sessions.",
        },
        {
          question: "How long can I access the learning content?",
          answer:
            "You will have access to the learning content for 6 months from the course start date.",
        },
        {
          question: "How much time do I need to invest in this course?",
          answer:
            "The course requires approximately 6-8 hours per week including live sessions and self-study.",
        },
        {
          question: "What is the duration of the synchronous weekend session?",
          answer:
            "The live weekend sessions are typically 3-4 hours long, conducted on Saturdays or Sundays.",
        },
        {
          question: "Will I be awarded a certificate upon course completion?",
          answer:
            "Yes, you will receive a joint certificate from Indian Institute of Science and Aster Health Academy upon successful completion.",
        },
        {
          question: "Is financial aid available for participants?",
          answer:
            "We offer various payment plans and scholarships for eligible candidates. Please contact our support team for more details.",
        },
        {
          question: "Is there a refund policy?",
          answer:
            "Yes, we have a 7-day refund policy from the course start date. Please refer to our terms and conditions for complete details.",
        },
      ],

      relatedCourses: [
        {
          title: "Fellowship Level Program in Cardiology",
          description:
            "Gain expertise in pediatric cardiology, preventive care and di...",
          level: "ADVANCED" as Level,
          duration: "16 Months",
          rating: 4.8,
          price: 850000,
        },
        {
          title: "MEM - GMU",
          description:
            "Earn an advanced international degree in Emergency Medicine",
          level: "ADVANCED" as Level,
          duration: "15 Months",
          rating: 4.6,
          price: 650000,
        },
        {
          title: "Fellowship Level Program in Diabetes Mellitus",
          description:
            "Understand and identify types of diseases, address complications...",
          level: "ADVANCED" as Level,
          duration: "15 Months",
          rating: 4.7,
          price: 950000,
        },
      ],
    },

    {
      id: 3,
      title: "MSM - GMU Advanced International degree in Emergency Medicine",
      slug: "msm-gmu-emergency-medicine",
      provider: "George Washington University",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.9,
      reviews: 156,
      price: 500000,
      originalPrice: 600000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "clinical",
      shortDescription: "International degree program in emergency medicine",
      tags: ["Emergency Medicine", "International", "Degree"],
      enrolledStudents: 450,
      featured: true,

      subtitle: "Gain global expertise in Emergency Medicine",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Build strong emergency medicine skills aligned with international standards",
        "Hands-on clinical exposure through real-time emergency scenarios",
        "Learn from world-renowned emergency specialists and physicians",
        "Opportunity for global networking and collaboration in emergency medicine",
        "Gain a competitive edge with an international certification",
        "Enhance decision-making and leadership in critical care environments",
      ],

      about:
        "This advanced international program in Emergency Medicine is a collaborative offering with George Washington University. Designed for practicing healthcare professionals, the course delivers a structured and immersive curriculum blending global standards of care with localized emergency scenarios. With access to international faculty, simulation labs, and case-based discussions, participants will develop leadership and clinical skills to manage high-pressure emergency situations confidently.",

      curriculum: [
        {
          module: "Module 1: Fundamentals of Emergency Medicine",
          topics: [
            "Triage & Emergency Assessment",
            "Cardiopulmonary Resuscitation (CPR) Protocols",
            "Initial Trauma Management",
          ],
        },
        {
          module: "Module 2: Advanced Emergency Interventions",
          topics: [
            "Toxicology & Poison Management",
            "Acute Neurological Emergencies",
            "Respiratory & Cardiac Arrest",
          ],
        },
        {
          module: "Module 3: Global Emergency Care Practice",
          topics: [
            "International Emergency Systems",
            "Disaster Management & Humanitarian Response",
            "Ethical and Legal Framework in Emergency Medicine",
          ],
        },
      ],

      targetAudience:
        "Designed for physicians, emergency medical officers, and healthcare practitioners looking to elevate their emergency care capabilities. Also suited for postgraduates and residents preparing for international fellowships or global practice in critical care environments.",

      knowledgePartner:
        "George Washington University brings its legacy of academic excellence and global medical leadership to this program. Learners gain access to internationally benchmarked clinical practices, faculty mentorship, and case simulations based on real emergency medicine experiences in the U.S. and other global regions.",

      faculty: [
        {
          name: "Dr. Amelia Hart",
          title: "Professor of Emergency Medicine",
          department: "School of Medicine, George Washington University",
          bio: "Dr. Hart has over two decades of experience in emergency care, trauma response, and academic instruction. She’s led cross-border training missions and is a strong advocate of evidence-based emergency medicine education.",
        },
        {
          name: "Dr. Rajeev Menon",
          title: "Emergency Medicine Specialist",
          department: "Aster MIMS, India",
          bio: "Dr. Menon has worked extensively in emergency care units across India and the UAE. He bridges the gap between international emergency protocols and their regional applications, making him an ideal mentor for global learners.",
        },
      ],

      faqs: [
        {
          question: "What certification will I receive?",
          answer:
            "You will be awarded a joint certification from Aster Health Academy and George Washington University.",
        },
        {
          question: "Is this program recognized internationally?",
          answer:
            "Yes, this program aligns with international emergency medicine standards and is widely respected.",
        },
        {
          question: "Can I pursue this while working full-time?",
          answer:
            "Yes, the program offers flexible weekend sessions and online modules to suit working professionals.",
        },
      ],

      relatedCourses: [
        {
          title: "Fellowship in Critical Care Medicine",
          description:
            "Enhance your ICU skills with hands-on critical care training.",
          level: "ADVANCED" as Level,
          duration: "12 Months",
          rating: 4.8,
          price: 700000,
        },
        {
          title: "Trauma and Acute Care Fellowship",
          description:
            "Train in managing acute injuries and high-pressure trauma cases.",
          level: "ADVANCED" as Level,
          duration: 3,
          rating: 4.7,
          price: 680000,
        },
      ],
    },
    {
      id: 4,
      title: "Fellowship Level Training in Emergency Medicine",
      slug: "fellowship-emergency-medicine",
      provider: "Medical College",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.8,
      reviews: 234,
      price: 150000,
      originalPrice: 180000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "clinical",
      shortDescription: "Comprehensive fellowship training program",
      tags: ["Fellowship", "Emergency Medicine", "Clinical"],
      enrolledStudents: 320,
      featured: false,

      subtitle: "Become a clinical leader in Emergency Medicine",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Develop advanced emergency care and triage skills",
        "Hands-on training in emergency departments under supervision",
        "Gain experience in managing critical cases in real-time",
        "Participate in interdisciplinary trauma simulations",
        "Build clinical confidence in handling high-risk patients",
      ],

      about:
        "This Fellowship in Emergency Medicine is tailored for doctors and healthcare providers looking to deepen their expertise in critical care and emergency services. With real-time exposure in emergency wards and trauma units, this 12-month program empowers professionals with essential clinical, procedural, and decision-making skills for fast-paced medical environments.",

      curriculum: [
        {
          module: "Module 1: Core Concepts of Emergency Medicine",
          topics: [
            "Basic Life Support (BLS)",
            "Advanced Cardiac Life Support (ACLS)",
            "Clinical History & Triage Protocols",
          ],
        },
        {
          module: "Module 2: Emergency Procedures & Trauma",
          topics: [
            "Wound Closure Techniques",
            "Shock Management",
            "Neuroemergency Interventions",
          ],
        },
        {
          module: "Module 3: Rotations & Case-Based Learning",
          topics: [
            "ICU & Emergency Ward Rotations",
            "Case Presentations & Logbook",
            "Research & Audit Projects",
          ],
        },
      ],

      targetAudience:
        "Ideal for MBBS graduates, residents, and junior doctors preparing for emergency department roles or seeking specialization in trauma and acute care settings.",

      knowledgePartner:
        "This course is conducted in collaboration with leading tertiary hospitals and accredited medical colleges offering real-world case exposure and evidence-based practice under senior consultants.",

      faculty: [
        {
          name: "Dr. Sneha Verma",
          title: "Senior Consultant – Emergency Medicine",
          department: "Apollo Emergency Services",
          bio: "Dr. Sneha has over 15 years of ER experience and trains residents across India. Her teaching style focuses on decision-making, ethical care, and patient stabilization strategies.",
        },
        {
          name: "Dr. Ajay Nair",
          title: "Professor & Head, Emergency Medicine",
          department: "Medical College, Kerala",
          bio: "Dr. Nair leads trauma simulations and is involved in national emergency curriculum design. He has published over 30 clinical research papers.",
        },
      ],

      faqs: [
        {
          question: "Is this a recognized fellowship?",
          answer:
            "Yes, it's accredited by medical education bodies and supported by a recognized college hospital network.",
        },
        {
          question: "Can I do this after my MBBS?",
          answer:
            "Yes, MBBS graduates are eligible. Clinical experience is a plus.",
        },
        {
          question: "Will I get hands-on exposure?",
          answer:
            "Yes, over 50% of the course is dedicated to hospital-based training.",
        },
      ],

      relatedCourses: [
        {
          title: "Advanced Emergency Procedures Workshop",
          description: "Short-term intensive skill-based course",
          level: "ADVANCED" as Level,
          duration: "2 Weeks",
          rating: 4.6,
          price: 25000,
        },
        {
          title: "Critical Care Fellowship",
          description:
            "One-year program focused on ICU skills and ventilator care",
          level: "ADVANCED" as Level,
          duration: "12 Months",
          rating: 4.8,
          price: 720000,
        },
      ],
    },
    {
      id: 5,
      title: "MSM - GMU Advanced International degree in Emergency Medicine",
      slug: "msm-gmu-emergency-medicine",
      provider: "George Washington University",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.9,
      reviews: 178,
      price: 500000,
      originalPrice: 600000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "clinical",
      shortDescription: "International degree program in emergency medicine",
      tags: ["Emergency Medicine", "International", "Degree"],
      enrolledStudents: 600,
      featured: true,

      subtitle: "Master global standards in emergency healthcare",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Certification recognized internationally",
        "Taught by global emergency medicine faculty",
        "Get practical insights from international case studies",
        "Understand humanitarian emergency responses",
        "Network with global healthcare peers",
      ],

      about:
        "The MSM-GMU program is your gateway to becoming an internationally recognized emergency care leader. Through immersive training, collaborative online modules, and global case discussions, this program prepares you to tackle emergencies from a worldwide perspective.",

      curriculum: [
        {
          module: "Module 1: Global Emergency Practice",
          topics: [
            "US-based Emergency Systems",
            "International Rescue Protocols",
            "Health Policy in Emergency Medicine",
          ],
        },
        {
          module: "Module 2: Simulation & Strategy",
          topics: [
            "Case-Based Disaster Simulations",
            "Virtual Emergency Response Labs",
            "Collaborative Global Projects",
          ],
        },
      ],

      targetAudience:
        "Doctors and healthcare workers with 2+ years of clinical experience, aiming for international certification or migration pathways.",

      knowledgePartner:
        "George Washington University offers academic content, faculty mentorship, and remote interactive training for this program, ensuring top-tier international standards.",

      faculty: [
        {
          name: "Dr. Ethan Morales",
          title: "Global Emergency Educator",
          department: "GWU International Medical Programs",
          bio: "Dr. Morales has trained doctors in over 12 countries in mass casualty and humanitarian response.",
        },
      ],

      faqs: [
        {
          question: "Do I need a visa for any in-person module?",
          answer:
            "No, the course is fully online with optional international exposure trips.",
        },
        {
          question: "Is this degree accepted by hospitals abroad?",
          answer:
            "Yes, it aligns with U.S. and WHO guidelines for emergency medicine.",
        },
      ],

      relatedCourses: [
        {
          title: "Fellowship in Disaster & Trauma Medicine",
          description: "Train for crisis and humanitarian healthcare roles",
          level: "ADVANCED" as Level,
          duration: 3,
          rating: 4.9,
          price: 850000,
        },
      ],
    },
    {
      id: 8,
      title: "Advanced Program in Critical Care Medicine",
      slug: "advanced-critical-care-medicine",
      provider: "Aster Critical Care Institute",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.9,
      reviews: 192,
      price: 220000,
      originalPrice: 260000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_critical_care_banner.jpg",
      category: "clinical",
      shortDescription:
        "Hands-on training in managing complex ICU cases and emergencies",
      tags: ["Critical Care", "ICU", "Emergency"],
      enrolledStudents: 520,
      featured: true,

      subtitle:
        "Master intensive care protocols and emergency response strategies",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Understand critical care systems and protocols",
        "Handle ventilator management and life support systems",
        "Work in real ICU settings under expert supervision",
        "Gain skills in emergency airway management",
        "Certifications in ACLS and BLS included",
      ],

      about:
        "This program is designed to train healthcare professionals in the nuances of critical care management. From understanding ICU protocols to performing advanced life-saving procedures, this course bridges the gap between theoretical knowledge and real-time emergency response. Participants will gain exposure through simulations, mentorship, and live ICU rounds with expert faculty.",

      curriculum: [
        {
          module: "Module 1: ICU Protocols and Patient Safety",
          topics: ["ICU Setup", "Monitoring Devices", "Infection Control"],
        },
        {
          module: "Module 2: Advanced Life Support",
          topics: [
            "ACLS & BLS",
            "Airway Management",
            "Cardiac Arrest Response",
          ],
        },
        {
          module: "Module 3: Organ Support Systems",
          topics: ["Ventilator Support", "Dialysis in ICU", "Shock Management"],
        },
      ],

      targetAudience:
        "This program is tailored for doctors, nurses, medical interns, emergency responders, and allied health professionals interested in working in high-pressure ICU environments or pursuing careers in critical care.",

      knowledgePartner:
        "This course is offered in collaboration with Aster CMI Critical Care Unit, with inputs from senior intensivists and emergency medicine specialists across the country.",

      faculty: [
        {
          name: "Dr. Rakesh Shetty",
          title: "Head of Critical Care",
          department: "Aster Hospitals",
          bio: "Dr. Rakesh has over 15 years of experience in critical care medicine, leading multiple ICU units. His research focuses on improving rapid response systems and managing sepsis in emergency cases.",
        },
        {
          name: "Dr. Neha Raj",
          title: "Pulmonologist & Intensivist",
          department: "Aster RV",
          bio: "Dr. Neha is a dual-trained expert in respiratory medicine and intensive care. She is passionate about teaching emergency preparedness and ventilation protocols.",
        },
      ],

      faqs: [
        {
          question: "Does this course include certifications?",
          answer:
            "Yes, participants receive ACLS and BLS certifications upon completion.",
        },
        {
          question: "Are practical ICU sessions included?",
          answer: "Yes, hands-on ICU exposure is a key part of the course.",
        },
      ],

      relatedCourses: [
        {
          title: "Fellowship in Pulmonology and Respiratory Care",
          description:
            "Master respiratory critical care and ventilator support",
          level: "ADVANCED" as Level,
          duration: 3,
          rating: 4.8,
          price: 195000,
        },
        {
          title: "Emergency Medicine Fellowship",
          description:
            "Comprehensive emergency medicine training for healthcare professionals",
          level: "ADVANCED" as Level,
          duration: "12 Months",
          rating: 4.7,
          price: 150000,
        },
      ],
    },
    {
      id: 9,
      title: "Fellowship in Pulmonology and Respiratory Care",
      slug: "fellowship-pulmonology-care",
      provider: "National Respiratory Institute",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.8,
      reviews: 168,
      price: 195000,
      originalPrice: 230000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "clinical",
      shortDescription:
        "In-depth fellowship in respiratory medicine, asthma, and COPD management",
      tags: ["Pulmonology", "Respiratory", "Clinical"],
      enrolledStudents: 410,
      featured: true,

      subtitle:
        "Advance your skills in pulmonology and respiratory diagnostics",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Understand pathophysiology of common pulmonary disorders",
        "Interpret PFTs, chest imaging, and lab reports",
        "Develop treatment plans for asthma, COPD, and TB",
        "Perform bronchoscopy under expert guidance",
      ],

      about:
        "This specialized fellowship prepares healthcare providers to effectively diagnose and manage pulmonary conditions. Participants will gain both theoretical knowledge and practical skills in respiratory diagnostics, patient management, and critical respiratory care through workshops, case studies, and hospital postings.",

      curriculum: [
        {
          module: "Module 1: Respiratory Physiology and Diagnostics",
          topics: [
            "Pulmonary Function Tests",
            "Radiology Interpretation",
            "ABG Analysis",
          ],
        },
        {
          module: "Module 2: Disease Management",
          topics: [
            "Asthma",
            "COPD",
            "Tuberculosis",
            "Interstitial Lung Disease",
          ],
        },
        {
          module: "Module 3: Critical Care Pulmonology",
          topics: ["Ventilation Strategies", "Bronchoscopy", "ARDS Management"],
        },
      ],

      targetAudience:
        "Designed for physicians, general practitioners, internal medicine residents, and pulmonology aspirants who want to upskill in respiratory medicine and critical care.",

      knowledgePartner:
        "National Respiratory Institute, with support from Aster Respiratory Research Labs.",

      faculty: [
        {
          name: "Dr. Imran Qureshi",
          title: "Senior Pulmonologist",
          department: "Respiratory Care, Aster Hospital",
          bio: "With over 12 years in respiratory medicine, Dr. Qureshi specializes in advanced bronchoscopy and tuberculosis care.",
        },
        {
          name: "Dr. Asha Menon",
          title: "Pulmonary Intensivist",
          department: "Aster Specialty Clinics",
          bio: "Dr. Asha is experienced in ICU pulmonary cases and leads workshops on ventilator management and diagnostics.",
        },
      ],

      faqs: [
        {
          question: "Is this course suitable for MBBS graduates?",
          answer: "Yes, MBBS graduates with interest in pulmonology can apply.",
        },
        {
          question: "Are clinical rotations included?",
          answer:
            "Yes, the program includes rotations in ICU and respiratory wards.",
        },
      ],

      relatedCourses: [
        {
          title: "Advanced Program in Critical Care Medicine",
          description: "Hands-on ICU training with real patient exposure",
          level: "ADVANCED" as Level,
          duration: "9 Months",
          rating: 4.9,
          price: 220000,
        },
        {
          title: "Internal Medicine Essentials",
          description:
            "Build your foundations in general medicine and diagnostics",
          level: "ADVANCED" as Level,
          duration: "6 Months",
          rating: 4.6,
          price: 130000,
        },
      ],
    },

    {
      id: 6,
      title: "Fellowship Level Program in Pediatric Cardiology",
      slug: "fellowship-pediatric-cardiology",
      provider: "Cardiac Institute",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.8,
      reviews: 145,
      price: 180000,
      originalPrice: 200000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "clinical",
      shortDescription: "Specialized training in pediatric cardiology",
      tags: ["Cardiology", "Fellowship", "Pediatrics"],
      enrolledStudents: 350,
      featured: false,

      subtitle: "Train in diagnosing and treating heart conditions in children",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Gain expertise in congenital and acquired heart conditions in children",
        "Learn pediatric ECG, echocardiography, and diagnostic catheterization",
        "Master emergency cardiac care in pediatric settings",
        "Understand interdisciplinary collaboration with neonatology and pediatrics",
        "Perform supervised hands-on procedures in pediatric cardiology labs",
      ],

      about:
        "This fellowship is meticulously designed for medical professionals aiming to specialize in pediatric cardiology. It offers a blend of clinical exposure, academic learning, and procedural practice. The curriculum focuses on diagnosis, management, and surgical decision-making for cardiac conditions affecting children, from newborns to adolescents.",

      curriculum: [
        {
          module: "Module 1: Foundations of Pediatric Cardiology",
          topics: [
            "Pediatric Cardiac Anatomy",
            "Hemodynamics",
            "Fetal Circulation",
          ],
        },
        {
          module: "Module 2: Diagnostics and Imaging",
          topics: ["Pediatric ECG", "Echocardiography", "MRI/CT in Cardiology"],
        },
        {
          module: "Module 3: Interventions and Care",
          topics: [
            "Heart Failure in Children",
            "Rheumatic Heart Disease",
            "Post-operative Management",
          ],
        },
      ],

      targetAudience:
        "This program is ideal for MBBS doctors, pediatricians, and internal medicine residents seeking to specialize in pediatric cardiology and improve outcomes for children with heart conditions.",

      knowledgePartner:
        "Cardiac Institute, in partnership with leading children's hospitals and Aster Pediatric Cardiology Department.",

      faculty: [
        {
          name: "Dr. Anjali Mehra",
          title: "Senior Consultant - Pediatric Cardiology",
          department: "Aster Children's Heart Center",
          bio: "Dr. Mehra has over 10 years of experience treating congenital heart defects and leads pediatric cath lab procedures. She is a passionate educator and has published multiple papers on pediatric heart failure.",
        },
        {
          name: "Dr. Ramesh Bhat",
          title: "Professor - Pediatric Cardiac Surgery",
          department: "Cardiac Institute",
          bio: "Dr. Ramesh is a veteran cardiac surgeon with expertise in neonatal surgeries. He has trained dozens of fellows in pediatric surgery techniques and intensive post-op care.",
        },
      ],

      faqs: [
        {
          question: "Can general pediatricians enroll in this course?",
          answer:
            "Yes, pediatricians looking to sub-specialize in cardiology are encouraged to apply.",
        },
        {
          question: "Will I get hands-on training?",
          answer:
            "Yes, hands-on clinical training and cath lab exposure are provided under expert guidance.",
        },
      ],

      relatedCourses: [
        {
          title: "Fellowship in Neonatology and Infant Care",
          description:
            "Master advanced care for neonates and high-risk infants",
          level: "ADVANCED" as Level,
          duration: "12 Months",
          rating: 4.7,
          price: 175000,
        },
        {
          title: "Fellowship in Pediatric Emergency Medicine",
          description:
            "Train in acute care scenarios and emergency responses in children",
          level: "ADVANCED" as Level,
          duration: "9 Months",
          rating: 4.6,
          price: 165000,
        },
      ],
    },
    {
      id: 7,
      title: "Diabetes Mellitus Management Care",
      slug: "diabetes-management-care",
      provider: "Diabetes Foundation",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.7,
      reviews: 267,
      price: 125000,
      originalPrice: 140000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "clinical",
      shortDescription: "Effective care and management for diabetes",
      tags: ["Endocrinology", "Chronic Care", "Lifestyle"],
      enrolledStudents: 780,
      featured: false,

      subtitle:
        "Master practical approaches for managing diabetes in clinical practice",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Understand pathophysiology and types of diabetes",
        "Create individualized treatment plans based on patient profiles",
        "Master insulin therapy, oral agents, and lifestyle management",
        "Prevent and manage acute and chronic diabetes complications",
        "Use digital tools and apps for patient engagement and monitoring",
      ],

      about:
        "This course is aimed at equipping healthcare professionals with the skills required to provide effective, patient-centered diabetes care. The curriculum is designed to bridge theory and real-world application, helping you master essential treatment protocols, lifestyle interventions, and the latest technologies in chronic care.",

      curriculum: [
        {
          module: "Module 1: Basics of Diabetes",
          topics: [
            "Type 1 and Type 2 Diabetes",
            "Gestational Diabetes",
            "Risk Factors",
          ],
        },
        {
          module: "Module 2: Treatment and Monitoring",
          topics: [
            "Insulin Therapy",
            "Blood Glucose Monitoring",
            "Digital Health Apps",
          ],
        },
        {
          module: "Module 3: Long-Term Management",
          topics: [
            "Foot Care",
            "Renal & Eye Health",
            "Patient Education & Motivation",
          ],
        },
      ],

      targetAudience:
        "General physicians, endocrinologists, nurses, and diabetes educators looking to deepen their understanding of diabetes management and improve patient outcomes.",

      knowledgePartner:
        "Diabetes Foundation in collaboration with Aster Endocrinology Department.",

      faculty: [
        {
          name: "Dr. Rekha Sinha",
          title: "Endocrinologist",
          department: "Aster Center for Endocrinology",
          bio: "Dr. Rekha has over 15 years of experience managing diabetes and thyroid disorders. She is passionate about chronic disease care, digital health, and patient education.",
        },
        {
          name: "Dr. Vikram Jain",
          title: "Diabetologist",
          department: "Diabetes Foundation India",
          bio: "Dr. Jain leads national programs in diabetes prevention and treatment, with a focus on lifestyle medicine and public health policy.",
        },
      ],

      faqs: [
        {
          question: "Is this course suitable for MBBS graduates?",
          answer:
            "Yes, MBBS graduates and practitioners interested in diabetes care are eligible.",
        },
        {
          question: "Do I need prior endocrinology experience?",
          answer:
            "No, the course is designed to cater to all clinical backgrounds.",
        },
      ],

      relatedCourses: [
        {
          title: "Thyroid and Metabolic Syndrome Management",
          description:
            "Gain advanced insight into common metabolic conditions.",
          level: "ADVANCED" as Level,
          duration: "3 Months",
          rating: 4.5,
          price: 95000,
        },
      ],
    },
    {
      id: 10,
      title: "Critical Care Medicine Master Critical Care Essentials",
      slug: "critical-care-medicine-essentials",
      provider: "ICU Academy",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.9,
      reviews: 198,
      price: 220000,
      originalPrice: 250000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "clinical",
      shortDescription: "Master critical care concepts and protocols",
      tags: ["Critical Care", "ICU", "Advanced"],
      enrolledStudents: 410,
      featured: true,

      subtitle:
        "Build mastery over ICU protocols and emergency decision-making",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Master ICU admission and triage procedures",
        "Interpret ABG, ECG, ventilator and monitoring parameters",
        "Handle sepsis, cardiac arrest, and trauma protocols with confidence",
        "Collaborate effectively in multidisciplinary ICU teams",
        "Be ready for board certification in critical care",
      ],

      about:
        "This program is structured for physicians and medical staff working in or transitioning into intensive care. It blends rigorous academic knowledge with real-life simulation-based training to ensure confident, life-saving decision-making in ICU environments.",

      curriculum: [
        {
          module: "Module 1: ICU Fundamentals",
          topics: ["ICU Setup", "Monitoring Equipment", "Airway Management"],
        },
        {
          module: "Module 2: Emergency Care & Stabilization",
          topics: [
            "Sepsis Protocols",
            "Trauma Management",
            "Shock & Resuscitation",
          ],
        },
        {
          module: "Module 3: Advanced Critical Care",
          topics: [
            "Ventilator Management",
            "Organ Support",
            "Ethical Decision Making",
          ],
        },
      ],

      targetAudience:
        "MBBS graduates, internal medicine residents, emergency medicine doctors, and anesthetists looking to specialize or gain expertise in ICU settings.",

      knowledgePartner:
        "ICU Academy, in collaboration with Aster Critical Care Division.",

      faculty: [
        {
          name: "Dr. Sushant Desai",
          title: "Director - Critical Care",
          department: "Aster Hospitals ICU Network",
          bio: "Dr. Desai has been leading ICUs for over 20 years with vast experience in high-acuity care and intensive protocol development.",
        },
        {
          name: "Dr. Meenakshi Rao",
          title: "Pulmonologist & Intensivist",
          department: "ICU Academy",
          bio: "Dr. Rao blends expertise in pulmonary and critical care to train ICU doctors. She has led numerous workshops across South Asia on ICU best practices.",
        },
      ],

      faqs: [
        {
          question: "Is the course entirely online?",
          answer:
            "It includes both online modules and optional in-person simulation labs.",
        },
        {
          question: "Will I receive ICU certification?",
          answer:
            "Yes, upon completion you will receive a certificate in Critical Care Essentials.",
        },
      ],

      relatedCourses: [
        {
          title: "Pulmonary Critical Care",
          description: "In-depth training for ICU and respiratory emergencies.",
          level: "Advanced",
          duration: "9 Months",
          rating: 4.8,
          price: 275000,
        },
      ],
    },
    {
      id: 11,
      title: "Healthcare Service Excellence",
      slug: "healthcare-service-excellence",
      provider: "Management Institute",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.6,
      reviews: 234,
      price: 75000,
      originalPrice: 90000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "management",
      shortDescription: "Deliver excellent service in healthcare",
      tags: ["Service", "Leadership", "Excellence"],
      enrolledStudents: 680,
      featured: false,

      subtitle:
        "Transform patient experience with exceptional service delivery",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),
      outcomes: [
        "Develop a service-first mindset in healthcare settings",
        "Implement patient-centric communication and empathy techniques",
        "Drive operational efficiency without compromising compassion",
        "Elevate standards of excellence in hospital and clinical environments",
        "Handle feedback and conflict in a healthcare context",
      ],

      about:
        "This course helps healthcare professionals and managers build a culture of excellence in patient service delivery. You'll explore practical tools and strategies for ensuring seamless patient journeys, high satisfaction scores, and empowered front-line staff.",

      curriculum: [
        {
          module: "Module 1: Foundations of Healthcare Excellence",
          topics: [
            "What is Service Excellence?",
            "Benchmarking Best Practices",
            "Patient Expectations",
          ],
        },
        {
          module: "Module 2: Communication and Empathy",
          topics: [
            "Active Listening",
            "Handling Complaints",
            "Non-verbal Signals",
          ],
        },
        {
          module: "Module 3: Leadership in Service Quality",
          topics: [
            "Creating Culture",
            "Training Teams",
            "Metrics for Excellence",
          ],
        },
      ],

      targetAudience:
        "Hospital managers, patient relationship officers, front desk staff, nurses, and anyone involved in service delivery within healthcare.",

      knowledgePartner:
        "Aster Service Excellence Office & Management Institute of India",

      faculty: [
        {
          name: "Dr. Neha Sharma",
          title: "Professor of Healthcare Management",
          department: "Management Institute",
          bio: "Dr. Neha brings over 20 years of experience in patient satisfaction strategy and healthcare HR. She has helped transform service delivery in multiple hospital networks.",
        },
      ],

      faqs: [
        {
          question: "Is this course only for hospital staff?",
          answer:
            "No, the course benefits anyone working in patient-facing healthcare roles.",
        },
        {
          question: "Will there be real-world case studies?",
          answer: "Yes, case-based learning is a key feature of the program.",
        },
      ],

      relatedCourses: [
        {
          title: "Healthcare Leadership Essentials",
          description:
            "Learn how to lead teams and services in clinical environments.",
          level: "Advanced",
          duration: "6 Months",
          rating: 4.8,
          price: 120000,
        },
      ],
    },
    {
      id: 12,
      title: "Developing Operational Diabetes Management Programs",
      slug: "operational-diabetes-management",
      provider: "Healthcare Leaders",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.7,
      reviews: 189,
      price: 65000,
      originalPrice: 80000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "management",
      shortDescription: "Design and implement diabetes care programs",
      tags: ["Operations", "Diabetes", "Strategy"],
      enrolledStudents: 540,
      featured: false,

      subtitle:
        "Build scalable, impactful diabetes programs for population health",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Understand the components of a successful diabetes program",
        "Map patient journeys for better engagement and outcomes",
        "Design data-driven monitoring and follow-up strategies",
        "Plan logistics, workforce, and budgets efficiently",
        "Evaluate program success with KPIs and health metrics",
      ],

      about:
        "This course is perfect for program managers, healthcare executives, and public health professionals tasked with rolling out or improving diabetes programs at scale. Learn best practices in operations, patient flow, and long-term care planning for chronic disease management.",

      curriculum: [
        {
          module: "Module 1: Program Design Fundamentals",
          topics: [
            "Types of Diabetes Programs",
            "Patient Lifecycle",
            "Program Goals",
          ],
        },
        {
          module: "Module 2: Operational Planning",
          topics: ["Staffing", "Supplies & Labs", "Data Capture"],
        },
        {
          module: "Module 3: Measuring & Scaling",
          topics: [
            "KPIs",
            "Sustainability Models",
            "Health System Integration",
          ],
        },
      ],

      targetAudience:
        "Healthcare operations managers, NGO staff, chronic care consultants, and government health officers involved in NCD programs.",

      knowledgePartner:
        "Healthcare Leaders & Aster Diabetes Specialty Division",

      faculty: [
        {
          name: "Dr. Anuj Verma",
          title: "Program Director - Chronic Care",
          department: "Healthcare Leaders",
          bio: "Dr. Verma has led state-level diabetes care initiatives and published several research papers on NCD care operations and program effectiveness.",
        },
      ],

      faqs: [
        {
          question: "Is this course practical or theoretical?",
          answer:
            "It is a hands-on course with templates, frameworks, and real-world program design exercises.",
        },
        {
          question: "Do I need clinical experience?",
          answer:
            "No, the course is focused on operations and strategy, suitable for non-clinical managers as well.",
        },
      ],

      relatedCourses: [
        {
          title: "Chronic Care Coordination",
          description:
            "Coordinate care across primary and specialty for chronic diseases.",
          level: "ADVANCED" as Level,
          duration: "4 Months",
          rating: 4.6,
          price: 88000,
        },
      ],
    },
    {
      id: 13,
      title: "Patient Safety and Risk Management",
      slug: "patient-safety-risk-management",
      provider: "Safety Institute",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.8,
      reviews: 156,
      price: 80000,
      originalPrice: 95000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "management",
      shortDescription: "Manage patient safety and healthcare risk",
      tags: ["Risk", "Quality", "Safety"],
      enrolledStudents: 420,
      featured: false,

      subtitle:
        "Build safer systems and reduce risk in healthcare environments",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Recognize and reduce common patient safety risks",
        "Implement safety protocols and compliance checklists",
        "Build a culture of transparency and non-punitive reporting",
        "Use tools like RCA (Root Cause Analysis) and FMEA (Failure Mode and Effects Analysis)",
        "Prepare and respond effectively to medical incidents",
      ],

      about:
        "This program prepares healthcare professionals and administrators to lead patient safety initiatives and manage healthcare risk proactively. The course combines real-world case studies, system improvement tools, and a focus on compliance to ensure better patient outcomes and safety culture.",

      curriculum: [
        {
          module: "Module 1: Introduction to Patient Safety",
          topics: ["Safety Culture", "Types of Errors", "Incident Reporting"],
        },
        {
          module: "Module 2: Risk Assessment & Management",
          topics: [
            "Hazard Identification",
            "RCA & FMEA",
            "Risk Reduction Tools",
          ],
        },
        {
          module: "Module 3: Policy & Legal Aspects",
          topics: [
            "Accreditation",
            "Regulatory Requirements",
            "Medical Negligence",
          ],
        },
      ],

      targetAudience:
        "Hospital administrators, safety officers, quality control managers, nursing heads, clinicians, and accreditation teams.",

      knowledgePartner: "National Healthcare Safety Council",

      faculty: [
        {
          name: "Dr. Rakesh Narayanan",
          title: "Professor of Hospital Safety and Quality",
          department: "Safety Institute",
          bio: "Dr. Rakesh is a pioneer in hospital risk mitigation strategies and has advised over 50 healthcare facilities on safety protocols.",
        },
      ],

      faqs: [
        {
          question:
            "Is this course suitable for clinical and non-clinical staff?",
          answer:
            "Yes, anyone involved in safety and risk roles can benefit from this course.",
        },
        {
          question: "Will there be practical exercises?",
          answer:
            "Yes, including case analysis, checklists, and simulated incident responses.",
        },
      ],

      relatedCourses: [
        {
          title: "Healthcare Quality Improvement Tools",
          description:
            "Implement proven frameworks to elevate healthcare quality.",
          level: "ADVANCED" as Level,
          duration: 3,
          rating: 4.7,
          price: 70000,
        },
      ],
    },
    {
      id: 14,
      title: "Healthcare Quality Improvement Tools",
      slug: "healthcare-quality-tools",
      provider: "Quality Academy",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.7,
      reviews: 201,
      price: 70000,
      originalPrice: 85000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "management",
      shortDescription: "Implement quality tools in healthcare",
      tags: ["Quality", "Tools", "Improvement"],
      enrolledStudents: 340,
      featured: false,

      subtitle: "Apply effective tools to boost healthcare process efficiency",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),

      outcomes: [
        "Understand quality frameworks like Lean, Six Sigma, and PDCA",
        "Use root cause analysis and control charts for monitoring",
        "Design and deploy improvement projects in clinical settings",
        "Track KPIs and measure success using dashboard metrics",
        "Improve staff engagement through structured problem-solving",
      ],

      about:
        "Learn how to elevate quality standards using tools widely adopted across hospitals worldwide. This course introduces data-driven methodologies that empower teams to solve problems, reduce waste, and improve care delivery consistently.",

      curriculum: [
        {
          module: "Module 1: Basics of Quality Improvement",
          topics: ["PDCA Cycle", "Total Quality Management", "ISO and NABH"],
        },
        {
          module: "Module 2: Lean and Six Sigma Tools",
          topics: ["5S", "DMAIC", "Value Stream Mapping"],
        },
        {
          module: "Module 3: Monitoring and Sustaining Quality",
          topics: ["KPI Tracking", "Control Charts", "Audit Cycles"],
        },
      ],

      targetAudience:
        "Quality managers, auditors, operations teams, nurses, and administrative staff aiming to improve healthcare delivery.",

      knowledgePartner: "National Quality Council (NQC)",

      faculty: [
        {
          name: "Ms. Aruna Patel",
          title: "Quality Consultant & Trainer",
          department: "Quality Academy",
          bio: "Aruna is a Six Sigma Black Belt and ISO auditor with 15+ years of experience in healthcare quality management and accreditation consulting.",
        },
      ],

      faqs: [
        {
          question: "Will this course prepare me for NABH audits?",
          answer:
            "Yes, many tools and frameworks covered align with NABH guidelines.",
        },
        {
          question: "Do I get templates and real-world samples?",
          answer:
            "Absolutely. You’ll get access to downloadable tools and sample reports.",
        },
      ],

      relatedCourses: [
        {
          title: "Patient Safety and Risk Management",
          description:
            "Manage risk and improve safety across healthcare systems.",
          level: "ADVANCED" as Level,
          duration: "3 Months",
          rating: 4.8,
          price: 80000,
        },
      ],
    },
    {
      id: 15,
      title: "Certificate in Healthcare Quality Management",
      slug: "certificate-healthcare-quality",
      provider: "Quality Institute",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.8,
      reviews: 167,
      price: 95000,
      originalPrice: 110000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "management",
      shortDescription: "Professional certification in healthcare quality",
      tags: ["Quality", "Certification", "Accreditation"],
      enrolledStudents: 290,
      featured: false,
      subtitle: "Advance your career with quality and safety practices",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),
      outcomes: [
        "Understand key principles of quality assurance in healthcare",
        "Apply accreditation and compliance frameworks effectively",
        "Lead quality improvement initiatives in hospitals",
        "Gain confidence in clinical audit and risk mitigation",
      ],
      about:
        "This course empowers healthcare professionals with comprehensive knowledge in quality management systems. It covers accreditation standards, safety protocols, performance measurement, and improvement planning to foster a culture of excellence.",
      curriculum: [
        {
          module: "Module 1: Introduction to Quality in Healthcare",
          topics: [
            "History & Evolution",
            "Quality Definitions",
            "Global Best Practices",
          ],
        },
        {
          module: "Module 2: Accreditation & Certification Standards",
          topics: [
            "NABH, JCI Overview",
            "Compliance Processes",
            "Audit Management",
          ],
        },
        {
          module: "Module 3: Quality Improvement Tools",
          topics: ["PDCA Cycle", "Root Cause Analysis", "Benchmarking"],
        },
      ],
      targetAudience:
        "Ideal for hospital administrators, quality managers, clinicians, and nurses aiming to enhance patient safety and compliance.",
      knowledgePartner:
        "Endorsed by leading Quality Institutes and NABH advisors.",
      faculty: [
        {
          name: "Dr. Anjana Rao",
          title: "Quality & Accreditation Consultant",
          department: "Healthcare Quality Board",
          bio: "Expert in NABH & JCI audits with 15+ years of experience in hospital quality improvement.",
        },
      ],
      faqs: [
        {
          question: "Is this course NABH-aligned?",
          answer: "Yes, it includes modules based on NABH standards.",
        },
      ],
      relatedCourses: [
        {
          title: "Healthcare Quality Improvement Tools",
          description: "Implement quality tools in healthcare",
          level: "ADVANCED" as Level,
          duration: 3,
          rating: 4.7,
          price: 70000,
        },
      ],
    },
    {
      id: 16,
      title: "Certificate in Service Excellence in Healthcare",
      slug: "certificate-service-excellence",
      provider: "Service Academy",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.7,
      reviews: 143,
      price: 85000,
      originalPrice: 100000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "practice-excellence",
      shortDescription: "Drive service excellence in hospitals",
      tags: ["Service", "Experience", "Communication"],
      enrolledStudents: 310,
      featured: true,
      subtitle: "Deliver unforgettable experiences in healthcare",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),
      outcomes: [
        "Develop empathy-driven communication strategies",
        "Implement service design best practices",
        "Manage patient expectations and feedback",
        "Strengthen service leadership in care delivery",
      ],
      about:
        "The course equips frontline staff and healthcare leaders with service excellence principles, patient-centric care models, and communication techniques to improve HCAHPS scores and patient loyalty.",
      curriculum: [
        {
          module: "Module 1: Foundations of Service Excellence",
          topics: ["Empathy & Compassion", "Customer Journey Mapping"],
        },
        {
          module: "Module 2: Communication Skills in Healthcare",
          topics: [
            "Verbal & Non-verbal Skills",
            "Difficult Conversations",
            "Conflict Resolution",
          ],
        },
        {
          module: "Module 3: Patient Experience & Satisfaction",
          topics: [
            "Feedback Management",
            "Net Promoter Score",
            "Mystery Audits",
          ],
        },
      ],
      targetAudience:
        "Designed for patient experience officers, nurses, OPD managers, and healthcare reception staff.",
      knowledgePartner:
        "Built in collaboration with hospitality and patient experience specialists.",
      faculty: [
        {
          name: "Mr. Rajeev Nair",
          title: "Patient Experience Consultant",
          department: "Service Innovation",
          bio: "20+ years in healthcare hospitality, formerly at Apollo and Fortis.",
        },
      ],
      faqs: [
        {
          question: "Can this course be done alongside a job?",
          answer: "Yes, the weekend format makes it job-friendly.",
        },
      ],
      relatedCourses: [
        {
          title: "Doctor - Patient Communication",
          description: "Improve doctor-patient communication skills",
          level: "ADVANCED" as Level,
          duration: 3,
          rating: 4.8,
          price: 45000,
        },
      ],
    },
    {
      id: 17,
      title: "Certificate in Infection Prevention & Control",
      slug: "infection-prevention-control",
      provider: "Infection Control Board",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.9,
      reviews: 234,
      price: 60000,
      originalPrice: 75000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "practice-excellence",
      shortDescription: "Prevent and control infection spread",
      tags: ["Infection", "Safety", "Control"],
      enrolledStudents: 370,
      featured: false,
      subtitle:
        "Master infection control protocols and healthcare hygiene best practices",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),
      outcomes: [
        "Understand the science of infection transmission and control",
        "Implement global standard precautions and hygiene practices",
        "Develop facility-level infection prevention strategies",
        "Respond effectively to outbreaks and pandemics",
        "Improve patient safety and reduce hospital-acquired infections",
        "Earn a certificate recognized by national and international healthcare bodies",
      ],
      about:
        "This program is designed to provide healthcare professionals with the essential knowledge and tools to prevent, identify, and control infection spread within clinical environments. Covering everything from sterilization techniques to outbreak response, this course combines evidence-based practices with practical tools to improve patient safety. It is ideal for hospital administrators, nurses, clinical leads, and anyone involved in healthcare quality and safety.",
      curriculum: [
        {
          module: "Module 1: Infection Science & Epidemiology",
          topics: [
            "Types of healthcare-associated infections (HAIs)",
            "Microbiology for infection control",
            "Transmission dynamics",
          ],
        },
        {
          module: "Module 2: Preventive Measures & Protocols",
          topics: [
            "Standard precautions and PPE usage",
            "Sterilization and disinfection",
            "Hand hygiene and environmental cleaning",
          ],
        },
        {
          module: "Module 3: Monitoring, Audits, and Outbreak Management",
          topics: [
            "Infection surveillance systems",
            "Internal audits and control checklists",
            "Outbreak investigation and containment",
          ],
        },
      ],
      targetAudience:
        "This course is ideal for infection control officers, nurses, quality managers, housekeeping supervisors, microbiologists, and clinicians. It's also highly valuable for those managing accreditation or patient safety programs.",
      knowledgePartner:
        "The Infection Control Board brings decades of experience in setting global benchmarks for healthcare hygiene. It collaborates with WHO and CDC protocols to ensure global alignment and best practice delivery.",
      faculty: [
        {
          name: "Dr. Sneha Kulkarni",
          title: "Epidemiologist & Infection Control Expert",
          department: "Global Infection Surveillance Program, ICB",
          bio: "Dr. Sneha has over 15 years of experience in infection prevention and is a WHO-certified trainer in pandemic preparedness. She has trained more than 100 hospitals in South Asia and has led numerous containment strategy programs across public and private sectors.",
        },
        {
          name: "Dr. Amitabh Rao",
          title: "Microbiologist & Hospital Hygiene Consultant",
          department: "Aster PathLabs, Bangalore",
          bio: "Dr. Rao specializes in clinical microbiology and antibiotic stewardship. He contributes to international white papers and hospital safety guidelines and is an advisor to multiple NABH-accredited facilities.",
        },
      ],
      faqs: [
        {
          question: "What is the format of this course?",
          answer:
            "It includes online sessions, case studies, practical toolkits, and interactive assessments.",
        },
        {
          question: "Is it aligned with NABH or JCI standards?",
          answer:
            "Yes, the curriculum aligns with NABH, JCI, and WHO standards for infection prevention and control.",
        },
        {
          question: "Do I need to be from a clinical background to enroll?",
          answer:
            "While a healthcare background is preferred, the course is open to quality officers and facility heads as well.",
        },
        {
          question: "Will I receive a certificate?",
          answer:
            "Yes, you will receive a certificate jointly issued by Aster Health Academy and the Infection Control Board.",
        },
      ],
      relatedCourses: [
        {
          title: "Certificate in Doctor - Patient Communication",
          description:
            "Improve doctor-patient communication skills and patient experience.",
          level: "ADVANCED" as Level,
          duration: 3,
          rating: 4.8,
          price: 45000,
        },
        {
          title: "Healthcare Quality Improvement Tools",
          description:
            "Implement quality tools in healthcare delivery systems.",
          level: "ADVANCED" as Level,
          duration: 3,
          rating: 4.7,
          price: 70000,
        },
        {
          title: "Patient Safety and Risk Management",
          description: "Manage patient safety and healthcare risk efficiently.",
          level: "ADVANCED" as Level,
          duration: "3 Months",
          rating: 4.8,
          price: 80000,
        },
      ],
    },
    {
      id: 18,
      title: "Certificate in Doctor - Patient Communication",
      slug: "doctor-patient-communication",
      provider: "Communication Institute",
      duration: 3,
      level: "ADVANCED" as Level,
      rating: 4.8,
      reviews: 189,
      price: 45000,
      originalPrice: 55000,
      image:
        "https://asterhealthacademy.com/wp-content/uploads/2024/06/course_banner_patient_care_540x310px-539x309-2-300x300-1-299x299.jpg",
      category: "practice-excellence",
      shortDescription: "Improve doctor-patient communication skills",
      tags: ["Doctor", "Patient", "Soft Skills"],
      enrolledStudents: 260,
      featured: false,
      subtitle: "Foster compassionate and effective medical conversations",
      batchStartDate: "2025-01-10T00:00:00.000Z",
      nextReviewDate: new Date("2025-01-28"),
      outcomes: [
        "Develop effective doctor-patient communication skills",
        "Understand the emotional and psychological context of patient care",
        "Learn techniques to build trust and rapport",
        "Enhance empathy and cultural sensitivity in interactions",
        "Use structured tools for difficult conversations and consent",
        "Apply strategies for handling conflicts and patient dissatisfaction",
      ],
      about:
        "This program equips healthcare professionals with essential communication skills to enhance patient trust, satisfaction, and treatment compliance. Effective communication is a cornerstone of quality healthcare delivery. In this course, participants will learn how to conduct consultations with empathy, clarity, and cultural awareness while also mastering methods to handle challenging conversations and reduce medical errors. Ideal for clinicians, this certificate course boosts confidence and improves interpersonal outcomes.",
      curriculum: [
        {
          module: "Module 1: Foundations of Communication",
          topics: [
            "Principles of effective communication",
            "Barriers and biases in medical conversations",
            "Verbal and non-verbal cues",
          ],
        },
        {
          module: "Module 2: Building Rapport and Trust",
          topics: [
            "Empathy and active listening",
            "Understanding patient emotions",
            "Cultural sensitivity and language considerations",
          ],
        },
        {
          module: "Module 3: Advanced Communication in Practice",
          topics: [
            "Breaking bad news",
            "Managing difficult patients",
            "Consent and shared decision-making",
            "End-of-life conversations",
          ],
        },
      ],
      targetAudience:
        "Designed for doctors, nurses, counselors, and all frontline healthcare workers, this course strengthens interpersonal communication and enhances bedside manner. Ideal for those involved in direct patient interaction or healthcare training.",
      knowledgePartner:
        "The Communication Institute is a leader in applied healthcare soft skills training, offering research-based modules developed by experts in clinical psychology and patient education.",
      faculty: [
        {
          name: "Dr. Anjali Mehta",
          title: "Professor of Clinical Psychology",
          department: "Department of Psychiatry, HealthCom Institute",
          bio: "Dr. Mehta specializes in healthcare empathy and patient compliance. With 20+ years of experience in counseling and patient engagement, she has authored several publications and trained over 5,000 clinicians in communication skills.",
        },
        {
          name: "Dr. Ramesh Iyer",
          title: "Medical Communication Coach",
          department: "Aster Health Communication Cell",
          bio: "Dr. Iyer focuses on narrative medicine and teaches advanced doctor-patient interaction. He has designed multiple programs for hospitals and medical colleges to reduce patient complaints and improve trust.",
        },
      ],
      faqs: [
        {
          question: "Is this course fully online?",
          answer:
            "Yes, the course is delivered entirely online with live sessions and recorded modules.",
        },
        {
          question: "Will I receive a certificate?",
          answer:
            "Yes, a certificate will be awarded upon successful completion of the course.",
        },
        {
          question: "Is the course suitable for medical students?",
          answer:
            "Yes, it's perfect for students and professionals in clinical roles looking to enhance their communication.",
        },
        {
          question: "What is the weekly time commitment?",
          answer: "Participants are expected to dedicate 4–6 hours per week.",
        },
      ],
      relatedCourses: [
        {
          title: "Certificate in Healthcare Quality Management",
          description:
            "Professional certification in healthcare quality and standards.",
          level: "ADVANCED",
          duration: "6 Months",
          rating: 4.8,
          price: 95000,
        },
        {
          title: "Certificate in Service Excellence in Healthcare",
          description: "Drive patient satisfaction through service excellence.",
          level: "ADVANCED",
          duration: "4 Months",
          rating: 4.7,
          price: 85000,
        },
        {
          title: "Certificate in Infection Prevention & Control",
          description:
            "Prevent hospital-acquired infections with global best practices.",
          level: "ADVANCED" as Level,
          duration: "3 Months",
          rating: 4.9,
          price: 60000,
        },
      ],
    },
  ];

  await Promise.all(
    courseData.map(async (course) => {
      const createdCourse = await prisma.course.upsert({
        where: { slug: course.slug },
        update: {},
        create: {
          title: course.title,
          slug: course.slug,
          subtitle: course.subtitle,
          shortDescription: course.shortDescription,
          description: "",
          longDescription: "",
          image: course.image,
          price: course.price,
          originalPrice: course.originalPrice,
          duration: course.duration,
          level: course.level,
          status: "DRAFT",
          category: course.category,
          provider: course.provider,
          curriculum: course.curriculum || [],
          isPublished: true,
          batchStartDate: course.batchStartDate
            ? new Date(course.batchStartDate)
            : undefined,
          nextReviewDate: course.nextReviewDate
            ? new Date(course.nextReviewDate)
            : undefined,
          rating: course.rating ?? 0,
          reviews: course.reviews ?? 0,
          enrolledStudents: course.enrolledStudents ?? 0,
          featured: course.featured ?? false,
          about: course.about,
          outcomes: course.outcomes ?? [],
          targetAudience: course.targetAudience,
          knowledgePartner: course.knowledgePartner,
          prerequisites: "",
          passingPercent: 70,
        },
      });
      if (course.relatedCourses?.length) {
        const related = await Promise.all(
          course.relatedCourses.map(async (rel) => {
            const found = await prisma.course.findFirst({
              where: { title: rel.title },
              select: { id: true },
            });
            return found ? { id: found.id } : null;
          })
        );

        const validRelated = related.filter((r): r is { id: string } => !!r);

        if (validRelated.length) {
          await prisma.course.update({
            where: { id: createdCourse.id },
            data: {
              relatedCourses: {
                connect: validRelated,
              },
            },
          });
        }
      }

      // Create related FAQs
      if (course.faqs?.length) {
        await Promise.all(
          course.faqs.map((faq) =>
            prisma.faq.create({
              data: {
                question: faq.question,
                answer: faq.answer,
                course: {
                  connect: { id: createdCourse.id },
                },
              },
            })
          )
        );
      }

      // Create related Faculty
      if (course.faculty?.length) {
        await Promise.all(
          course.faculty.map((member) =>
            prisma.faculty.create({
              data: {
                name: member.name,
                title: member.title,
                department: member.department,
                bio: member.bio,
                course: {
                  connect: { id: createdCourse.id },
                },
              },
            })
          )
        );
      }

      // Handle Tags (many-to-many)
      if (course.tags?.length) {
        await Promise.all(
          course.tags.map(async (tagName) => {
            await prisma.tag.upsert({
              where: {
                name_courseId: {
                  name: tagName,
                  courseId: createdCourse.id,
                },
              },
              update: {},
              create: {
                name: tagName,
                course: {
                  connect: { id: createdCourse.id },
                },
              },
            });
          })
        );
      }
    })
  );

  console.log("✅ Courses seeded successfully");
}

async function main() {
  try {
    console.log("🌱 Starting seed process...");

    const { alice } = await seedUsers();
    console.log("✅ Users seeded");

    await seedCourses();
    console.log("✅ Partners seeded");

    const tagIds = await seedBlogTags();
    console.log("✅ Blog tags seeded");

    await seedBlogPosts(alice.id, tagIds);
    console.log("✅ Blog posts seeded");

    await seedPartners();
    console.log("✅ Partners seeded");

    console.log("🌱 Seed completed successfully!");
  } catch (error) {
    console.error("🔥 Seed failed:", error);
    throw error;
  }
}

main()
  .then(() => {
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("🔥 Seed failed:", e);
    return prisma.$disconnect();
  })
  .finally(() => {
    process.exit(0);
  });
