import { useState } from "react";
import styles from "./App.module.scss";
import { Button } from "./Components/Button";
import dolorIcon from "./assets/dollor.svg";
import userIcon from "./assets/user.svg";

const initialButtonData = [
  { id: "1", value: 5, isSelected: false },
  { id: "2", value: 10, isSelected: false },
  { id: "3", value: 15, isSelected: false },
  { id: "4", value: 25, isSelected: false },
  { id: "5", value: 50, isSelected: false },
];

const formInitialState = {
  bill: "",
  totalPeople: "",
  percentage: 0,
  tipPerPerson: 0,
  amountPerPerson: 0,
  customPercentage: "",
};

function App() {
  const [formState, setFormState] = useState(formInitialState);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [buttonData, setButtonData] = useState(initialButtonData);
  const [errorState, setErrorState] = useState({
    billAmount: false,
    noOfPeople: false,
  });

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    const numericValue = Number(inputValue.replace(/\D/g, ""));
    const issuedBill =
      e.target.name === "totalBill" ? e.target.value : formState.bill;
    const amount = (formState.percentage / 100) * issuedBill;

    if (e.target.name === "totalBill") {
      if (numericValue) {
        setErrorState((prevState) => {
          return {
            ...prevState,
            billAmount: false,
          };
        });
      } else {
        setErrorState((prevState) => {
          return {
            ...prevState,
            billAmount: true,
          };
        });
      }
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
      if (numericValue) {
        setErrorState((prevState) => {
          return {
            ...prevState,
            noOfPeople: false,
          };
        });
      } else {
        setErrorState((prevState) => {
          return {
            ...prevState,
            noOfPeople: true,
          };
        });
      }
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
    if (!formState.bill) {
      setErrorState((prevState) => {
        return {
          ...prevState,
          billAmount: true,
        };
      });
    }

    if (!formState.totalPeople) {
      setErrorState((prevState) => {
        return {
          ...prevState,
          noOfPeople: true,
        };
      });
    }

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
              {errorState.billAmount && <h6>Can't be zero</h6>}
              <span>
                <img src={dolorIcon} alt="dolor sign" width={9} />
              </span>
              <input
                type="text"
                name="totalBill"
                placeholder="0"
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
                    placeholder="0"
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
              {errorState.noOfPeople && <h6>Can't be zero</h6>}
              <span>
                <img src={userIcon} alt="user sign" width={16} />
              </span>
              <input
                type="text"
                name="totalPeople"
                placeholder="0"
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
