import { Instagram, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
  variant?: "default" | "whop";
}

const Footer = ({ variant = "default" }: FooterProps) => {
  return (
    <footer className="py-8 sm:py-10 md:py-12 section-dark border-t border-border">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo/Brand */}
          <div className="text-center md:text-left order-1 md:order-1">
            <h3 className="font-display text-xl sm:text-2xl text-foreground">
              Knight Nakanishi <span className="text-primary">Fitness</span>
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {variant === "whop" ? "Culture-first fitness coaching" : "Transform without sacrifice"}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 sm:gap-4 order-2 md:order-2">
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-muted rounded-sm hover:bg-primary hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-muted rounded-sm hover:bg-primary hover:text-accent transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-muted rounded-sm hover:bg-primary hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs sm:text-sm text-muted-foreground text-center md:text-left order-3 md:order-3 space-y-1">
            <p>© {new Date().getFullYear()} Nakanishi Consulting LLC operating as Knight Fit. All rights reserved.</p>
            <p className="flex items-center justify-center md:justify-start gap-3">
              <Link to="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <span aria-hidden="true">·</span>
              <Link to="/tos" className="hover:text-primary">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
