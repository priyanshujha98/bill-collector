import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import actions from "../../store/actions/actions";
import DynamicTable from "../Common/DynamicTable";
import { ReactComponent as DeleteIconSVG } from "../Common/icons/deleteIcon.svg";
import Loader from "../Common/Loader";
import { PaginationModule } from "../Common/PaginationModule";
import SearchBar from "../Common/SearchBar";
import { ModalComponent } from "../Common/ModaComponent"
export const UserList = () => {
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
  const [modalShow, setModalShow] = useState(false);
  const [deleteInactiveShow, setDeleteInactiveShow] = useState(false);
  const [showActive, setShowActive] = useState(0);
  const [pageLimit, setLimit] = useState(10)

  const userList = useSelector((state) => state?.user?.result);
  const isUpdated = useSelector((state) => state?.user?.isUpdated);
  const count = useSelector((state) => state?.user?.result?.totalCount);
  const isLoading = useSelector((state) => state?.network?.isLoading);
  const loggedInProfile = useSelector((state) => state?.login?.result);

  const columnDataMap = {
    "User Name":"u_user_name",
    "Name":"u_name",
    "Date of Birth":"u_dob",
  };

  const sortColumns = [
    "User Name",
    "Name",
    "Date of Birth",
  ];

  useEffect(() => {
    if(loggedInProfile?.u_role_id ===1){

      getTableInfo( searchTerm || "", pageNo, columnDataMap[sortingColumnName], sortOrder, pageLimit);
    }
  }, [showActive, isUpdated, pageLimit, loggedInProfile]);
  useEffect(() => {
    if (count) {
      setTotalCount(count);
    }
  }, [count]);

  useEffect(() => {
    if(loggedInProfile?.u_role_id ===1) {
      setAllowAccess(loggedInProfile?.u_role_id ===1 ? 1 : 0);
    }
  }, [loggedInProfile]);

  useEffect(() => {
    if (userList && (loggedInProfile?.u_role_id ===1)) {
      mapTableInfo();
    }
  }, [userList]);

  const mapTableInfo = () => {
    const mapper = userList?.records?.map((userInfo, index) => {
      const tableHeader = {
        id: userInfo.id,
        "User Name": userInfo?.u_user_name,
        "Name": userInfo?.u_name,
        "Date of Birth": userInfo?.u_dob,
        "Role": userInfo?.user_role?.role_name
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
    limit = 10
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

    dispatch(actions.getUserList(payload));
  };

  const modalBodyDelete = () => (
    
    <React.Fragment>
        { loggedInProfile?.id !== deleteInactiveShow?.id?
            <div className="alignCenterText">
                <Row className="mt-3">
                    <Col>Do you really want to Delete ?</Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                    <Button
                        className="modalConfirm"
                        onClick={() => {
                        setModalShow(!modalShow);
                        dispatch(actions.deleteAdmin(deleteInactiveShow?.id));
                        }}
                    >
                        Confirm
                    </Button>
                    </Col>
                </Row>
            </div>:(
                <div className="alignCenterText">
                    <Row className="mt-3">
                        <Col>You cannot delete yourself</Col>
                    </Row>
                    <Row className="mt-5">
                    <Col>
                    <Button
                        className="modalConfirm"
                        onClick={() => {
                        setModalShow(!modalShow);
                        
                        }}
                    >
                        Cancel
                    </Button>
                    </Col>
                </Row>
                </div>
            )
        }
    </React.Fragment>
    
  );

  const deleteFunction = (adminId, status) => {
    setDeleteInactiveShow({ mode: false, status: status, id: adminId });
    setModalShow(!modalShow);
  };

  const tableExtraActions = [];

  if (allowAccess) {

    tableExtraActions.push({
      icon: <DeleteIconSVG />,
      onClick: deleteFunction,
    });
  }



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

  return (
    (loggedInProfile?.u_role_id === 1)?
    (
    <div>
      <Row className="summary">
        
        <Col md={4} className="alignCenterSelf">
          <SearchBar search={searchEvent}></SearchBar>
        </Col>
        <Col md={4} className="alignCenterSelf">
            {userList?.totalCount} Total
        </Col>
        
      </Row>
      {!isLoading ? (
        <Row className="listingScroll">
          <Col className="alignCenterText">
            <DynamicTable
              sortColumns={sortColumns}
              currentlySorted={sort}
              sortingColumnName={sortingColumnName}
              onSortClick={sortingClick}
              tableExtraActions={ tableExtraActions || []}
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
              >10</Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                    setLimit(15);
                  }}
              >15</Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                    setLimit(20);
                  }}
              >20</Dropdown.Item>
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
        <ModalComponent
        onHide={() => {
          setModalShow(!modalShow);
        }}
        show={modalShow}
        header={""}
        size="md"
        body={
          modalBodyDelete()
        }
      ></ModalComponent>
      </Row>
    </div>):(
      <h2>
        Unauthorised page
      </h2>
    )
  );
};
