import { usePage } from '@inertiajs/react';
import { APIGuildMember } from 'discord-api-types/v10';
import React, { useState } from 'react';
import { Else, If, Then, When } from 'react-if';
import { ServerPageProps } from 'resources/../@types/page';
import RolesModal from '../componentes/organisms/RolesModal';
import { getNameInitials } from '../helpers/formatters';
import Main from '../Layouts/Main';

const Server: React.FC = () => {
  const {
    props: { guild, members },
  } = usePage<ServerPageProps>();

  const [member, setMember] = useState<APIGuildMember | null>(null); // [1

  const handleUserButtonClick = (member: APIGuildMember) => {
    setMember(member);
  };

  return (
    <Main>
      <main className="flex flex-col h-[calc(100%-30px)] items-center">
        <h1 className="text-6xl font-bold text-white">{guild.name}</h1>

        <ul className="text-white max-w-lg mt-8">
          {members?.map(member => (
            <li key={member.user?.id}>
              <button
                type="button"
                className="flex items-center py-2 px-6 rounded cursor-pointer w-full enabled:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleUserButtonClick(member)}
                disabled={member.user?.bot || member.user?.id === guild.owner_id}
              >
                <If condition={member.user?.avatar}>
                  <Then>
                    <img
                      className="w-10 h-10 rounded-full mr-4"
                      src={`https://cdn.discordapp.com/avatars/${member.user?.id}/${member.user?.avatar}.png`}
                      alt={member.user?.username}
                    />
                  </Then>
                  <Else>
                    <div
                      className="w-10 h-10 rounded-full mr-4 bg-gray-700 flex items-center justify-center"
                      style={{ filter: 'grayscale(100%)' }}
                    >
                      {getNameInitials(member.user?.username || '')}
                    </div>
                  </Else>
                </If>
                {member.user?.username}

                <When condition={member.user?.bot}>{' (BOT)'}</When>
                <When condition={member.user?.id === guild.owner_id}>{' (OWNER)'}</When>
              </button>
            </li>
          ))}
        </ul>
      </main>

      <RolesModal guild={guild} member={member} onClose={() => setMember(null)} />
    </Main>
  );
};

export default Server;
