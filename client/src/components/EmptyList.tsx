import {FC, Dispatch, SetStateAction} from "react";


interface props {
  listName: string,
  setIsAddGoal?: Dispatch<SetStateAction<boolean>>,
  setIsAddTodo?: Dispatch<SetStateAction<boolean>>,
}


const EmptyList: FC<props> = ({listName, setIsAddGoal, setIsAddTodo}): JSX.Element => {

  const handleClick = (): void => {
    switch (listName) {
      case "goal":
        if (setIsAddGoal) return setIsAddGoal(true);
        break;
      case "todo":
        if (setIsAddTodo) return setIsAddTodo(true);
        break;
    }
  }

  return (
    <>
      <div className="flex items-center justify-center self-center grow pb-[20%] w-[60%] h-full">
        <button onClick={handleClick} className="relative mr-5 px-2 text-center text-black cursor-pointer grow 1 min-w-80 p-[10%] bg-white/60 rounded-md shadow">
            <h3 className="text-lg font-semibold text-[color:var(--highlight-light-color)] mb-2">No {listName}s to show yet 🤷‍♂️</h3>
          <p className="text-sm">Go ahead an create your first {listName}!</p>
        </button>
        </div>
    </>
  );
}

export default EmptyList
