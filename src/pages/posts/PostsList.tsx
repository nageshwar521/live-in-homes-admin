import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridWrapper } from "../../components/aggrid/AgGridWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addPostRequest,
  deletePostRequest,
  fetchPostListRequest,
  updatePostRequest,
} from "../../store/slices/postSlice";
import Modal from "../../components/Modal";
import PostDetails, { defaultPostValues } from "./PostDetails";
import ActionButtons from "../../components/aggrid/ActionButtons";
import { generatePostFormData } from "../../utils/common";
import { get } from "lodash";
import Row from "../../components/layout/Row";
import BaseButton from "../../components/buttons/BaseButton";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material";
import FlexGrow from "../../components/FlexGrow";
import { RowDetailsInterface } from "./types";

dayjs.extend(duration);

const getDurationFormat = (duration: duration.Duration) => {
  const years = get(duration, "years", "");
  const months = get(duration, "months", "");
  const days = get(duration, "days", "");
  let message = "";
  if (years && duration.years()) {
    message = `${duration.years()} years`;
  } else if (months && duration.months()) {
    message = `${duration.months()} months`;
  } else if (days && duration.days()) {
    message = `${duration.days()} days`;
  }
  return message;
};

function monthToComparableNumber(date: string) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }
  const yearNumber = Number.parseInt(date.substring(6, 10));
  const monthNumber = Number.parseInt(date.substring(3, 5));
  const dayNumber = Number.parseInt(date.substring(0, 2));
  return yearNumber * 10000 + monthNumber * 100 + dayNumber;
}

function dateComparator(date1: string, date2: string) {
  const date1Number = monthToComparableNumber(
    dayjs(date1).format("DD-MM-YYYY")
  );
  const date2Number = monthToComparableNumber(
    dayjs(date2).format("DD-MM-YYYY")
  );
  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
}

const StartDateColumn: React.FC<ICellRendererParams> = ({ value }) => {
  // console.log(props);
  const startDate = dayjs(value);
  const todayDate = dayjs(new Date());
  const duration = dayjs.duration(todayDate.diff(startDate));
  return <span>{getDurationFormat(duration)}</span>;
};

const PostColumn: React.FC<ICellRendererParams> = ({ value, ...props }) => {
  return (
    <span>{`${get(value, "name", "")}, ${get(
      value,
      "location.name",
      ""
    )}`}</span>
  );
};

const PostList = () => {
  const { postList, status, errorResponse } = useAppSelector(
    (state: RootState) => state.posts
  );
  const [isAddPostFormOpen, setIsPostFormOpen] = useState(false);
  const [isDeletePostOpen, setIsDeletePostOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState<RowDetailsInterface | null>(
    null
  );
  const [modalType, setModalType] = useState<any>("create");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostListRequest({}));
  }, []);

  const handleDetailsClose = () => {
    setIsPostFormOpen(false);
  };

  const colDef: ColDef[] = [
    { field: "title", headerName: "Title", sortable: true, unSortIcon: true },
    { field: "avail_from", headerName: "Availability" },
    { field: "status", headerName: "Status" },
    { field: "rent", headerName: "Rent" },
    { field: "room_type", headerName: "Room Type" },
    { field: "phone_number", headerName: "Phone Number" },
    {
      field: "",
      cellRenderer: ActionButtons,
    },
  ];

  const handleAddPost = (data: any) => {
    dispatch(addPostRequest({ ...defaultPostValues, ...data }));
  };

  const handleAddPostClick = () => {
    setModalType("create");
    setIsPostFormOpen(true);
    const postDetails = generatePostFormData({});
    setRowDetails({ formData: postDetails });
  };

  const handleUpdatePost = (data: any) => {
    dispatch(updatePostRequest({ ...defaultPostValues, ...data }));
  };

  const handleDeletePost = () => {
    console.log(rowDetails?.formData);
    setIsDeletePostOpen(false);
    dispatch(deletePostRequest({ id: rowDetails?.formData.id }));
  };

  const handleSubmitForm = (data: any) => {
    if (modalType === "edit") {
      handleUpdatePost({ id: rowDetails?.formData.id, data });
    } else {
      handleAddPost(data);
    }
  };
  // console.log(postList, "postList");

  const handleActionButtonClick = (
    action: string,
    nodeItem: any,
    colDef: any
  ) => {
    if (action === "edit") {
      setModalType("edit");
      setIsPostFormOpen(true);
      const postDetails = generatePostFormData({
        postDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: postDetails, nodeItem, colDef });
    } else if (action === "delete") {
      setIsDeletePostOpen(true);
      const postDetails = generatePostFormData({
        postDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: postDetails, nodeItem, colDef });
    }
  };

  return (
    <>
      {isAddPostFormOpen ? (
        <Modal
          title="Post Details"
          isOpen={isAddPostFormOpen}
          onClose={handleDetailsClose}
        >
          {get(errorResponse, "message", "") ? (
            <Alert severity="error">{get(errorResponse, "message", "")}</Alert>
          ) : null}
          <PostDetails
            mode={modalType}
            rowDetails={rowDetails}
            onClose={() => setIsPostFormOpen(false)}
            onSubmit={handleSubmitForm}
          />
        </Modal>
      ) : null}
      {isDeletePostOpen ? (
        <Modal
          title="Delete Post"
          isOpen
          onClose={() => setIsDeletePostOpen(false)}
        >
          <div>Do you want to delete the post?</div>
          <Row justifyContent="flex-end">
            <BaseButton onClick={() => setIsDeletePostOpen(false)}>
              Cancel
            </BaseButton>
            <BaseButton variant="contained" onClick={handleDeletePost}>
              Submit
            </BaseButton>
          </Row>
        </Modal>
      ) : null}
      <Box display="flex" flexDirection="row" marginBottom="20px">
        <FlexGrow />
        <Box>
          <BaseButton variant="contained" onClick={handleAddPostClick}>
            Add Post
          </BaseButton>
        </Box>
      </Box>
      <Box>
        <AgGridWrapper
          domLayout="autoHeight"
          rowData={postList}
          columnDefs={colDef}
          context={{
            onActionButtonClick: handleActionButtonClick,
          }}
        />
      </Box>
    </>
  );
};

export default PostList;
