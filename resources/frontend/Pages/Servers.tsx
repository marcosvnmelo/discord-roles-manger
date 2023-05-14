import { usePage } from '@inertiajs/react';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { Else, If, Then } from 'react-if';
import { ServersPageProps } from 'resources/../@types/page';
import OptionalLink from '../componentes/atoms/OptionalLink';
import Main from '../Layouts/Main';

const Servers: React.FC = () => {
  const {
    props: { guilds },
  } = usePage<ServersPageProps>();

  const getServerNameInitials = useCallback((name: string) => {
    const words = name.split(' ');

    if (words.length === 1) {
      return words[0].slice(0, 2);
    }

    return words.map(word => word[0].toUpperCase()).join('');
  }, []);

  return (
    <Main>
      <main className="flex flex-col h-[calc(100%-30px)] items-center justify-center">
        <ul className="text-white max-w-lg">
          {guilds.map(guild => (
            <li key={guild.id}>
              <OptionalLink href={`/servers/${guild.id}`} disabled={!guild.owner}>
                <button
                  type="button"
                  className={clsx('flex items-center py-2 px-6 cursor-pointer w-full', {
                    'opacity-50': !guild.owner,
                    'hover:bg-gray-700': guild.owner,
                    'cursor-not-allowed': !guild.owner,
                  })}
                >
                  <If condition={guild.icon}>
                    <Then>
                      <img
                        className="w-10 h-10 rounded-full mr-4"
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                        alt={guild.name}
                      />
                    </Then>
                    <Else>
                      <div
                        className="w-10 h-10 rounded-full mr-4 bg-gray-700 flex items-center justify-center"
                        style={{ filter: 'grayscale(100%)' }}
                      >
                        {getServerNameInitials(guild.name)}
                      </div>
                    </Else>
                  </If>
                  {guild.name}
                </button>
              </OptionalLink>
            </li>
          ))}
        </ul>
      </main>
    </Main>
  );
};

export default Servers;
