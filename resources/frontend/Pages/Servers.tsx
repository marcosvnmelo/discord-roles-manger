import { usePage } from '@inertiajs/react';
import React from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Else, If, Then, Unless, When } from 'react-if';
import { ServersPageProps } from 'resources/../@types/page';
import OptionalLink from '../componentes/atoms/OptionalLink';
import { getNameInitials } from '../helpers/formatters';
import Main from '../Layouts/Main';

const Servers: React.FC = () => {
  const {
    props: { guilds, guildsWithPermissions },
  } = usePage<ServersPageProps>();

  return (
    <Main>
      <main className="flex flex-col h-[calc(100%-30px)] items-center justify-center">
        <ul className="text-white max-w-lg">
          {guilds.map(guild => (
            <li key={guild.id}>
              <OptionalLink
                href={
                  guildsWithPermissions[guild.id] ? `/servers/${guild.id}` : '/discord/bot/redirect'
                }
                external={!guildsWithPermissions[guild.id]}
                disabled={!guild.owner}
              >
                <button
                  type="button"
                  className="flex items-center py-2 px-6 rounded cursor-pointer w-full disabled:opacity-50 enabled:hover:bg-gray-700 disabled:cursor-not-allowed"
                  disabled={!guild.owner}
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
                        {getNameInitials(guild.name)}
                      </div>
                    </Else>
                  </If>

                  <span className="max-w-[65%] truncate">{guild.name}</span>

                  <When condition={guildsWithPermissions[guild.id]}>
                    <span className="ml-auto text-xs bg-gray-700 rounded-full px-2 py-1">
                      <FaCheck />
                    </span>
                  </When>
                  <Unless condition={guildsWithPermissions[guild.id]}>
                    <When condition={guild.owner}>
                      <span className="ml-auto text-xs bg-gray-700 rounded-full px-2 py-1">
                        <FaPlus />
                      </span>
                    </When>
                  </Unless>
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
