import ContactForm from "./form/contact_form"

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <ContactForm />
          <p className="py-6">&copy; 2025 Mark Fahim. All rights reserved.</p>
        </div>
      </footer>
    );
  }