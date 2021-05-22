import React, { useEffect, useRef } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import "./CardList.css";
import { useState } from "react";
import { GET_HOMEWORLD, GET_PAGE } from "../../GraphQL/Queries";
import Loader from "react-loader-spinner";
interface IProps {
  people: Person[];
  isModal: boolean;
  pageCount?: number;
  homeworld: string;
}
interface Page {
  pageNum: number;
}

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
}

const CardList: React.FC<Page> = ({ pageNum }) => {
  const [getPage, { error: pageError, loading: pageLoading, data: pageData }] =
    useLazyQuery(GET_PAGE, {
      fetchPolicy: "network-only",
    });

  const [
    getHomeworld,
    { error: homeworldError, loading: homeworldLoading, data: homeworldData },
  ] = useLazyQuery(GET_HOMEWORLD, {
    fetchPolicy: "network-only",
  });
  const [homeworld, setHomeworld] = useState<IProps["homeworld"]>("");
  const [isModal, setModal] = useState<IProps["isModal"]>(false);
  const [people, setPeople] = useState<IProps["people"]>([]);
  const [person, setPerson] = useState<Person>({
    name: "",
    height: "",
    mass: "",
    gender: "",
    homeworld: "",
  });

  useEffect(() => {
    if (pageData) {
      setPeople(pageData.getPage.results);
    }
  }, [pageData]);

  useEffect(() => {
    if (pageNum) {
      getPage({ variables: { page: pageNum } });
    }
  }, [pageNum]);

  useEffect(() => {
    if (homeworldData) {
      setHomeworld(homeworldData.getHomeworld.name);
    }
  }, [homeworldData]);

  const renderModal = () => {
    // if (homeworldLoading)
    //   return (
    //     <div className="modal loadingModal">
    //       <Loader type="ThreeDots" color="#2b2eff" height="70" width="70" />
    //     </div>
    //   );
    // if (homeworldError) return <p>{homeworldError.message}</p>;
    return (
      <Modal
        person={person}
        isVisible={isModal}
        onClose={() => setModal(false)}
        homeworld={homeworld}
        loading={false}
      />
    );
  };

  const renderList = (): JSX.Element[] => {
    return (
      people
        //.slice(pagesVisited, pagesVisited + peoplePerPage)
        .map((person) => {
          return (
            <div>
              <li
                key={person.name}
                onClick={() => {
                  setHomeworld("...");
                  getHomeworld({ variables: { url: person.homeworld } });
                  setModal(true);
                  setPerson(person);
                }}
              >
                <Card name={person.name} />
              </li>
            </div>
          );
        })
    );
  };

  if (pageLoading)
    return <Loader type="ThreeDots" color="#2b2eff" height="100" width="100" />;
  if (pageError) return <p>{pageError.message}</p>;
  return (
    <div>
      {renderModal()}
      <ul>{renderList()}</ul>
    </div>
  );
};

export default CardList;
