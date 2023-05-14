import React from 'react';
import { ServerPageProps } from 'resources/../@types/page';

type RolesModalProps = {
  guild: ServerPageProps['guild'];
  member: ServerPageProps['members'][number] | null;
  onClose: () => void;
};

const RolesModal: React.FC<RolesModalProps> = ({ guild, member, onClose }) => {
  return member ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-8">
        {/* Modal Header */}
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Roles</h2>

          <button type="button" className="text-white hover:text-gray-400" onClick={onClose}>
            x
          </button>
        </header>

        {/* Modal Body */}
        <main className="mt-4">
          <div className="flex items-center min-w-[1024px]">
            {/* Guild roles */}
            <div>
              <h3 className="text-xl font-bold text-white">Server Roles</h3>
              <ul className="text-white max-w-lg">
                {guild.roles.map(role => (
                  <li key={role.id}>
                    <button
                      type="button"
                      className="flex items-center py-2 px-6 cursor-pointer w-full hover:bg-gray-700"
                    >
                      <div
                        className="w-5 h-5 rounded-full mr-4"
                        style={{ backgroundColor: `#${role.color.toString(16)}` }}
                      />
                      {role.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* User roles */}
            <div className="ml-8">
              <h3 className="text-xl font-bold text-white">User Roles</h3>
              <ul className="text-white max-w-lg">
                {member.roles.map(role => (
                  <li key={role}>
                    <button
                      type="button"
                      className="flex items-center py-2 px-6 cursor-pointer w-full hover:bg-gray-700"
                    >
                      <div
                        className="w-5 h-5 rounded-full mr-4"
                        style={{
                          backgroundColor: `#${guild.roles
                            .find(r => r.id === role)
                            ?.color.toString(16)}`,
                        }}
                      />
                      {guild.roles.find(r => r.id === role)?.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>

        {/* Modal Footer */}
        <footer className="mt-8 flex justify-end">
          <button type="button" className="text-white hover:text-gray-400" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default RolesModal;
