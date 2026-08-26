import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

type LegalPageProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

const LegalPage = ({ title, updated, children }: LegalPageProps) => {
  return (
    <main className="min-h-screen section-dark">
      <div className="container px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-xs sm:text-sm text-primary hover:underline mb-6 inline-block">
            Back to home
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-2">{title}</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {updated}</p>
          <div className="space-y-6 text-sm sm:text-base text-foreground/90 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_p]:text-muted-foreground [&_strong]:text-foreground">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default LegalPage;
