import { useContext, useEffect, useState } from "react";
import DoughnutChart from "../components/statistics/DoughnutChart";
import { AuthContext } from "../utils/context/AuthContext";
const labels = ["gas", "food", "clothing", "hygiene", "other"];
const ChartsPage = () => {
  const { transactions } = useContext(AuthContext);
  const [doughnutData, setDoughnutData] = useState(null);
  useEffect(() => {
    if (!doughnutData && transactions) {
      const dataTemp = [];
      console.log(transactions);
      for (let type of labels) {
        const transactionsOfType = transactions.filter(
          (transaction) => transaction.category === type
        );
        console.log(transactionsOfType);
        if (transactionsOfType && transactionsOfType.length > 0) {
          dataTemp.push(
            transactionsOfType
              .map((value) => value.amount)
              .reduce((accumulator, currentValue) => accumulator + currentValue)
          );
        } else {
          dataTemp.push(0);
        }
      }
      console.log(dataTemp);
      setDoughnutData(dataTemp);
    }
  }, [doughnutData, transactions]);

  return (
    transactions &&
    doughnutData && <DoughnutChart labels={labels} data={doughnutData} />
  );
};
export default ChartsPage;
