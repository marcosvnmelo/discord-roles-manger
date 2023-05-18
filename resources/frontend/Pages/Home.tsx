import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { PageGlobalProps } from '../../../@types/page';
import Main from '../Layouts/Main';

const Home: React.FC = () => {
  const {
    props: { user },
  } = usePage<PageGlobalProps>();

  return (
    <Main>
      <nav className="flex justify-center px-6 py-8 mx-auto lg:py-0">
        <Link href="/servers">
          <h1 className="text-white">Servers</h1>
        </Link>
      </nav>
      <main className="flex flex-col h-[calc(100%-30px)] items-center justify-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white">
          Welcome {user?.discord_username || 'user'}
        </h1>

        <If condition={!user?.discord_id}>
          <Then>
            <a href="/discord/redirect">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 cursor-pointer">
                Connect to Discord
              </button>
            </a>
          </Then>
          <Else>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-8 cursor-pointer"
              disabled
            >
              Connected
            </button>
          </Else>
        </If>
      </main>
    </Main>
  );
};

export default Home;
