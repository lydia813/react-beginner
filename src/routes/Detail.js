import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const { id } = useParams();

  console.log(detail);

  //https://velog.io/@rgfdds98/debuging-React-Hook-useEffect-has-a-missing-dependency-fetchMovieData.-Either-include-it-or-remove-the-dependency-array
  //useEffect 사용 시 React Hook 관련 경고가 떴을 때 해결하는 방법
  useEffect(() => {
    const getDetail = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setDetail([json.data.movie]); //이거 하느라 너무 힘들었다.. 배열이 아니라 오브젝트로 가져온다는 걸 이틀만에 알아채고 한 번 더 대괄호로 둘러서 배열로 가져오게끔 만들었음..
      setLoading(false);
    };

    getDetail();
  }, [id]);

  return (
    <div>
      {loading ? (
        <h1>Loading Details...</h1>
      ) : (
        <div>
          {detail.map((movie) => (
            <MovieDetail
              key={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              description={movie.description_intro}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Detail;
