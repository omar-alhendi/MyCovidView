import { fetcher } from "../../utils";

export const testsLoader = async () => {
    let OriginalData = await fetcher("epidemic/tests_malaysia.csv")
    // console.log(OriginalData);
    const xArr: string[] = []
    const pcr: number[] = []
    const rtkag: number[] = []
    OriginalData = OriginalData.filter((item: any) => {
        const itemDate: string = item.date
        const itemDateArr = itemDate.split('-')
        const itemYear: number = Number(itemDateArr[0])
        const itemMonth: number = Number(itemDateArr[1])
        const itemDay: number = Number(itemDateArr[2])

        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentMonth: number = currentDate.getMonth() + 1

        const methods = ['years', 'month']
        switch (methods[0]) {
            case 'years':
                if (itemYear === currentYear) {
                    xArr.push(itemDate)
                    pcr.push(item['pcr'])
                    rtkag.push(item['rtk-ag'])
                }
                return itemYear === currentYear
            case 'month':
                if (itemYear === currentYear && itemMonth === currentMonth) {
                    xArr.push(itemDate)
                    pcr.push(item['pcr'])
                    rtkag.push(item['rtk-ag'])
                }
                return itemYear === currentYear && itemMonth === currentMonth
            default:
                break;
        }
    })
    const data = {
        xAxis: xArr,
        Pcr: pcr,
        Rtkag: rtkag
    }
    console.log(data);

    return data
};

export const casesLoader = async () => {
    let OriginalData = await fetcher("epidemic/cases_malaysia.csv")
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

        const methods = ['years', 'month']
        switch (methods[0]) {
            case 'years':
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
    const data = {
        xAxis: xArr,
        yAxis: yArr
    }
    return data
};
