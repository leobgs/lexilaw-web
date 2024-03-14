

export default function AuthCard({children}) {
    return (
        <div className="card rounded-2xl p-4 md:p-[2.4rem] mb-[1.5rem] md:mb-0 md:!block">
            {children}
        </div>
    );
}