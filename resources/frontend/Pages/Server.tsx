import { usePage } from '@inertiajs/react';
import { APIGuildMember } from 'discord-api-types/v10';
import React, { useState } from 'react';
import { ServerPageProps } from 'resources/../@types/page';
import RolesModal from '../componentes/organisms/RolesModal';
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
                className="flex items-center py-2 px-6 cursor-pointer w-full hover:bg-gray-700"
                onClick={() => handleUserButtonClick(member)}
              >
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={`https://cdn.discordapp.com/avatars/${member.user?.id}/${member.user?.avatar}.png`}
                  alt={member.user?.username}
                />
                {member.user?.username}
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
