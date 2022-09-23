import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
    const { slug } = useParams<{ slug: string }>()

    const isLessonAvailable = isPast(props.availableAt);
    const availableDateFormatted = format(props.availableAt, "MMM d ' • ' yyyy") // STACKOVERFLOW https://date-fns.org/v2.29.2/docs/format

    const isActiveLesson = slug === props.slug;

    return (
        <Link to={isLessonAvailable ? !isActiveLesson ? `/content/lesson/${props.slug}` : '#' : '#'} className={classNames('group', {
            'cursor-not-allowed': !isLessonAvailable,
            'cursor-default': isActiveLesson
        })}>
            {isLessonAvailable ?
                <div className="flex-1"></div>
                :
                <span className="text-grey-300">
                    {availableDateFormatted}
                </span>
            }
            <div className={classNames('rounded border border-grey-500 p-4 mt-2 ',
                { 'bg-green-500': isActiveLesson, 'group-hover:border-green-500': isLessonAvailable, 'group-hover:border-orange-500': !isLessonAvailable }
            )}>
                <header className="flex items-center justify-between">
                    {isLessonAvailable ?
                        (
                            <span className={classNames("text-sm font-medium flex items-center gap-2", {
                                'text-white': isActiveLesson, 'text-blue-500': !isActiveLesson
                            })}>

                                <CheckCircle size={20} />
                                Available
                            </span>
                        )
                        :
                        (
                            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                                <Lock size={20} />
                                Coming soon
                            </span>
                        )
                    }
                    <span className={classNames("text-xs rounded py-[2px] px-2 text-white border font-bold", {
                        'border-white': isActiveLesson,
                        'border-green-300': !isActiveLesson
                    }
                    )}>
                        {props.type === 'live' ? 'LIVE' : 'RECORDED'}
                    </span>
                </header>
                <strong className={classNames(' mt-5 block', {
                    'text-grey-100': isActiveLesson,
                    'text-grey-200': !isActiveLesson
                })}>
                    {props.title}
                </strong>
            </div>
        </Link >
    )
}