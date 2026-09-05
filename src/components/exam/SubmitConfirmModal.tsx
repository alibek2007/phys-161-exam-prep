import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

export function SubmitConfirmModal({
  open,
  answeredCount,
  total,
  onCancel,
  onConfirm,
}: {
  open: boolean
  answeredCount: number
  total: number
  onCancel: () => void
  onConfirm: () => void
}) {
  const unanswered = total - answeredCount
  return (
    <Modal open={open} onClose={onCancel}>
      <h2 className="text-xl font-bold text-navy-950 mb-2">Submit your exam?</h2>
      {unanswered > 0 ? (
        <p className="text-navy-700 mb-6">
          You have answered {answeredCount} of {total} questions. {unanswered} question{unanswered > 1 ? 's' : ''} remain unanswered.
        </p>
      ) : (
        <p className="text-navy-700 mb-6">Are you sure you want to submit?</p>
      )}
      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onCancel}>
          {unanswered > 0 ? 'Return to exam' : 'Cancel'}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {unanswered > 0 ? 'Submit anyway' : 'Submit Exam'}
        </Button>
      </div>
    </Modal>
  )
}
