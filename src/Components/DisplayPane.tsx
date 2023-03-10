
import { Divider } from "antd";
import { useWindowWidthAndHeight } from "../Hooks/useWindowWidthAndHeight";
import { useAddress, useContract, useContractRead  } from "@thirdweb-dev/react";
import EVAULTABI from "../abi/EVAULTABI.json"
import { BigNumber } from "ethers";

const styles = {
  container: {
    background: "#f5f4f4",
    width: "80%",
    minWidth: "340px",
    maxWidth: "900px",
    textAlign: "center",
    margin: "auto",
    padding: "30px 0",
    borderRadius: "20px"
  },
  title: {
    color: "black",
    fontWeight: 600,
    fontSize: "30px",
    marginBottom: "10px"
  },
  content: {
    width: "85%",
    margin: "auto",
    fontSize: "17px"
  },
  action: {
    display: "inline-flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  }
} as const;

const DisplayPane: React.FC = () => {
 

  const [width] = useWindowWidthAndHeight();
  const isMobile = width <= 768;
  const address = useAddress();
  const { contract, isLoading, error } = useContract("0xeE34Af939a75223571ac818f0958b67cba48cd01}", EVAULTABI);
  const { data: balanceOf } = useContractRead(contract, "balanceOf", address)
  
  function formatAmt(amt:any) {
    let a:any;
    if(BigNumber.isBigNumber(amt)) 
      a = amt.div(BigNumber.from("100000000"))
    else {
      amt = BigNumber.from(amt)
      a = amt.div(BigNumber.from("100000000"))
    }
      return a.toString()
  }

  return (
    <div style={styles.container}>
      <div style={styles.title}>Welcome to eVault</div>
      <div style={styles.content}>
        <p style={{ fontSize: "20px", marginTop: "-5px" }}>
          This is a beta version of the app, it will be updated along the way. This will become a DeFi app with lots of
          features !
        </p>
        <p>{balanceOf &&
                      formatAmt(balanceOf?.toString())}{" "}
                    eVault
                    </p>

          <>
            <Divider />
            <div style={styles.action}>
              {!isMobile && <Divider type="vertical" style={{ fontSize: "120px !important" }} />}
            </div>
          </>

      </div>
    </div>
  );
};

export default DisplayPane;
