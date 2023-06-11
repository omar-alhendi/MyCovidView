import { useState, useEffect } from 'react'
import EChartsReact from 'echarts-for-react'
import * as XLSX from "xlsx";

export default function Balanceboard({ data }: { data: any }) {

    const [xAxis] = useState<string[]>(data.xAxis)
    const [pcr] = useState<number[]>(data.Pcr)
    const [rtkag] = useState<number[]>(data.Rtkag)
    const [option, setOption] = useState<object>({
        title: {
            text: `Total Tests conducted (this ${'year'})`,
            left: '3%',
        },
        xAxis: {
            name: 'date',
            type: 'category',
            boundaryGap: false,
            data: data.xAxis,
        },
        yAxis: {
            type: 'value'
        },
        legend: {
            data: ['rtk-ag', 'pcr']
        },
        series: [
            {
                name: 'rtk-ag',
                type: 'line',
                // stack: 'Total',
                data: data.Rtkag,
                areaStyle: {}
            },
            {
                symbol: 'none',
                name: 'pcr',
                type: 'line',
                // stack: 'Total',
                data: data.Pcr,
                areaStyle: {}
            },
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {},
                dataView: {
                    show: true, readOnly: false,
                    lang: ['Data View', 'close', 'export as Excel'],    // 按钮
                    optionToContent: function (opt: any) {
                        var axisData = opt.xAxis[0].data;//x轴作为条件，y轴需改成yAxis[0].data;
                        var series = opt.series;
                        var tdHeads = '<td  style="padding:0 10px">date</td>';
                        series.forEach(function (item: any) {
                            tdHeads += '<td style="padding: 0 10px">' + item.name + '</td>';
                        });
                        var table = '<table id="dataTable" border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center;background-color:#fff;width:60%"><tbody><tr>' + tdHeads + '</tr>';
                        var tdBodys = '';
                        for (var i = 0, l = axisData.length; i < l; i++) {
                            for (var j = 0; j < series.length; j++) {
                                if (typeof (series[j].data[i]) == 'object') {
                                    tdBodys += '<td>' + series[j].data[i].value + '</td>';
                                } else {
                                    tdBodys += '<td>' + series[j].data[i] + '</td>';
                                }
                            }
                            table += '<tr><td style="padding: 0 10px">' + axisData[i] + '</td>' + tdBodys + '</tr>';
                            tdBodys = '';
                        }
                        table += '</tbody></table>';
                        return table;
                    },

                    contentToOption: function () {
                        let workbook = XLSX.utils.book_new();
                        let ws1 = XLSX.utils.table_to_sheet(document.getElementById("dataTable"));
                        XLSX.utils.book_append_sheet(workbook, ws1, "Sheet1");
                        XLSX.writeFile(workbook, "Tests.xlsx");
                    },
                },
                myFull: { // 全屏
                    show: true,
                    title: '全屏',
                    icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                    onclick: () => {
                        const element = document.getElementById('charts');
                        // 全屏查看
                        if (element.requestFullScreen) { // HTML W3C 提议
                            element.requestFullScreen()
                        } else if (element.msRequestFullscreen) { // IE11
                            element.msRequestFullScreen()
                        } else if (element.webkitRequestFullScreen) { // Webkit
                            element.webkitRequestFullScreen()
                        } else if (element.mozRequestFullScreen) { // Firefox
                            element.mozRequestFullScreen()
                        }
                        // 退出全屏
                        if (element.requestFullScreen) {
                            document.exitFullscreen()
                        } else if (element.msRequestFullScreen) {
                            document.msExitFullscreen()
                        } else if (element.webkitRequestFullScreen) {
                            document.webkitCancelFullScreen()
                        } else if (element.mozRequestFullScreen) {
                            document.mozCancelFullScreen()
                        }
                    }
                }
            }
        },
    })
    return (
        <>
            <div>Balance Board</div>
            <div id='charts' style={{ width: '80%', margin: '0 auto' }}>
                <EChartsReact style={{ marginTop: 100 }} option={option}></EChartsReact>
            </div >
        </>
    )
} 