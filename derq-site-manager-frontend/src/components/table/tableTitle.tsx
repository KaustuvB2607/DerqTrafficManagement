interface TableTitleProps {
    title: string,
}

export default function TableTitle({title}: TableTitleProps) {
    return(
        <div className="py-5 pl-8 text-ttitle text-gray-700">
            {title}
        </div>
    )
}