import { Container, Row, Col, Table } from "react-bootstrap";

const ListIncome = () => {
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
                <th>Post Code</th>
                <th>Products Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "middle" }}>1</td>
                <td>Sugeng No Pants</td>
                <td>Cileungsi</td>
                <td>16820</td>
                <td>RWANDA Beans</td>
                <td style={{ color: "#FF9900" }}>Waiting Approve</td>
              </tr>
              <tr>
                <td style={{ verticalAlign: "middle" }}>2</td>
                <td>Haris Gams</td>
                <td>Serang</td>
                <td>42111</td>
                <td>ETHIOPIA Beans</td>
                <td style={{ color: "#78A85A" }}>Success</td>
              </tr>
              <tr>
                <td style={{ verticalAlign: "middle" }}>3</td>
                <td>Aziz Union</td>
                <td>Bekasi</td>
                <td>13450</td>
                <td>GUETEMALA Beans</td>
                <td style={{ color: "#E83939" }}>Cancel</td>
              </tr>
              <tr>
                <td style={{ verticalAlign: "middle" }}>4</td>
                <td>Lae Tanjung Balai</td>
                <td>Tanjung Balai</td>
                <td>21331</td>
                <td>NICARAGUA Beans</td>
                <td style={{ color: "#00D1FF" }}>On The Way</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListIncome;
