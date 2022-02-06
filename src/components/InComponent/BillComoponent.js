import React, { useEffect, useRef } from "react";
import Barcode from "react-barcode";
import { Card, Col } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

export const BillComponent = ({ submitCalled, values }) => {
  const barcodeStyle = {
    width: 2,
    height: 100,
    format: "CODE128",
    displayValue: false,
    fontOptions: "",
    font: "monospace",
    textAlign: "center",
    textPosition: "bottom",
    textMargin: 0,
    fontSize: 10,
    background: "#ffffff",
    lineColor: "#000000",
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle:
      `@page { 
          size: auto; margin: 0mm; 
        } 
        @media print { 
            body { 
                -webkit-print-color-adjust: exact; 
                padding: 0px !important; 
                margin:0px !important; 
                font-size: 13px !important;
            } 
            span>svg{
                width: 100px !important;
                height: 100px !important;
                margin-top: 0px !important;
            }
        }`,
  });

  useEffect(() => {
    if (submitCalled) {
      handlePrint();
    }
  }, [submitCalled]);

  return (
    <Col md={2} className="marginAuto" style={{ marginLeft: "0" }}>
      <Card style={{ width: "23rem" }} className="loginImg">
        <Card.Body style={{ marginTop: "0px",marginLeft: "5px" }} ref={componentRef}>
          <Card.Title style={{ fontSize: "15px" }}>
            <b>SVVS Enterprise AC WAITING HALLS</b>
          </Card.Title>
          <Card.Subtitle style={{ fontSize: "15px" }}>
            <b>CENTRAL RAILWAY PUNE RLY STATION</b>
          </Card.Subtitle>
          <hr></hr>
          <div className="card-text">
            <div className="text-muted">Token No : {values?.token_no}</div>
            <div className="text-muted">PNR Numer : {values?.pnr_no}</div>
            <div className="text-muted">
              Date and Time :{" "}
              {new Date(parseInt(values?.token_no.replace("T_", "")))
                .toLocaleString("en-GB")
                .replaceAll("/", "-")}
                <span>
                    <Barcode style={barcodeStyle} value={values?.token_no}></Barcode>

                </span>
            </div>
            <div>
              <b>MIN CHRS Rs.10 for first 1HRS,for every subsequent hour 10</b>
            </div>
            <div className="text-muted">No of Hours : 1</div>
            <div className="text-muted">
              No of Person : {values?.people_count}
            </div>
            <div className="text-muted">GST is 18% Inclusive of Tarrif</div>
            <div className="text-muted">GST NO : 36AIMPK6778R1Z1</div>
            <div>
              <b>EVERY MINUTE COUNTS</b>
            </div>
            <div className="text-muted">Contractor : K Padmaja</div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
