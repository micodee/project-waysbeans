import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import DeleteData from "../components/ModalDeleteProduct";
import { API } from "../config/api";
import { useQuery, useMutation } from 'react-query';;

const ListProduct = () => {
  const navigate = useNavigate()

  // Variabel for delete product data
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  // Modal Confirm delete data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // For get id product & show modal confirm delete data
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  let { data: products, refetch } = useQuery("productsAdminCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
    // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
      navigate("/list-product")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Delete Success',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Delete Failed',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(error);
    }
  });

  const handleUpdate = (id) => {
    navigate(`/product-update/${id}`);
  };

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);


  return (
    <>
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
            List Product
          </h2>
          <Table bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th className="text-center">Image</th>
                <th className="text-center">Name</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Price</th>
                <th className="text-center">Description</th>
                <th className="text-center" width={100}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                    <td style={{ verticalAlign: "middle" }}><img src={`http://localhost:5001/uploads/${item.photo}`} alt={item.name} style={{ width: "100px", height: "130px", objectFit: "cover" }} /></td>
                    <td style={{ verticalAlign: "middle" }}>{item.name}</td>
                    <td className="text-center" style={{ verticalAlign: "middle" }}>{item.stock}</td>
                    <td className="text-center" style={{ verticalAlign: "middle" }}>{item.price}</td>
                    <td style={{ verticalAlign: "middle" }}>{item.description}</td>
                    <td style={{ verticalAlign: "middle" }}>
                      <div className="d-flex justify-content-evenly align-items-center gap-2">
                      <Button onClick={() => handleDelete(item.id)} variant="danger">Delete</Button>
                      <Button onClick={() => handleUpdate(item.id)} variant="success">Update</Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
};

export default ListProduct;
