import React, { useEffect, useState } from "react";
import "./Modal.css";
import Loader from "react-loader-spinner";
interface IProps {
  person: Person;
  isVisible: boolean;
  onClose: any;
  homeworld: string;
  loading: boolean;
}

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
}

const Modal: React.FC<IProps> = ({
  person,
  isVisible = false,
  onClose,
  homeworld,
  loading,
}) => {
  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{person.name}</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">
            <img
              className="image"
              src={`https://robohash.org/${person.name}`}
              alt="person"
            />
            <ul style={{ display: "grid" }}>
              <li>
                <strong>Height : </strong>
                {person.height}
              </li>
              <li>
                <strong>Mass : </strong> {person.mass}
              </li>
              <li>
                <strong>Gender : </strong> {person.gender}
              </li>
              <li>
                <strong>Homeworld : </strong> {homeworld}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
