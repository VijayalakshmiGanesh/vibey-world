import { Dna } from "react-loader-spinner";

function Loader() {
  return (
    <Dna
      visible={true}
      height="130"
      width="130"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
}

export default Loader;
