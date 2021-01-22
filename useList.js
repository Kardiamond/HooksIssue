import { useState, useEffect } from "react";

function useList(initialList = []) {
  const [list, setList] = useState(initialList);
  const [sort, setSort] = useState({property: "", direction: "DESC"});

  const updateList = (data) => {

    if (!data || data.length <= 0){
      setList(list => []);
      return;
    }

    sortList(data);

    setList(list => data);
  }

  const sortList = (data) => {

    //S'il y a un ordre à respecter
    if (sort.property !== ""){
      const up =  sort.direction === "DESC" ? 1 : -1;
      const down = up === 1 ? -1 : 1;
      const property = sort.property;

      data =  data.sort((a, b) => {
          if (a[property] === null || a[property] === undefined) return down;
          if (b[property] === null || b[property] === undefined) return up;

          if (a[property] > b[property]) return up;
          if (a[property] < b[property]) return down;

          return 0;
        });
    }
  }

  const onClickSort = (e) => {
    const property = e.currentTarget.dataset.property;

    const newSort = {property: "", direction: ""}

    if (sort.property !== property){
      newSort.property = property;
      newSort.direction = "DESC";
    }else{
      if (sort.direction === "DESC")
        newSort.direction = "ASC";


      else if (sort.direction === "ASC")
        newSort.direction = "";
      else
        newSort.direction = "DESC";
      newSort.property = property;
    }

    setSort(sort => newSort);
  }

  useEffect(() => {
    updateList([...list]);
  }, [sort]);

  return [list, updateList, sort, onClickSort];
}

export default useList;
