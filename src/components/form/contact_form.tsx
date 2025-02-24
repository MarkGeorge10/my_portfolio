
"use client"

// components/ContactForm.js
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null); // Specify the type as HTMLFormElement

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure form.current is not null
    if (form.current) {
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
            toast.success("Your message has been sent successfully!", {
                position: "top-right",
                autoClose: 5000, // Close after 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            form.current?.reset(); // Reset the form after submission
          },
          (error) => {
            console.error("Failed to send email:", error.text);
            toast.error("Oops! Something went wrong. Please try again."); // Show error toast
          }
        );
    } else {
      console.error("Form reference is null.");
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="max-w-md mx-auto">
  <p className="mb-2">Connect with me:</p>
  <input
    type="text"
    name="from_name" // Matches {{from_name}} in the template
    placeholder="Your name"
    required
    className="w-full px-4 py-2 mb-2 rounded-lg text-gray-800"
  />
  <input
    type="email"
    name="from_email" // Optional: If you want to capture the sender's email
    placeholder="Your email"
    required
    className="w-full px-4 py-2 mb-2 rounded-lg text-gray-800"
  />
  <textarea
    name="message" // Matches {{message}} in the template
    placeholder="Your message"
    required
    className="w-full px-4 py-2 mb-2 rounded-lg text-gray-800"
    rows={3}
  ></textarea>
  <button
    type="submit"
    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
  >
    Send Email
  </button>
</form>
  );
}