import React, { useState } from 'react';
import { Star, X, CheckCircle, ShieldCheck } from 'lucide-react';
import { ServiceReview } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  serviceTitle: string;
  onClose: () => void;
  onSubmitReview: (review: ServiceReview) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  serviceTitle,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      setFormError('Please fill in your name and review comment.');
      return;
    }
    setFormError('');

    const newReview: ServiceReview = {
      id: `rev-user-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || 'Verified Buyer',
      rating,
      date: new Date().toISOString().split('T')[0],
      title: title.trim() || 'Verified Service Experience',
      comment: comment.trim(),
      verified: true,
      helpfulCount: 1
    };

    onSubmitReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Write a Customer Review</h3>
            <p className="text-xs text-slate-500 truncate max-w-xs">{serviceTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900">Review Submitted!</h4>
            <p className="text-xs text-slate-600">
              Thank you for sharing your authentic feedback. Your review is now live.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Star Rating selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Overall Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-bold text-slate-700">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Miller"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your City / Country
                </label>
                <input
                  type="text"
                  placeholder="e.g. London, UK"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Review Headline
              </label>
              <input
                type="text"
                placeholder="e.g. Flawless verification and super fast delivery"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Detailed Feedback <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe your experience with the service, delivery speed, and customer support..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Order ID (Optional for Verified Buyer Badge)
              </label>
              <input
                type="text"
                placeholder="e.g. SMM-482910"
                value={orderRef}
                onChange={(e) => setOrderRef(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {formError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-xs text-rose-700 font-medium">
                {formError}
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-slate-200">
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Buyer Review Policy</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-950 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Publish Review
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
