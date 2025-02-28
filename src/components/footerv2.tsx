import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function FooterV2() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-gray-900">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left md:px-20 text-white">
            © {currentYear} Mark Fahim. All rights reserved.
          </p>
        </div>
        <div className="flex items-end space-x-3">
          {/* <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground text-white" />
            <span className="sr-only">Twitter</span>
          </Link> */}
          <Link href="https://www.linkedin.com/in/mark-fahim-48410a153/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground text-white" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://github.com/MarkGeorge10" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 text-muted-foreground hover:text-foreground text-white" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="mailto:mark.fahim50@gmail.com">
            <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground text-white" />
            <span className="sr-only ">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}