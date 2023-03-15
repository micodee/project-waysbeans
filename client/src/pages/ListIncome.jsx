import { Container, Row, Col, Table } from "react-bootstrap";

const ListIncome = (props) => {
  // sort by id
  let transaction = [];
  if (props.TransactionsList != null) {
    transaction = [...props.TransactionsList];
    transaction.sort((a, b) => b.id - a.id);
  }
  return (
    <Container className="detail col-9">
      <Row className="d-flex justify-content-between">
        <Col className="header col-12">
          <h2
            style={{
              color: "#613D2B",
              fontWeight: "900",
              marginBottom: "2rem",
              padding: "0",
              fontSize: "24px",
            }}
          >
            Income Transaction
          </h2>
          <Table bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Products Order</th>
                <th>Total Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((item, index) => {
                return(
                <tr key={index}>
                  <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.cart.map((product, index) => <div>{`${product.product_name} ${product.order_quantity} x ${product.product_price}`}</div>)}</td>
                  <td>{item.total_price}</td>
                  <td style={{ color: "#FF9900" }}>{item.status}</td>
                </tr>)
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListIncome;
