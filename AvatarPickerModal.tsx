import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATARS = ['🦊', '🐼', '🐨', '🐯', '🦋', '🌻', '🌙', '🦄', '🐸', '🐱'];

export const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({ isOpen, onClose }) => {
  const { selectedAvatar, setSelectedAvatar, showToast } = useApp();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title="Choose your avatar"
      description="Pick an avatar for your IdeaBridge profile. You don't need to upload a personal photo."
    >
      <div className="space-y-6 pt-2">
        <div className="flex gap-3 flex-wrap justify-center p-2 bg-slate-50 rounded-2xl border border-slate-100">
          {AVATARS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setSelectedAvatar(a)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all cursor-pointer ${
                selectedAvatar === a
                  ? 'bg-white shadow-md border-2 border-indigo-600 ring-4 ring-indigo-100 scale-110'
                  : 'bg-white/80 hover:bg-white border border-slate-200 hover:scale-105'
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              showToast('Avatar updated');
            }}
          >
            Save Avatar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
