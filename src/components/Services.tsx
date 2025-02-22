import { FaMobileAlt, FaBrain, FaCogs, FaRocket, FaChartBar, FaLaptopCode } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      title: "Mobile Apps (iOS & Android)",
      icon: <FaMobileAlt className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "ML/AI Solutions",
      icon: <FaBrain className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "Automations & Workflow",
      icon: <FaCogs className="w-8 h-8 text-gray-500" />,
    },
    {
      title: "HubSpot Automations",
      icon: <FaRocket className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Statistics Dashboards",
      icon: <FaChartBar className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Frontend Websites",
      icon: <FaLaptopCode className="w-8 h-8 text-indigo-500" />,
    },
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}