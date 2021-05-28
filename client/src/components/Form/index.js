import React from "react";

function Form({ search, handleInputChange, handleFormSubmit }) {
    return (
        <form>
            <div className="form-row">
                <div className="col-md-11">
                    <input
                        name="search"
                        list="book"
                        type="text"
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Title (required)"
                        id="book"
                    />
                </div>
                <div className="col-md-1">
                    <button className="btn btn-secondary form-control" type="submit" onClick={handleFormSubmit}>
                        Search
        </button>
                </div>
            </div>
        </form>
    );
}

export default Form;