import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./Component/SearchResult";

export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchfooddata = async () => {
      setLoading(true);
      try {
        const reponse = await fetch(BASE_URL);
        const json = await reponse.json();
        setData(json);
        setFilterData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchfooddata();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue === "") {
      setFilterData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilterData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    { name: "all", type: "all" },
    { name: "breakfast", type: "breakfast" },
    { name: "lunch", type: "lunch" },
    { name: "dinner", type: "dinner" },
  ];

  // fetchfooddata();
  // console.log(data);
  if (error) return <div>{error}</div>;
  if (loading) return <div>loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              name="search"
              placeholder="Search Food..."
            />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.type}
              onClick={() => filterFood(value.type)}
            >
              {value.type}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filterData} />
    </>
  );
};

export default App;
export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      color: white;
      font-size: 16px;
      border: 1px solid red;
      border-radius: 5px;
      padding: 0 10px;
      height: 40px;
      &::placeholder {
        color: white;
      }
    }
  }
  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  background-color: ${({ isSelected }) => (isSelected ? "red" : "#e40303")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "red")};
  color: white;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e40303;
  }
`;
