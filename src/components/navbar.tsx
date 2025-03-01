"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Mark Fahim</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="#projects" className="text-sm font-medium transition-colors hover:text-primary">
            Projects
          </Link>
          <Link href="#skills" className="text-sm font-medium transition-colors hover:text-primary">
            Skills
          </Link>
          <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
          <ThemeToggle />
          <Button asChild>
            <Link href="#contact">Let&apos;s Connect</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="container pb-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link 
              href="#about" 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#projects" 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              href="#skills" 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </Link>
            <Link 
              href="#contact" 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button asChild>
              <Link href="#contact" onClick={() => setIsMenuOpen(false)}>Let&apos;s Connect</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}