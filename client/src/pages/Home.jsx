import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useQuery } from "react-query";
import { API } from "../config/api";

const Home = () => {
  // const { Products } = props;
  const navigate = useNavigate();

  // Fetching product data from database
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  let asceding = []
  if (products != undefined) {
    asceding = [...products]
    asceding.sort((a,b) => b.id - a.id)
  }

  return (
    <Container className="home col-9">
      <Row>
        <Col className="header col-11">
          <div className="col-6">
            <img src={`/img/home-logo.png`} alt="logo" className="logo" />
            <h3 className="mt-2">BEST QUALITY COFFEE BEANS</h3>
            <p className="mt-4">
              Quality freshly roasted coffee made just for you. Pour, brew and
              enjoy
            </p>
          </div>
          <div>
            <img src={`/img/home-waves.png`} alt="waves" className="waves" />
          </div>
        </Col>
      </Row>
      <img src={`/img/home-header.png`} alt="header" className="img" />
      <Row
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
        }}
      >
        {asceding?.map((item) => {
          return (
            <Card
              key={item.id}
              style={{ padding: "0", cursor: "pointer" }}
              onClick={() => navigate(`/detail/${item.id}`)}
            >
              <Card.Img
                variant="top"
                src={`http://localhost:5001/uploads/${item.photo}`}
                style={{ width: "100%", height: "320px", objectFit: "cover" }}
              />
              <Card.Body style={{ backgroundColor: "#F6E6DA" }}>
                <Card.Title
                  style={{
                    color: "#613D2B",
                    fontWeight: "900",
                    fontSize: "18px",
                  }}
                >
                  {item.name}
                </Card.Title>
                <Card.Text>
                  <p
                    style={{
                      margin: "0",
                      padding: "0",
                      color: "#974A4A",
                      fontSize: "14px",
                    }}
                  >
                    Rp.{item.price}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      padding: "0",
                      color: "#974A4A",
                      fontSize: "14px",
                    }}
                  >
                    Stock : {item.stock}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
};

export default Home;
