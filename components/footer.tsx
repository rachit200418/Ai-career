import Link from "next/link"
import { Mail, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* About Section */}
          <div className="max-w-md">
            <h3 className="mb-4 text-lg font-semibold">AI Career Counseling</h3>
            <p className="text-sm text-muted-foreground">
              Empowering individuals to discover their perfect career path through AI-powered personalized guidance and
              insights.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <Link href="mailto:contact@aicareercounseling.com" className="hover:text-primary transition-colors">
                contact@aicareercounseling.com
              </Link>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex gap-4 justify-center">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary transition-all hover:border-primary hover:bg-primary/10"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary transition-all hover:border-primary hover:bg-primary/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AI Career Counseling. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
