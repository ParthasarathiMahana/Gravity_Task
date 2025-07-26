db.sales.aggregate([
//   stage-1
  {
    $unwind: "$items"
  },
//   stage-2
  {
    $addFields: {
      month: {
        $dateToString: {
          format: "%Y-%m",
          date: "$date"
        }
      }
    }
  },
//   stage-3
  {
    $group: {
      _id: {
        store: "$store",
        month: "$month"
      },
      totalRevenue: {
        $sum: { $multiply: ["$items.price", "$items.quantity"] }
      },
      averagePrice: {
        $avg: "$items.price"
      }
    }
  },
//   stage-4
  {
    $project: {
      _id: 0,
      store: "$_id.store",
      month: "$_id.month",
      totalRevenue: 1,
      averagePrice: 1
    }
  },
//   stage-5
  {
    $sort: {
      store: 1,
      month: 1
    }
  }
])

// Stage 1: Unwind the items array to work with individual items ==> changes the date in below way for next stage
//   [{
//     _id: ObjectId('6882717c25bf72b158bc02cd'),
//     date: ISODate('2024-06-15T00:00:00.000Z'),
//     store: 'Store A',
//     items: { name: 'item1', quantity: 5, price: 10 }
//   },
//   {
//     _id: ObjectId('6882717c25bf72b158bc02cd'),
//     date: ISODate('2024-06-15T00:00:00.000Z'),
//     store: 'Store A',
//     items: { name: 'item2', quantity: 3, price: 20 }
//   }........]

// Stage 2: Add month in 'YYYY-MM' format ==> changes the above date in below way for next stage
// [
//   {
//     _id: ObjectId('6882717c25bf72b158bc02cd'),
//     date: ISODate('2024-06-15T00:00:00.000Z'),
//     store: 'Store A',
//     items: { name: 'item1', quantity: 5, price: 10 },
//     month: '2024-06'
//   },
//   {
//     _id: ObjectId('6882717c25bf72b158bc02cd'),
//     date: ISODate('2024-06-15T00:00:00.000Z'),
//     store: 'Store A',
//     items: { name: 'item2', quantity: 3, price: 20 },
//     month: '2024-06'
//   }.......]

// Stage 3: Group by store and month ==> changes the above date in below way for next stage
//   [{
//     _id: { store: 'Store D', month: '2024-07' },
//     totalRevenue: 110,
//     averagePrice: 12.5
//   },
//   {
//     _id: { store: 'Store C', month: '2024-07' },
//     totalRevenue: 250,
//     averagePrice: 55
//   },.....]

// Stage 4: Format the result ==> changes the above date in below way for next stage
//   [
//   {
//     totalRevenue: 120,
//     averagePrice: 37.5,
//     store: 'Store D',
//     month: '2024-08'
//   },
//   {
//     totalRevenue: 110,
//     averagePrice: 12.5,
//     store: 'Store D',
//     month: '2024-07'
//   },.....]

// Stage 5: Sort by store, then by month ==> changes the above date in below way for next stage
// [
//   {
//     totalRevenue: 240,
//     averagePrice: 35,
//     store: 'Store A',
//     month: '2024-06'
//   },
//   {
//     totalRevenue: 110,
//     averagePrice: 35,
//     store: 'Store A',
//     month: '2024-07'
//   },......]