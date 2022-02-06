import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import actions from "../../store/actions/actions";
import DynamicTable from "../Common/DynamicTable";
import Loader from "../Common/Loader";
import { PaginationModule } from "../Common/PaginationModule";
import SearchBar from "../Common/SearchBar";
import { Status } from "../Common/Status";
export const BillList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [pageNo, setPageNo] = useState(1);
  const [sort, setSort] = useState({});
  const [sortingColumnName, setSortingColumnName] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [totalCount, setTotalCount] = useState();
  const [tableMapper, setTableMapper] = useState([]);
  const [sortOrder, setSortOrder] = useState();
  const [allowAccess, setAllowAccess] = useState();
  const [pageLimit, setLimit] = useState(10);
  const [dateTime, setDatesTime] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const billList = useSelector((state) => state?.bill?.result);
  const isUpdated = useSelector((state) => state?.bill?.isUpdated);
  const count = useSelector((state) => state?.bill?.result?.totalCount);
  const isLoading = useSelector((state) => state?.network?.isLoading);
  const loggedInProfile = useSelector((state) => state?.login?.result);

  const columnDataMap = {
    "Token no": "b_token",
    "PNR no": "b_pnr",
    "Mobile No": "b_mobile_no",
    "Total People": "b_people_count",
    Name: "b_name",
    "Total Amount": "b_amount",
  };

  const sortColumns = [
    "Token no",
    "PNR no",
    "Mobile No",
    "Total People",
    "Name",
    "Total Amount",
  ];

  useEffect(() => {
    if (loggedInProfile?.u_role_id === 1) {
      getTableInfo(
        searchTerm || "",
        pageNo,
        columnDataMap[sortingColumnName],
        sortOrder,
        pageLimit
      );
    }
  }, [isUpdated, pageLimit, loggedInProfile]);
  useEffect(() => {
    if (count) {
      setTotalCount(count);
    }
  }, [count]);

  useEffect(() => {
    if (loggedInProfile?.u_role_id === 1) {
      setAllowAccess(loggedInProfile?.u_role_id === 1 ? 1 : 0);
    }
  }, [loggedInProfile]);

  useEffect(() => {
    if (billList && loggedInProfile?.u_role_id === 1) {
      mapTableInfo();
    }
  }, [billList]);

  const mapTableInfo = () => {
    const mapper = billList?.records?.map((billInfo, index) => {
      const tableHeader = {
        id: billInfo.id,
        "Token no": billInfo?.b_token,
        "PNR no": billInfo?.b_pnr,
        "Mobile No": billInfo?.b_mobile_no,
        "Total People": billInfo?.b_people_count,
        Name: billInfo?.b_name,
        "Total Amount": `₹${billInfo?.b_amount}`,
        Status: <Status status={!billInfo?.b_exit_status} />,
        "Created Location": billInfo?.created_location?.l_name,
        "Location Price": `₹${billInfo?.created_location?.l_price}`,
        "Created By": billInfo?.b_created_by?.u_name,
        "Creator Role": billInfo?.b_created_by?.user_role?.role_name,
      };
      return tableHeader;
    });

    setTableMapper(mapper);
  };

  const sortingClick = (event, headerInfo) => {
    const innerText = event.target.innerText.trim();
    setSortingColumnName(innerText);
    try {
      if (!sort && !Object.keys(sort)?.length) {
        setSort({ ...sort, [innerText]: true });
      } else {
        setSort({
          ...sort,
          [innerText]: !sort[innerText],
        });
      }
    } catch (error) {
      setSort({ ...sort, [innerText]: true });
    }

    setSortingColumnName(innerText);
    const sortOrder = sort[innerText] ? "ASC" : "DESC";
    setSortOrder(sortOrder);
    getTableInfo(
      searchTerm || "",
      pageNo,
      columnDataMap[headerInfo],
      sortOrder,
      pageLimit
    );
  };

  const getTableInfo = (
    searchTerm = "",
    pageNumber = "",
    sortBy = columnDataMap[sortingColumnName] || "",
    sortOrder = "",
    limit = 10,
    dateTime = {}
  ) => {
    const payload = {
      searchKey: searchTerm,
      limit: limit,
    };

    if (sortOrder) {
      payload.sort = sortBy;
    }
    if (sortBy) {
      payload.sortBy = sortOrder;
    }
    if (pageNo) {
      payload.pageNo = pageNumber || pageNo;
    }

    if (
      dateTime?.endDate &&
      dateTime?.endTime &&
      dateTime?.startDate &&
      dateTime?.startTime
    ) {
      payload.startDateTime = new Date(
        `${dateTime?.startDate} ${dateTime?.startTime}`
      ).toISOString();
      payload.endDateTime = new Date(
        `${dateTime?.endDate} ${dateTime?.endTime}`
      ).toISOString();
    }

    dispatch(actions.getAllBill(payload));
  };

  const updatePagination = (pageNo) => {
    setPageNo(pageNo);
    getTableInfo(
      searchTerm || "",
      pageNo,
      columnDataMap[sortingColumnName],
      sortOrder,
      pageLimit
    );
  };

  const searchEvent = (searchText = "") => {
    setPageNo(1);
    setSearchTerm(searchText);
    getTableInfo(
      searchText || "",
      1,
      columnDataMap[sortingColumnName] || "",
      sortOrder || "",
      pageLimit
    );
  };

  return loggedInProfile?.u_role_id === 1 ? (
    <div>
      <Row className="summary">
        <Col md={2} className="alignCenterSelf">
          {allowAccess ? (
            <Link to={"/add/locations"} className="addNewLink">
              + New Locations
            </Link>
          ) : (
            ""
          )}
        </Col>
        <Col md={4} className="alignCenterSelf">
          <SearchBar search={searchEvent}></SearchBar>
        </Col>

        <Col md={2} className="alignCenterSelf">
          {billList?.totalCount} Total &nbsp; Total Collection - ₹
          {billList?.totalAmountCollected}
        </Col>
        <Col md={2} className="alignCenterSelf">
          {allowAccess ? (
            <Link to={"/update/locations"} className="addNewLink">
              Update Locations
            </Link>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="alignCenterSelf">
          {allowAccess ? (
            <>
              <Row>
                <Col md={1}>
                  <Form.Label>Start Date Time</Form.Label>
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="date"
                    name="start_date"
                    value={dateTime?.startDate || ""}
                    onChange={(event) => {
                      setDatesTime({
                        ...dateTime,
                        startDate: event?.target?.value,
                      });
                    }}
                  ></Form.Control>
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="time"
                    name="start_time"
                    value={dateTime?.startTime || ""}
                    onChange={(event) => {
                      setDatesTime({
                        ...dateTime,
                        startTime: event?.target?.value,
                      });
                    }}
                  ></Form.Control>
                </Col>
                <Col md={1}>
                  <Form.Label>End Date Time:</Form.Label>
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="date"
                    name="end_date"
                    value={dateTime?.endDate || ""}
                    onChange={(event) => {
                      setDatesTime({
                        ...dateTime,
                        endDate: event?.target?.value,
                      });
                    }}
                  ></Form.Control>
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="time"
                    name="end_time"
                    value={dateTime?.endTime || ""}
                    onChange={(event) => {
                      setDatesTime({
                        ...dateTime,
                        endTime: event?.target?.value,
                      });
                    }}
                  ></Form.Control>
                </Col>
                <Col>
                  <Button
                    onClick={() => {
                      if (
                        dateTime?.endDate &&
                        dateTime?.endTime &&
                        dateTime?.startDate &&
                        dateTime?.startTime
                      ) {
                        getTableInfo(
                          searchTerm || "",
                          pageNo,
                          columnDataMap[sortingColumnName],
                          sortOrder,
                          pageLimit,
                          dateTime
                        );
                      }
                    }}
                  >
                    Submit
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setDatesTime({
                        ...dateTime,
                        startDate: "",
                        startTime: "",
                        endDate: "",
                        endTime: "",
                      });
                      getTableInfo(
                        searchTerm || "",
                        pageNo,
                        columnDataMap[sortingColumnName],
                        sortOrder,
                        pageLimit,
                        {
                          startDate: "",
                          startTime: "",
                          endDate: "",
                          endTime: "",
                        }
                      );
                    }}
                  >
                    {" "}
                    Reset{" "}
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
        </Col>
      </Row>
      {!isLoading ? (
        <Row className="listingScroll">
          <Col>
            <DynamicTable
              sortColumns={sortColumns}
              currentlySorted={sort}
              sortingColumnName={sortingColumnName}
              onSortClick={sortingClick}
              tableExtraActions={[]}
              tableMapper={tableMapper}
            ></DynamicTable>
          </Col>
        </Row>
      ) : (
        <div className="mt-3">
          <Loader />
        </div>
      )}
      <Row>
        <Col className="mt-1">
          <Dropdown>
            <Dropdown.Toggle className="limitDropdown">{`${pageLimit} records per page`}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setLimit(5);
                }}
              >
                5
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setLimit(10);
                }}
                defaultChecked={true}
              >
                10
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setLimit(15);
                }}
              >
                15
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setLimit(20);
                }}
              >
                20
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <PaginationModule
            pageNo={pageNo}
            totalCount={Math.ceil(totalCount / pageLimit)}
            onChange={(number) => {
              updatePagination(number);
            }}
          ></PaginationModule>
        </Col>
      </Row>
    </div>
  ) : (
    <h2>Unauthorised page</h2>
  );
};
