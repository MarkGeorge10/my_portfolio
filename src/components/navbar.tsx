"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
// import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white px-6">Mark Fahim</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {/* <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary text-white">
            About
          </Link>
          <Link href="#projects" className="text-sm font-medium transition-colors hover:text-primary text-white">
            Projects
          </Link> */}
          {/* <Link href="#skills" className="text-sm font-medium transition-colors hover:text-primary ">
            Skills
          </Link> */}
          {/* <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary text-white">
            Contact
          </Link> */}
          {/* <ThemeToggle /> */}
          <Button asChild>
            <Link href="#contact" className="text-white">Let&apos;s Connect</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          {/* <ThemeToggle /> */}
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
            {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="container pb-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link 
              href="#about" 
              className="text-sm font-medium transition-colors hover:text-primary text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#projects" 
              className="text-sm font-medium transition-colors hover:text-primary text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              href="#skills" 
              className="text-sm font-medium transition-colors hover:text-primary text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </Link>
            <Link 
              href="#contact" 
              className="text-sm font-medium transition-colors hover:text-primary text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button asChild>
              <Link href="#contact" onClick={() => setIsMenuOpen(false)} className="text-white">Let&apos;s Connect</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}