import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, List, Pagination } from "antd";
import "../../assets/css/dashboard_employ.css";
import axiosClient from "../../axiox-client";
export default function Dashbord() {
  // get table data api

  const [data, setData] = useState([]);
  const [total, setTotel] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    axiosClient
      .get("employ/posts", {
        params: { page, pageSize },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((req) => {
        console.log(req.data.data.data);
        setData(req.data.data.data);
        setTotal(req.data.data.total);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // showa
  const style = {
    con: {
      boxShadow:
        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      padding: "200px !importent",
    },
  };

  return (
    <>
      <section className="mt-10">
        <h1 className="text-center font-bold text-5xl">Dashboard</h1>

        <Row gutter={[16, 24]} className="flex justify-center mt-20">
          <Col span={8} className="gutter-row w-100 ">
            <Card className="flex justify-evenly w-100 h-100" style={style.con}>
              <Button bordered={false} className="border-transparent">
                Internships
              </Button>
              <Button bordered={false} className="border-transparent">
                Jobs
              </Button>
            </Card>
          </Col>
        </Row>
      </section>
      <section className="mt-20">
        <Row gutter={24} className="flex justify-center">
          <Col span={20}>
            {data.map((item) => (
              <Card key={item.id} style={style.con} className="mt-10">
                <h3>{item.job_title}</h3>
                <div>{item.id}</div>
              </Card>
            ))}

            <div className="pagNation">
              <Pagination
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                style={{ textAlign: "center", marginTop: "20px" }}
              />
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
}
