"use client";

import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/archive/input";
import { Textarea } from "./ui/textarea";
// import { useToast } from "../hooks/use-toast";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser"; // Make sure to install this package

export function ContactSectionLight() {
//   const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null); // Ref for the form

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      setIsSubmitting(true);
      emailjs
        .sendForm(
          "service_dzlzbwe", // Replace with your EmailJS Service ID
          "template_k5gbsja", // Replace with your EmailJS Template ID
          form.current,
          "EkJQVc3UHpE-iY2SI" // Replace with your EmailJS User ID
        )
        .then(
          (result) => {
            console.log("Email sent successfully!", result.text);
            // toast({
            //   title: "Message sent!",
            //   description: "Thank you for reaching out. I'll get back to you soon.",
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            // });
            form.current?.reset(); // Reset the form after submission
            setIsSubmitting(false);
          },
          (error) => {
            console.error("Failed to send email:", error.text);
            // toast({
            //   title: "Oops! Something went wrong.",
            //   description: "Please try again.",
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            // });
            setIsSubmitting(false);
          }
        );
    } else {
      console.error("Form reference is null.");
    //   toast({
    //     title: "Error",
    //     description: "Form submission failed. Please try again.",
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //   });
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-1  min-h-[calc(70vh-6rem)] flex items-center justify-center bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">Let&apos;s Connect</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-gray-900">
              Have a project in mind or want to collaborate? Get in touch!
            </p>
          </div>
          
          <div className="grid w-full max-w-5xl gap-8 md:grid-cols-2 lg:gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <form onSubmit={sendEmail} ref={form} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 text-gray-900">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2 text-gray-900">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2 text-gray-900">
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2 text-gray-900">
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[150px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gray-900 text-white" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground text-gray-900" />
                    <p className="text-gray-900">mark.fahim50@gmail.com</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground text-gray-900" />
                    <p className="text-gray-900">AI Researcher, Pennsylvania State University, USA</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mt-6 mb-4 text-gray-900">Connect with Me</h3>
                <div className="flex space-x-4">
                  {/* <Button variant="outline" size="icon" asChild>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5 text-gray-900" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  </Button> */}
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://www.linkedin.com/in/mark-fahim-48410a153/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5 text-gray-900" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://github.com/MarkGeorge10" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5 text-gray-900" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}