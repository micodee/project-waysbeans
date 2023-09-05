import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import data from "../assets/json/transaction.json"
import ModalEditProfile from "../components/ModalEditProfile";
import { useSelector } from "react-redux";
import { getAccount } from "../store/reducers/loginSlice";

const Transaction = (props) => {
  const user = useSelector(getAccount).user 
  
  const [showEdit, setModalEdit] = useState(false);
  return (
    <>
    <Container className="detail col-9">
      <Row className="d-flex justify-content-between">
        <Col className="header col-6">
          <h2
            style={{
              color: "#613D2B",
              fontWeight: "900",
              marginBottom: "1.5rem",
              padding: "0",
              fontSize: "24px",
            }}
          >
            My Profile
          </h2>
          <div className="d-flex">
            <img
              src={`/img/profile.png`}
              alt="profle"
              style={{ width: "180px", marginRight: "1.5rem", height: "250px", objectFit: "cover", borderRadius: '5px' }}
            />
            <div>
              <p className="mb-1">
                <b>Full Name</b>
              </p>
              <span>{user.fullname}</span>
              <p className="mb-1 mt-3">
                <b>Email</b>
              </p>
              <span>{user.email}</span>
              <p className="mb-1 mt-3">
                <b>Phone</b>
              </p>
              <span>{user.profile?.phone === "" ? "-" : user.profile?.phone}</span>
              <p className="mb-1 mt-3">
                <b>Address</b>
              </p>
              <span className="profileAddress">{user.profile?.address === "" ? "-" : user.profile?.address }</span>
              <Button className="profileBtn" onClick={() => setModalEdit(true)}>Edit Profile</Button>
            </div>
          </div>
        </Col>
        <Col className="header col-6">
          <h2
            style={{
              color: "#613D2B",
              fontWeight: "900",
              marginBottom: "1.5rem",
              padding: "0",
              fontSize: "24px",
            }}
          >
            My Transaction
          </h2>
          <div className="d-flex flex-column gap-2">
          {props.TransactionsList?.filter((e) => e.user_id === props.user.id).map((item, index) => {
           let style;
           if (item.status === "success") {
             style = {
               backgroundColor: "#e4e8c6",
               width: "112px",
               height: "19px",
               fontSize: "10px",
               color: "#78A85A"
             };
           } else if (item.status === "pending") {
             style = {
               backgroundColor: "#f7dec4",
               width: "112px",
               height: "19px",
               fontSize: "10px",
               color: "#FF9900"
             };
           } else if (item.status === "failed") {
             style = {
               backgroundColor: "#613d2b",
               width: "112px",
               height: "19px",
               fontSize: "10px",
               color: "#FFF"
             };
           }
           return(
            <div key={index} style={{ backgroundColor: "#F6E6DA", padding: "1rem 1.5rem" }} className="d-flex justify-content-between gap-3">
           <div style={{ display: "flex", gap: "1rem" }}>
            <Button className="profileBtn" onClick={() => setModalEdit(true)}>View Details</Button>
            <div className="d-flex justify-content-center flex-column">
             <p className="mb-1" style={{ fontSize: "14px" }}>ID Transaction <b>{item.id}</b></p>
             <span style={{ fontSize: "9px" }}><b>Saturday</b>, {item.created_at}</span>
             <p className="mb-1 mt-1" style={{ fontSize: "10px", fontWeight: "400", }}>Total Qty : {item.total_quantity}</p>
             <p className="mb-1" style={{ fontSize: "10px", fontWeight: "400", }}><b>Sub Total : {item.total_price}</b></p>
            </div>
           </div>
           <div className="d-flex justify-content-center align-items-center flex-column col-3">
           <img src={`/img/profile-logo.png`} alt="product" height={22} style={{ width: "73px" }} />
           <img src={`/img/profile-qrcode.png`} alt="product" height={50} style={{ width: "50px", margin: ".7rem" }} />
           <div style={style} className="d-flex justify-content-center align-items-center">{item.status}</div>
           </div>
          </div>
           )
          } )}
          </div>
        </Col>
      </Row>
    </Container>
      <ModalEditProfile 
      showEdit={showEdit}
      hideEdit={setModalEdit}
      />
      </>
  );
};

export default Transaction;
