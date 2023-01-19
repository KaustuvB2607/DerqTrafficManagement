interface TableRowProps {
  dataList: string[];
}

export default function TableRow({ dataList }: TableRowProps) {
  return (
    <div className="py-5 pl-8 flex justify-start border-t border-b text-tdata text-breen-black">
      {dataList.map((data) => {
        return <div className="text-left w-full max-w-md">{data}</div>;
      })}
    </div>
  );
}
