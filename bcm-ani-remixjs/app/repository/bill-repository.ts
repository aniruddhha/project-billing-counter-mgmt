import { Bill, IBill } from '../domain/bill-domain'

export interface SearchFilter {
    customerMobile?: string;
    billNo?: string;
    billDate?: Date;
    counter?: number;
    cashier?: string;
    amount ?: number;
}

export interface IBillRepository {

    newBill(bl: IBill): Promise<IBill>

    details(billNo: string): Promise<IBill>

    bills(): Promise<Array<IBill>>

    searchBills(options: SearchFilter): Promise<Array<IBill>>

    recent(customerMobile: string, count: number):Promise<Array<IBill>>
}

export class BillRepository implements IBillRepository {

    async newBill(bl: IBill): Promise<IBill> {
        const bill = new Bill(bl)
        return bill.save()
    }
    async details(billNo: string): Promise<IBill> {
        return Bill.findOne({ billNo }).then()
    }
    async bills(): Promise<IBill[]> {
        return Bill.find({ }, { __v: 0, items: 0 })
    }
    async searchBills(options: SearchFilter): Promise<IBill[]> {
        console.log(options)

        console.log(Object.values(options).every(vl => !vl))
        if(Object.values(options).every(vl => !vl)) return Bill.find({ })

        const arr = Object.entries(options).map(([key, value]) => ({[key] : value}))

        return Bill.find({ $or :arr })
    }

    async recent(customerMobile: string, count: number): Promise<IBill[]> {
        return Bill.find({ customerMobile }).sort({ billDate: -1 }).limit(count)
    }
}