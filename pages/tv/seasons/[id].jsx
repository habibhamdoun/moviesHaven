import React from "react";
import router, { useRouter } from "next/router";

const Seasons = () => {
  const router = useRouter();
  const [id, setId] = React.useState("");
  React.useEffect(() => {
    setId(router.query?.id);
  });
  console.log(id);
  return (
    <section>
      <h2></h2>
    </section>
  );
};

export default Seasons;
