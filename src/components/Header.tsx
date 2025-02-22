import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mark Fahim</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="#services">Services</Link></li>
            <li><Link href="#projects">Projects</Link></li>
            <li><Link href="#whyme">Why me</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}