import Card from '../Components/Cards';

import { useState, useEffect } from 'react';
import AddIncome from '../Components/modals/AddIncome'
import AddExpense from '../Components/modals/AddExpense'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, deleteField  } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import Tables from '../Components/Tables';
import Charts from '../Components/Charts';
import NoTransactions from '../Components/NoTransactions';
import Loder from '../Components/Loder';

function Dashboard() {
  const [loding, setloding] = useState(false)
  const [transactions, setTransactions] = useState([]);
  const [user] = useAuthState(auth)
  const [income, setIncome] = useState(0);
  const [expence, setExpece] = useState(0);
  const [totalBlance, setToatalBlance] = useState(0);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  //below four functon use to set the our modals show or handel the modals visibility
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };


  //this fungtion use to get the data from madals and calls the other functons like add the doc and set the transaction
  const onFinish = (value, type) => {
    const newTransaction = {
      type: type,
      amount: parseFloat(value.amount),
      name: value.name,
      tag: value.tag,
      date: value.date.format('YYYY-MM-DD')
    };
    setTransactions([...transactions, newTransaction]);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    addTransactions(newTransaction);
    calculateBlance();
  }

  //code for Adding transaction in database 
  const addTransactions = async (transaction,many) => {
    // Add the doc
    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/transaction`), transaction);
     if(!many) toast.success('Transaction Added!');
    } catch (error) {
      console.log('error adding document', error);
      if (!many) {
        toast.error(error.message)
      }
    }

  }


  // code for calculate the all type of blance

  const calculateBlance = () => {
    let incomeTotal = 0;
    let expenceTotal = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomeTotal += transaction.amount;
      }
      else {
        expenceTotal += transaction.amount;
      }
      setIncome(incomeTotal);
      setExpece(expenceTotal);
      setToatalBlance(incomeTotal - expenceTotal);;

    });


  }
  useEffect(() => {
    calculateBlance(transactions);
  }, [transactions])

  //code to delete the doc or reset the entire doc 

  const resetBlance= async()=>{
    setloding(true)
    try {
      if(user){
        await deleteField (doc(db, `users/${user.uid}/transaction`));
        toast.success("Reset Sucessfully!")
        fechTransactions()
      }
      setloding(false)
    } catch (error) {
      toast.error(error.message)
    }
    setloding(false)
  }


  //code for fech the all trasitions when user is login
  const fechTransactions = async () => {
    setloding(true)
    try {
      if (user) {
        const querySnapshot = await getDocs(collection(db, `users/${user.uid}/transaction`));
        let transactionArray = [];
        querySnapshot.forEach((doc) => {
          transactionArray.push(doc.data());
        });
        setTransactions(transactionArray);
        console.log(transactionArray);
        setloding(false)
      }

    } catch (error) {
      setloding(false)
      throw (error)
    }
    toast.success('Transactions Fetched!')

  }
  useEffect(() => {
    fechTransactions()
  }, [user])

  
//this sorting use to sort the trasactions on the basis of date 
let sortedTransactions=transactions.sort((a,b)=> {
  return new Date(a.date) - new Date(b.date)})

  
  return (
    loding ?<Loder/>:
      <>
        <div className='w-full min-h-full flex justify-center items-start mt-10 flex-col bg-[#eeeeee] '>
          <Card
            income={income}
            expence={expence}
            totalBal={totalBlance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            resetBlance={resetBlance}

          />
          {/* // Add income Modal */}
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />

{transactions.length !==0 ?<Charts sortedTransactions={sortedTransactions}
      />:<><NoTransactions/></>}

          {/* Add expence modal */}
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <Tables 
          transactions={transactions}
          addTransactions={addTransactions}
          fechTransactions={fechTransactions}
          />
           </div>
           <p className='text-center text-gray-500 pb-4'>Design  And Develop   by @Momin Mukid</p>
      </>
  )

}

export default Dashboard