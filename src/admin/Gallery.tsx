import { ImagePlus } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { apiMessage, type MomentFields, type PublicMoment } from '../api/content'
import type { AdminRequest } from './Workspace'

type MomentStatus = 'draft' | 'published'
type MomentInput = MomentFields & { status: MomentStatus }

export type AdminMoment = PublicMoment & { status: MomentStatus }

type GalleryProps = {
  initialMoments: AdminMoment[]
  adminRequest: AdminRequest
}

const emptyMoment: MomentInput = { image: '', label: '', alt: '', align: 'center', status: 'draft' }

export function Gallery({ initialMoments, adminRequest }: GalleryProps) {
  const [moments, setMoments] = useState(initialMoments)
  const [editor, setEditor] = useState<'new' | number | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<number>()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const heading = useRef<HTMLHeadingElement>(null)
  const activeMoment = moments.find(({ id }) => id === editor)

  const openEditor = (value: 'new' | number) => {
    setError('')
    setFeedback('')
    setConfirmDelete(undefined)
    setEditor(value)
  }

  const closeEditor = () => {
    setEditor(null)
    heading.current?.focus()
  }

  const saveMoment = async (id: number | undefined, fields: MomentInput) => {
    if (pending) return
    setPending(true)
    setError('')
    setFeedback('')
    try {
      const saved = await adminRequest<AdminMoment>(id ? `/moments/${id}` : '/moments', {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify(fields),
      })
      setMoments((current) => id
        ? current.map((moment) => moment.id === saved.id ? saved : moment)
        : [...current, saved])
      setFeedback(saved.status === 'published' ? `“${saved.label}” published.` : `“${saved.label}” saved as a draft.`)
      if (editor !== null) closeEditor()
    } catch (cause) {
      setError(apiMessage(cause, 'Unable to save the photo. Try again.'))
    } finally {
      setPending(false)
    }
  }

  const removeMoment = async (moment: AdminMoment) => {
    if (pending) return
    setPending(true)
    setError('')
    setFeedback('')
    try {
      await adminRequest<void>(`/moments/${moment.id}`, { method: 'DELETE' })
      setMoments((current) => current.filter(({ id }) => id !== moment.id))
      setConfirmDelete(undefined)
      setFeedback(`“${moment.label}” deleted.`)
      heading.current?.focus()
    } catch (cause) {
      setError(apiMessage(cause, 'Unable to delete the photo. Try again.'))
    } finally {
      setPending(false)
    }
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    void saveMoment(activeMoment?.id, {
      label: String(form.get('label') ?? ''),
      image: String(form.get('image') ?? ''),
      alt: String(form.get('alt') ?? ''),
      align: (form.get('align') ?? 'center') as MomentFields['align'],
      status: activeMoment?.status ?? (form.get('status') ?? 'draft') as MomentStatus,
    })
  }

  const initial = activeMoment ?? emptyMoment

  return (
    <section className="admin-panel admin-gallery" aria-labelledby="admin-gallery-heading">
      <div className="admin-section-head">
        <div>
          <h2 id="admin-gallery-heading" ref={heading} tabIndex={-1}>Gallery</h2>
          <p>Published photos appear in Moments. The first published photo also appears on the homepage.</p>
        </div>
        {!editor && <button className="admin-button" type="button" disabled={pending || confirmDelete !== undefined} onClick={() => openEditor('new')}><ImagePlus size={17} aria-hidden="true" /> Add photo</button>}
      </div>

      <p className="admin-feedback" role="status">{feedback}</p>
      {editor ? (
        <form className="admin-form admin-gallery-form" key={editor} onSubmit={submit}>
          <fieldset disabled={pending}>
            <legend>{activeMoment ? 'Edit photo' : 'Add photo'}</legend>
            <label>Caption<input name="label" defaultValue={initial.label} maxLength={160} required autoFocus /></label>
            <label>Image URL<input name="image" type="url" defaultValue={initial.image} maxLength={2048} pattern="https://.+" title="Enter an HTTPS URL" required aria-describedby="gallery-image-help" /></label>
            <p className="admin-hint" id="gallery-image-help">Use a public HTTPS link to the image file.</p>
            <label>Alt text<textarea name="alt" defaultValue={initial.alt} maxLength={300} required rows={2} aria-describedby="gallery-alt-help" /></label>
            <p className="admin-hint" id="gallery-alt-help">Describe what someone needs to know about the photo.</p>
            <label>Image crop<select name="align" defaultValue={initial.align}><option value="center">Center</option><option value="top">Top</option><option value="bottom">Bottom</option></select></label>
            {!activeMoment && <label>Visibility<select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select></label>}
          </fieldset>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <div className="admin-actions">
            <button className="admin-button" type="submit" disabled={pending}>{pending ? 'Saving…' : 'Save photo'}</button>
            <button className="admin-button admin-secondary" type="button" disabled={pending} onClick={closeEditor}>Cancel</button>
          </div>
        </form>
      ) : error && <p className="admin-error" role="alert">{error}</p>}

      {moments.length ? (
        <ul className="admin-gallery-list">
          {moments.map(({ id, ...moment }) => (
            <li className="admin-gallery-item" key={id}>
              <img src={moment.image} alt="" loading="lazy" style={{ objectPosition: moment.align }} />
              <div className="admin-gallery-title">
                <h3>{moment.label}</h3>
                <span className={`admin-status admin-status-${moment.status}`}>{moment.status === 'published' ? 'Published' : 'Draft'}</span>
              </div>
              {confirmDelete === id ? (
                <div className="admin-gallery-confirm" role="group" aria-label={`Delete ${moment.label}`}>
                  <p>Delete this photo permanently?</p>
                  <div className="admin-actions">
                    <button className="admin-button admin-delete" type="button" disabled={pending} onClick={() => void removeMoment({ id, ...moment })}>{pending ? 'Deleting…' : 'Delete permanently'}</button>
                    <button className="admin-button admin-secondary" type="button" disabled={pending} onClick={() => setConfirmDelete(undefined)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="admin-actions">
                  <button className="admin-button admin-secondary" type="button" disabled={pending || !!editor || confirmDelete !== undefined} aria-label={`Edit ${moment.label}`} onClick={() => openEditor(id)}>Edit</button>
                  <button className="admin-button admin-secondary" type="button" disabled={pending || !!editor || confirmDelete !== undefined} aria-label={`${moment.status === 'draft' ? 'Publish' : 'Unpublish'} ${moment.label}`} onClick={() => void saveMoment(id, { ...moment, status: moment.status === 'draft' ? 'published' : 'draft' })}>{moment.status === 'draft' ? 'Publish' : 'Unpublish'}</button>
                  <button className="admin-button admin-secondary admin-delete" type="button" disabled={pending || !!editor || confirmDelete !== undefined} aria-label={`Delete ${moment.label}`} onClick={() => {
                    setError('')
                    setFeedback('')
                    setConfirmDelete(id)
                  }}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : <p className="admin-gallery-empty">No photos yet. Add a photo to get started.</p>}
    </section>
  )
}
