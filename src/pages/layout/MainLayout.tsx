export default function MainLayout({ children }: any) {
    return (
        <div className="p-5">
            <header className="mb-4 font-bold text-lg">My App Haader Layout </header>
            {children}
        </div>
    );
}
