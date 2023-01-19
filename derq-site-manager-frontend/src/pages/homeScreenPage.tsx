import Table from "../components/table";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import doGet from "../shared/services/useGet";
import { ReactComponent as AddIcon } from "../shared/svg/AddIcon.svg";
import AddEditEventModal from "../components/modals/addEditEventModal";

export default function HomeScreenPage({notify}: {notify: any}) {

    console.log(Cookies.get());

    const [tableData, setTableData] = useState<Object[]>([]);

    useEffect(()=>{
        doGet({url: "/site/list"}).then((data)=>setTableData(JSON.parse(JSON.stringify(data)))).catch((err)=>console.error(err));
    }, [])

    let headerList = ["siteID", "siteName", "timezone","totalDetection"];

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

    return (
        <div className="flex h-screen bg-white w-full overflow-y-auto">
             <AddEditEventModal
            modalIsOpen={modalIsOpen}
            closeModal={() => closeModal()}
            setTableData={(obj: Object)=>setTableData([...tableData, obj])}
            notify = {notify}
            />
            <div className="w-full flex flex-col">
            <div className="bg-breen-gray">
          <div className="bg-white py-2 px-5 border-b flex justify-between">
            <div className="text-ttitle flex">
              <div className="ml-5 py-2">List of Sites</div>
            </div>

            <div>
              <div className="bg-breen-blue flex rounded-lg cursor-pointer pr-14 pl-12" onClick={()=>{openModal()}}>
              <div className="py-2 mr-1.5">
              <AddIcon />
            </div>
            <button className=" text-white text-nav py-2 h-9 focus:outline-none">
              Create Site
            </button>
            
            </div>
            </div>
          </div>
        </div>
            <Table headerList={headerList} tableData={tableData}/>
            </div>
        </div>
    );
}