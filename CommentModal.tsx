import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useApp } from '@/context/AppContext';
import { Idea } from '@/types/idea';

interface CommentModalProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({ idea, isOpen, onClose }) => {
  const { comments, addComment, showToast } = useApp();
  const [content, setContent] = useState('');

  if (!idea) return null;

  const ideaComments = comments[idea.id] || [];

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      showToast('Please type your feedback');
      return;
    }

    addComment(idea.id, content.trim());
    setContent('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={idea.title}
      description={`Community feedback and product iteration for ${idea.company}`}
    >
      <div className="space-y-4 pt-1">
        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
          {idea.desc}
        </p>

        {/* Community feedback stream */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Community & Startup Feedback
          </span>
          {ideaComments.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {ideaComments.map((c) => (
                <div key={c.id} className="p-3 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{c.author.name}</span>
                    <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">“{c.content}”</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>

        {/* Input form */}
        <form onSubmit={handlePost} className="space-y-3 pt-2 border-t border-slate-100">
          <Textarea
            label="Add Your Product Feedback"
            placeholder="Share feedback on taste, materials, packaging, or price..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Post Feedback
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
