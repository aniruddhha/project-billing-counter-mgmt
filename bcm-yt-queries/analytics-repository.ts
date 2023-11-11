import { Bill } from "./bill-domain";

const year = 2023; // Replace with the desired year
const startOfYear = new Date(year, 0, 1);
const endOfYear = new Date(year, 11, 31);

export async function totalMonthlySell() {
    // Total monthly sell for a given year
    Bill.aggregate([
        {
            $match: {
                billDate: { $gte: startOfYear, $lte: endOfYear }
            }
        },
        {
            $group: {
                _id: { $month: '$billDate' },
                totalSell: { $sum: '$amount' }
            }
        },
        {
            $project: {
                month: '$_id',
                totalSell: 1,
                _id: 0
            }
        }
    ]).then(res => console.log(res))
}

export async function totalProductSell() {
    const res = Bill.aggregate([
        {
            $match: {
                billDate: { $gte: startOfYear, $lte: endOfYear }
            }
        },
        { $unwind: '$items' },
        {
            $group: {
                _id: '$items.itemName',
                totalSell: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$totalSell' },
                items: {
                    $push: {
                        itemName: '$_id',
                        totalSell: '$totalSell'
                    }
                }
            }
        },
        {
            $project: {
                totalAmount: 1,
                items: {
                    $map: {
                        input: '$items',
                        as: 'item',
                        in: {
                            itemName: '$$item.itemName',
                            percentageSell: {
                                $multiply: [
                                    {
                                        $cond: {
                                            if: { $eq: ['$$item.totalSell', null] },
                                            then: 0,
                                            else: { $divide: ['$$item.totalSell', '$totalAmount'] }
                                        }
                                    },
                                    100
                                ]
                            }
                        }
                    }
                }
            }
        },
        {
            $project: {
                totalAmount: 1,
                items: 1,
                _id: 0
            }
        }
    ])
    
    .then(res => res[0]).then(res => console.log(res))

}
