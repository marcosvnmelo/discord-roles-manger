import { Dialog } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { APIRole } from 'discord-api-types/v10';
import React, { useCallback, useEffect, useState } from 'react';
import { ServerPageProps } from 'resources/../@types/page';

type RolesModalProps = {
  guild: ServerPageProps['guild'];
  member: ServerPageProps['members'][number] | null;
  onClose: () => void;
};

const RolesModal: React.FC<RolesModalProps> = ({ guild, member, onClose }) => {
  //* hooks

  //* states
  const [guildRoles, setGuildRoles] = useState<APIRole[]>([]);

  const [initialUserRoles, setInitialUserRoles] = useState<APIRole[]>([]);

  const [userRoles, setUserRoles] = useState<APIRole[]>([]);

  //* handlers
  const handleAddRole = useCallback(
    (role: APIRole) => {
      setGuildRoles(guildRoles.filter(r => r.id !== role.id));
      setUserRoles([...userRoles, role]);
    },
    [guildRoles, userRoles]
  );

  const handleRemoveRole = useCallback(
    (role: APIRole) => {
      setUserRoles(userRoles.filter(r => r.id !== role.id));
      setGuildRoles([...guildRoles, role]);
    },
    [guildRoles, userRoles]
  );

  const onSave = useCallback(() => {
    const rolesToAdd = userRoles.filter(
      role => !initialUserRoles.includes(role)
    );

    const rolesToRemove = initialUserRoles.filter(
      role => !userRoles.includes(role)
    );

    if (!rolesToAdd.length && !rolesToRemove.length) {
      return;
    }

    router.patch(`/members/${member?.user?.id}`, {
      guildId: guild.id,
      rolesToAdd: rolesToAdd.map(role => role.id),
      rolesToRemove: rolesToRemove.map(role => role.id),
    });
  }, [userRoles]);

  //* effects
  useEffect(() => {
    if (!member) {
      return;
    }

    setGuildRoles(
      guild.roles.filter(
        role =>
          role.name !== '@everyone' &&
          role.tags?.bot_id === undefined &&
          !member?.roles.includes(role.id)
      )
    );

    const initialRoles = guild.roles.filter(role =>
      member?.roles.includes(role.id)
    );

    setInitialUserRoles(initialRoles);
    setUserRoles(initialRoles);
  }, [member]);

  //* render
  return (
    <Dialog open={!!member} onClose={onClose}>
      <Dialog.Backdrop className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-5xl overflow-hidden bg-gray-800 rounded-lg p-6">
          <Dialog.Title className="flex justify-between items-center px-6 text-2xl font-bold text-white">
            Roles
            <button
              type="button"
              className="text-white hover:text-gray-400"
              onClick={onClose}
            >
              ×
            </button>
          </Dialog.Title>

          <main className="mt-6 px-6">
            <div className="flex items-center justify-between min-h-[20rem]">
              {/* Guild roles */}
              <div className="flex flex-col min-h-full">
                <h3 className="text-xl font-bold text-white text-center mb-2">
                  Server Roles
                </h3>
                <ul className="text-white max-w-lg border border-gray-700 rounded min-w-[12.5rem] min-h-[12.5rem]">
                  {guildRoles.map(role => (
                    <li key={role.id}>
                      <button
                        type="button"
                        className="flex items-center py-2 px-6 cursor-pointer w-full hover:bg-gray-700"
                        onClick={() => handleAddRole(role)}
                      >
                        <div
                          className="w-5 h-5 rounded-full mr-4"
                          style={{
                            backgroundColor: `#${role.color.toString(16)}`,
                          }}
                        />
                        {role.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* User roles */}
              <div className="ml-8 flex flex-col min-h-full">
                <h3 className="text-xl font-bold text-white text-center mb-2">
                  User Roles
                </h3>
                <ul className="text-white max-w-lg border border-gray-700 rounded min-w-[12.5rem] min-h-[12.5rem]">
                  {userRoles?.map(role => (
                    <li key={role.id}>
                      <button
                        type="button"
                        className="flex items-center py-2 px-6 cursor-pointer w-full hover:bg-gray-700"
                        onClick={() => handleRemoveRole(role)}
                      >
                        <div
                          className="w-5 h-5 rounded-full mr-4"
                          style={{
                            backgroundColor: `#${role.color.toString(16)}`,
                          }}
                        />
                        {role.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </main>

          {/* Modal Footer */}
          <footer className="mt-8 flex justify-end">
            <button
              type="button"
              className="text-white hover:text-gray-400 bg-gray-700 px-4 py-2 rounded"
              onClick={onSave}
            >
              Save
            </button>
          </footer>
        </Dialog.Panel>
      </Dialog.Backdrop>
    </Dialog>
  );
};

export default RolesModal;
