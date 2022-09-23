import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

export function Sidebar() {
    const { data } = useGetLessonsQuery()

    console.warn('Sidebar', data)

    return (
        <aside className="w-[348px] bg-grey-700 p-6 border-l border-grey-600">
            <span className="font-bold text-2xl pb-3 mb-3 border-b border-grey-600 block">
                Creating Telegram Bots with Google Sheets
            </span>

            <div className="flex flex-col gap-8">
                {data?.lessons.map(lesson => {
                    return (
                        <Lesson
                            key={lesson.id}
                            title={lesson.title}
                            slug={lesson.slug}
                            availableAt={new Date(lesson.availableAt)}
                            type={lesson.lessonType} />
                    )
                })}
            </div>
        </aside>
    )
}