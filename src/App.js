import { useState } from "react";
import styles from "./App.module.scss";
import { Button } from "./Components/Button";

const initialButtonData = [
  { id: "1", value: 5, isSelected: false },
  { id: "2", value: 10, isSelected: false },
  { id: "3", value: 15, isSelected: false },
  { id: "4", value: 25, isSelected: false },
  { id: "5", value: 50, isSelected: false },
];

const formInitialState = {
  bill: 0,
  totalPeople: 0,
  percentage: 0,
  tipPerPerson: 0,
  amountPerPerson: 0,
  customPercentage: 0,
};

function App() {
  const [formState, setFormState] = useState(formInitialState);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [buttonData, setButtonData] = useState(initialButtonData);

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    const numericValue = Number(inputValue.replace(/\D/g, ""));
    const amount = (formState.percentage / 100) * formState.bill;

    if (e.target.name === "totalBill") {
      setFormState((prevState) => {
        return {
          ...prevState,
          bill: numericValue,
        };
      });
      if (amount && numericValue && formState.totalPeople) {
        calculateTotal(amount, numericValue, formState.totalPeople);
      }
    } else if (e.target.name === "totalPeople") {
      setFormState((prevState) => {
        return {
          ...prevState,
          totalPeople: numericValue,
        };
      });
      if (amount && formState.bill && numericValue) {
        calculateTotal(amount, formState.bill, numericValue);
      }
    }
  };

  const setPercentageAndCalcTotal = (value, isCustom) => {
    console.log("lets check value here ==>", value);
    if (isCustom) {
      setFormState((prevState) => {
        return {
          ...prevState,
          customPercentage: value,
          percentage: value,
        };
      });
    } else {
      setFormState((prevState) => {
        return {
          ...prevState,
          percentage: value,
        };
      });
    }
    const amount = (value / 100) * formState.bill;
    if (amount && formState.bill && formState.totalPeople) {
      calculateTotal(amount, formState.bill, formState.totalPeople);
    }
  };

  const onTipClickHandler = (value, id) => {
    if (value !== "Custom") {
      setButtonData((prevState) =>
        prevState.map((data) => {
          if (data.id === id) {
            return {
              ...data,
              isSelected: true,
            };
          } else {
            return {
              ...data,
              isSelected: false,
            };
          }
        })
      );
      setPercentageAndCalcTotal(value, false);
    } else {
      setIsInputVisible(true);
    }
  };

  const calculateTotal = (totalTipAmount, bill, totalPeople) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        tipPerPerson: (totalTipAmount / totalPeople).toFixed(2),
      };
    });
    const totalAmountToPay = totalTipAmount + Number(bill);
    setFormState((prevState) => {
      return {
        ...prevState,
        amountPerPerson: (totalAmountToPay / totalPeople).toFixed(2),
      };
    });
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
                value={formState.bill}
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
                    isSelected={data.isSelected}
                    id={data.id}
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
                    value={formState.customPercentage}
                    onChange={(e) =>
                      setPercentageAndCalcTotal(Number(e.target.value), true)
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
                value={formState.totalPeople}
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
                  ${formState.tipPerPerson ? formState.tipPerPerson : "0.00"}
                </div>
              </div>
              <div className={styles.totalAmount}>
                <div className={styles.totalAmountFirstContainer}>
                  <span className={styles.first}>Total</span>
                  <span className={styles.second}>/Person</span>
                </div>
                <div className={styles.totalAmountSecondContainer}>
                  $
                  {formState.amountPerPerson
                    ? formState.amountPerPerson
                    : "0.00"}
                </div>
              </div>
              <button
                onClick={() => {
                  setFormState(formInitialState);
                  setButtonData(initialButtonData);
                  setIsInputVisible(false);
                }}
              >
                RESET
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
