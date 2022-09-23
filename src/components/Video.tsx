import { DefaultUi, Player, Youtube } from "@vime/react";
import { GithubLogo, YoutubeLogo } from "phosphor-react";

import '@vime/core/themes/default.css'
import { useGetLessonBySlugQuery } from "../graphql/generated";

interface VideoProps {
    lessonSlug: string;
}

export function Video(props: VideoProps) {
    const { data } = useGetLessonBySlugQuery({
        variables: {
            slug: props.lessonSlug,
        }
    })

    if (!data || !data.lesson) {
        return (
            <div className="flex-1 text-2xl flex justify-center gap-2">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="flex-1">

            <div className="bg-black flex justify-center" key={data.lesson.videoId}>
                {/* inserted key to force rerender and update the video */}
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] bg-grey-500 aspect-video">
                    <Player>
                        <Youtube videoId={data.lesson.videoId} />
                        <DefaultUi />
                    </Player>
                </div>
            </div>

            <div className="p-8 max-w-[1100px] mx-auto">
                <div className="flex items-start gap-16">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {data.lesson.title}
                        </h1>
                        <p className="mt-4 text-grey-200 leading-relaxed">
                            {data.lesson.description}
                        </p>
                        {data.lesson.teacher &&
                            <a href={`https://github.com/${data.lesson.teacher.githubUsername}`} target="_blank">
                                <div className="flex items-center gap-4 mt-6">
                                    <img
                                        className=" h-16 w-16 rounded-full border-2 border-blue-500"
                                        src={data.lesson.teacher.avatarURL}
                                        alt=""
                                    />

                                    <div className="leading-relaxed">
                                        <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                                        <span className="text-grey-200 text-sm block">{data.lesson.teacher.bio}</span>
                                    </div>
                                </div>
                            </a>
                        }
                    </div>
                    <div className="flex flex-col gap-4">
                        {/*
                        <a href="" className="p-4 text-sm bg-green-500 flex items-center text-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors cursor-default">
                            <DiscordLogo size={24} />
                            Discord Comunity <br />(coming soon)
                        </a>
                        */}
                        <a href={`https://gist.github.com/jvictorjs/${data.lesson.githubGistId}`} target="_blank" className="p-4 text-sm bg-green-500 flex items-center text-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
                            <GithubLogo size={24} />
                            See the code
                        </a>

                        <a href={`https://www.youtube.com/watch?v=${data.lesson.videoId}`} target="_blank" className="p-3 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-grey-500">
                            <YoutubeLogo size={42} />
                            Watch on YouTube
                        </a>
                    </div>
                </div>

                {/* 
                <div className="gap-8 mt-20 grid grid-cols-2">
                    <a href="" className="bg-grey-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-grey-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={40} />
                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">Material Complementar</strong>
                            <p className=" text-sm text-grey-200 mt-2">
                                Acesse o material complementar
                            </p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>
                    <a href="" className="bg-grey-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-grey-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={40} />
                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">Wallpapers exclusivos</strong>
                            <p className=" text-sm text-grey-200 mt-2">
                                Baixe o conteúdo extra exclusivo
                            </p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>
                </div>
            */}

            </div>
        </div>
    )
}