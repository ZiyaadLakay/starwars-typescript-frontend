import React from "react";
import "./App.css";
import { useState } from "react";
import CardList from "../../components/CardList/CardList";
import ReactPaginate from "react-paginate";

interface IState {
  people: Person[];
  isModal: boolean;
  pageNum: number;
  pageCount: number;
}

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
}

const App = () => {
  const [pageNum, setPageNum] = useState<IState["pageNum"]>(1);
  const [pageCount, setPageCount] = useState<IState["pageCount"]>(9);

  const changePage = (selectedItem: any) => {
    const { selected } = selectedItem;
    setPageNum(selected + 1);
  };

  return (
    <div className="App">
      <h1
        className="title"
        onClick={() => {
          setPageNum(1);
        }}
      >
        Star Wars Characters
      </h1>
      <CardList pageNum={pageNum} />

      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        containerClassName={"paginationBtns"}
        previousClassName={"prevBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default App;
