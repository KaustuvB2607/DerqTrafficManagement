interface TableHeaderProps {
  headerList: string[];
}

export default function TableHeader({ headerList }: TableHeaderProps) {
  return (
    <div className="py-3 pl-8 flex justify-start text-theader text-breen-gray2 bg-breen-gray border-t border-b absolute top-0 w-full">
      {headerList.map((header) => {
        return <div className="text-left w-full max-w-md">{header}</div>;
      })}
    </div>
  );
}
