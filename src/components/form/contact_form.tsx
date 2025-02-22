
"use client"

// components/ContactForm.js
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

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
            alert("Thank you! Your message has been sent.");
            form.current?.reset(); // Reset the form after submission
          },
          (error) => {
            console.error("Failed to send email:", error.text);
            alert("Oops! Something went wrong. Please try again.");
          }
        );
    } else {
      console.error("Form reference is null.");
    }
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="max-w-md mx-auto"
    >
      <p className="mb-2">Connect with me:</p>
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        className="w-full px-4 py-2 mb-2 rounded-lg text-gray-800"
      />
      <input
        type="text"
        name="subject"
        placeholder="Your subject"
        required
        className="w-full px-4 py-2 mb-2 rounded-lg text-gray-800"
      />
      <textarea
        name="message"
        placeholder="Your message"
        required
        className="w-full px-4 py-2 mb-2 rounded-lg text-gray-800"
        rows={3}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Send Email
      </button>
    </form>
  );
}