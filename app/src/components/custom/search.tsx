import { FC } from 'react';
import { Input } from '../ui/input';

const Search: FC = () => {
  return (
    <div className='flex items-center justify-between px-6'>
      <Input type="text" placeholder="Search" className='rounded-full bg-muted border-none' showSearchIcon />
    </div>
  );
};

export default Search;