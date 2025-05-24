export default function Footer() {
  return (
    <footer className="py-6 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-2">
        <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-foreground"
          >
            <path d="M12 2v8" />
            <path d="m4.93 10.93 7.07 7.07" />
            <path d="M12 22v-8" />
            <path d="m19.07 13.07-7.07-7.07" />
            <path d="M2 12h8" />
            <path d="M22 12h-8" />
          </svg>
        </div>
        <span className="text-sm font-bold mr-2 text-gold">BNB::VERIFY</span>
        <span className="text-sm text-muted-foreground">© 2025 BNB Verify. All rights reserved. Powered by BNB Chain.</span>
      </div>
    </footer>
  )
}
