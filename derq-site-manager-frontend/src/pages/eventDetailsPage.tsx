import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import DetectionChart from "../components/graph/detectionChart";
import Table from "../components/table";
import parsetoJSON from "../shared/helpers/parsetoJSON";
import doGet from "../shared/services/useGet";
import { ReactComponent as BackArrow } from "../shared/svg/BackArrow.svg";

export default function EventDetailsPage({ notify }: { notify: any }) {
  let params = useParams();
  let siteId = parsetoJSON(params).siteId;

  const [tableData, setTableData] = useState([]);
  const [renderTableData, setRenderTableData] = useState([]);

  const [siteName, setSiteName] = useState("");
  const [totalDetections, setTotalDetctions] = useState(0);

  const [classFilterList, setClassFilterList] = useState<String[]>([]);
  const [approachFilterList, setApproachFilterList] = useState<String[]>([]);
  const [movementFilterList, setMovementFilterList] = useState<String[]>([]);
  const [laneFilterList, setLaneFilterList] = useState<String[]>([]);
  const [toDate, setToDate] = useState<String>(new Date().toISOString());
  const [fromDate, setFromDate] = useState<String>(new Date().toISOString());



  const doFilter = (e: any) => {
    e.preventDefault();
    console.log(classFilterList);
    console.log(approachFilterList);
    console.log(movementFilterList);
    console.log(laneFilterList);
    console.log(tableData);
    console.log(new Date(String(toDate)).toISOString());
    console.log(new Date(String(fromDate)).toISOString());
    console.log(String(fromDate));

    let fromD = new Date(String(fromDate));
    let toD = new Date(String(toDate));
      let filteredData = tableData.filter(d => {
        let dateComps = String(d["dateTime"]).split(" ")[0].split("/");
        let dateString = dateComps[2]+"-"+dateComps[1]+"-"+dateComps[0]
        let currentDate = new Date(dateString);
        return  !classFilterList.includes(d["class"]) && !approachFilterList.includes(d["approach"]) && !movementFilterList.includes(d["movement"]) && !laneFilterList.includes(d["lane"]) && (currentDate.getTime() >= fromD.getTime() && currentDate.getTime() <= toD.getTime());
      });
      setRenderTableData(filteredData);
  
  }

  const resetFilters = (e: any) => {
    e.preventDefault();
    setRenderTableData(tableData);
    setClassFilterList([]);
    setApproachFilterList([]);
    setMovementFilterList([]);
    setLaneFilterList([]);
    setFromDate(new Date().toISOString());
    setToDate(new Date().toISOString());
  }

  useEffect(() => {
    doGet({ url: `/site/list/${siteId}` })
      .then((data) => parsetoJSON(data)[0])
      .then((site) => {
        setSiteName(site.siteName);
        setTotalDetctions(site.totalDetection);
      })
      .catch((err) => console.error(err));

    doGet({ url: `/detection/list/${siteId}` })
      .then((data) => {
        setTableData(parsetoJSON(data));
        setRenderTableData(parsetoJSON(data));
      })
      .catch((err) => console.error(err));
  }, [siteId]);

  let headerList = [
    // "siteId",
    "dateTime",
    "class",
    "approach",
    "movement",
    "lane",
  ];

  const history = useHistory();

  return (
    <div className="flex h-screen bg-white w-full overflow-y-auto">
      <div className="w-3/5 flex flex-col h-full">
        <div className="bg-breen-gray">
          <div className="bg-white py-2 px-5 border-b flex justify-between">
            <div className="text-ttitle flex">
              <button onClick={() => history.goBack()}>
                <BackArrow />
              </button>{" "}
              <div className="ml-5">{siteName}</div>
            </div>
            <div className="text-nav text-gray-400">
              Site ID:{" "}
              <span className="text-breen-black form-label">{siteId}</span>
            </div>
          </div>
          <div className="bg-white mb-5 py-4 px-5 flex justify-between">
            <div className="w-2/5 py-2 px-10">
              <div className="text-tdata flex">
                <div className="pt-0.5">
                  <LocationIcon />
                </div>{" "}
                <div className="ml-1">{siteName}</div>
              </div>
            </div>
            <div className="text-breen-black text-nav bg-breen-paleBlue px-5 py-2 rounded-md">
              Detections:{" "}
              <span className="text-gray-700 font-semibold">
                {totalDetections}
              </span>
            </div>
          </div>
        </div>
        <Table
          title="Detections"
          headerList={headerList}
          tableData={renderTableData}
        />
        <div className="h-screen">
          <DetectionChart/>
        </div>
      </div>
      <div className="w-2/5 bg-breen-gray h-full">
        <div className="bg-white ml-8 h-full relative">
          <div className="pb-5 border-b py-5 px-8 text-ttitle">Filters</div>
          <div className="flex flex-col py-5 px-8">
            <div className="h-full w-full">
              <label className="form-labelb text-gray-700 text-b1">Class</label>
              <div className="mt-1.5">
                <input
                  type="checkbox"
                  id="Car"
                  name="Car"
                  value="Car"
                  //checked = {!classFilterList.includes("Car")}
                  defaultChecked= {true}
                  onChange={() => {
                    if(!classFilterList.includes("Car")) {
                      classFilterList.push("Car")
                    }else {
                      let fl = classFilterList.filter((filter) => filter !== "Car")
                      setClassFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  Car
                </label>
                <br />
                <input
                  type="checkbox"
                  id="Bicycle"
                  name="Bicycle"
                  value="Bicycle"
                 // checked = {!classFilterList.includes("Bicycle")}
                  defaultChecked= {true}
                  onChange={() => {
                    if(!classFilterList.includes("Bicycle")) {
                      classFilterList.push("Bicycle")
                    }else {
                      let fl = classFilterList.filter((filter) => filter !== "Bicycle")
                      setClassFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  Bicycle
                </label>
                <br />
                <input
                  type="checkbox"
                  id="Person"
                  name="Person"
                  value="Person"
                  //checked = {!classFilterList.includes("Person")}
                  defaultChecked= {true}
                  onChange={() => {
                    if(!classFilterList.includes("Person")) {
                      classFilterList.push("Person")
                    }else {
                      let fl = classFilterList.filter((filter) => filter !== "Person")
                      setClassFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  Person
                </label>
                <br />
              </div>
            </div>
            <div className="h-full w-full mt-5">
              <label className="form-labelb text-gray-700 text-b1">Approach</label>
              <div className="mt-1.5">
                <input
                  type="checkbox"
                  id="North Bound"
                  name="North Bound"
                  value="North Bound"
                  defaultChecked={true}
                  onChange={() => {
                    if(!approachFilterList.includes("North Bound")) {
                      approachFilterList.push("North Bound")
                    }else {
                      let fl = approachFilterList.filter((filter) => filter !== "North Bound")
                      setApproachFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  North Bound
                </label>
                <br />
                <input
                  type="checkbox"
                  id="South Bound"
                  name="South Bound"
                  value="South Bound"
                  defaultChecked={true}
                  onChange={() => {
                    if(!approachFilterList.includes("South Bound")) {
                      approachFilterList.push("South Bound")
                    }else {
                      let fl = approachFilterList.filter((filter) => filter !== "South Bound")
                      setApproachFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  South Bound
                </label>
                <br />
                <input
                  type="checkbox"
                  id="East Bound"
                  name="East Bound"
                  value="East Bound"
                  defaultChecked={true}
                  onChange={() => {
                    if(!approachFilterList.includes("East Bound")) {
                      approachFilterList.push("East Bound")
                    }else {
                      let fl = approachFilterList.filter((filter) => filter !== "East Bound")
                      setApproachFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  East Bound
                </label>
                <br />
                <input
                  type="checkbox"
                  id="West Bound"
                  name="West Bound"
                  value="West Bound"
                  defaultChecked={true}
                  onChange={() => {
                    if(!approachFilterList.includes("West Bound")) {
                      approachFilterList.push("West Bound")
                    }else {
                      let fl = approachFilterList.filter((filter) => filter !== "West Bound")
                      setApproachFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  West Bound
                </label>
                <br />
              </div>
            </div>
            <div className="h-full w-full mt-5">
              <label className="form-labelb text-gray-700 text-b1">Movement</label>
              <div className="mt-1.5">
                <input
                  type="checkbox"
                  id="Through"
                  name="Through"
                  value="Through"
                  defaultChecked={true}
                  onChange={() => {
                    if(!movementFilterList.includes("Through")) {
                      movementFilterList.push("Through")
                    }else {
                      let fl = movementFilterList.filter((filter) => filter !== "Through")
                      setMovementFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  Through
                </label>
                <br />
                <input
                  type="checkbox"
                  id="Left Turn"
                  name="Left Turn"
                  value="Left Turn"
                  defaultChecked={true}
                  onChange={() => {
                    if(!movementFilterList.includes("Left Turn")) {
                      movementFilterList.push("Left Turn")
                    }else {
                      let fl = movementFilterList.filter((filter) => filter !== "Left Turn")
                      setMovementFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  Left Turn
                </label>
                <br />
                <input
                  type="checkbox"
                  id="Right Turn"
                  name="Right Turn"
                  value="Right Turn"
                  defaultChecked={true}
                  onChange={() => {
                    if(!movementFilterList.includes("Right Turn")) {
                      movementFilterList.push("Right Turn")
                    }else {
                      let fl = movementFilterList.filter((filter) => filter !== "Right Turn")
                      setMovementFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  Right Turn
                </label>
                <br />
              </div>
            </div>
            <div className="h-full w-full mt-5">
              <label className="form-labelb text-gray-700 text-b1">Lane</label>
              <div className="mt-1.5">
                
                <input
                  type="checkbox"
                  id="1"
                  name="1"
                  value="1"
                  defaultChecked={true}
                  // checked={!laneFilterList.includes("1")}
                  onChange={() => {
                    if(!laneFilterList.includes("1")) {
                      laneFilterList.push("1")
                    }else {
                      let fl = laneFilterList.filter((filter) => filter !== "1")
                      setLaneFilterList(fl);
                    }
                  }}
                />
                 <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  1
                </label>
                <br />
                <input
                  type="checkbox"
                  id="2"
                  name="2"
                  value="2"
                  defaultChecked={true}
                  // checked={!laneFilterList.includes("2")}
                  onChange={() => {
                    if(!laneFilterList.includes("2")) {
                      laneFilterList.push("2")
                    }else {
                      let fl = laneFilterList.filter((filter) => filter !== "2")
                      setLaneFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  2
                </label>
                <br />
                <input
                  type="checkbox"
                  id="3"
                  name="3"
                  value="3"
                  defaultChecked={true}
                  // checked={!laneFilterList.includes("3")}
                  onChange={() => {
                    if(!laneFilterList.includes("3")) {
                      laneFilterList.push("3")
                    }else {
                      let fl = laneFilterList.filter((filter) => filter !== "3")
                      setLaneFilterList(fl);
                    }
                  }}
                />
                <label className="w-full text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1">
                  3
                </label>
                <br />
              </div>
            </div>
            <div className="h-screen w-full mt-5">
              <label className="form-labelb text-gray-700 text-b1">Date Time</label>
              <div className="mt-1">
              <label className="w-full focus:outline-none  text-gray-700 text-b1 mr-4">
                  From
                </label>
              <input type="date" id="birthday" name="birthday" className="text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1" onChange={(e)=> {
                e.preventDefault();
                setFromDate(e.target.value);
              }}
                min="1990-01-01" 
                max="2100-12-31"/>
              <label className="w-full focus:outline-none  text-gray-700 text-b1 mr-4">
                  To
                </label>
              <input type="date" id="birthday" name="birthday" className="text-b2 focus:outline-none text-breen-lightGray mb-2 ml-1" onChange={(e)=> {
                e.preventDefault();
                setToDate(e.target.value);
              }}
                min="2022-09-17" 
                max="2100-12-31"/>
                <br />
              </div>
            </div>
          </div>
          <div className="pb-5 border-t py-10 px-8 flex justify-end absolute bottom-0 right-0 w-full">
            <button
              className="bg-breen-gray border bottom-1 py-2 px-13 rounded-lg btn-text2 w-32 h-9"
              onClick={(e) => {
                resetFilters(e)
              }}
            >
              Reset
            </button>
            <button
              className="bg-breen-blue text-white py-2 px-13 rounded-lg btn-text2 w-32 ml-3 h-9"
              onClick={(e) => doFilter(e)}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg
      width="11"
      height="14"
      viewBox="0 0 11 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 0.436523C2.91221 0.436523 0.8125 2.32646 0.8125 4.65527C0.8125 8.40527 5.5 13.5615 5.5 13.5615C5.5 13.5615 10.1875 8.40527 10.1875 4.65527C10.1875 2.32646 8.08779 0.436523 5.5 0.436523ZM5.5 6.99902C5.12916 6.99902 4.76665 6.88905 4.4583 6.68303C4.14996 6.477 3.90964 6.18416 3.76772 5.84155C3.62581 5.49894 3.58868 5.12194 3.66103 4.75823C3.73337 4.39451 3.91195 4.06042 4.17417 3.7982C4.4364 3.53597 4.77049 3.3574 5.1342 3.28505C5.49792 3.2127 5.87492 3.24983 6.21753 3.39175C6.56014 3.53366 6.85298 3.77399 7.059 4.08233C7.26503 4.39067 7.375 4.75318 7.375 5.12402C7.37446 5.62114 7.17674 6.09773 6.82522 6.44925C6.47371 6.80076 5.99711 6.99848 5.5 6.99902Z"
        fill="#4F73D1"
      />
    </svg>
  );
}

