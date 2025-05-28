import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gold/20 bg-card/50 backdrop-blur-sm mt-auto">
      <div className="absolute inset-0 bg-gold-radial opacity-20" />
      <div className="absolute inset-0 bg-gold-shimmer opacity-20" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold golden-text-glow text-gold">BNB Verify</h3>
            <p className="text-sm text-muted-foreground/80">
              Secure asset verification on the BNB Chain. Protecting your investments with advanced security protocols.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold golden-text-glow text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground/80 hover:text-gold transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground/80 hover:text-gold transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground/80 hover:text-gold transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold golden-text-glow text-gold">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center hover:border-gold/50 transition-colors golden-glow"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center hover:border-gold/50 transition-colors golden-glow"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.535.223l.19-2.712 4.94-4.465c.215-.19-.047-.296-.334-.106l-6.104 3.853-2.623-.916c-.57-.182-.582-.57.12-.842l10.212-3.93c.468-.176.878.106.634 1.924z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center hover:border-gold/50 transition-colors golden-glow"
                aria-label="Discord"
              >
                <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026 13.83 13.83 0 001.226-1.963.074.074 0 00-.041-.104 13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gold/20 text-center">
          <p className="text-sm text-muted-foreground/60">
            © {new Date().getFullYear()} BNB Verify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
