import { Bill, IBill } from "~/domain/bill-domain";

export interface IBillRepository {

    newBill(bill: IBill):Promise<IBill>

    details(billNo: string): Promise<IBill|undefined>

    bills(): Promise<Array<IBill>>

    searchBills(opts: IBill): Promise<Array<IBill>>

    recent(customerMobile: string, count: number): Promise<Array<IBill>>
}

export class BillRepository implements IBillRepository {
    async newBill(bill: IBill): Promise<IBill> {
       const bl = new Bill(bill)
       return bl.save()
    }
    async details(billNo: string): Promise<IBill| undefined> {
       return Bill.findOne({ billNo }).then(bl => bl?.toObject())
    }
    async bills(): Promise<IBill[]> {
       return Bill.find({}, { __v:0, items: 0 })
    }
    async searchBills(opts: IBill): Promise<IBill[]> {
    //    const ob =  { billNo :'cadcf', billDate: '123'  }
    //    const arr = [ { billNo :'cadcf'}, { billDate: '123' }]

        if(Object.values(opts).every(vl => !vl)) return Bill.find({})

        const arr = Object.entries(opts).map( ([key, value]) => ({ [key] : value }) )

        return Bill.find({ $or : arr })
    }
    async recent(customerMobile: string, count: number): Promise<IBill[]> {
        return Bill.find({ customerMobile }).sort({ billDate: -1 }).limit(count)
    }
}