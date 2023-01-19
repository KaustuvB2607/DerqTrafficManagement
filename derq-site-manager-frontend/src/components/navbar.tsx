export default function Navbar({ user }: {user: string}) {
    return (
        <div className="w-full h-20 bg-breen-blue sticky top-0 px-8 py-4 flex" style={{zIndex: 1}}>
            <div className="flex">
                <div>
                    <DerqIcon />
                </div>
                <div className="text-h2 text-white ml-2 pt-1">Derq</div>
            </div>
            <div className="text-white absolute right-8 pt-3 flex">
                <div className="ml-5 text-nav">
                    <span className="opacity-70">Hi,</span> {user}
                </div>
            </div>
        </div>
    );
}

function DerqIcon() {
    return (
        <svg
            width="27"
            height="36"
            viewBox="0 0 27 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.5 35.5C20.9548 35.5 27 29.3851 27 21.8444C27 14.3009 20.9548 8.18881 13.5 8.18881L13.5 0.5C13.5 0.5 0 5.36172 0 21.8471C-0.00271034 29.3851 6.04247 35.5 13.5 35.5ZM17.9349 21.8444C17.9349 24.3233 15.9506 26.3305 13.5 26.3305C11.0494 26.3305 9.06506 24.3233 9.06506 21.8444C9.06506 19.3656 11.0494 17.3583 13.5 17.3583C15.9479 17.3583 17.9349 19.3656 17.9349 21.8444Z"
                fill="white"
            />
        </svg>
    );
}
