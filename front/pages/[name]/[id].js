import React from "react";
import useFetch from "../../src/Components/Utils/useFetch";
import { useRouter } from "next/router";
import BookClasses from "../../src/Components/BookClasses";

const IndividualClass = () => {
  const router = useRouter();
  const { data, loading } = useFetch(`/api/all-classes/${router.query.id}`);

  if (loading) {
    return "Loading classes...";
  }

  return <BookClasses data={data} />;
};

export default IndividualClass;
