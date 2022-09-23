import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { MonitorPlay } from "phosphor-react";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [createSubscriber, { loading }] = useCreateSubscriberMutation()

    async function handleSubscribe(event: FormEvent) {
        event.preventDefault();

        await createSubscriber({
            variables: {
                name,
                email
            }
        })

        navigate('/content')
    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
                <div className="max-w-[640px]">
                    <Logo />
                    {/* 
                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500"> aplicação completa</strong> do zero com <b className="text-blue-500">React.js</b>
                    </h1>
                    */}
                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Learn <b className="text-blue-500">JavaScript</b> and build your own applications with <strong className="text-blue-500"> Google Sheets</strong>. For free.
                    </h1>
                    <p className="mt-4 text-grey-200 leading-relaxed">Subscribe to recieve news about my courses directly in your e-mail.</p>
                    <p className="mt-4 text-grey-200 leading-relaxed">Or click the button below to watch the lessons without subscription.</p>
                    <div className="mt-8 w-80">
                        <a href="/content" className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-grey-500">
                            <MonitorPlay size={24} />
                            go to Course Content
                        </a>
                    </div>
                </div>
                <div className="p-8 bg-grey-700 border border-grey-500 rounded">
                    <strong className="text-2xl mb-6 block">Recieve news about my courses in your e-mail.</strong>

                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input
                            className="bg-grey-900 rounded px-5 h-14"
                            type="text"
                            placeholder="Name"
                            onChange={event => setName(event.target.value)} />
                        <input
                            className="bg-grey-900 rounded px-5 h-14"
                            type="email"
                            placeholder="e-mail"
                            onChange={event => setEmail(event.target.value)} />

                        <button
                            className="mt-4 bg-green-500 uppercase py-4 font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-70"
                            disabled={loading || !name || !email}
                            type="submit"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}