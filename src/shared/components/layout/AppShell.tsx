type AppShellProps = {
  sideNav: React.ReactNode;
  children: React.ReactNode;
};

export default function AppShell({ sideNav, children }: AppShellProps) {
  return (
    <div className="page-container app-shell flex h-[calc(100vh-73px)] flex-col overflow-hidden py-4 sm:py-5">
      <div className="flex h-full min-h-0 flex-1 gap-6">
        <div className="hidden w-[280px] shrink-0 lg:block">{sideNav}</div>
        <main className="h-full min-w-0 flex-1 overflow-y-auto overscroll-contain pb-6 no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
