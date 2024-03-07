

export default function AuthCard({children}) {
    return (
        <div className="card rounded-lg p-[2.4rem] mb-[1.5rem] md:mb-0 md:!block hidden">
            {children}
        </div>
    );
}