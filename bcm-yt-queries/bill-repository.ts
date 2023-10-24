import { Bill, IBill } from "./bill-domain";

export interface IBillRepository {

    newBill(bill : IBill): Promise<IBill>

    details(billNo: string): Promise<IBill | undefined>

    bills(): Promise<Array<IBill>>

    searchBills(opts : IBill): Promise<Array<IBill>>

    recent(customerMobile: string, count: number): Promise<Array<IBill>>
}

export class BillRepository implements IBillRepository {

    async newBill(bill: IBill): Promise<IBill> {
      const bl = new Bill(bill)
      return bl.save()
    }
    async details(billNo: string): Promise<IBill | undefined> {
       return Bill.findOne({ billNo }).then(bl => bl?.toObject())
    }
    async bills(): Promise<IBill[]> {
        return Bill.find({}, { __v: 0})
    }
    async searchBills(opts: IBill): Promise<IBill[]> {
       const arr = Object.entries(opts).map(([key, value]) => ({ [key] : value }))
       console.log(arr)

       return Bill.find({ $or: arr })
    }
    async recent(customerMobile: string, count: number): Promise<IBill[]> {
      return Bill.find({ customerMobile }, { customerMobile: 0, cashier: 0, counter: 0, mode: 0, __v: 0, items: 0  }).sort({ billDate: -1 }).limit(count)
    }
}