import CategoryItem from "./CategoryItem";


export default function UserNavigation(props) {

  return (
    <nav className='w-72 bg-zinc-900 overflow-y-scroll p-6'>
      <header className="text-center mb-6">
        Категории
      </header>
      <div className="flex flex-column">
        {props.categories.map(category => <CategoryItem key={category.id} name={category.name} id={category.id}/>)}
      </div>
    </nav>
  );
}
