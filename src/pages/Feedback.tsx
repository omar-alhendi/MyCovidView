import { useLoaderData } from "react-router-dom";

const Feedback = () => {
  const data = useLoaderData() as LoaderData<typeof postsLoader>;
  return <div>Feedback</div>;
};

export default Feedback;
