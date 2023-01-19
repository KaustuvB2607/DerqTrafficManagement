import { Link } from "react-router-dom";
import TableHeader from "./tableHeader";
import TableRow from "./tableRow";
import TableTitle from "./tableTitle";
import {useHistory} from "react-router-dom";

interface TableProps {
    title?: string,
    headerList: string[],
    tableData: object[] | undefined
}

export default function Table({title, headerList, tableData}: TableProps) {

    const history = useHistory();

    console.log(history.location);
    // console.log(headerList);

    return (
        <div className="px-5 pl-3 w-full">
            {title? <TableTitle title={title} /> : <div className="mt-3"></div> }
            <div className="w-full h-full relative">
            <TableHeader headerList={headerList} />
            <div className="w-full h-full overflow-y-scroll pt-10">
            {tableData ? tableData.map((tableDataRow: any) => {
                return (
                    <Link to={`/site/details/${tableDataRow[headerList[0]]}`}>
                    <TableRow dataList={getDataList(headerList, tableDataRow)} />
                    </Link>
                );
            }) : <></>}
            </div>
            </div>
        </div>
    )
}

function getDataList(headerList: string[], tableDataRow: any) {
    let dataRow = [];
    for (let i = 0; i < headerList.length; i++) {
        dataRow.push(tableDataRow[headerList[i]]);
    }
    return dataRow;
}