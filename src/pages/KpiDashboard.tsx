import { useState, useEffect } from 'react'
import { fetcher } from '../utils'
import EChartsReact from 'echarts-for-react'

export default function KpiDashboard() {
    const [data, setData] = useState([])
    const [condition, setCondition] = useState({ method: 'year' })
    const [xAxis, setxAxis] = useState<string[]>([])
    const [yAxis, setyAxis] = useState<number[]>([])
    const [option, setOption] = useState<object>({
        xAxis: {
            type: 'category',
            data: xAxis
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: yAxis,
                type: 'line'
            }
        ]
    })
    const getData = async () => {
        let OriginalData = await fetcher("epidemic/cases_malaysia.csv")
        console.log(OriginalData);
        const xArr: string[] = []
        const yArr: number[] = []
        OriginalData = OriginalData.filter((item: any) => {
            const itemDate: string = item.date
            const itemDateArr = itemDate.split('-')
            const itemYear: number = Number(itemDateArr[0])
            const itemMonth: number = Number(itemDateArr[1])
            const itemDay: number = Number(itemDateArr[2])

            const currentDate = new Date()
            const currentYear = currentDate.getFullYear()
            const currentMonth: number = currentDate.getMonth() + 1

            switch (condition.method) {
                case 'year':
                    if (itemYear === currentYear) {
                        xArr.push(itemDate)
                        yArr.push(item.cases_new)
                    }
                    return itemYear === currentYear
                case 'month':
                    if (itemYear === currentYear && itemMonth === currentMonth) {
                        xArr.push(itemDate)
                        yArr.push(item.cases_new)
                    }
                    return itemYear === currentYear && itemMonth === currentMonth
                default:
                    break;
            }
        })
        setxAxis(xArr)
        setyAxis(yArr)
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        console.log(xAxis);
        console.log(yAxis);

        setOption({
            title: {
                text: `New Cases (this ${condition.method})`,
                textStyle: {
                    align: 'center',
                    fontSize: 20,
                },
                top: '5%',
                left: 'center',
            },
            xAxis: {
                type: 'category',
                data: xAxis
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: yAxis,
                    areaStyle: {},
                    type: 'line',
                }
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
                    saveAsImage: {}
                }
            },
        })
    }, [xAxis, condition])
    return (
        <>
            <div>KpiDashboard</div>
            <div className='kpiCharts' style={{ width: '90%', margin: '0 auto' }}>
                <EChartsReact style={{ marginTop: 100 }
                } option={option} ></EChartsReact >
            </div >
            {/* new cases */}
        </>
    )
}
