import { CaretCircleDoubleRight } from "phosphor-react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

export function Course() {
    const { slug } = useParams<{ slug: string }>()

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1 ">
                {slug
                    ?
                    <Video lessonSlug={slug}/>
                    :
                    <div className="flex-1 text-2xl flex items-center justify-center gap-2">
                        Choose a lesson
                        <CaretCircleDoubleRight size={42}  className="text-green-500"/>
                    </div>
                }
                <Sidebar />
            </main>
        </div>
    )
}