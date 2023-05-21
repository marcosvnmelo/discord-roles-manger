import { usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { PageGlobalProps } from 'resources/../@types/page';

const Flash: React.FC = () => {
  const {
    props: { errors, success, infos },
  } = usePage<PageGlobalProps>();

  useEffect(() => {
    if (errors) {
      if (Array.isArray(errors)) {
        errors.forEach(e => {
          toast.error(e);
        });
        return;
      }

      Object.keys(errors).forEach(key => {
        const err = errors[key];
        if (Array.isArray(err)) {
          err.forEach(e => {
            toast.error(e);
          });
        } else {
          toast.error(errors[key]);
        }
      });
    }
  }, [errors]);

  useEffect(() => {
    if (success) {
      if (Array.isArray(success)) {
        success.forEach(s => {
          toast.success(s);
        });
        return;
      }

      Object.keys(success).forEach(key => {
        const succ = success[key];
        if (Array.isArray(succ)) {
          succ.forEach(s => {
            toast.success(s);
          });
        } else {
          toast.success(success[key][0]);
        }
      });
    }
  }, [success]);

  useEffect(() => {
    if (infos) {
      if (Array.isArray(infos)) {
        infos.forEach(i => {
          toast.info(i);
        });
        return;
      }

      Object.keys(infos).forEach(key => {
        const info = infos[key];
        if (Array.isArray(info)) {
          info.forEach(i => {
            toast.info(i);
          });
        } else {
          toast.info(infos[key][0]);
        }
      });
    }
  }, [infos]);

  return <></>;
};

export default Flash;
