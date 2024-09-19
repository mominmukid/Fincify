import React, { useState } from 'react'
import { Table, Select, Radio } from "antd";
import { Input, Button } from '../Components';
import { unparse, parse } from 'papaparse';
import { toast } from 'react-toastify';
import { useRef } from 'react'
import { useEffect } from 'react';

function Tables({ transactions, addTransactions,
  fechTransactions }) {
  const [search, setSerch] = useState('');
  const [SortKey, setSortKey] = useState('asc');
  const [typefilter, setTypefilter] = useState('');

  //fungtion use for the import the csv
  function importFromCsv(event) {
    event.preventDefault();
    console.log('rech here');

    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransactions(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fechTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }
 
  //this is the ant table disign
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];
  //code for filter the data on the name basis
  const filterdTransactions = transactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typefilter));

  // this fungtion is use to sort the data by date or amount
  const soterdTransactions = filterdTransactions.sort((a, b) => {
    if (SortKey === 'date') {
      return new Date(a.date) - new Date(b.date)
    }
    if (SortKey === 'amount') {
      return a.amount - b.amount;
    }
    return 0;
  })

  // fungtion use to exoport the CSV file -(Common spareted Value)
  const exportCSV = async () => {
    let csv = unparse({
      fields: ['name', "type", "tag", 'amount', 'date'],
      data: transactions
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  // fungtion use to impoart the CSV file -(Common spareted Value)


  return (
    <div className='w-full p-5 border  mt-10 bg-[#eeeeee]'>
      <div className='w-full p-3 flex justify-between items-center'>
        <Input value={search} onChange={e => setSerch(e.target.value)} className='border border-black ' placeholder='Search By Name' />
        <Select className='w-[50%]'
          onChange={value => setTypefilter(value)}
          value={typefilter}
          placeholder='filter'
          allowClear
        >
          <Select.Option key='All' value="" >All</Select.Option>
          <Select.Option key='income' value="income">income</Select.Option>
          <Select.Option key='expence' value="expense">expense</Select.Option>
        </Select>
      </div>
      <div className='w-full  flex-col justify-center items-center'>

        <div className='flex mb-3 mt-3 justify-between items-center w-[96%] flex-wrap 
         gap-5  md:items-center'>
          <p className='p2 text-2xl font-bold mr-2 '>My Transactions </p>
          <div>
            <Radio.Group
              onChange={e => setSortKey(e.target.value)}
              value={SortKey}>
              <Radio.Button value={``}>No Sort</Radio.Button>
              <Radio.Button value={`date`}>Sort By Date</Radio.Button>
              <Radio.Button value={`amount`}>Sort By Amount</Radio.Button>
            </Radio.Group>
          </div>

          <Button
            onClick={exportCSV}
            className={`w-fit `}
            children='Export To CSV' />
          {/* <Button 
          for='file-csv'
           onClick={importFromCsv}
          className={`w-fit `} 
          children='Import To CSV' /> */}
          <label htmlFor="file-csv" className='mt-2 duration-700 rounded-md text-lg p-1 py-1  w-fit bg-blue-600 hover:bg-white cursor-pointer
    border border-blue-600 hover:text-blue-500 text-white'>Import To CSV</label>

          <input
            onChange={importFromCsv}
            type="file" accept='.csv' required id='file-csv' className='hidden' />

        </div>
        <Table dataSource={soterdTransactions} columns={columns} className='border-none' />
      </div>
    </div>
  )
}

export default Tables