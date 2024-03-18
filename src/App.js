import { useState } from "react";
import styles from "./App.module.scss";
import { Button } from "./Components/Button";

const buttonData = [
  { id: "1", value: 5 },
  { id: "2", value: 10 },
  { id: "3", value: 15 },
  { id: "4", value: 25 },
  { id: "5", value: 50 },
];  

function App() {
  const [bill, setbill] = useState();
  const [totalPeople, setTotalPeople] = useState();
  const [percentage, setPercentage] = useState();
  const [tipPerPerson, setTipPerPerson] = useState();
  const [amountPerPerson, setAmountPerPerson] = useState();
  const [isInputVisible, setIsInputVisible] = useState(false);

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    const numericValue = Number(inputValue.replace(/\D/g, ""));
    const amount = (percentage / 100) * bill;

    if (e.target.name === "totalBill") {
      setbill(numericValue);
      if (amount && numericValue && totalPeople) {
        calculateTotal(amount, numericValue, totalPeople);
      }
    } else if (e.target.name === "totalPeople") {
      setTotalPeople(numericValue);
      if (amount && bill && numericValue) {
        calculateTotal(amount, bill, numericValue);
      }
    }
  };

  const setPercentageAndCalcTotal = (value) => {
    setPercentage(value);
    const amount = (value / 100) * bill;
    if (amount && bill && totalPeople) {
      calculateTotal(amount, bill, totalPeople);
    }
  };

  const onTipClickHandler = (value) => {
    console.log("lets check value ==>", value);
    if (value !== "Custom") {
      setPercentageAndCalcTotal(value);
    } else {
      setIsInputVisible(true);
    }
  };

  const calculateTotal = (totalTipAmount, bill, totalPeople) => {
    setTipPerPerson((totalTipAmount / totalPeople).toFixed(2));
    const totalAmountToPay = totalTipAmount + Number(bill);
    setAmountPerPerson((totalAmountToPay / totalPeople).toFixed(2));
  };

  return (
    <div className={styles.app}>
      <div className={styles.mainContainer}>
        <header>
          <h2>SPLTTTER</h2>
        </header>
        <main>
          <div className={styles.leftSubContainer}>
            <div className={styles.leftFirstSubContainer}>
              <label className={styles.leftSubContainerBill}>Bill</label>
              <input
                type="text"
                name="totalBill"
                className={styles.totalBillInput}
                value={bill}
                onChange={onChangeHandler}
              />
            </div>
            <div className={styles.leftSecondSubContainer}>
              <h4>Select Tip %</h4>
              <div className={styles.leftSubContainerTip}>
                {buttonData.map((data) => (
                  <Button
                    value={data.value}
                    key={data.id}
                    onTipClickHandler={onTipClickHandler}
                  />
                ))}
                {!isInputVisible ? (
                  <Button
                    value={"Custom"}
                    onTipClickHandler={onTipClickHandler}
                  />
                ) : (
                  <input
                    type="text"
                    name="CustomInput"
                    className={styles.customInput}
                    onChange={(e) =>
                      setPercentageAndCalcTotal(Number(e.target.value))
                    }
                  />
                )}
              </div>
            </div>
            <div className={styles.leftThirdSubContainer}>
              <label className={styles.leftSubContainerTotalPeople}>
                Number of People
              </label>
              <input
                type="text"
                name="totalPeople"
                className={styles.totalPeopleInput}
                value={totalPeople}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className={styles.rightSubContainer}>
            <div className={styles.rightSubSubContainer}>
              <div className={styles.tipAmount}>
                <div className={styles.tipAmountFirstContainer}>
                  <span className={styles.first}>Tip Amount</span>
                  <span className={styles.second}>/Person</span>
                </div>
                <div className={styles.tipAmountSecondContainer}>
                  ${tipPerPerson ? tipPerPerson : "0.00"}
                </div>
              </div>
              <div className={styles.totalAmount}>
                <div className={styles.totalAmountFirstContainer}>
                  <span className={styles.first}>Total</span>
                  <span className={styles.second}>/Person</span>
                </div>
                <div className={styles.totalAmountSecondContainer}>
                  ${amountPerPerson ? amountPerPerson : "0.00"}
                </div>
              </div>
              <button className={styles.resetButton}>RESET</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
