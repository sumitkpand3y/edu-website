"use client";

import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export function Footer() {
  return (
    // <footer className="bg-gray-900 text-white">
    //   <div className="section-container py-12">
    //     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    //       {/* Company Info */}
    //       <div className="col-span-1 md:col-span-2">
    //         <div className="flex items-center space-x-2 mb-4">
    //           <GraduationCap className="h-8 w-8 text-blue-400" />
    //           <span className="text-xl font-bold">Health Academy</span>
    //         </div>
    //         <p className="text-gray-300 mb-4">
    //           Empowering healthcare professionals with cutting-edge education and training programs.
    //         </p>
    //         <div className="flex space-x-4">
    //           <a href="#" className="text-gray-400 hover:text-blue-400">
    //             <Facebook className="h-5 w-5" />
    //           </a>
    //           <a href="#" className="text-gray-400 hover:text-blue-400">
    //             <Twitter className="h-5 w-5" />
    //           </a>
    //           <a href="#" className="text-gray-400 hover:text-blue-400">
    //             <Instagram className="h-5 w-5" />
    //           </a>
    //           <a href="#" className="text-gray-400 hover:text-blue-400">
    //             <Linkedin className="h-5 w-5" />
    //           </a>
    //         </div>
    //       </div>

    //       {/* Quick Links */}
    //       <div>
    //         <h3 className="font-semibold mb-4">Quick Links</h3>
    //         <ul className="space-y-2">
    //           <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
    //           <li><Link href="/courses" className="text-gray-300 hover:text-white">Courses</Link></li>
    //           <li><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
    //           <li><Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
    //         </ul>
    //       </div>

    //       {/* Contact Info */}
    //       <div>
    //         <h3 className="font-semibold mb-4">Contact</h3>
    //         <ul className="space-y-2">
    //           <li className="flex items-center space-x-2">
    //             <Mail className="h-4 w-4 text-blue-400" />
    //             <span className="text-gray-300">info@healthacademy.com</span>
    //           </li>
    //           <li className="flex items-center space-x-2">
    //             <Phone className="h-4 w-4 text-blue-400" />
    //             <span className="text-gray-300">+1 (555) 123-4567</span>
    //           </li>
    //           <li className="flex items-center space-x-2">
    //             <MapPin className="h-4 w-4 text-blue-400" />
    //             <span className="text-gray-300">123 Health St, Medical City</span>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>

    //     <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
    //       <p>&copy; 2025 Health Academy. All rights reserved.</p>
    //     </div>
    //   </div>
    // </footer>
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="https://asterhealthacademy.com/wp-content/uploads/2023/07/Logo-599x231.png"
              alt="Aster Health Academy"
              width={150}
              height={40}
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-400">
              Empowering healthcare professionals with world-class education and
              training programs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-white">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Aster Health Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
