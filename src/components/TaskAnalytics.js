import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import Button from './Button';

export default function TaskAnalytics() {
    const [dataLoaded,setDataLoaded] = useState(false);
    const [dataByDept, setDataByDept] = useState([]);
    const [dataByEmp, setDataByEmp] = useState([]);
    const [dataByStatus, setDataByStatus] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [xAxis, setXAxis] = useState("deptName");
    const [yAxis, setYAxis] = useState("taskCount");
    const [btnActive, setBtnActive] = useState("dataByDept");
    const [key, setKey] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/queries/getTaskCountOfDepartment")
        .then(response => response.json())
        .then((response) => {
            setDataByDept(response);
            setChartData(response);
        })

        fetch("http://localhost:5000/queries/getTaskCountOfUser")
        .then(response => response.json())
        .then((response) => {
            setDataByEmp(response);
        })

        fetch("http://localhost:5000/queries/getTaskCountByStatus")
        .then(response => response.json())
        .then((response) => {
            setDataByStatus(response);
        })
    }, [])

    const setEmpData = () => {
        console.log("clicked Emp")
        setKey(key + 1);
        setBtnActive("dataByEmp");
        setXAxis("name");
        setChartData(dataByEmp);
    }

    const setDeptData = () => {
        console.log("clicked dept")
        setKey(key + 1);
        setBtnActive("dataByDept");
        setXAxis("deptName");
        setChartData(dataByDept);
    }

    const setStatusData = () => {
        console.log("clicked status")
        setKey(key + 1);
        setBtnActive("dataByStatus");
        setXAxis("taskStatus")
        setChartData(dataByStatus);
    }

    return (
        <div className="h-9-10 grid grid-cols-12 grid-rows-6 gap-4">
            <Button classAdds={"row-start-2 col-start-2"} activeBtn={btnActive} id={"dataByDept"} text={"Tickets By Department"} onclick={setDeptData}/>
            <Button classAdds={"row-start-3 col-start-2"} activeBtn={btnActive} id={"dataByEmp"} text={"Tickets By Employee"} onclick={setEmpData}/>
            <Button classAdds={"row-start-4 col-start-2"} activeBtn={btnActive} id={"dataByStatus"} text={"Tickets By Status"} onclick={setStatusData}/>
            <BarChart key={key} data={chartData} classAdd={"border-4 row-start-2 shadow-2xl-15 col-start-4 ticket"} xAxis={xAxis} yAxis={yAxis}/>
        </div>
    )
}
