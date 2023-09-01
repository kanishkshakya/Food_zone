import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./Component/SearchResult";

export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchfooddata = async () => {
      setLoading(true);
      try {
        const reponse = await fetch(BASE_URL);
        const json = await reponse.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchfooddata();
  }, []);
  // fetchfooddata();
  console.log(data);
  if (error) return <div>{error}</div>;
  if (loading) return <div>loading...</div>;

  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="search">
          <input type="text" name="search" placeholder="Search Food..." />
        </div>
      </TopContainer>
      <FilterContainer>
        <Button>All</Button>
        <Button>BreakFast</Button>
        <Button>Lunch</Button>
        <Button>Dinner</Button>
      </FilterContainer>
      <SearchResult data={data} />
    </Container>
  );
};

export default App;
const Container = styled.div`
  min-width: 1000px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search input {
    background-color: transparent;
    color: white;
    font-size: 16px;
    border: 1px solid red;
    border-radius: 5px;
    padding: 0 10px;
    height: 40px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  background-color: red;
  color: white;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
`;
