import { Logo } from "./Logo";

export function Header() {
    return (
        <header className="w-full text-2xl py-5 flex items-center justify-center bg-grey-700 border-b border-grey-600">
            <Logo />
        </header>
    )
}