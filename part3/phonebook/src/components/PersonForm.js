import React from 'react';

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name: <input onChange={props.nameHandler} value={props.name} />
      </div>
      <div>
        number: <input onChange={props.phoneHandler} value={props.phone} />
      </div>
      <div>
        <button onClick={props.addHandler} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
